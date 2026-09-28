// Where a clip's bytes actually live.
//
// Everything in this app used to be one GitHub Pages site, and every media path
// in the data files is written root-relative (`/clips/salsa/moves/x.mp4`) with
// BASE_PATH glued on at render time. That stopped working: GitHub Pages publishes
// at most 1 GB per site, and with the salsa clips in the repo the built site is
// ~1.28 GB — already 28% over before the intermediate courses add anything.
//
// So the salsa clips moved to their own repo and their own Pages site, loaded
// cross-origin. That split is invisible to the data files: they keep their
// root-relative paths, and this module is the single place that decides which
// origin a path resolves against.
//
// **There are now two media origins, because 1 GB per site was not enough either.**
// Adding the two intermediate courses took the single media site to 1035 MB. Over
// the limit means the site does not deploy at all, so the failure is not "the new
// clips are missing" — it is every clip in all four courses 404ing at once. The
// beginners clips stay on the original site (~524 MB) and the intermediate clips
// have their own (~511 MB); both now sit near half full.
//
// Re-encoding to fit one site was the alternative and was measured: CRF 26 instead
// of 23 saves 27%. It was rejected because the loss lands in motion, and motion is
// precisely what a dance clip is for — which foot moves on which beat.
//
// The routing is by *path prefix*, longest first, not by course. A course id would
// have been the wrong key: `salsa-int-couples.ts` and `salsa-couples.ts` can both
// point at the same shared clip file, and it is the file's location that decides
// its origin, not which module happened to reference it.

/** GitHub Pages serves this site from a subdirectory, not a domain root. */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Absolute origins (scheme + host + path) of the media sites, no trailing slash.
// Unset means "serve media from this site too", which is what a local `next dev`
// wants and what keeps the app working if a media site is ever folded back in.
const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE || '').replace(/\/+$/, '')
const MEDIA_BASE_INTERMEDIATE = (
  process.env.NEXT_PUBLIC_MEDIA_BASE_INTERMEDIATE || ''
).replace(/\/+$/, '')

/**
 * Path prefix -> which media origin serves it.
 *
 * **Order matters: longest prefix first.** `/clips/salsa/intermediate/` is a subpath
 * of `/clips/salsa/`, so if the general rule came first every intermediate clip
 * would resolve to the beginners site and 404. The lookup below takes the first
 * match, so the specific rule has to precede the general one.
 */
const MEDIA_ROUTES: { prefix: string; base: string }[] = [
  { prefix: '/clips/salsa/intermediate/', base: MEDIA_BASE_INTERMEDIATE },
  { prefix: '/clips/salsa/', base: MEDIA_BASE },
]

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
  const route = MEDIA_ROUTES.find((r) => path.startsWith(r.prefix))
  if (route?.base) {
    // No BASE_PATH here — the media base already carries that site's own base
    // path, and this repo's base path has nothing to do with that origin.
    return `${route.base}${path}`
  }
  return `${BASE_PATH}${path}`
}

/** True when `src` will be fetched cross-origin, so callers can set attributes
 * that only matter then. Kept separate from mediaUrl so the URL stays a string. */
export function isCrossOrigin(src: string): boolean {
  return mediaUrl(src).startsWith('http')
}
