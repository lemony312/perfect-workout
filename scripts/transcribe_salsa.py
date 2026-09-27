"""
Transcribe La Suerte Dance School salsa classes locally with Whisper.

Why not YouTube's captions: they are unusable for this project. Of the 15
Beginners Cuban Salsa Steps classes, only 8 carry an `en-orig` track; the other
6 have just an auto-*translated* `en` track (YouTube failed to detect the spoken
audio as English, so it recognised it as another language and translated back —
Class 7 renders "Mambo Cubano" as "my books warm"), and Class 10 has no captions
at all. Even the good `en-orig` tracks mangle every Spanish term: "cetenta" for
Setenta, "dansko mihanola" for "Dance School, Manuela".

Since SALSA_TAB_GOALS.md R3 requires beat-accurate lead cues traceable to a
source timestamp, the cue data cannot rest on captions of that quality.

Two things make the local pass much better than YouTube's:

  * `initial_prompt` seeds the decoder with the Cuban salsa vocabulary, which is
    what actually fixes the Spanish move names. Whisper conditions on it as if
    it were preceding context, so "Enchufla" and "Setenta" become likely tokens
    instead of near-impossible ones.
  * `word_timestamps` gives per-word times, so a cue like "raise your hand on 3"
    can be anchored to the exact word rather than to a 5-second caption block.

Deps are declared inline (PEP 723) rather than in pyproject.toml: mlx-whisper
pulls ~250MB of torch/mlx-metal, which has no business in the environment the
clip-cutting scripts run in. `uv run` picks the metadata up automatically.

Usage:
    uv run scripts/transcribe_salsa.py steps          # the 15 solo-steps classes
    uv run scripts/transcribe_salsa.py couples        # the 21 partnerwork classes
    uv run scripts/transcribe_salsa.py body           # the 4 Cuban Body Movement classes
    # (there is no "shorts" run: they are music-only — see the SHORTS comment below)
    uv run scripts/transcribe_salsa.py steps --force  # re-transcribe, ignore cache
    uv run scripts/transcribe_salsa.py ids nOABL5GW_qk

Outputs, per video:
    data/cache/salsa/audio/<id>.m4a       downloaded audio (kept; re-runs are cheap)
    data/cache/salsa/whisper/<id>.json    segments + words, both with timestamps
    data/cache/salsa/whisper/<id>.txt     flat readable text, for skimming
"""

# /// script
# requires-python = ">=3.12"
# dependencies = ["mlx-whisper", "yt-dlp"]
# ///

import argparse
import json
import logging
import subprocess
import sys
import time
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
AUDIO_DIR = REPO / "data" / "cache" / "salsa" / "audio"
OUT_DIR = REPO / "data" / "cache" / "salsa" / "whisper"
VIDEOS_DIR = REPO / "data" / "cache" / "salsa" / "videos"

# Turbo is ~8x faster than large-v3 with no meaningful accuracy loss on clear
# studio speech, and these are 6-19 minute videos with two speakers close-miked.
MODEL = "mlx-community/whisper-large-v3-turbo"

# Seeded into the decoder so the Spanish move names survive. Every term here is
# one the channel actually says; do not add moves they do not teach, or Whisper
# will start hallucinating them into the transcript. Names taken from the class
# titles and descriptions (see SALSA_TAB_GOALS.md for the verified index).
_PROMPT_HEAD = (
    "This is a Cuban salsa (casino) class from La Suerte Dance School in "
    "Manchester, taught by Michal and Manuela. Moves and terms used: "
)
_PROMPT_TAIL = " Counting is: one two three, five six seven."

