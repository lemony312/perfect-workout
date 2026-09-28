"""
Regression test: every media file resolves to the origin that actually serves it.

The salsa clips do not live in the app's repo. GitHub Pages publishes at most
1 GB per site and the app built to ~1.28 GB with them, so they were split out and
are loaded cross-origin. `src/lib/media.ts` maps path prefixes onto origins and
leaves every other path on the app's own origin.

There are TWO media origins, because one was not enough either: with both
intermediate courses on it the first media site reached 1035 MB and stopped
deploying. So `/clips/salsa/intermediate/` is served by one site and the rest of
`/clips/salsa/` by another. That makes the ordering in MEDIA_ROUTES load-bearing —
the intermediate prefix is a subpath of the general one, so if the general rule
were matched first every intermediate clip would resolve to the beginners site and
404. This test is what catches that, because both spellings look plausible.

Why this needs a browser rather than a grep of `out/`: the join happens at
*runtime*. The built bundle contains the origin and the root-relative paths as
separate strings and never as a finished URL, so static inspection cannot tell a
working split from one that silently emits `/perfect-workout/clips/salsa/...` and
404s on the live site. The failure mode is also invisible locally whenever the
clips are still sitting in `public/` — the page works, and then the deploy is
broken. So the assertion is made against a real resolved `video.src`.

`--check-fetch` additionally fetches each distinct clip URL and requires
`Accept-Ranges: bytes`. That is not pedantry: the transport's scrubber seeks, and
seeking a cross-origin video is exactly what a server without range support
turns into a silent failure to scrub.

Run the dev server first (cd frontend && npm run dev), then:
    uv run --with playwright,httpx scripts/test_media_origin.py
    uv run --with playwright,httpx scripts/test_media_origin.py --check-fetch

To test the "no media site" escape hatch instead, run the dev server with
NEXT_PUBLIC_MEDIA_BASE= (empty) and pass --expect-local.
"""

import argparse
import asyncio
import sys

from playwright.async_api import async_playwright

DEFAULT_BASE = "http://localhost:3000/perfect-workout"
# Prefix -> the origin that must serve it. Mirrors MEDIA_ROUTES in src/lib/media.ts,
# longest prefix first for the same reason: the intermediate path is a subpath of the
# general one. If that list grows, so does this one, and the test fails loudly rather
# than quietly checking nothing.
MEDIA_ROUTES = [
    ("/clips/salsa/intermediate/",
     "https://lemony312.github.io/perfect-workout-media-intermediate"),
    ("/clips/salsa/",
     "https://lemony312.github.io/perfect-workout-media"),
]

# Any salsa clip path, for spotting a clip that reached no media origin at all.
MEDIA_PREFIX = "/clips/salsa/"

MEDIA_ORIGINS = [origin for _, origin in MEDIA_ROUTES]


def expected_origin(url: str) -> str | None:
    """The origin that should be serving `url`, by longest matching prefix."""
    for prefix, origin in MEDIA_ROUTES:
        if prefix in url:
            return origin
    return None

# One page per course, each with a move selected so a <video> is actually
# mounted. The clip players render client-side off query state, so a bare /salsa
# has no video element to inspect.
SALSA_PAGES = [
    "/salsa?move=exhibela-crossing",
    "/salsa/couples?move=setenta",
    # The intermediate courses load from the *other* media origin, so these two
    # entries are the ones that catch a mis-ordered MEDIA_ROUTES. One move per
    # course rather than per clip: the rewrite is in `mediaUrl`, so a single page
    # per route proves the route reaches it.
    "/salsa/intermediate?move=pilon",
    "/salsa/intermediate/couples?move=sombrero-por-debajo",
]

# Media that must NOT move: the music is `/audio/...` and the other courses'
# clips are `/clips/bodyweight/...`, neither of which is under MEDIA_PREFIX.
LOCAL_PAGES = ["/stretching", "/bodyweight"]


async def media_srcs(page, url: str) -> list[str]:
    """Every resolved video/audio src on `url`, after the players have mounted."""
    await page.goto(url, wait_until="networkidle")
    # `.src` and not `getAttribute('src')`: the property is the browser's own
    # resolution of whatever the app produced, which is the thing under test. A
    # relative attribute that resolves to the wrong origin would pass an
    # attribute check and fail in reality.
    return await page.evaluate(
        "() => [...document.querySelectorAll('video,audio')]"
        "        .map(e => e.src).filter(Boolean)"
    )


async def run(base: str, expect_local: bool) -> list[str]:
    failures: list[str] = []
    salsa_urls: set[str] = set()

    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        page = await browser.new_page()

        for path in SALSA_PAGES:
            srcs = await media_srcs(page, base + path)
            clips = [s for s in srcs if MEDIA_PREFIX in s]
            if not clips:
                # Not a pass. No clip means the selector or the fixture move name
                # is wrong, and a test that inspects nothing would report success.
                failures.append(f"{path}: found no salsa clip src at all (srcs={srcs})")
                continue
            for s in clips:
                salsa_urls.add(s)
                if expect_local:
                    if not s.startswith(base.split("/perfect-workout")[0]):
                        failures.append(f"{path}: expected a local clip, got {s}")
                else:
                    # Checked against the origin this specific path routes to, not
                    # against "some media origin". The bug worth catching is an
                    # intermediate clip served from the beginners site: that is
                    # cross-origin, looks right, and 404s.
                    want = expected_origin(s)
                    if want and not s.startswith(want + "/clips/salsa/"):
                        failures.append(
                            f"{path}: clip must come from {want}, got {s}"
                        )

        for path in LOCAL_PAGES:
            for s in await media_srcs(page, base + path):
                for origin in MEDIA_ORIGINS:
                    if s.startswith(origin):
                        failures.append(
                            f"{path}: {s} was sent to {origin}, but only "
                            f"{MEDIA_PREFIX} belongs on a media origin"
                        )

        await browser.close()

    return failures, sorted(salsa_urls)


def check_fetch(urls: list[str]) -> list[str]:
    """Each clip URL must be served, and served with byte-range support."""
    import httpx

    failures = []
    for u in urls:
        try:
            r = httpx.head(u, follow_redirects=True, timeout=30)
        except Exception as exc:  # noqa: BLE001 - a failed fetch is the finding
            failures.append(f"{u}: {type(exc).__name__}: {exc}")
            continue
        if r.status_code != 200:
            failures.append(f"{u}: HTTP {r.status_code}")
        elif r.headers.get("accept-ranges") != "bytes":
            failures.append(
                f"{u}: no 'Accept-Ranges: bytes' — the scrubber cannot seek this"
            )
    return failures


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--url", default=DEFAULT_BASE)
    ap.add_argument("--check-fetch", action="store_true",
                    help="also fetch each clip URL and require range support")
    ap.add_argument("--expect-local", action="store_true",
                    help="assert clips resolve to the app's own origin, for a dev "
                         "server started with NEXT_PUBLIC_MEDIA_BASE= (empty)")
    args = ap.parse_args()

    failures, urls = asyncio.run(run(args.url.rstrip("/"), args.expect_local))
    print(f"checked {len(urls)} distinct salsa clip URL(s)")
    for u in urls:
        print(f"  {u}")

    if args.check_fetch and not args.expect_local:
        failures += check_fetch(urls)

    if failures:
        print(f"\nFAIL ({len(failures)}):", file=sys.stderr)
        for f in failures:
            print(f"  {f}", file=sys.stderr)
        return 1
    print("\nOK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
