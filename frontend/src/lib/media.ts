// Where a clip's bytes actually live.
//
// Everything in this app used to be one GitHub Pages site, and every media path
// in the data files is written root-relative (`/clips/salsa/moves/x.mp4`) with
// BASE_PATH glued on at render time. That stopped working: GitHub Pages publishes
// at most 1 GB per site, and with the salsa clips in the repo the built site is
// ~1.28 GB — already 28% over before the intermediate courses add anything.
//
// So the salsa clips move to their own repo and their own Pages site
// (lemony312/perfect-workout-media) and are loaded cross-origin. That split is
// invisible to the data files: they keep their root-relative paths, and this
// module is the single place that decides which origin a path resolves against.
//
// The split is by *path prefix*, not by course. Every clip under `/clips/salsa/`
// goes to the media origin, including the beginners clips that are already there
// — the point of moving them is to get the main site back under the limit, which
// only works if all 524 MB leave rather than just the new material.

/** GitHub Pages serves this site from a subdirectory, not a domain root. */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Absolute origin (scheme + host + path) of the media site, no trailing slash.
// Unset means "serve media from this site too", which is what a local `next dev`
// wants and what keeps the app working if the media site is ever folded back in.
const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE || '').replace(/\/+$/, '')

/** Paths served from the media site rather than from this one. */
const MEDIA_PREFIXES = ['/clips/salsa/']

/**
 * Resolve a root-relative media path to a URL the browser can fetch.
 *
 * Use this for every `<video>`/`<audio>` src built from the data files. Do not
 * hand-build `${BASE_PATH}${src}` any more: that spelling is correct only for
 * media still inside this repo, and silently 404s for anything that has moved.
 */
export function mediaUrl(src: string): string {
  if (/^https?:\/\//.test(src)) return src
  const path = src.startsWith('/') ? src : `/${src}`
  if (MEDIA_BASE && MEDIA_PREFIXES.some((p) => path.startsWith(p))) {
    // No BASE_PATH here — MEDIA_BASE already carries the media site's own base
    // path, and this repo's base path has nothing to do with that origin.
    return `${MEDIA_BASE}${path}`
  }
  return `${BASE_PATH}${path}`
}

/** True when `src` will be fetched cross-origin, so callers can set attributes
 * that only matter then. Kept separate from mediaUrl so the URL stays a string. */
export function isCrossOrigin(src: string): boolean {
  return mediaUrl(src).startsWith('http')
}