# Terms from the two BEGINNERS courses. Unchanged — the 51 beginners transcripts
# were produced with exactly this list and are cached, so touching it would make
# a re-run silently disagree with what is on disk.
BEGINNER_TERMS = (
    "al centro, arriba, abajo, la chica, el chico, los dos, dile que no, "
    "guapea, enchufla, enchufla al centro, enchufla doble, alarde, exhibela, "
    "el uno, kentucky, vacilala, vacilala por la mano, adios con la hermana, "
    "sombrero, sombrero complicado doble, setenta, paseala, coca cola, "
    "tiramisu, juana la cubana, dedo, santiago, mambo cubano, charanga, "
    "cuban rumba, quick 5, hook turn, double right turn, cross and slide, "
    "cha cha cha, tapping on 8, casino, rueda, timba, son, guapear."
)

# Terms the INTERMEDIATE courses add. Every one is taken from a title or a
# description's "Steps in this video:" list, so every one is genuinely taught —
# the standing warning above applies and is why this is a separate list rather
# than being appended to BEGINNER_TERMS: seeding a beginners class with
# "Elegua" or "Gota de la sombra" invites Whisper to hear moves that class never
# mentions, and the beginners transcripts are already the basis of ~900 cues.
INTERMEDIATE_TERMS = (
    "cuba libre, toe heel cross, malibu, triple jump, charanga wave, pilon, "
    "mojito, cachan, elegua, palo, chango, arara, salsa to son transition, "
    "fast double right turn, sombrero complicado, balsero, tiramisu complicado, "
    "la botella, setenta complicado, el dos, paseala complicado, "
    "sombrero por debajo, setenta y cuatro, bayamo, el uno complicado, "
    "montaña, chocolate, enchufla triple mix, gota de la sombra, quebrala, "
    "muchacho, codo de la rabia, donde vas, abanico, chihuahua, "
    "casino con estilo, salsa con rumba, aguajea, caminala."
)

# Which term list each course seeds the decoder with. The `ids` subcommand has no
# course, so it gets both — a deliberate trade: a one-off re-check of a single
# video is worth a slightly noisier prompt, whereas a whole-course run is not.
COURSE_TERMS = {
    "steps": BEGINNER_TERMS,
    "couples": BEGINNER_TERMS,
    "body": BEGINNER_TERMS,
    "int-steps": INTERMEDIATE_TERMS,
    "int-couples": INTERMEDIATE_TERMS,
}


def prompt_for(course: str) -> str:
    """The initial_prompt for a course. `ids` gets every term we know."""
    terms = COURSE_TERMS.get(course)
    if terms is None:
        terms = f"{BEGINNER_TERMS} {INTERMEDIATE_TERMS}"
    return f"{_PROMPT_HEAD}{terms}{_PROMPT_TAIL}"


# Kept so that re-running the beginners courses reproduces the cached transcripts
# byte for byte; `prompt_for` is what new work should call.
SALSA_PROMPT = prompt_for("steps")

# The Beginners Cuban Salsa Steps Course, in the channel's own playlist order —
# which is also the order the tab presents them in. Class 6 is a body-movement
# bonus and Class 15 a review; neither teaches a new step.
STEPS = [
    (1, "Bah_PB9Ga4A"),
    (2, "4qMJzwT6xPM"),
    (3, "FUB6hqwNo0o"),
    (4, "seH4eLK_S6o"),
    (5, "WMgTtp-CRaQ"),
    (6, "U454lXjpKi8"),
    (7, "FNuS26xguaI"),
    (8, "E8Y7VwC4ODY"),
    (9, "k4H5m9hJ_nA"),
    (10, "nOABL5GW_qk"),
    (11, "8b0zqIk1AHE"),
    (12, "Gy8jEBggrLc"),
    (13, "ZArlfy9EakM"),
    (14, "tlUegbWymak"),
    (15, "qD6Vp3qj48o"),
]

COUPLES = [
    (1, "MDEAN40DUVY"), (2, "np3g2IzZ11A"), (3, "y6wC5uHfXG0"), (4, "kg5Ztcp5xQU"),
    (5, "4KKAKgn8UZ4"), (6, "yZ562-ehtQQ"), (7, "pZChl5ylSJw"), (8, "X4Sr8QbXQLU"),
    (9, "lV56IVufYOU"), (10, "CkZO6nyJwjw"), (11, "QueWxI6vMrc"), (12, "EuT94T544Mg"),
    (13, "GT7PTpvni_A"), (14, "jBaHuGXoWBY"), (15, "f8Y-b3m070c"), (16, "H5Idj-uzmn8"),
    (17, "uoq2J1txSTE"), (18, "97Urh5GlCbg"), (19, "M3J7w59rXTE"), (20, "6-cpKa0UMWA"),
    (21, "X7lz-BBMmU8"),
]

