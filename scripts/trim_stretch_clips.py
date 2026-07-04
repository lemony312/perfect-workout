"""
Trim the looping stretch demo clips so they loop cleanly.

The Morning Mobility timer plays each move's short demo clip on `loop` for the
full 30s of the move (a 3s clip repeats ~10x). Any frames of the transition
INTO or OUT of the neighbouring exercise sit at the very start/end of the clip,
so every loop flashes them and the last->first jump-cut reads as "bleeding"
into the next exercise.

Fix: shave a small margin off both ends of each clip, re-encoding with the same
codec/quality settings already used for these clips. The crop/blur is already
baked into the source files, so we only trim time here.

Idempotent-ish: writes to a temp file then replaces the original, so re-running
just trims another margin — pass --dry-run first to see what will happen.

Usage:
    uv run scripts/trim_stretch_clips.py --dry-run
    uv run scripts/trim_stretch_clips.py
    uv run scripts/trim_stretch_clips.py --head 0.4 --tail 0.4
"""

import argparse
import logging
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
MOVES_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "stretching" / "moves"

# Match the encode settings used elsewhere for these clips.
VIDEO_CODEC = "libx264"
VIDEO_PRESET = "fast"
VIDEO_CRF = 23
AUDIO_CODEC = "aac"
AUDIO_BITRATE = "128k"

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


def probe_duration(path: Path) -> float:
    """Return the clip duration in seconds via ffprobe."""
    out = subprocess.run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "csv=p=0", str(path),
        ],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def trim_clip(path: Path, head: float, tail: float, dry_run: bool) -> bool:
    """Trim `head`s off the start and `tail`s off the end of `path` in place."""
    dur = probe_duration(path)
    new_dur = dur - head - tail

    if new_dur < 1.0:
        logger.warning(
            f"SKIP {path.name}: {dur:.2f}s too short to trim {head}+{tail}s"
        )
        return True

    if dry_run:
        logger.info(
            f"[DRY RUN] {path.name}: {dur:.2f}s -> {new_dur:.2f}s "
            f"(head {head}s, tail {tail}s)"
        )
        return True

    tmp = path.with_suffix(".trim.mp4")
    cmd = [
        "ffmpeg",
        "-ss", str(head),          # skip the head margin
        "-i", str(path),
        "-t", str(new_dur),        # keep the middle, dropping the tail margin
        "-c:v", VIDEO_CODEC,
        "-preset", VIDEO_PRESET,
        "-crf", str(VIDEO_CRF),
        "-c:a", AUDIO_CODEC,
        "-b:a", AUDIO_BITRATE,
        "-y", str(tmp),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not tmp.exists():
        logger.error(f"FAIL {path.name}:\n{result.stderr}")
        tmp.unlink(missing_ok=True)
        return False

    tmp.replace(path)
    logger.info(f"OK {path.name}: {dur:.2f}s -> {new_dur:.2f}s")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--head", type=float, default=0.4,
                        help="seconds to trim off the start (default 0.4)")
    parser.add_argument("--tail", type=float, default=0.4,
                        help="seconds to trim off the end (default 0.4)")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    clips = sorted(MOVES_DIR.glob("*.mp4"))
    if not clips:
        logger.error(f"No clips found in {MOVES_DIR}")
        sys.exit(1)

    logger.info(f"Trimming {len(clips)} clips (head {args.head}s, tail {args.tail}s)")
    failed = [c.name for c in clips
              if not trim_clip(c, args.head, args.tail, args.dry_run)]

    if failed:
        logger.error(f"Failed: {', '.join(failed)}")
        sys.exit(1)
    logger.info("Done.")


if __name__ == "__main__":
    main()
