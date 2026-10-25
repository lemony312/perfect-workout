"""
Cut the looping demo clips for the Tendons tab out of the source video.

Source: Mr. White, "It's Weird, but Tendon Training Will Give You Jaw-Dropping
Strength" (vwWLRG9r1YU). The video is an illustrated animation on a white
background, so every window below was picked from contact sheets to show the
figure doing the movement rather than a talking pose or an icon card.

Clips stay 16:9 instead of the 2025 tab's 9:16 centre crop: the push-up and the
step-based moves are drawn side-on and wide, and a 9:16 crop cuts them in half.

The cached source is 640x360. The HD DASH streams 403 for this video (YouTube's
PO-token enforcement, see download_salsa_videos.py) and it has no HLS ladder.
Clean line art survives that resolution, so it was accepted rather than fought.

Audio is dropped — the app plays clips muted.

Usage:
    uv run scripts/clip_tendon_moves.py              # -> frontend/public/clips/tendons/
    uv run scripts/clip_tendon_moves.py --dry-run
"""

import argparse
import logging
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
SOURCE = PROJECT_ROOT / "data" / "cache" / "videos" / "vwWLRG9r1YU_720p.mp4"
PUBLISH_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "tendons"

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
    # Exercises
    Clip("towel-isometric-pull", 45.0, 56.0),
    Clip("slow-tempo-push-up", 278.0, 284.0),
    Clip("dead-hang", 375.0, 382.5),
    Clip("dip-support-hold", 476.0, 483.0),
    Clip("pull-up-negative", 570.0, 576.0),
    Clip("eccentric-calf-raise", 538.0, 551.0),
    Clip("short-stiff-hops", 632.0, 642.0),
    # Progressions that the video actually draws
    Clip("towel-isometric-angles", 122.0, 130.0),
    Clip("active-passive-hang", 420.0, 431.0),
    Clip("towel-hang", 456.5, 460.5),
    Clip("weighted-hang", 469.0, 472.0),
    Clip("single-leg-hops", 726.0, 729.0),
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
            "download_video('https://www.youtube.com/watch?v=vwWLRG9r1YU', quality='720p')\""
        )
        return 1

    PUBLISH_DIR.mkdir(parents=True, exist_ok=True)
    ok = all([cut(c, args.dry_run) for c in CLIPS])
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