BODY = [
    (1, "bB7-7Z7T66w"),
    (2, "PhDBzSN-0sc"),
    (3, "qV2uqPwFGEw"),
    (4, "zv8_lwP4fPE"),
]

# The Intermediate Cuban Salsa Steps Course, playlist order. One new step per
# class, named in each description's "Steps in this video:" list.
INT_STEPS = [
    (1, "g0h32MDXV6Q"),   # Cuba Libre
    (2, "mXK-uPDBlRg"),   # Toe-Heel-Cross
    (3, "UGD79mroi9E"),   # Malibu
    (4, "hf4Lo0mXaG4"),   # Triple jump
    (5, "I8a_F5iOXp8"),   # Charanga wave
    (6, "IQ41651xh8Q"),   # Pilon
    (7, "AthN6Dl2zqw"),   # Mojito
    (8, "j3O7xmKbaAE"),   # Cachan
    (9, "nBHFEQU1CnA"),   # Salsa->Son / Son->Salsa transition (a skill, not a step)
    (10, "DSpArsCN860"),  # Fast double right turn (a turn)
    (11, "gPDxOZsjEbo"),  # Elegua basic step
    (12, "hRy-a1NI888"),  # Palo — authored chapters
    (13, "z_0VsWZJNqc"),  # Chango — authored chapters
    (14, "avhrmPAd_VI"),  # Arara — authored chapters, and teaches TWO steps
]

# "Intermediate Salsa Moves for Couples" — note this is NOT a numbered course.
# It is 22 standalone per-move videos plus 4 sequences; the channel assigned no
# class numbers, so the first element is playlist index and nothing more. The
# gaps (14, 21-23, 26, 28-30) are the sequence, styling and theory videos.
#
# `fPOzAAf8z0I` (index 23) is included even though it is not its own entry: it is
# the full-tempo demo of the Salsa con Rumba sequence at index 22, and is that
# sequence's `fast` clip source. It is the one video here whose two tempos come
# from two different files.
#
# Excluded on purpose (approved scope — link-only, no clips, no cue extraction):
#   MRYPsGBpmoo  How to create a salsa dance (24-min theory talk, nothing to clip)
#   oDEXcK_HAPw  Caminala Variations
#   Z2jM4P7KqTE  Simple ladies styling in couple - Dile que no
#   R9KM_ysfppc  Simple styling ideas in couple - Vacilala
# The last two are follower-focused, which cuts against R4's leader-first default.
INT_COUPLES = [
    (1, "Bmz_K32Ybxo"),   # Sombrero Complicado
    (2, "pY55QVrPals"),   # Balsero
    (3, "kr0fYDZABME"),   # Tiramisu complicado
    (4, "_A0VNIVvhtA"),   # La Botella
    (5, "YOYk3Wbcf_M"),   # Setenta Complicado
    (6, "SOjNHsjPFL4"),   # El Dos
    (7, "7ugimJ0MFas"),   # Paseala Complicado
    (8, "QAixPUmIQ64"),   # Sombrero por dabajo
    (9, "mwifx01N5KI"),   # Santiago
    (10, "_L36hAcjsXg"),  # Setenta y cuatro
    (11, "sjPliNxddxQ"),  # Bayamo
    (12, "N1T5fjywnh8"),  # El uno complicado
    (13, "X9Ad-ljIw-c"),  # Montaña
    (14, "ScbrkgnWV8s"),  # SEQUENCE: Casino con estilo
    (15, "6Fb_DL3TN9Y"),  # Chocolate
    (16, "MRpIKs0iQD8"),  # Enchufla Triple Mix
    (17, "8E6SV_3TxYo"),  # Gota De La Sombra
    (18, "K5LSifs80fc"),  # Quebrala
    (19, "qaX9s-YzvKE"),  # Muchacho
    (20, "Dcsd-Yt1Vug"),  # Codo de la rabia
    (21, "uMun9OrDKPc"),  # SEQUENCE: Casino con estilo 2
    (22, "FtsTDpd8ARA"),  # SEQUENCE: Salsa con Rumba for Couples
    (23, "fPOzAAf8z0I"),  # ^ its full-tempo demo, not a separate entry
    (24, "-oIcWUIwlx4"),  # Donde vas
    (25, "vjcWjUOy0po"),  # SEQUENCE: Aguajea and Caminala
    (27, "8qLrLTk1aVE"),  # Abanico
    (31, "nFe3BF8ln5s"),  # Chihuahua
]

