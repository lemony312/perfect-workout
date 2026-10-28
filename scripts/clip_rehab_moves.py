"""
Cut the looping demo clips for the Rehab tab out of the source videos.

Source: Dr. Perry (Stop Chasing Pain), "Your EYES Could Be Affecting Your Entire
Body (Try This Exercise!)" (QhhXjoD6rZw). The follow-along runs 24:37–27:40; each
window below was picked from 1 fps contact sheets to show one direction of the
smooth pursuit with the pencil moving, not him talking between reps.

Clips stay 16:9: he holds the pencil at arm's length, so a 9:16 centre crop
loses the pencil at the end of every horizontal and diagonal pass.

Audio is dropped — the app plays clips muted.

Usage:
    uv run scripts/clip_rehab_moves.py              # -> frontend/public/clips/rehab/
    uv run scripts/clip_rehab_moves.py --dry-run
"""

import argparse
import logging
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
SOURCE = PROJECT_ROOT / "data" / "cache" / "videos" / "QhhXjoD6rZw_720p.mp4"
PUBLISH_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "rehab"

VIDEO_CODEC = "libx264"
VIDEO_PRESET = "fast"
VIDEO_CRF = 23

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


@dataclass
class Clip:
    slug: str
    start: float
    end: float

    @property
    def duration(self) -> float:
        return round(self.end - self.start, 2)


CLIPS: list[Clip] = [
    # Smooth pursuits, one clip per direction
    Clip("smooth-pursuit-right", 1478.0, 1490.0),
    Clip("smooth-pursuit-left", 1517.0, 1530.0),
    Clip("smooth-pursuit-vertical", 1552.0, 1572.0),
    Clip("smooth-pursuit-diagonal", 1586.0, 1600.0),
]


def cut(clip: Clip, dry_run: bool) -> bool:
    dest = PUBLISH_DIR / f"{clip.slug}.mp4"
    if dry_run:
        logger.info(f"[DRY RUN] {clip.slug}: {clip.start}–{clip.end} ({clip.duration}s)")
        return True

    cmd = [
        "ffmpeg",
        "-ss", str(clip.start),
        "-i", str(SOURCE),
        "-t", str(clip.duration),
        "-an",
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


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not SOURCE.exists():
        logger.error(
            f"Missing source video: {SOURCE}\n"
            "Fetch it with: uv run python -c \"import sys; sys.path.insert(0, 'scripts'); "
            "from downloader import download_video; "
            "download_video('https://www.youtube.com/watch?v=QhhXjoD6rZw', quality='720p')\""
        )
        return 1

    PUBLISH_DIR.mkdir(parents=True, exist_ok=True)
    ok = all([cut(c, args.dry_run) for c in CLIPS])
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
