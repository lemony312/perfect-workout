// Intermediate Cuban Salsa Steps Course — La Suerte Dance School, 14 classes of
// solo steps. The sibling of `salsa-steps.ts` (beginners), sharing every type
// from `salsa-types.ts` rather than redefining any of them.
//
// Provenance for every number in this file and its fragments:
//   segment boundaries + cues -> data/cache/salsa/whisper/<VIDEO_ID>.norm.json
//                                (local mlx-whisper large-v3-turbo, term-normalised,
//                                 word-level timings)
//   chapters                  -> YouTube chapters where authored (classes 12–14);
//                                elsewhere, segment boundaries derived from
//                                transcript patterns (classes 1–11).
//   clip windows              -> SALSA_INTERMEDIATE_SPEC_PARTA.md and
//                                SALSA_INTERMEDIATE_SPEC_PARTB.md, which record
//                                the transcript event each boundary is anchored to.
//   class durations           -> the mp4 containers in data/cache/salsa/videos/,
//                                not the YouTube metadata.
//
// This is a solo steps course, so there are NO `kind: 'lead'` cues anywhere in
// it — all cues are `role: 'both'` and are `kind: 'footwork'`, `'rhythm'`,
// `'arms'`, `'body-movement'`, `'styling'`, `'concept'`, or `'context'`.
//
// Unlike the beginners steps course, this one has NO official shorts. Both slow
// and fast clip windows must be cut from the class video itself. All clips are
// `/clips/salsa/intermediate/steps/*.mp4`, and clip src paths come from
// CLIP_MANIFEST_INTERMEDIATE.md verbatim — never derive a filename from a move id.
//
// **Special case: Elegua (Class 11)** ships with no fast grain. The class never
// dances Elegua at full tempo; the music block reviews every earlier step instead.
// `ClipPair` has `fast: null` with `missingReason` explaining why.
//
// **Special case: Arara (Class 14)** is the only class teaching TWO steps
// (`arara-1` and `arara-2`). The teachers demonstrate them separately in 6/8
// rhythm, then combine them and adapt the combination to salsa. The three clip
// windows are shared across both moves (`shared: true`).
//
// The fragments are split to mirror the two spec parts exactly (1–7, 8–14), so
// a fragment can always be checked against one file. Class order is playlist
// order and is settled (SALSA_TAB_GOALS.md, "Decided") — never sorted or
// regrouped here.

import type { SalsaCourseData, SalsaMove, MoveId } from './salsa-types'
import { CLASSES_01_07, MOVES_01_07 } from './salsa-int-steps-classes/classes-01-07'
import { CLASSES_08_14, MOVES_08_14 } from './salsa-int-steps-classes/classes-08-14'

export const INT_STEPS_COURSE: SalsaCourseData = {
  id: `int-steps`,
  // Both strings are the channel's own, read from the cached playlist metadata
  // (`playlist` / `playlist_id` in data/cache/salsa/info/*.info.json) rather
  // than retyped from the page — R1: we do not invent or tidy their wording.
  title: `Intermediate Cuban Salsa Steps`,
  playlistId: `PL8hFYIpg2Jp0ZJ_F2fZvVnSUC59xJrOEz`,
  classes: [...CLASSES_01_07, ...CLASSES_08_14],
}

export const INT_STEPS_MOVES: SalsaMove[] = [
  ...MOVES_01_07,
  ...MOVES_08_14,
]

export const INT_STEPS_MOVES_BY_ID: Record<MoveId, SalsaMove> = Object.fromEntries(
  INT_STEPS_MOVES.map((m) => [m.id, m]),
)

/** Class number -> title, for search haystacks and the "Class N" captions. */
export function intStepsClassTitle(n: number): string {
  return INT_STEPS_COURSE.classes.find((c) => c.number === n)?.title ?? `Class ${n}`
}

/**
 * Course-wide caveats, shown once under "About this course" rather than
 * repeated on every move. These are the honest limits of the source material,
 * not a to-do list — the same treatment as COURSE_FLAGS in salsa-steps.ts.
 *
 * The ids are `IS-*` ("intermediate steps course caveat"), distinct from the
 * per-move `A<n>-*` flags in the spec files (which are traceability markers for
 * UNRESOLVED footwork paragraphs, not rendered caveats).
 */
export const INT_STEPS_COURSE_FLAGS: { id: string; text: string }[] = [
  {
    id: `IS-a`,
    text:
      `This is a solo steps course with no partnerwork. All cues are role-independent (\`role: both\`) and there are no lead cues (\`kind: lead\`) anywhere in the course.`,
  },
  {
    id: `IS-b`,
    text:
      `Classes 1–11 have no official shorts, so both slow and fast clips are cut from the class video itself. Those clips are landscape and often contain spoken count and instruction over the demo, not silent music loops. This is expected for solo steps classes — the count is the metronome.`,
  },
  {
    id: `IS-c`,
    text:
      `Classes 1–11 have auto-generated YouTube chapters (or none at all), so segment boundaries are derived from transcript word timings rather than the teachers' own chapter marks. Classes 12–14 have authored chapters (\`Table of contents / video index:\` in the description), so their segment boundaries are the teachers' own.`,
  },
  {
    id: `IS-d`,
    text:
      `Elegua (Class 11) has no fast grain. The class never dances Elegua at full tempo — the music block reviews every earlier step instead. Practise the counted demo.`,
  },
  {
    id: `IS-e`,
    text:
      `Three clips carry caveats explaining their limitations: toe-heel-cross (fast), triple-jump (fast), and pilon (fast). These are narrated or review passes — the only full-tempo demonstrations available in their classes. The caveats are honest about what you'll hear and see.`,
  },
  {
    id: `IS-f`,
    text:
      `Arara (Class 14) is the only class teaching TWO distinct steps (\`arara-1\` and \`arara-2\`). The teachers demonstrate them separately in 6/8 rhythm, then combine them and adapt the combination to salsa. The salsa-adapted clips show both steps performed together, not isolated.`,
  },
  {
    id: `IS-g`,
    text:
      `Several moves are flagged as incomplete (\`complete: false\`) with footwork paragraphs marked UNRESOLVED in the spec. These require video-open extraction to identify which foot, which beats, and how the movement works. An honest gap is worth more than a plausible guess — the move admits it is incomplete rather than inventing content.`,
  },
]