# The official per-move shorts for couples classes 5-19, keyed by the class they
# belong to. Classes 1-4, 20 and 21 have none.
#
# DO NOT TRANSCRIBE THESE. Kept here as the record of an answered question, not
# as work to be done. All 15 were transcribed once, to try to anchor each short's
# clip window to an internal event rather than taking the whole file; every one
# came back hallucinated, because the shorts are music-only with no speech at
# all. Whisper's music signature was unmistakable — "Music playing", "Outro
# Music", repetition loops ("onward onward onward…"), a trailing "Thank you",
# and stray Cyrillic and Korean. The 15 outputs were deleted rather than kept,
# because a plausible-looking transcript of a silent video is worse than no
# transcript: a later pass would mine cues out of noise.
#
# The consequence for the build is settled, not open: a short's clip window IS
# the whole file. That is fine — they run 20-35s, which is the target clip
# length anyway, and each one is already a single clean loop of one move.
SHORTS = [
    (5, "qwR89NAQgqM"), (6, "V57F7c5R5jY"), (7, "18cM9UvzsoI"), (8, "JkwUzKb_X-8"),
    (9, "Nl714zi8W-A"), (10, "fNXwnQuVdEI"), (11, "TyOHtkirh_g"), (12, "UsvPdXW4-O4"),
    (13, "7MODqLfyTQQ"), (14, "c0H4GQnYjNE"), (15, "xwwnWPXpKz8"), (16, "wAK8hMxwfes"),
    (17, "B5A2kgjTvnw"), (18, "TM9kP4jy0To"), (19, "vlSqi-msy60"),
]

# The "Intermediate Salsa Moves - Shorts" playlist. Music-only exactly like the
# beginners shorts above, and listed here for the same reason: so MUSIC_ONLY
# refuses them. These are registered BEFORE anyone transcribes this course,
# rather than after the hallucinations have to be spotted and deleted again.
#
# Keyed by the move name **as the channel titled it**, not by a class number, and
# that is deliberate. These shorts carry their own "Class N" labels which match
# neither playlist's order (Montaña is "Class 1" here and 13th in the couples
# playlist) and are self-contradictory — two are both labelled Class 9. Matching
# a short to a move by that number would attach the wrong video.
#
# Three entries share the title "Sombrero por Debajo" and there is only one
# Sombrero por dabajo move video, so **two of these three show some other move**
# and are mistitled at source. They are named here as titled, not as guessed:
# resolving them needs someone to watch them, and until then only `nolwu7BcRdc`
# is attached to a move. The candidate pool is the nine moves with no short
# (Tiramisu complicado, El Dos, Santiago, Chocolate, Enchufla Triple Mix,
# Gota De La Sombra, Quebrala, Muchacho, Codo de la rabia).
INT_SHORTS = [
    ("Montaña", "AtQqi_5hNCY"),
    ("Balsero", "9TRul_cN9ts"),
    ("El uno complicado", "A_5VmrVYuXA"),
    ("Sombrero Por Debajo", "nolwu7BcRdc"),        # the one we trust
    ("Paseala complicado", "eWR8KHyoQXw"),
    ("Donde Vas", "_9amNey_heg"),
    ("Setenta y cuatro", "5XYM9h_TYoU"),
    ("La botella", "K5gDS-XIF3Q"),
    ("Sombrero por Debajo (mistitled?)", "_a5fC4nGz1c"),
    ("Chihuahua", "YVxWBaVaJO8"),
    ("Bayamo", "cBPUTs6I3J4"),
    ("Setenta Complicado", "TFc1glp6XXY"),
    ("Sombrero Complicado", "CuUwwKNxCuI"),
    ("Sombrero por Debajo (mistitled?)", "hET29nU1hV8"),
    ("Abanico", "WEa9tZMpSvc"),
]

