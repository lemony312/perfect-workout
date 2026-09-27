#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["yt-dlp>=2026.8.19"]
# ///
"""
Research probe for the two Intermediate La Suerte courses.

This is a *planning* tool, not part of the clip pipeline. It answers the three
questions that decide how much work the intermediate courses are, and it answers
them from YouTube rather than from guesswork:

  1. Is each video chaptered? Chapters are what made the beginners couples
     course tractable — 197 of them gave us the teachers' own segment
     boundaries, so we never had to invent a boundary. A course with no chapters
     needs every boundary derived from the transcript instead, which is both
     slower and lower trust (grade D rather than A).
  2. How long is each video, from the metadata? (The clipper still measures the
     container, which disagrees by up to 0.5s — see salsa-couples.ts. This is
     only for sizing.)
  3. What does the description say the class teaches? The couples course's
     "we show and explain how to do:" lists were the move inventory.

It writes one `.info.json` per video into the same cache the rest of the
pipeline reads, so nothing here needs re-fetching later.

Why a single process rather than a shell loop over `uv run`: 60 separate
`uv run` invocations mostly failed silently and left no files. One interpreter
with one YoutubeDL instance reuses the extracted player JS and the solved JS
challenge across videos, which is both far faster and the thing that stops
YouTube treating the burst as abuse.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path

from yt_dlp import YoutubeDL, parse_options

ROOT = Path(__file__).resolve().parent.parent
INFO_DIR = ROOT / "data" / "cache" / "salsa" / "info"

PLAYLISTS = {
    "int-steps": "PL8hFYIpg2Jp3kM2u_D5wF1d2fNUMfRW7H",
    "int-couples": "PL8hFYIpg2Jp1CW7M5O6IUQ_Jw1AFxVX_T",
    "int-shorts": "PL8hFYIpg2Jp21h2_iK_2w6T_FxhEJD7wS",
}

# Same flags the downloader learned the hard way; see download_salsa_videos.py
# for why each one is load-bearing. Metadata extraction needs the JS challenge
# solver too, because without it extraction fails outright and misreports the
# failure as a bot check.
#
# These go through `parse_options` rather than being written as a params dict,
# because the library's internal shapes are NOT the CLI shapes and differ per
# option: `js_runtimes` wants {runtime: {config}}, not the ["node"] the CLI
# accepts, and getting it wrong raises rather than degrading. Handing the same
# flag strings that are known to work on the command line to yt-dlp's own parser
# means there is exactly one spelling of these flags in the project.
#
# Note what is deliberately NOT here: the downloader's
# `--extractor-args youtube:player_client=ios,web_safari,mweb`. That flag exists
# to stop yt-dlp *downloading* a muxed 360p, but for metadata it does the
# opposite of its job — those three clients get their good formats skipped
# (SABR-only for ios, missing GVS PO token for mweb), so the reported ladder
# tops out at 360p even on a video that offers 1080p over HLS. Left to itself
# the extractor picks `visionos` and lists the whole m3u8 ladder, which is what
# a resolution question needs to be answered against.
_CLI_FLAGS = [
    "--js-runtimes", "node",
    "--remote-components", "ejs:github",
]

OPTS = {
    **parse_options(_CLI_FLAGS).ydl_opts,
    "skip_download": True,
    "quiet": True,
}

SLEEP_BETWEEN = 1.0


def probe(ids: list[str], *, refresh: bool) -> list[dict]:
    """Fetch (or load from cache) the info dict for each id, in order."""
    out: list[dict] = []
    with YoutubeDL(OPTS) as ydl:
        for i, vid in enumerate(ids, 1):
            dest = INFO_DIR / f"{vid}.info.json"
            if dest.exists() and not refresh:
                out.append(json.loads(dest.read_text()))
                print(f"  [{i}/{len(ids)}] {vid} cached", file=sys.stderr)
                continue
            try:
                info = ydl.extract_info(
                    f"https://www.youtube.com/watch?v={vid}", download=False
                )
            except Exception as exc:  # noqa: BLE001 - report and keep going
                print(f"  [{i}/{len(ids)}] {vid} FAILED: {exc}", file=sys.stderr)
                continue
            # sanitize_info drops the unpicklable bits (cookiejar, etc.) that
            # make a raw info dict unserialisable.
            info = ydl.sanitize_info(info)
            dest.write_text(json.dumps(info, indent=2, ensure_ascii=False))
            out.append(info)
            print(f"  [{i}/{len(ids)}] {vid} fetched", file=sys.stderr)
            time.sleep(SLEEP_BETWEEN)
    return out


def playlist_ids(pl: str) -> list[tuple[int, str, str]]:
    """(index, id, title) for a playlist, in playlist order."""
    with YoutubeDL({**OPTS, "extract_flat": True}) as ydl:
        info = ydl.extract_info(
            f"https://www.youtube.com/playlist?list={pl}", download=False
        )
    return [
        (n, e["id"], e.get("title", ""))
        for n, e in enumerate(info["entries"], 1)
        if e
    ]


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("course", choices=[*PLAYLISTS, "all"])
    ap.add_argument("--refresh", action="store_true", help="re-fetch cached info")
    args = ap.parse_args()

    names = list(PLAYLISTS) if args.course == "all" else [args.course]
    report: dict[str, list[dict]] = {}

    for name in names:
        print(f"### {name}", file=sys.stderr)
        entries = playlist_ids(PLAYLISTS[name])
        infos = probe([vid for _, vid, _ in entries], refresh=args.refresh)
        by_id = {i["id"]: i for i in infos}
        rows = []
        for n, vid, title in entries:
            info = by_id.get(vid)
            if info is None:
                rows.append({"n": n, "id": vid, "title": title, "error": "no metadata"})
                continue
            chapters = info.get("chapters") or []
            rows.append(
                {
                    "n": n,
                    "id": vid,
                    "title": info.get("title", title),
                    "duration": info.get("duration"),
                    "n_chapters": len(chapters),
                    "chapters": [
                        {"t": round(c["start_time"], 1), "title": c["title"]}
                        for c in chapters
                    ],
                    "description": info.get("description", ""),
                    # Whether the channel uploaded real captions. The salsa
                    # pipeline deliberately ignores YouTube captions and uses
                    # local Whisper, so this is informational only.
                    "manual_subs": sorted((info.get("subtitles") or {}).keys()),
                    # The tallest format actually on offer — NOT info['height'],
                    # which is the height of the format the *selector* landed on
                    # and is a trap: with the player_client override above, every
                    # intermediate couples video reported 360 while genuinely
                    # offering 1080p over HLS. Reading info['height'] here led to
                    # a wrong conclusion that the source was unusably soft.
                    # Storyboards are excluded; they are jpeg contact sheets.
                    "max_height": max(
                        (
                            f["height"]
                            for f in (info.get("formats") or [])
                            if f.get("height") and f.get("protocol") != "mhtml"
                        ),
                        default=0,
                    ),
                }
            )
        report[name] = rows

    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
