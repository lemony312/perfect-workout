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

# Turbo is ~8x faster than large-v3 with no meaningful accuracy loss on clear
# studio speech, and these are 6-19 minute videos with two speakers close-miked.
MODEL = "mlx-community/whisper-large-v3-turbo"

# Seeded into the decoder so the Spanish move names survive. Every term here is
# one the channel actually says; do not add moves they do not teach, or Whisper
# will start hallucinating them into the transcript. Names taken from the class
# titles and descriptions (see SALSA_TAB_GOALS.md for the verified index).
SALSA_PROMPT = (
    "This is a Cuban salsa (casino) class from La Suerte Dance School in "
    "Manchester, taught by Michal and Manuela. Moves and terms used: "
    "al centro, arriba, abajo, la chica, el chico, los dos, dile que no, "
    "guapea, enchufla, enchufla al centro, enchufla doble, alarde, exhibela, "
    "el uno, kentucky, vacilala, vacilala por la mano, adios con la hermana, "
    "sombrero, sombrero complicado doble, setenta, paseala, coca cola, "
    "tiramisu, juana la cubana, dedo, santiago, mambo cubano, charanga, "
    "cuban rumba, quick 5, hook turn, double right turn, cross and slide, "
    "cha cha cha, tapping on 8, casino, rueda, timba, son, guapear. "
    "Counting is: one two three, five six seven."
)

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

COURSES = {"steps": STEPS, "couples": COUPLES, "body": BODY}

log = logging.getLogger("transcribe_salsa")


def fetch_audio(video_id: str) -> Path:
    """Download audio only. Kept on disk so re-transcribing costs nothing."""
    dest = AUDIO_DIR / f"{video_id}.m4a"
    if dest.exists():
        log.info("  audio cached")
        return dest

    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    # m4a specifically: ffmpeg (which Whisper shells out to) reads it without
    # the remux step that opus/webm would need.
    cmd = [
        "yt-dlp", "--no-update", "--quiet", "--no-warnings",
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


def transcribe(audio: Path, video_id: str) -> dict:
    import mlx_whisper

    result = mlx_whisper.transcribe(
        str(audio),
        path_or_hf_repo=MODEL,
        language="en",  # the teaching is in English; Spanish only for move names
        initial_prompt=SALSA_PROMPT,
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


def run(items: list[tuple[int | str, str]], force: bool) -> int:
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
            data = transcribe(audio, video_id)
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
    else:
        items = COURSES[args.course]

    return run(items, args.force)


if __name__ == "__main__":
    sys.exit(main())