# SHORTS is deliberately absent: there is no `shorts` subcommand, so the finding
# above is enforced rather than merely advised. `ids` is still there if someone
# wants to re-check the conclusion on one video — but it refuses these ids without
# --allow-music-only (see MUSIC_ONLY below), because the escape hatch was also the
# hole: the audio is still cached, so `ids <short>` would report "audio cached",
# regenerate the same hallucination in seconds, and normalize_salsa_terms.py would
# then mine aliases out of it. The deletion of the 15 outputs only held as long as
# nobody re-ran the command.
COURSES = {
    "steps": STEPS,
    "couples": COUPLES,
    "body": BODY,
    "int-steps": INT_STEPS,
    "int-couples": INT_COUPLES,
}

# Every id in SHORTS and INT_SHORTS is music-only; kept as a set for the guard in
# main(). These are the same lists, not a second hand-maintained copy — if a short
# ever turns out to have speech, remove it from its list and the guard follows.
MUSIC_ONLY = {vid for _, vid in SHORTS} | {vid for _, vid in INT_SHORTS}

log = logging.getLogger("transcribe_salsa")


def fetch_audio(video_id: str) -> Path:
    """
    Get the audio, from the cheapest source available.

    Preference order — cached audio, then the local video, then YouTube. The
    middle case matters: download_salsa_videos.py already keeps every source
    video on disk for clip cutting, so demuxing that is both instant and one
    fewer YouTube request — worth doing on its own merits, without needing a
    rate-limit story to justify it. (The last 5 couples classes did fail with
    "Sign in to confirm you're not a bot", but that turned out to be a stale
    yt-dlp and a missing JS-challenge solver, not throttling. See
    download_salsa_videos.py.)
    """
    dest = AUDIO_DIR / f"{video_id}.m4a"
    if dest.exists():
        log.info("  audio cached")
        return dest

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)

    local_video = VIDEOS_DIR / f"{video_id}.mp4"
    if local_video.exists():
        # -vn drops the video and the audio is re-encoded to aac rather than
        # stream-copied. Copying looks free and is not possible here: the shorts
        # carry opus, which has no tag in an mp4/m4a container, so `-c:a copy`
        # fails outright on 12 of the 15. Transcoding costs nothing that matters
        # because Whisper resamples to 16 kHz mono before it sees any of this.
        subprocess.run(
            ["ffmpeg", "-nostdin", "-loglevel", "error", "-i", str(local_video),
             "-vn", "-c:a", "aac", "-b:a", "160k", "-y", str(dest)],
            check=True)
        log.info("  audio demuxed from local video (%.1f MB)",
                 dest.stat().st_size / 1e6)
        return dest

    # m4a specifically: ffmpeg (which Whisper shells out to) reads it without
    # the remux step that opus/webm would need.
    # --js-runtimes node is load-bearing: without it every download 403s. YouTube
    # requires solving a JS challenge to sign the media URL, and yt-dlp needs an
    # external JS engine to do it. All 15 steps classes failed this way before the
    # flag was added.
    cmd = [
        "yt-dlp", "--no-update", "--quiet", "--no-warnings",
        "--js-runtimes", "node",
        "-f", "bestaudio[ext=m4a]/bestaudio",
        "--extract-audio", "--audio-format", "m4a",
        "-o", str(AUDIO_DIR / "%(id)s.%(ext)s"),
        f"https://www.youtube.com/watch?v={video_id}",
    ]
    subprocess.run(cmd, check=True)
    if not dest.exists():
        raise FileNotFoundError(f"yt-dlp finished but {dest} is missing")
    log.info("  audio %.1f MB", dest.stat().st_size / 1e6)
    return dest


