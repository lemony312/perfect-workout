"""
Download an Instagram Reel (video + audio, muxed) — and optionally its caption.

Why this exists
---------------
yt-dlp and gallery-dl both fail on Instagram reels right now: even on the
latest version, with browser cookies, Instagram returns an "empty media
response" because reel media is served only through an authenticated GraphQL
call its own JavaScript makes. The REST/GraphQL endpoints redirect anonymous
(and even cookie'd-but-not-logged-in) clients to the login page.

The reliable workaround is to drive a real headless browser (Playwright),
let Instagram's own JS fetch the media, and capture the CDN video/audio
requests off the network. Reels are served as DASH (separate video + audio
tracks), so we download the highest-bitrate video track plus the audio track
and mux them with ffmpeg.

Requirements
------------
- ffmpeg on PATH
- Playwright with chromium installed. The project standardizes on uv, so the
  zero-install way to run this is:

      uvx --with playwright python scripts/download_instagram_reel.py <url>

  (run `uvx --from playwright playwright install chromium` once first).

Usage
-----
    python scripts/download_instagram_reel.py <reel_url> [-o out.mp4]

Example
-------
    uvx --with playwright python scripts/download_instagram_reel.py \
        "https://www.instagram.com/reel/DZ5hNi7KNMI/" -o /tmp/reel.mp4
"""

import argparse
import base64
import json
import re
import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request
from pathlib import Path

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
)


def capture_session(reel_url: str) -> tuple[list[str], str | None]:
    """Open the reel headless; return (media URLs captured, caption if found)."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit(
            "Playwright is required. Run with:\n"
            "  uvx --with playwright python scripts/download_instagram_reel.py <url>\n"
            "and once:  uvx --from playwright playwright install chromium"
        )

    found: list[str] = []
    caption: str | None = None
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(user_agent=UA, locale="en-US")
        page = ctx.new_page()

        def on_response(resp):
            url = resp.url
            if ".mp4" in url or "video" in resp.headers.get("content-type", ""):
                found.append(url)

        page.on("response", on_response)
        page.goto(reel_url, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(4000)
        # Also grab any <video> src already in the DOM.
        for s in page.eval_on_selector_all("video", "els => els.map(e => e.currentSrc || e.src)"):
            if s:
                found.append(s)
        # Caption is reliably present in the og:description meta tag.
        try:
            caption = page.get_attribute('meta[property="og:description"]', "content")
        except Exception:
            caption = None
        browser.close()

    urls = [u for u in dict.fromkeys(found) if u.startswith("http")]
    return urls, caption


def _strip_range(url: str) -> str:
    url = re.sub(r"&bytestart=\d+", "", url)
    url = re.sub(r"&byteend=\d+", "", url)
    return url


def _track_info(url: str) -> dict:
    """Decode the base64 `efg` query param, which carries bitrate + encode tag."""
    m = re.search(r"efg=([^&]+)", url)
    if not m:
        return {}
    try:
        raw = urllib.parse.unquote(m.group(1))
        return json.loads(base64.b64decode(raw + "==="))
    except Exception:
        return {}


def pick_best_tracks(urls: list[str]) -> tuple[str | None, str | None]:
    """From captured URLs, return (best_video_url, best_audio_url) full-file."""
    videos: list[tuple[int, str]] = []
    audios: list[tuple[int, str]] = []
    for u in urls:
        info = _track_info(u)
        tag = info.get("vencode_tag", "")
        bitrate = info.get("bitrate", 0)
        full = _strip_range(u)
        if "audio" in tag:
            audios.append((bitrate, full))
        elif "dash" in tag:
            videos.append((bitrate, full))
    video = max(videos)[1] if videos else None
    audio = max(audios)[1] if audios else None
    return video, audio


def _download(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.instagram.com/"})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest, "wb") as f:
        f.write(r.read())


def download_reel(reel_url: str, out_path: Path) -> tuple[Path, str | None]:
    print(f"[1/4] Opening reel in headless browser: {reel_url}")
    urls, caption = capture_session(reel_url)
    if not urls:
        sys.exit("No media URLs captured — the reel may be private or login-gated.")

    print(f"[2/4] Selecting best video + audio tracks ({len(urls)} URLs captured)")
    video_url, audio_url = pick_best_tracks(urls)
    if not video_url:
        sys.exit("Could not identify a video track among captured URLs.")

    with tempfile.TemporaryDirectory() as tmp:
        vid = Path(tmp) / "video.mp4"
        print("[3/4] Downloading tracks")
        _download(video_url, vid)
        if audio_url:
            aud = Path(tmp) / "audio.mp4"
            _download(audio_url, aud)
            print("[4/4] Muxing video + audio")
            cmd = [
                "ffmpeg", "-y", "-loglevel", "error",
                "-i", str(vid), "-i", str(aud),
                "-c", "copy", "-map", "0:v:0", "-map", "1:a:0",
                str(out_path),
            ]
        else:
            print("[4/4] No separate audio track; copying video only")
            cmd = ["ffmpeg", "-y", "-loglevel", "error", "-i", str(vid), "-c", "copy", str(out_path)]
        subprocess.run(cmd, check=True)

    size_mb = out_path.stat().st_size / (1024 * 1024)
    print(f"Saved: {out_path} ({size_mb:.1f} MB)")
    return out_path, caption


def main():
    ap = argparse.ArgumentParser(description="Download an Instagram Reel (video + audio).")
    ap.add_argument("url", help="Instagram reel URL")
    ap.add_argument("-o", "--output", default=None, help="Output .mp4 path")
    ap.add_argument("--caption", action="store_true", help="Also print the caption")
    args = ap.parse_args()

    shortcode_match = re.search(r"/reel/([^/?]+)", args.url) or re.search(r"/p/([^/?]+)", args.url)
    shortcode = shortcode_match.group(1) if shortcode_match else "reel"
    out_path = Path(args.output) if args.output else Path(f"reel_{shortcode}.mp4")

    _, caption = download_reel(args.url, out_path)

    if args.caption:
        print("\n--- Caption ---")
        print(caption or "(none found)")


if __name__ == "__main__":
    main()
