"""
Cut the demo clips for the two Intermediate Cuban Salsa courses.

Sources: La Suerte Dance School's *Intermediate Cuban Salsa Steps* playlist and its
*Intermediate Salsa Moves for Couples* playlist, plus the channel's official vertical
shorts. Source files live at data/cache/salsa/videos/<VIDEO_ID>.mp4.

Three things differ from clip_salsa_couples.py, all deliberate:

  * **The windows are not in this file.** The couples clipper carries its 70 windows
    as a hardcoded CLIPS list, which was right for a course specified in one pass and
    transcribed once. This course's windows are spread over five spec files written by
    five agents, and hand-copying ~70 boundaries would introduce an error the spec
    cannot defend against: a digit typed wrong here still cuts a valid-looking clip,
    just of the wrong moment, and nothing downstream would ever notice. So the windows
    are parsed out of the specs by extract_intermediate_clip_windows.py into
    SALSA_INTERMEDIATE_CLIP_WINDOWS.json, and read from there. The numbers in the
    encoder are the spec's numbers by construction.

  * **Output goes to the media repo, split by course.** ../perfect-workout-media/
    clips/salsa/intermediate/{steps,couples}/, not frontend/public. The salsa clips
    left the main repo to get the built site back under GitHub Pages' 1 GB limit, so
    a new course's clips must land there too or the split stops working. Splitting by
    course matters because the two courses share move names the way the beginners
    courses do, and a flat namespace would let one course's cut silently overwrite
    the other's.

  * **Aspect is measured, not declared.** The couples clipper carries `aspect` per
    clip because it was written before the sources were all on disk. They are on disk
    now, so the frame size comes from ffprobe. A declared aspect can be wrong; a
    measured one cannot, and the review page centre-crops a mislabelled vertical short
    into a letterbox — cutting off the feet, which are the thing being reviewed.

Encoding settings match clip_salsa_couples.py exactly. Clips from all four courses
appear in the same component, so a clip from one must not look or sound different.

Usage:
    uv run scripts/extract_intermediate_clip_windows.py        # refresh the JSON first
    uv run scripts/clip_salsa_intermediate.py --review         # -> data/review/salsa-intermediate/
    uv run scripts/clip_salsa_intermediate.py                  # -> ../perfect-workout-media/
    uv run scripts/clip_salsa_intermediate.py --only mojito
    uv run scripts/clip_salsa_intermediate.py --dry-run
    uv run scripts/clip_salsa_intermediate.py --manifest       # verify, encode nothing
"""
# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///

import argparse
import functools
import html
import json
import logging
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
VIDEOS_DIR = PROJECT_ROOT / "data" / "cache" / "salsa" / "videos"
WINDOWS_JSON = PROJECT_ROOT / "SALSA_INTERMEDIATE_CLIP_WINDOWS.json"
REVIEW_DIR = PROJECT_ROOT / "data" / "review" / "salsa-intermediate"

# Salsa clips publish into the separate media repo, not into frontend/public. The
# main site was ~1.28 GB against GitHub Pages' 1 GB per-site limit, so every path
# under `/clips/salsa/` was moved out to lemony312/perfect-workout-media and is
# loaded cross-origin — see frontend/src/lib/media.ts, which resolves the origin by
# path prefix. That prefix already covers `/clips/salsa/intermediate/...`, so these
# clips need no front-end change; they just have to land in the right repo.
#
# Writing them to frontend/public instead would appear to work in `next dev`, where
# MEDIA_BASE is unset and everything resolves locally, and 404 in production.
MEDIA_REPO = PROJECT_ROOT.parent / "perfect-workout-media"
PUBLISH_ROOT = MEDIA_REPO / "clips" / "salsa" / "intermediate"

# Which course each spec part belongs to. PART E is the four multi-move sequence
# videos from the couples playlist, so it publishes alongside the couples moves
# rather than as a third course.
COURSE_OF_PART = {
    "SALSA_INTERMEDIATE_SPEC_PARTA.md": "steps",
    "SALSA_INTERMEDIATE_SPEC_PARTB.md": "steps",
    "SALSA_INTERMEDIATE_SPEC_PARTC.md": "couples",
    "SALSA_INTERMEDIATE_SPEC_PARTD.md": "couples",
    "SALSA_INTERMEDIATE_SPEC_PARTE.md": "couples",
}

