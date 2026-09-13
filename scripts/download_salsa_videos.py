#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["yt-dlp"]
# ///
"""
Download the source video for every La Suerte salsa video we cut clips from.

The steps course only ever needed the 15 class videos, which were fetched
ad hoc. The couples course needs 36 files — 21 classes plus the 15 official
shorts — so it gets a script.

Three things here are load-bearing, all three learned by watching downloads fail:

  1. **yt-dlp comes from uv, not from PATH.** It is a PEP 723 dependency and is
     invoked as `-m yt_dlp`, so a fresh copy is resolved on every run. The
     Homebrew yt-dlp on this machine was six months stale and could not download
     these videos at all: YouTube now enforces a PO token for the DASH streams,
     and a stale build's only remaining option was a muxed 360p — too coarse to
     read footwork from, which is the entire purpose of the clip. yt-dlp tracks
     YouTube's extraction changes weekly, so pinning to whatever the OS happens
     to have installed is not viable for this one job.

  2. **HLS video is preferred over DASH.** All 21 classes 403'd on every DASH
     format, audio included, while the shorts downloaded fine with identical
     flags — YouTube enforces the PO token per video, and the classes are in the
     enforcing bucket. The `m3u8` streams are served without one. Audio is
     pinned to `m4a` so the result muxes into mp4 without transcoding.

     Note this is NOT a rate limit, which is what it looks like: an unrelated
     video 403'd at the same moment a just-fetched short still succeeded.

  3. **`--js-runtimes node`.** Without it every download 403s, because YouTube
     requires solving a JS challenge to sign the media URL and yt-dlp needs an
     external JS engine to do it. Same flag and same failure as
     transcribe_salsa.py, which still shells out to the PATH yt-dlp — that keeps
     working only because audio-only extraction survives on a stale build.

The audio track is checked, not assumed: these videos carry auto-dubbed Hindi,
Indonesian, Polish and Ukrainian tracks alongside the English original, and
silently cutting clips against a Hindi dub would desynchronise every cue from
its transcript. The selector resolves to the original (`lang=en-US` on a class,
`lang=en` on a short), verified before this was committed.

Orientation needs no special handling, which is worth stating because it looks
like it should: the classes are 1920x1080 and the shorts are 1080x1920, but
yt-dlp's `res` sort key is the *short edge*, not the height. So one `res:720`
yields 1280x720 for a class and 720x1280 for a short. Verified by listing
formats — `-S res:1280` on a short selects 1080x1920, not the 720x1280 that a
height-based reading would predict.

Idempotent: an existing file is left alone, so a partial run is resumed by
re-running it. Failures are collected and reported at the end rather than
aborting the batch, because a single transient failure in a 36-video run should
not throw away the other 35.

Usage:
    uv run scripts/download_salsa_videos.py couples    # 21 classes
    uv run scripts/download_salsa_videos.py shorts     # 15 official shorts
    uv run scripts/download_salsa_videos.py all
    uv run scripts/download_salsa_videos.py all --dry-run
"""

from __future__ import annotations

import argparse
import json
import logging
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
VIDEOS_DIR = REPO / "data" / "cache" / "salsa" / "videos"
INFO_DIR = REPO / "data" / "cache" / "salsa" / "info"

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

# HLS video first (the DASH streams 403), m4a audio so the mux needs no
# transcode, then progressively weaker fallbacks so a video whose HLS ladder is
# missing still downloads rather than erroring out.
FORMAT = "bv*[protocol^=m3u8]+ba[ext=m4a]/bv*+ba[ext=m4a]/bv*+ba/b"

log = logging.getLogger("download_salsa_videos")


def probe(path: Path) -> tuple[int, int, float]:
    """(width, height, duration) of `path`, or zeros if ffprobe can't read it."""
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height", "-show_entries",
         "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        capture_output=True, text=True)
    try:
        w, h, d = out.stdout.split()
        return int(w), int(h), float(d)
    except ValueError:
        return 0, 0, 0.0


def expected_duration(video_id: str) -> float | None:
    """Duration from the cached metadata, so a truncated download is caught."""
    p = INFO_DIR / f"{video_id}.info.json"
    if not p.exists():
        return None
    return float(json.loads(p.read_text()).get("duration") or 0) or None


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
        # -m yt_dlp, not the PATH binary: see the module docstring.
        sys.executable, "-m", "yt_dlp",
        "--no-update", "--quiet", "--no-warnings", "--progress",
        # Without this, every download 403s on YouTube's JS challenge.
        "--js-runtimes", "node",
        "-S", RES_SORT,
        "-f", FORMAT,
        # Remux rather than re-encode. The clip cutter re-encodes anyway, so
        # transcoding here would cost a generation of quality for nothing.
        "--merge-output-format", "mp4",
        "-o", str(VIDEOS_DIR / "%(id)s.%(ext)s"),
        f"https://www.youtube.com/watch?v={video_id}",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not dest.exists():
        log.error("  %s FAILED: %s", video_id,
                  (result.stderr or result.stdout or "no output").strip()[-400:])
        return False

    # Verify rather than trust. Both failure modes here have already happened:
    # a stale yt-dlp silently fell back to a muxed 360p, and a 403 mid-stream can
    # leave a short file behind. Either would be discovered much later, as an
    # unusable clip, so they are caught at the source instead.
    w, h, dur = probe(dest)
    short_edge = min(w, h) if w and h else 0
    problems = []
    if short_edge < 700:
        problems.append(f"only {w}x{h} — too coarse to read footwork from")
    want = expected_duration(video_id)
    if want and abs(dur - want) > 2.0:
        problems.append(f"duration {dur:.0f}s, metadata says {want:.0f}s")
    if problems:
        log.error("  %s BAD: %s", video_id, "; ".join(problems))
        return False

    log.info("  %s ok (%dx%d, %.0fs, %.0f MB)",
             video_id, w, h, dur, dest.stat().st_size / 1e6)
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
        log.error("Re-run to retry — anything already on disk is skipped. If every "
                  "video 403s, YouTube's extraction has moved again; check the "
                  "format list before changing FORMAT.")
        return 1
    log.info("")
    log.info("All %d present.", len(jobs))
    return 0


if __name__ == "__main__":
    sys.exit(main())