def transcribe(audio: Path, video_id: str, prompt: str = SALSA_PROMPT) -> dict:
    import mlx_whisper

    result = mlx_whisper.transcribe(
        str(audio),
        path_or_hf_repo=MODEL,
        language="en",  # the teaching is in English; Spanish only for move names
        initial_prompt=prompt,
        word_timestamps=True,
        condition_on_previous_text=False,  # stops one bad segment cascading
    )

    segments = [
        {
            "start": round(s["start"], 2),
            "end": round(s["end"], 2),
            "text": s["text"].strip(),
            "words": [
                {"w": w["word"].strip(), "s": round(w["start"], 2), "e": round(w["end"], 2)}
                for w in s.get("words", [])
            ],
        }
        for s in result["segments"]
    ]
    return {
        "video_id": video_id,
        "model": MODEL,
        "segments": segments,
        "text": result["text"].strip(),
    }


def run(items: list[tuple[int | str, str]], force: bool, prompt: str) -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    failures = []

    for label, video_id in items:
        out = OUT_DIR / f"{video_id}.json"
        if out.exists() and not force:
            log.info("Class %s (%s): already transcribed, skipping", label, video_id)
            continue

        log.info("Class %s (%s):", label, video_id)
        try:
            audio = fetch_audio(video_id)
            t0 = time.monotonic()
            data = transcribe(audio, video_id, prompt)
            elapsed = time.monotonic() - t0
        except Exception as exc:  # keep going; one bad video shouldn't stop the batch
            log.error("  FAILED: %s", exc)
            failures.append((label, video_id, str(exc)))
            continue

        data["label"] = label
        out.write_text(json.dumps(data, indent=1))
        (OUT_DIR / f"{video_id}.txt").write_text(
            "\n".join(f'{s["start"]:8.2f}  {s["text"]}' for s in data["segments"]) + "\n"
        )
        log.info("  %d segments in %.0fs -> %s", len(data["segments"]), elapsed, out.name)

    if failures:
        log.error("%d failed:", len(failures))
        for label, vid, err in failures:
            log.error("  Class %s (%s): %s", label, vid, err)
    return 1 if failures else 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("course", choices=[*COURSES, "ids"], help="which playlist, or 'ids'")
    ap.add_argument("ids", nargs="*", help="video ids, when course is 'ids'")
    ap.add_argument("--force", action="store_true", help="re-transcribe even if cached")
    ap.add_argument("--allow-music-only", action="store_true",
                    help="transcribe an id known to have no speech. Only for "
                         "re-checking that finding by hand — the output must not be "
                         "left on disk for the alias normaliser to pick up.")
    args = ap.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(message)s")
    # huggingface_hub logs every HEAD/GET at INFO via httpx, which buries our
    # own progress lines under ~15 URLs per model load.
    for noisy in ("httpx", "huggingface_hub", "filelock", "urllib3"):
        logging.getLogger(noisy).setLevel(logging.WARNING)

    if args.course == "ids":
        if not args.ids:
            ap.error("course 'ids' needs at least one video id")
        items = [(vid, vid) for vid in args.ids]
        blocked = [vid for vid in args.ids if vid in MUSIC_ONLY]
        if blocked and not args.allow_music_only:
            ap.error(
                f"{', '.join(blocked)}: music-only, no speech — transcribing these "
                "produces hallucinations that look like real cues. See the SHORTS "
                "comment. Pass --allow-music-only only to re-check that finding, and "
                "delete the output afterwards.")
    else:
        items = COURSES[args.course]

    return run(items, args.force, prompt_for(args.course))


if __name__ == "__main__":
    sys.exit(main())