# Identical to clip_salsa_couples.py. Clips from all four salsa courses render in the
# same component, so a clip from one must not look or sound different from the other.
VIDEO_CODEC = "libx264"
VIDEO_PRESET = "fast"
VIDEO_CRF = 23
# CRITICAL: Do NOT pass -an. The spoken count is the whole point of a salsa clip.
AUDIO_CODEC = "aac"
AUDIO_BITRATE = "128k"
# EBU R128. Needed as much here as in the couples course: a slow grain is voice over
# a quiet room and a fast grain is often an official short with mastered music, so
# the two halves of a pair can be more than 10 dB apart.
AUDIO_FILTER = "loudnorm=I=-16:TP=-1.5:LRA=11"

# R2's demo-loop range. Outside it is not fatal here — the extractor's audit is the
# gate for that — but it is flagged so a surprising length is never silently encoded.
FLOOR = 18.0
CEILING = 52.0

# GitHub Pages publishes at most 1 GB per site. The media site already carries the
# beginners clips, so this is reported after every publish run rather than assumed
# to be fine — the whole reason the split exists is that the limit was breached once.
PAGES_LIMIT_BYTES = 1024 ** 3

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


@dataclass
class Clip:
    slug: str           # output filename stem, from the spec's `File` column
    video_id: str
    start: float
    end: float
    tempo: str          # 'slow', 'fast', or '' where the spec did not label one
    course: str         # 'steps' or 'couples'
    trust: str          # 'A' both boundaries anchored, 'D' one derived, 'V' has a caveat
    move: str
    section: str        # the spec heading this window sits under
    anchors: str        # how each boundary was anchored, verbatim from the spec
    source: str         # spec file and line, so any value can be traced back

    @property
    def duration(self) -> float:
        return round(self.end - self.start, 2)

    @property
    def source_path(self) -> Path:
        return VIDEOS_DIR / f"{self.video_id}.mp4"

    @property
    def output_filename(self) -> str:
        return f"{self.slug}.mp4"

    @property
    def name(self) -> str:
        """Display name for the review page only.

        Derived from the slug, not carried as a field: the authoritative display
        names live in the TypeScript data modules, taken from the specs, and a
        second hand-typed copy here would drift from them.
        """
        base = (self.move or self.slug).replace("-", " ").strip()
        pretty = base[:1].upper() + base[1:]
        if not self.tempo:
            return pretty
        return f"{pretty} ({'slow' if self.tempo == 'slow' else 'full tempo'})"


@functools.cache
def frame_size(video_id: str) -> tuple[int, int] | None:
    """(width, height) of the source's video stream, or None if unreadable."""
    path = VIDEOS_DIR / f"{video_id}.mp4"
    if not path.exists():
        return None
    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height",
         "-of", "csv=p=0:s=x", str(path)],
        capture_output=True, text=True)
    m = re.match(r"(\d+)x(\d+)", probe.stdout.strip())
    return (int(m.group(1)), int(m.group(2))) if m else None


def aspect_of(video_id: str) -> str:
    """'9/16' for the vertical official shorts, '16/9' for the class videos."""
    size = frame_size(video_id)
    if size is None:
        return "16/9"
    w, h = size
    return "9/16" if h > w else "16/9"


