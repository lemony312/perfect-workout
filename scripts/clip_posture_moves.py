"""
Cut the looping demo clips for the Posture routine out of the source video.

Source: ATHLEAN-X "Fix Bad Posture in 5 Minutes (FOREVER!)" (YAUGMT0_PiE).
Every window below sits inside a single camera shot and shows the movement
being performed rather than Jeff talking about it — see POSTURE_ROUTINE_PLAN.md
for how the windows were chosen and what was rejected.

The source is av1/opus while the rest of the app's clips are h264/aac, so a
re-encode is mandatory (not just a stream copy). Audio is dropped: the timer
page mutes the clip element and plays its own background music.

Usage:
    uv run scripts/clip_posture_moves.py --review    # -> data/review/posture/ + index.html
    uv run scripts/clip_posture_moves.py             # -> frontend/public/clips/posture/moves/
"""

import argparse
import html
import logging
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
SOURCE = PROJECT_ROOT / "data" / "cache" / "videos" / "YAUGMT0_PiE_720p.mp4"
PUBLISH_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "posture" / "moves"
REVIEW_DIR = PROJECT_ROOT / "data" / "review" / "posture"

# Match the encode settings used for the stretching clips.
VIDEO_CODEC = "libx264"
VIDEO_PRESET = "fast"
VIDEO_CRF = 23

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


@dataclass
class Clip:
    slug: str
    name: str
    start: float
    end: float
    #: Which shot (between scene cuts) the window sits in — for the review page.
    shot: str
    framing: str
    watermark: bool
    #: Set for candidates offered as an alternative to a primary clip.
    alternate_for: str | None = None
    notes: str = ""

    @property
    def duration(self) -> float:
        return round(self.end - self.start, 2)


CLIPS: list[Clip] = [
    Clip(
        slug="supermans",
        name="Supermans",
        start=118.0, end=125.8,
        shot="102.1–127.2",
        framing="Prone, side-on, shirt on",
        watermark=True,
        notes="Fists on sternum, spreading the chest — reps, not a hold.",
    ),
    Clip(
        slug="glute-bridge-marches",
        name="Glute Bridge Marches",
        start=180.0, end=190.3,
        shot="179.1–190.7",
        framing="Side-on bridge, alternating leg lifts",
        watermark=False,
        notes="Shows the actual marching, both legs, no pelvis drop.",
    ),
    Clip(
        slug="kneeling-thoracic-drops",
        name="Kneeling Thoracic Drops",
        start=248.5, end=258.5,
        shot="247.7–259.0",
        framing="Wide, chair visible",
        watermark=True,
        notes="Multiple drop reps. He glances at camera around 252s.",
    ),
    Clip(
        slug="wall-dls",
        name="Wall DLs",
        start=305.5, end=315.8,
        shot="303.8–317.2",
        framing="Wide, full body at the wall",
        watermark=True,
        notes="Full hinge-and-drive cycle. Ends at 315.8 — a SUBSCRIBE overlay lands at ~316.3.",
    ),
    Clip(
        slug="bridge-and-reach-overs",
        name="Bridge and Reach Overs",
        start=222.2, end=236.6,
        shot="221.6–237.0",
        framing="Side-on bridge",
        watermark=False,
        notes="Longest clip — covers reaches in both directions.",
    ),
    # --- Alternates, for comparison on the review page only ---
    Clip(
        slug="supermans-alt",
        name="Supermans (alternate)",
        start=137.0, end=143.5,
        shot="136.6–143.8",
        framing="Prone, shirt on, tighter",
        watermark=False,
        alternate_for="supermans",
        notes="No watermark, but tighter framing and fewer reps.",
    ),
    Clip(
        slug="kneeling-thoracic-drops-alt",
        name="Kneeling Thoracic Drops (alternate)",
        start=273.2, end=279.0,
        shot="259.0–279.1",
        framing="Wide, chair visible",
        watermark=False,
        alternate_for="kneeling-thoracic-drops",
        notes="No watermark and no camera glance, but only ~6s.",
    ),
    Clip(
        slug="wall-dls-alt",
        name="Wall DLs (alternate)",
        start=322.0, end=332.0,
        shot="317.2–337.8",
        framing="Close-up — hips and legs only",
        watermark=False,
        alternate_for="wall-dls",
        notes="Better view of hip extension, but the upper body is cropped out entirely.",
    ),
]


