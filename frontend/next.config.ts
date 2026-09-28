import type { NextConfig } from "next";

// Where the salsa clips are served from. They are not in this repo: GitHub Pages
// publishes at most 1 GB per site and this site built to ~1.28 GB with them, so
// they live in their own repos and are loaded cross-origin. Only the
// `/clips/salsa/` prefix is affected — see src/lib/media.ts.
//
// There are TWO media origins, not one, because the 1 GB limit is per site and one
// site was not enough either: with the intermediate courses added, the media site
// reached 1035 MB and stopped deploying entirely — which 404s every clip in all
// four courses, not just the new ones. The beginners clips stay on the original
// site (~524 MB) and the intermediate clips have their own (~511 MB), so both sit
// near half full. The alternative was re-encoding at CRF 26 for a measured 27%
// saving, rejected because that loss lands in motion and motion is what a dance
// clip exists to show.
//
// `??` and not `||` on both, so that an explicitly empty value wins and resolves
// clips against this site instead. That is the escape hatch for working offline, or
// for a local `next dev` against clips still sitting in public/.
const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ??
  "https://lemony312.github.io/perfect-workout-media";

const MEDIA_BASE_INTERMEDIATE =
  process.env.NEXT_PUBLIC_MEDIA_BASE_INTERMEDIATE ??
  "https://lemony312.github.io/perfect-workout-media-intermediate";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/perfect-workout",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/perfect-workout",
    NEXT_PUBLIC_MEDIA_BASE: MEDIA_BASE,
    NEXT_PUBLIC_MEDIA_BASE_INTERMEDIATE: MEDIA_BASE_INTERMEDIATE,
  },
};

export default nextConfig;