def load_clips() -> list[Clip]:
    """Read the extracted windows, refusing anything that cannot be encoded safely."""
    if not WINDOWS_JSON.exists():
        logger.error("%s does not exist — run "
                     "`uv run scripts/extract_intermediate_clip_windows.py` first",
                     WINDOWS_JSON.name)
        sys.exit(1)

    rows = json.loads(WINDOWS_JSON.read_text())
    clips: list[Clip] = []
    for r in rows:
        part = r["source"].split(":")[0]
        course = COURSE_OF_PART.get(part)
        if course is None:
            logger.error("%s: window from unknown spec part %r — add it to "
                         "COURSE_OF_PART", r["source"], part)
            sys.exit(1)
        # The spec's `File` column already names the output. Falling back to the
        # move slug would invent a name the spec and the data module disagree on.
        stem = r["file"].removesuffix(".mp4").strip()
        if not stem:
            logger.error("%s: no output filename in the spec's File column",
                         r["source"])
            sys.exit(1)
        # Grain comes from the filename, not from `tempo`. `tempo` is read off the
        # nearest `### Slow` / `### Fast` subheading, and the spec tables that use a
        # leading `#` column instead of subheadings silently inherit whichever
        # heading came last — so `elegua-slow.mp4`, `chango-slow.mp4`,
        # `fast-double-right-slow.mp4` and `arara-68-slow.mp4` all arrived here
        # labelled `fast`. The manifest calls itself authoritative and the data
        # modules read their `ClipPair` slots out of it, so a wrong grain there puts
        # the slow cut in the fast slot: a clip that plays, of the right move, at
        # the wrong tempo, which nothing downstream can detect. The stem is what
        # the encoder actually writes, so it cannot disagree with the output.
        grain = "slow" if stem.endswith("-slow") else "fast" if stem.endswith("-fast") else ""
        clips.append(Clip(
            slug=stem, video_id=r["video"], start=r["start"], end=r["end"],
            tempo=grain, course=course, trust=r["trust"] or "?",
            move=r["move"], section=r["section"], anchors=r["anchors"],
            source=r["source"],
        ))

    # A filename collision is the one error that cannot be seen from inside a single
    # spec file — five agents chose these names independently. Within a course it is
    # fatal: the second encode would overwrite the first and the loss would be
    # silent. Across courses it is fine, which is exactly why output is split.
    by_name: dict[tuple[str, str], list[Clip]] = {}
    for c in clips:
        by_name.setdefault((c.course, c.slug), []).append(c)
    fatal = False
    for (course, slug), group in sorted(by_name.items()):
        if len(group) == 1:
            continue
        windows = {(c.video_id, c.start, c.end) for c in group}
        if len(windows) == 1:
            # Two moves sharing one window, as in the couples course where a single
            # short demonstrates three moves. Encode once; the data module points
            # both moves at the same file.
            logger.info("%s/%s: %d moves share one window (%s) — encoding once",
                        course, slug, len(group), group[0].source)
            continue
        logger.error("%s/%s: %d DIFFERENT windows want the same filename:", course,
                     slug, len(windows))
        for c in group:
            logger.error("    %s  %s %s-%s", c.source, c.video_id, c.start, c.end)
        fatal = True
    if fatal:
        logger.error("Refusing to encode — one cut would silently overwrite another.")
        sys.exit(1)

    return clips


def cut(clip: Clip, out_dir: Path, dry_run: bool) -> tuple[bool, float]:
    """Encode `clip`'s window into out_dir/<slug>.mp4. Returns (success, duration)."""
    dest = out_dir / clip.output_filename

    if dry_run:
        logger.info(f"[DRY RUN] {clip.slug}: {clip.start}-{clip.end} "
                    f"({clip.duration}s) <- {clip.source}")
        return True, clip.duration

    cmd = [
        "ffmpeg",
        "-ss", str(clip.start),
        "-i", str(clip.source_path),
        "-t", str(clip.duration),
        # CRITICAL: Keep audio. The spoken count is the whole point.
        "-c:v", VIDEO_CODEC,
        "-preset", VIDEO_PRESET,
        "-crf", str(VIDEO_CRF),
        "-pix_fmt", "yuv420p",
        "-c:a", AUDIO_CODEC,
        "-b:a", AUDIO_BITRATE,
        "-af", AUDIO_FILTER,
        "-movflags", "+faststart",
        "-y", str(dest),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not dest.exists():
        logger.error(f"FAIL {clip.slug}:\n{result.stderr[-2000:]}")
        return False, 0.0

    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(dest)],
        capture_output=True, text=True)
    actual = float(probe.stdout.strip()) if probe.returncode == 0 else 0.0

    kb = dest.stat().st_size // 1024
    drift = abs(actual - clip.duration)
    drift_str = f" [drift {drift:.1f}s]" if drift > 0.2 else ""
    if clip.duration < FLOOR:
        range_str = f" [{clip.duration}s, under the {FLOOR:.0f}s floor]"
    elif clip.duration > CEILING:
        range_str = f" [{clip.duration}s, over the {CEILING:.0f}s ceiling]"
    else:
        range_str = ""
    logger.info(f"OK {clip.course}/{clip.slug}: {clip.start}-{clip.end} "
                f"({clip.duration}s, {kb} KiB){drift_str}{range_str}")
    return True, actual


def timecode(seconds: float) -> str:
    return f"{int(seconds // 60)}:{seconds % 60:05.2f}"