def cut(clip: Clip, out_dir: Path, dry_run: bool) -> bool:
    """Encode `clip`'s window from SOURCE into out_dir/<slug>.mp4."""
    dest = out_dir / f"{clip.slug}.mp4"

    if dry_run:
        logger.info(f"[DRY RUN] {clip.slug}: {clip.start}–{clip.end} ({clip.duration}s)")
        return True

    cmd = [
        "ffmpeg",
        "-ss", str(clip.start),
        "-i", str(SOURCE),
        "-t", str(clip.duration),
        "-an",                     # page mutes the clip and plays its own music
        "-c:v", VIDEO_CODEC,
        "-preset", VIDEO_PRESET,
        "-crf", str(VIDEO_CRF),
        "-pix_fmt", "yuv420p",     # h264 profile Safari/iOS will actually decode
        "-movflags", "+faststart",
        "-y", str(dest),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not dest.exists():
        logger.error(f"FAIL {clip.slug}:\n{result.stderr[-2000:]}")
        return False

    kb = dest.stat().st_size // 1024
    logger.info(f"OK {clip.slug}: {clip.start}–{clip.end} ({clip.duration}s, {kb} KiB)")
    return True


def timecode(seconds: float) -> str:
    return f"{int(seconds // 60)}:{seconds % 60:04.1f}"


def write_review_page(clips: list[Clip], out_dir: Path) -> Path:
    """Build a self-contained page that loops every clip side by side."""

    def card(c: Clip) -> str:
        badges = [f'<span class="badge">{c.duration}s</span>']
        if c.watermark:
            badges.append('<span class="badge warn">ATHLEANX.COM watermark</span>')
        if c.alternate_for:
            badges.append('<span class="badge alt">alternate</span>')
        return f"""
      <figure class="card">
        <video src="{c.slug}.mp4" muted loop autoplay playsinline preload="auto"></video>
        <figcaption>
          <h2>{html.escape(c.name)}</h2>
          <p class="times">{timecode(c.start)} &rarr; {timecode(c.end)}
             <span class="dim">(raw {c.start}s &ndash; {c.end}s, shot {c.shot})</span></p>
          <div class="badges">{''.join(badges)}</div>
          <p class="framing">{html.escape(c.framing)}</p>
          <p class="notes">{html.escape(c.notes)}</p>
        </figcaption>
      </figure>"""

    primary = [c for c in clips if not c.alternate_for]
    alternates = [c for c in clips if c.alternate_for]

    doc = f"""<!doctype html>
<meta charset="utf-8">
<title>Posture clips — review</title>
<style>
  :root {{ color-scheme: dark; }}
  body {{ margin: 0; padding: 32px; background: #111; color: #ededed;
         font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }}
  header {{ max-width: 1200px; margin: 0 auto 28px; }}
  h1 {{ margin: 0 0 6px; font-size: 26px; }}
  .sub {{ color: #909090; margin: 0; }}
  h3 {{ max-width: 1200px; margin: 36px auto 14px; font-size: 13px;
        text-transform: uppercase; letter-spacing: .12em; color: #fbbf24; }}
  .grid {{ max-width: 1200px; margin: 0 auto;
           display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); }}
  .card {{ margin: 0; background: #1a1a1a; border: 1px solid rgba(255,255,255,.06);
           border-radius: 14px; overflow: hidden; }}
  video {{ width: 100%; aspect-ratio: 16/9; object-fit: cover; background: #000; display: block; }}
  figcaption {{ padding: 14px 16px 16px; }}
  h2 {{ margin: 0 0 4px; font-size: 17px; }}
  .times {{ margin: 0 0 10px; font-family: ui-monospace, Menlo, monospace; font-size: 12.5px; color: #d0d0d0; }}
  .dim {{ color: #6c6c6c; }}
  .badges {{ display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }}
  .badge {{ font-size: 11px; padding: 3px 8px; border-radius: 999px;
            background: #252525; color: #b8b8b8; }}
  .badge.warn {{ background: #40301a; color: #fbbf24; }}
  .badge.alt {{ background: #1e3040; color: #7cc4ff; }}
  .framing {{ margin: 0 0 6px; font-size: 13.5px; color: #c9c9c9; }}
  .notes {{ margin: 0; font-size: 13px; color: #8d8d8d; }}
</style>
<header>
  <h1>Posture routine — demo clips for review</h1>
  <p class="sub">Cut from ATHLEAN-X &ldquo;Fix Bad Posture in 5 Minutes (FOREVER!)&rdquo;
     (YAUGMT0_PiE, 6:37). All clips loop, muted, exactly as they will on the timer page.
     5 unique clips cover all 10 &times; 30s slots.</p>
</header>

<h3>The five moves</h3>
<div class="grid">{''.join(card(c) for c in primary)}
</div>

<h3>Alternates to compare</h3>
<div class="grid">{''.join(card(c) for c in alternates)}
</div>
"""
    dest = out_dir / "index.html"
    dest.write_text(doc)
    return dest


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--review", action="store_true",
                        help="write to data/review/posture/ with an index.html, "
                             "including the alternate candidates")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not SOURCE.exists():
        logger.error(f"Source video missing: {SOURCE}")
        sys.exit(1)

    out_dir = REVIEW_DIR if args.review else PUBLISH_DIR
    # Alternates exist only to be compared during review.
    clips = CLIPS if args.review else [c for c in CLIPS if not c.alternate_for]

    out_dir.mkdir(parents=True, exist_ok=True)
    logger.info(f"Cutting {len(clips)} clips into {out_dir}")

    failed = [c.slug for c in clips if not cut(c, out_dir, args.dry_run)]
    if failed:
        logger.error(f"Failed: {', '.join(failed)}")
        sys.exit(1)

    if args.review and not args.dry_run:
        page = write_review_page(clips, out_dir)
        logger.info(f"Review page: {page}")
    logger.info("Done.")


if __name__ == "__main__":
    main()
