import type { NextConfig } from "next";

// Where the salsa clips are served from. They are not in this repo: GitHub Pages
// publishes at most 1 GB per site and this site built to ~1.28 GB with them, so
// they live in lemony312/perfect-workout-media and are loaded cross-origin. Only
// the `/clips/salsa/` prefix is affected — see src/lib/media.ts.
//
// `??` and not `||`, so that an explicitly empty NEXT_PUBLIC_MEDIA_BASE= wins and
// resolves clips against this site instead. That is the escape hatch for working
// offline, or for a local `next dev` against clips still sitting in public/.
const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://lemony312.github.io/perfect-workout-media";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/perfect-workout",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/perfect-workout",
    NEXT_PUBLIC_MEDIA_BASE: MEDIA_BASE,
  },
};

export default nextConfig;