def write_review_page(clips: list[Clip], out_dir: Path) -> Path:
    """Build a self-contained page that loops every clip with its provenance.

    Every window is listed, including ones whose source is missing, so a gap is
    visible on the page rather than silently absent from it.
    """

    def card(c: Clip) -> str:
        aspect = aspect_of(c.video_id)
        badges = [
            f'<span class="badge">{c.duration}s</span>',
            f'<span class="badge trust-{c.trust[:1].lower()}">{html.escape(c.trust)}</span>',
            f'<span class="badge course">{c.course}</span>',
            f'<span class="badge aspect">{aspect}</span>',
        ]
        if c.tempo:
            badges.insert(2, f'<span class="badge tempo-{c.tempo}">'
                             f'{"SLOW" if c.tempo == "slow" else "FULL TEMPO"}</span>')
        if c.duration < FLOOR or c.duration > CEILING:
            badges.append('<span class="badge warn">outside 18-52s</span>')

        exists = (out_dir / c.output_filename).exists()
        if exists:
            media = (f'<video src="{html.escape(c.output_filename)}" controls loop '
                     f'muted playsinline preload="metadata" '
                     f'style="aspect-ratio:{aspect}"></video>')
        else:
            why = ("source video not downloaded" if not c.source_path.exists()
                   else "not encoded in this run")
            media = f'<div class="missing" style="aspect-ratio:{aspect}">{why}</div>'

        return f"""<article class="card">
  {media}
  <h2>{html.escape(c.name)}</h2>
  <div class="badges">{''.join(badges)}</div>
  <p class="win">{html.escape(c.video_id)} &nbsp; {timecode(c.start)} &rarr; {timecode(c.end)}</p>
  <p class="sec">{html.escape(c.section)}</p>
  <p class="anchors">{html.escape(c.anchors)}</p>
  <p class="src">{html.escape(c.source)}</p>
</article>"""

    order = {"steps": 0, "couples": 1}
    ordered = sorted(clips, key=lambda c: (order[c.course], c.section, c.tempo))
    body = "\n".join(card(c) for c in ordered)
    page = f"""<!doctype html>
<meta charset="utf-8">
<title>Intermediate salsa clips - review</title>
<style>
 body {{ font: 15px/1.5 -apple-system, system-ui, sans-serif; margin: 0; padding: 24px;
        background: #111; color: #eee; }}
 h1 {{ font-size: 20px; margin: 0 0 4px; }}
 .lede {{ color: #999; margin: 0 0 24px; max-width: 60ch; }}
 .grid {{ display: grid; gap: 20px;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }}
 .card {{ background: #1c1c1c; border-radius: 10px; padding: 12px; }}
 video, .missing {{ width: 100%; background: #000; border-radius: 6px; }}
 .missing {{ display: grid; place-items: center; color: #b44; font-size: 13px; }}
 h2 {{ font-size: 15px; margin: 10px 0 6px; }}
 .badges {{ display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }}
 .badge {{ font-size: 11px; padding: 2px 7px; border-radius: 99px; background: #333; }}
 .trust-a {{ background: #1c5c2c; }} .trust-d {{ background: #6a5a12; }}
 .trust-v {{ background: #6a3a12; }}
 .tempo-slow {{ background: #1c3c6a; }} .tempo-fast {{ background: #5a1c5a; }}
 .warn {{ background: #7a1c1c; }}
 .win {{ font-family: ui-monospace, monospace; font-size: 12px; color: #8cf; margin: 0 0 6px; }}
 .sec {{ font-size: 12px; color: #aaa; margin: 0 0 6px; }}
 .anchors {{ font-size: 12px; color: #888; margin: 0 0 6px; }}
 .src {{ font-family: ui-monospace, monospace; font-size: 11px; color: #666; margin: 0; }}
</style>
<h1>Intermediate salsa clips - review</h1>
<p class="lede">{len(clips)} windows, parsed from the five spec files rather than
retyped. Each card shows the window, the spec heading it came from, how its
boundaries were anchored, and the exact spec line to go back to.</p>
<div class="grid">
{body}
</div>
"""
    dest = out_dir / "index.html"
    dest.write_text(page)
    return dest


