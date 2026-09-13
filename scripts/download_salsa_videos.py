#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""
Download the source video for every La Suerte salsa video we cut clips from.

The steps course only ever needed the 15 class videos, which were fetched
ad hoc. The couples course needs 36 files — 21 classes plus the 15 official
shorts — so it gets a script.

`--js-runtimes node` is load-bearing: without it every download 403s, because
YouTube requires solving a JS challenge to sign the media URL and yt-dlp needs
an external JS engine to do it. This is the same flag transcribe_salsa.py needs,
and the same failure — all 15 steps classes 403'd before it was added.

Orientation needs no special handling, which is worth stating because it looks
like it should: the classes are 1920x1080 and the shorts are 1080x1920, but
yt-dlp's `res` sort key is the *short edge*, not the height. So one `res:720`
yields 1280x720 for a class and 720x1280 for a short. Verified by listing
formats — `-S res:1280` on a short selects 1080x1920, not the 720x1280 that a
height-based reading would predict.

Idempotent: an existing file is left alone, so a partial run is resumed by
re-running it. Failures are collected and reported at the end rather than
aborting the batch, because a single transient 403 in a 36-video run should not
throw away the other 35.

Usage:
    uv run scripts/download_salsa_videos.py couples    # 21 classes
    uv run scripts/download_salsa_videos.py shorts     # 15 official shorts
    uv run scripts/download_salsa_videos.py all
    uv run scripts/download_salsa_videos.py all --dry-run
"""

from __future__ import annotations

import argparse
import logging
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
VIDEOS_DIR = REPO / "data" / "cache" / "salsa" / "videos"

# Playlist order, mirroring COUPLES in transcribe_salsa.py and
# analyze_salsa_couples.py. Order only matters for the log being readable.
COUPLES: list[str] = [
    "MDEAN40DUVY", "np3g2IzZ11A", "y6wC5uHfXG0", "kg5Ztcp5xQU", "4KKAKgn8UZ4",
    "yZ562-ehtQQ", "pZChl5ylSJw", "X4Sr8QbXQLU", "lV56IVufYOU", "CkZO6nyJwjw",
    "QueWxI6vMrc", "EuT94T544Mg", "GT7PTpvni_A", "jBaHuGXoWBY", "f8Y-b3m070c",
    "H5Idj-uzmn8", "uoq2J1txSTE", "97Urh5GlCbg", "M3J7w59rXTE", "6-cpKa0UMWA",
    "X7lz-BBMmU8",
]

# The official per-move shorts, for classes 5-19. Classes 1-4, 20 and 21 have
# none — the charter's central research finding, and the reason those classes
# need both clips cut from the class video itself.
SHORTS: list[str] = [
    "qwR89NAQgqM", "V57F7c5R5jY", "18cM9UvzsoI", "JkwUzKb_X-8", "Nl714zi8W-A",
    "fNXwnQuVdEI", "TyOHtkirh_g", "UsvPdXW4-O4", "7MODqLfyTQQ", "c0H4GQnYjNE",
    "xwwnWPXpKz8", "wAK8hMxwfes", "B5A2kgjTvnw", "TM9kP4jy0To", "vlSqi-msy60",
]

# 720px on the short edge, matching the 15 steps classes already on disk.
# See the docstring: this is orientation-agnostic.
RES_SORT = "res:720"

log = logging.getLogger("download_salsa_videos")


def download(video_id: str, *, dry_run: bool) -> bool:
    dest = VIDEOS_DIR / f"{video_id}.mp4"
    if dest.exists():
        log.info("  %s cached (%.0f MB)", video_id, dest.stat().st_size / 1e6)
        return True
    if dry_run:
        log.info("  %s would download", video_id)
        return True

    VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    cmd = [
        "yt-dlp", "--no-update", "--quiet", "--no-warnings", "--progress",
        # See the module docstring: without this, every download 403s.
        "--js-runtimes", "node",
        "-S", RES_SORT,
        # Remux rather than re-encode. The clip cutter re-encodes anyway, so
        # transcoding here would cost a generation of quality for nothing.
        "-f", "bv*+ba/b",
        "--merge-output-format", "mp4",
        "-o", str(VIDEOS_DIR / "%(id)s.%(ext)s"),
        f"https://www.youtube.com/watch?v={video_id}",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not dest.exists():
        log.error("  %s FAILED: %s", video_id,
                  (result.stderr or "no output").strip()[-400:])
        return False
    log.info("  %s ok (%.0f MB)", video_id, dest.stat().st_size / 1e6)
    return True


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("what", choices=["couples", "shorts", "all"])
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(message)s")

    jobs: list[str] = []
    if args.what in {"couples", "all"}:
        jobs += COUPLES
    if args.what in {"shorts", "all"}:
        jobs += SHORTS

    log.info("%d video(s) -> %s", len(jobs), VIDEOS_DIR)
    failed: list[str] = []
    for i, video_id in enumerate(jobs, 1):
        log.info("[%d/%d] %s", i, len(jobs), video_id)
        if not download(video_id, dry_run=args.dry_run):
            failed.append(video_id)

    if failed:
        log.error("")
        log.error("%d failed: %s", len(failed), " ".join(failed))
        log.error("Transient 403s are common — just re-run, cached files are skipped.")
        return 1
    log.info("")
    log.info("All %d present.", len(jobs))
    return 0


if __name__ == "__main__":
    sys.exit(main())
