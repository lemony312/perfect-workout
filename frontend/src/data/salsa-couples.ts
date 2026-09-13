// Cuban Salsa Beginners Course *for Couples* — La Suerte Dance School, 21
// classes of partnerwork. The sibling of `salsa-steps.ts`, sharing every type
// from `salsa-types.ts` rather than redefining any of them.
//
// Provenance for every number in this file and its fragments:
//   segment boundaries + cues -> data/cache/salsa/whisper/<VIDEO_ID>.norm.json
//                                (local mlx-whisper large-v3-turbo, term-normalised,
//                                 word-level timings)
//   chapters + move lists     -> the classes' own YouTube chapters and their
//                                "we show and explain how to do:" descriptions,
//                                surfaced by scripts/analyze_salsa_couples.py.
//                                Unlike the steps course, this one is fully
//                                chaptered (197 chapters over 21 classes), so
//                                the segment boundaries are the teachers' own.
//   clip windows              -> SALSA_COUPLES_SPEC_PART{1,2,3}.md §N.3, which
//                                record the transcript event each boundary is
//                                anchored to and a trust grade.
//   class durations           -> the mp4 containers in data/cache/salsa/videos/,
//                                not the YouTube metadata. The two disagree by
//                                up to 0.5s and the container is what we cut
//                                against.
//
// Two things differ from the steps course and drive how this renders:
//
//   1. `kind: 'lead'` cues are the point. They are empty in the solo course and
//      are the whole reason charter R3 exists — a partner figure you cannot lead
//      is not learnable. Leader cues come first and are never merged with
//      follower cues (R4).
//   2. Most `fast` clips are the official per-move shorts, which are 1080x1920
//      vertical (`aspect: '9/16'`), while every class is landscape. The player
//      handles both; the clips must not be cropped to match each other.
//
// The fragments are split to mirror the three spec parts exactly (1–7, 8–14,
// 15–21), so a fragment can always be checked against one file. Class order is
// playlist order and is settled (SALSA_TAB_GOALS.md, "Decided") — never sorted
// or regrouped here.

import type { SalsaCourseData, SalsaMove, MoveId } from './salsa-types'
import { CLASSES_01_07, MOVES_01_07 } from './salsa-couples-classes/classes-01-07'
import { CLASSES_08_14, MOVES_08_14 } from './salsa-couples-classes/classes-08-14'
import { CLASSES_15_21, MOVES_15_21 } from './salsa-couples-classes/classes-15-21'

export const COUPLES_COURSE: SalsaCourseData = {
  id: 'couples',
  // Both strings are the channel's own, read from the cached playlist metadata
  // (`playlist` / `playlist_id` in data/cache/salsa/info/*.info.json) rather
  // than retyped from the page — R1: we do not invent or tidy their wording.
  title: 'Cuban Salsa - Beginners Course for Couples',
  playlistId: 'PL8hFYIpg2Jp1EJE3TCWMr0f_zr9WOi10j',
  classes: [...CLASSES_01_07, ...CLASSES_08_14, ...CLASSES_15_21],
}

export const COUPLES_MOVES: SalsaMove[] = [
  ...MOVES_01_07,
  ...MOVES_08_14,
  ...MOVES_15_21,
]

export const COUPLES_MOVES_BY_ID: Record<MoveId, SalsaMove> = Object.fromEntries(
  COUPLES_MOVES.map((m) => [m.id, m]),
)

/** Class number -> title, for search haystacks and the "Class N" captions. */
export function couplesClassTitle(n: number): string {
  return COUPLES_COURSE.classes.find((c) => c.number === n)?.title ?? `Class ${n}`
}

/**
 * Course-wide caveats, shown once under "About this course" rather than
 * repeated on every move. These are the honest limits of the source material,
 * not a to-do list — the same treatment as COURSE_FLAGS in salsa-steps.ts.
 *
 * The ids are `CC-*` ("course caveat"), NOT `GC-*`. That distinction is
 * load-bearing: the class fragments carry `GC-a`…`GC-f` on moves and cues as
 * traceability back to the spec files' course-wide *known-defect* taxonomy,
 * which is a different list with different meanings — spec `GC-a` is about the
 * Vacilala normaliser, whereas the first entry below is about missing shorts.
 * These were both `GC-*` and collided. Nothing resolved a move's `flags`
 * against this array yet, so nothing rendered wrong text, but the next thing
 * that tried would have — and spec `GC-f` had no entry here at all. Keep the
 * two namespaces apart.
 */
export const COUPLES_COURSE_FLAGS: { id: string; text: string }[] = [
  {
    id: 'CC-a',
    text:
      'Classes 1–4, 20 and 21 have no official short, so their clips are cut ' +
      'from the class video itself. Those full-tempo clips are landscape, not ' +
      'vertical, and are usually a music block that reviews earlier moves ' +
      'alongside the new one. Class 21 is the exception with no counted clip at ' +
      'all: it has no counting chapter — the whole class is one continuous ' +
      'full-tempo song — so there is nothing to cut and none was invented.',
  },
  {
    id: 'CC-b',
    text:
      'The full-tempo clips for classes 5–19 are the channel’s own per-move ' +
      'shorts. They are vertical, silent of teaching, and edited — so they show ' +
      'the move cleanly but they are not a continuous take from the class.',
  },
  {
    id: 'CC-c',
    text:
      'The teachers often count out loud over the music, so a “full tempo” clip ' +
      'is frequently not a silent demo. Where that happens the clip says so.',
  },
  {
    id: 'CC-d',
    text:
      'Several counted demos run straight through a camera-change chapter ' +
      'boundary. Those clips deliberately cross it: a camera change mid-clip is ' +
      'acceptable, losing half the counted demo is not.',
  },
  {
    id: 'CC-e',
    text:
      'Leader and follower cues are kept separate everywhere, even when the ' +
      'teachers give one instruction to both. A cue marked “both” is genuinely ' +
      'role-independent; it is never a merge of two different instructions.',
  },
]