def write_manifest(clips: list[Clip]) -> tuple[Path, list[str]]:
    """Write CLIP_MANIFEST_INTERMEDIATE.md and verify it against the disk.

    Returns (path, problems). The verification runs in **both** directions and on
    **absolute** paths, which is the whole reason this is a script: the beginners
    pass shipped a manifest claiming 60 files were missing, because it resolved a
    relative path against the wrong working directory. Every file was there. A
    manifest that lies about presence is worse than none, because the next pass
    starts by trying to re-cut clips that already exist.

    The second direction matters just as much: a file on disk that nothing
    references is an orphan from an earlier run, and it will be deployed, counted
    against the 1 GB Pages limit, and never played.
    """
    problems: list[str] = []
    rows: list[str] = []
    order = {"steps": 0, "couples": 1}
    referenced: dict[str, set[str]] = {}

    for c in sorted(clips, key=lambda c: (order[c.course], c.section, c.slug, c.tempo)):
        dest = (PUBLISH_ROOT / c.course / c.output_filename).resolve()
        on_disk = dest.exists()
        referenced.setdefault(c.course, set()).add(c.output_filename)
        if not on_disk:
            why = ("source video not downloaded" if not c.source_path.exists()
                   else "referenced but not encoded")
            problems.append(f"missing: {dest} ({why}, from {c.source})")
        rows.append(
            f"| {c.course} | `{c.move or c.slug}` | {c.tempo or '—'} | "
            f"`{c.output_filename}` | {'yes' if on_disk else '**NO**'} | "
            f"{c.start} | {c.end} | {c.duration} | `{aspect_of(c.video_id)}` | "
            f"{c.trust} | `{c.video_id}` | {c.source} |"
        )

    for course in sorted(order):
        course_dir = (PUBLISH_ROOT / course).resolve()
        if not course_dir.is_dir():
            continue
        for f in sorted(course_dir.glob("*.mp4")):
            if f.name not in referenced.get(course, set()):
                problems.append(f"orphan: {f} is on disk but nothing references it")

    total = sum(f.stat().st_size
                for course in order
                for f in (PUBLISH_ROOT / course).glob("*.mp4")
                if (PUBLISH_ROOT / course).is_dir())
    present = sum(1 for r in rows if "| yes |" in r)

    body = "\n".join(rows)
    dest = PROJECT_ROOT / "CLIP_MANIFEST_INTERMEDIATE.md"
    dest.write_text(f"""# Intermediate clip manifest

Generated by `scripts/clip_salsa_intermediate.py --manifest`. **This is the
authoritative list of clip `src` paths and windows.** Do not derive a filename from
a move id — five spec files named these files independently.

`src` is `/clips/salsa/intermediate/<course>/<file>`, and the two courses have
separate directories because they share move names; a flat namespace would let one
course's cut overwrite the other's.

Every window here was parsed out of the five spec files by
`scripts/extract_intermediate_clip_windows.py`, not retyped. The last column is the
spec file and line each row came from, so any number can be traced back to the
transcript anchor that justifies it.

{present} of {len(rows)} referenced files are on disk, totalling {total / (1024 * 1024):.1f} MB.

| course | move | grain | src file | on disk | start | end | len | aspect | trust | source video | spec |
|---|---|---|---|---|---|---|---|---|---|---|---|
{body}
""")
    return dest, problems


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--review", action="store_true",
                        help="write to data/review/salsa-intermediate/ with an index.html")
    parser.add_argument("--only", metavar="SLUG",
                        help="cut only clips whose slug contains this string")
    parser.add_argument("--course", choices=("steps", "couples"),
                        help="cut only one course")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--manifest", action="store_true",
                        help="regenerate and verify CLIP_MANIFEST_INTERMEDIATE.md "
                             "against what is on disk, encoding nothing")
    args = parser.parse_args()

    # A publish run writes outside this repo, so check the destination exists rather
    # than letting mkdir create a stray sibling directory that no git repo tracks and
    # that would therefore never deploy.
    if not args.review and not args.dry_run and not MEDIA_REPO.is_dir():
        logger.error("media repo not found at %s — salsa clips publish there, not "
                     "into frontend/public (see frontend/src/lib/media.ts). Clone "
                     "lemony312/perfect-workout-media as a sibling of this repo.",
                     MEDIA_REPO)
        sys.exit(1)

    clips = load_clips()
    logger.info("Loaded %d windows from %s", len(clips), WINDOWS_JSON.name)

    if args.manifest:
        # Deliberately over the full set, ignoring --only/--course: a manifest built
        # from a filtered run would call every unfiltered clip an orphan.
        path, problems = write_manifest(clips)
        logger.info("Wrote %s", path.name)
        for p in problems:
            logger.error("  %s", p)
        if problems:
            logger.error("Manifest verification FAILED — %d problem(s)", len(problems))
            sys.exit(1)
        logger.info("Manifest verified: every referenced file exists, and every "
                    "file on disk is referenced.")
        return

    if args.course:
        clips = [c for c in clips if c.course == args.course]
    if args.only:
        clips = [c for c in clips if args.only in c.slug]
    if not clips:
        logger.error("No clips left after filtering")
        sys.exit(1)

    # Dedupe by window as well as by name, so a window recorded twice — the shared
    # windows reported by load_clips() — is never encoded twice.
    seen: set[tuple[str, str, float, float]] = set()
    to_encode: list[Clip] = []
    for c in clips:
        key = (c.course, c.video_id, c.start, c.end)
        if key not in seen:
            seen.add(key)
            to_encode.append(c)

    # Missing sources are reported and skipped, not fatal: one absent download must
    # not stop the other clips from landing.
    missing = [c for c in to_encode if not c.source_path.exists()]
    to_encode = [c for c in to_encode if c.source_path.exists()]

    failed: list[str] = []
    drifts: list[str] = []
    totals: dict[str, int] = {}

    for course in sorted({c.course for c in to_encode}):
        out_dir = (REVIEW_DIR / course) if args.review else (PUBLISH_ROOT / course)
        out_dir.mkdir(parents=True, exist_ok=True)
        batch = [c for c in to_encode if c.course == course]
        logger.info("Encoding %d %s clips into %s", len(batch), course, out_dir)
        for c in batch:
            ok, actual = cut(c, out_dir, args.dry_run)
            if not ok:
                failed.append(c.slug)
            elif not args.dry_run:
                totals[course] = totals.get(course, 0) + \
                    (out_dir / c.output_filename).stat().st_size
                if abs(actual - c.duration) > 0.3:
                    drifts.append(f"{c.slug}: expected {c.duration}s, "
                                  f"got {actual:.1f}s")

    if drifts:
        logger.warning("Duration drifts > 0.3s:")
        for d in drifts:
            logger.warning("  %s", d)

    if missing:
        by_video: dict[str, list[str]] = {}
        for c in missing:
            by_video.setdefault(c.video_id, []).append(c.slug)
        logger.warning("SKIPPED %d clip(s) - source video not downloaded:", len(missing))
        for vid, slugs in sorted(by_video.items()):
            logger.warning("  %s: %s", vid, ", ".join(sorted(slugs)))
        # Called out separately because the slow counted demo is the clip the user
        # actually practises to; losing a fast grain is a smaller loss.
        slow = [c.slug for c in missing if c.tempo == "slow"]
        if slow:
            logger.warning("  Of those, %d are SLOW (counted) clips: %s",
                           len(slow), ", ".join(sorted(slow)))

    if not args.dry_run:
        for course, size in sorted(totals.items()):
            logger.info("%s: %.1f MB", course, size / (1024 * 1024))
        logger.info("This run: %.1f MB", sum(totals.values()) / (1024 * 1024))

    if not args.review and not args.dry_run and MEDIA_REPO.is_dir():
        site = sum(f.stat().st_size
                   for f in MEDIA_REPO.rglob("*")
                   if f.is_file() and ".git" not in f.parts)
        pct = 100 * site / PAGES_LIMIT_BYTES
        report = logger.warning if pct > 90 else logger.info
        report("Media site total: %.0f MB of the 1024 MB Pages limit (%.0f%%)",
               site / (1024 * 1024), pct)
        if pct > 100:
            logger.error("Media site is OVER the 1 GB Pages limit — it will not "
                         "deploy. Re-encode at a higher CRF or drop the fast grains.")

    if args.review and not args.dry_run:
        for course in sorted({c.course for c in clips}):
            page = write_review_page([c for c in clips if c.course == course],
                                     REVIEW_DIR / course)
            logger.info("Review page: %s", page)

    if failed:
        logger.error("Failed to encode: %s", ", ".join(failed))
        sys.exit(1)

    # A publish run always refreshes the manifest, so the two cannot disagree. The
    # verification is reported but not fatal here: a skipped clip whose source is
    # not downloaded is a known gap, and failing the run would discard the clips
    # that did land. `--manifest` is the mode that treats it as a gate.
    if not args.review and not args.dry_run and not args.only and not args.course:
        path, problems = write_manifest(load_clips())
        logger.info("Wrote %s", path.name)
        for p in problems:
            logger.warning("  %s", p)

    logger.info("Done.")


if __name__ == "__main__":
    main()
