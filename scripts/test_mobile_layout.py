"""
Regression test: no page may overflow horizontally at mobile widths.

Reported symptom: on a phone the app "is never fit to frame" — every page reads
as zoomed out and mis-sized.

The assertion has to be `window.innerWidth == device width`, NOT
`scrollWidth <= innerWidth`. When content is too wide, mobile browsers do not
leave the document overflowing a device-width viewport; they widen the *layout*
viewport to fit and scale the whole page down. scrollWidth then equals
innerWidth and a naive check passes while the page is visibly shrunk. The
tell-tale is innerWidth (layout viewport, expanded) drifting above
visualViewport.width (the real screen).

Run the dev server first (cd frontend && npm run dev), then:
    uv run --with playwright scripts/test_mobile_layout.py
    uv run --with playwright scripts/test_mobile_layout.py --url http://localhost:3000/perfect-workout
"""

import argparse
import asyncio
import sys

from playwright.async_api import async_playwright

DEFAULT_BASE = "http://localhost:3000/perfect-workout"

# Narrowest widths we care about: iPhone SE / mini, then a standard iPhone.
WIDTHS = [320, 375, 390]

PAGES = ["/", "/2025", "/bodyweight", "/stretching", "/posture", "/voice-training"]

# A few px of slop: subpixel rounding on scaled layouts is not a real overflow.
TOLERANCE = 1


async def measure(page, url: str) -> dict:
    await page.goto(url, wait_until="networkidle")
    return await page.evaluate(
        """() => {
      // Find the element whose content is widest relative to the space it has —
      // that is what forced the layout viewport open, so a failure names the
      // culprit instead of just the page.
      let worst = null;
      for (const el of document.querySelectorAll('*')) {
        const over = el.scrollWidth - el.clientWidth;
        if (el.clientWidth > 0 && over > 1 && (!worst || over > worst.over)) {
          worst = {
            over,
            tag: el.tagName.toLowerCase(),
            cls: (el.className || '').toString().slice(0, 70),
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          };
        }
      }
      return {
        layoutViewport: window.innerWidth,
        screen: Math.round(window.visualViewport.width),
        worst,
      };
    }"""
    )


async def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", default=DEFAULT_BASE, help="base URL of a running server")
    args = parser.parse_args()

    failures = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for width in WIDTHS:
            page = await browser.new_page(
                viewport={"width": width, "height": 780},
                device_scale_factor=3,
                is_mobile=True,
                has_touch=True,
            )
            for path in PAGES:
                r = await measure(page, f"{args.url}{path}")
                # The layout viewport must stay at the device width. If it grew,
                # the browser scaled the page down to fit — the reported bug.
                excess = r["layoutViewport"] - width
                ok = excess <= TOLERANCE
                scale = round(width / r["layoutViewport"] * 100)
                status = "PASS" if ok else "FAIL"
                detail = "fits" if ok else f"page scaled to {scale}%"
                print(f"{status}  {width}px  {path:<16} layoutViewport={r['layoutViewport']:<4} {detail}")
                if not ok:
                    w = r["worst"]
                    if w:
                        print(f"        forced open by <{w['tag']}> needing {w['scrollWidth']}px "
                              f"in {w['clientWidth']}px  class={w['cls']!r}")
                    failures.append((width, path, excess))
            await page.close()
        await browser.close()

    print()
    if failures:
        print(f"FAILED: {len(failures)} page/width combinations overflow horizontally")
        return 1
    print(f"PASSED: all {len(PAGES)} pages fit at {WIDTHS} px")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
