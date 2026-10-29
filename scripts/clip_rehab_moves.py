"""
Cut the looping demo clips for the Rehab tab out of the source videos.

All sources are Dr. Perry's (Stop Chasing Pain) videos, already cached by
scripts/downloader.py. Every window was picked from 1 fps contact sheets to show
the move being done, not him talking between reps.

Clips stay 16:9: he holds a pencil or finger at arm's length, so a 9:16 centre
crop loses it at the end of every sideways pass.

The eye-fatigue sources cache at 640x360; YouTube 403s their HD streams.

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
VIDEO_DIR = PROJECT_ROOT / "data" / "cache" / "videos"
PUBLISH_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "rehab"

VIDEO_CODEC = "libx264"
VIDEO_PRESET = "fast"
VIDEO_CRF = 23

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


@dataclass
class Clip:
    slug: str
    video_id: str
    start: float
    end: float

    @property
    def source(self) -> Path:
        return VIDEO_DIR / f"{self.video_id}_720p.mp4"

    @property
    def duration(self) -> float:
        return round(self.end - self.start, 2)


SMOOTH_PURSUITS = "QhhXjoD6rZw"   # Your EYES Could Be Affecting Your Entire Body
EYE_SOCKETS = "xPwQ01NTtzk"       # Easing Eye and Facial Tension To Calm The Body
EYE_H = "pHv7HlOujAc"             # Calm Your Body Using The Eyes
DONT_FORGET_EYES = "RdOf-Isk0IU"  # Mini-Podcast: Don't Forget The Eyes
PALMING = "YyVCJgZWRaQ"           # Eye Palming To Calm Your Nervous System

CLIPS: list[Clip] = [
    # Smooth pursuits, one clip per direction
    Clip("smooth-pursuit-right", SMOOTH_PURSUITS, 1478.0, 1490.0),
    Clip("smooth-pursuit-left", SMOOTH_PURSUITS, 1517.0, 1530.0),
    Clip("smooth-pursuit-vertical", SMOOTH_PURSUITS, 1552.0, 1572.0),
    Clip("smooth-pursuit-diagonal", SMOOTH_PURSUITS, 1586.0, 1600.0),
    # Screen-eye reset: the flow warm-up he does before pencil push-ups
    Clip("flow-collarbone", DONT_FORGET_EYES, 1078.0, 1086.0),
    Clip("flow-jaw-angle", DONT_FORGET_EYES, 1092.0, 1102.0),
    Clip("flow-under-skull", DONT_FORGET_EYES, 1110.0, 1122.0),
    Clip("eye-socket-massage", EYE_SOCKETS, 147.0, 159.0),
    Clip("eye-h-first-side", EYE_H, 316.0, 331.0),
    Clip("eye-h-second-side", EYE_H, 332.0, 350.0),
    Clip("eye-circles", EYE_H, 372.0, 392.0),
    Clip("pencil-push-up", DONT_FORGET_EYES, 1166.0, 1178.0),
    Clip("eye-palming", PALMING, 400.0, 414.0),
]


def cut(clip: Clip, dry_run: bool) -> bool:
    dest = PUBLISH_DIR / f"{clip.slug}.mp4"
    if dry_run:
        logger.info(f"[DRY RUN] {clip.slug}: {clip.start}–{clip.end} ({clip.duration}s)")
        return True

    cmd = [
        "ffmpeg", "-nostdin", "-threads", "2",
        "-ss", str(clip.start),
        "-i", str(clip.source),
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

    missing = sorted({c.video_id for c in CLIPS if not c.source.exists()})
    if missing:
        logger.error(
            f"Missing source videos: {', '.join(missing)}\n"
            "Fetch with: cd scripts && uv run python -c \"import downloader as d; "
            "d.download_video('https://www.youtube.com/watch?v=<id>')\""
        )
        return 1

    PUBLISH_DIR.mkdir(parents=True, exist_ok=True)
    ok = all([cut(c, args.dry_run) for c in CLIPS])
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
