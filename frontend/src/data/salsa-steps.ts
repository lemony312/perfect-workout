// Beginners Cuban Salsa Steps Course — La Suerte Dance School, playlist
// PL8hFYIpg2Jp1XK-ADBSd0B78_KgkdckYH (15 classes, solo footwork).
//
// Provenance for every number in this file and its fragments:
//   segment boundaries + cues -> data/cache/salsa/whisper/<VIDEO_ID>.norm.json
//                                (local mlx-whisper large-v3-turbo, term-normalised,
//                                 word-level timings)
//   clip windows             -> SALSA_STEPS_BUILD_SPEC.md §3, which records the
//                                transcript event each boundary is anchored to
//   move names + aliases     -> the class descriptions and the teachers' own
//                                spoken naming. Nothing here is translated or
//                                invented (charter R1 and the non-goals).
//
// This module is the public surface: types come from `salsa-types.ts`, the
// per-class data from the fragments under `salsa-steps-classes/`. Importers use this
// module only — `import { SALSA_MOVES, type SalsaMove } from '@/data/salsa-steps'`.
//
// The fragments are split 5 classes at a time purely for authoring: the course
// is ~22 moves and ~300 cues, and writing it in one pass proved unreliable.
// Class order within and across fragments is playlist order and is settled
// (SALSA_TAB_GOALS.md, "Decided") — do not sort or regroup here.

import type { SalsaCourseData, SalsaMove, MoveId } from './salsa-types'
import { CLASSES_01_05, MOVES_01_05 } from './salsa-steps-classes/classes-01-05'
import { CLASSES_06_10, MOVES_06_10 } from './salsa-steps-classes/classes-06-10'
import { CLASSES_11_15, MOVES_11_15 } from './salsa-steps-classes/classes-11-15'

export * from './salsa-types'

// The three runtime *values* in the types module are also re-exported by name.
// `export *` alone is correct, but some extensionless resolvers pick them up
// inconsistently, and `DRILLABLE_CUE_KINDS` being undefined at runtime would
// silently empty every drill session rather than fail loudly.
export { DRILLABLE_CUE_KINDS, youtubeLink, MUSIC_TRACKS } from './salsa-types'

export const STEPS_COURSE: SalsaCourseData = {
  id: 'steps',
  title: 'Beginners Cuban Salsa Steps Course',
  playlistId: 'PL8hFYIpg2Jp1XK-ADBSd0B78_KgkdckYH',
  classes: [...CLASSES_01_05, ...CLASSES_06_10, ...CLASSES_11_15],
}

export const SALSA_MOVES: SalsaMove[] = [
  ...MOVES_01_05,
  ...MOVES_06_10,
  ...MOVES_11_15,
]

export const MOVES_BY_ID: Record<MoveId, SalsaMove> = Object.fromEntries(
  SALSA_MOVES.map((m) => [m.id, m]),
)

/**
 * Course-wide caveats worth showing once, not per move (outlines G1–G5).
 * Rendered under "About this course" at the bottom of /salsa. These are the
 * honest limits of the source material, not TODOs.
 */
export const COURSE_FLAGS: { id: string; text: string }[] = [
  {
    id: 'G2',
    text:
      'Classes 4–14 have no YouTube chapters, so their segment boundaries are ' +
      'derived from the transcript rather than read off the video. Each one ' +
      'records the phrase it came from.',
  },
  {
    id: 'G5',
    text:
      'This course has no separate “fluently with count” chapters. The counted ' +
      'windows sit inside the teaching blocks, so they are shorter and less ' +
      'clean than the couples course’s equivalents.',
  },
  {
    id: 'G1',
    text:
      'The tempo numbers the teachers call out (140, 144, 156, 117 BPM) are ' +
      'inconsistent between classes and are not stored as data. Where a number ' +
      'matters it appears in the cue’s verbatim text, in their own words.',
  },
  {
    id: 'G3',
    text:
      'Steps are sometimes called by name before the class that teaches them — ' +
      'the Class 15 warm-up calls everything, and earlier music blocks review ' +
      'moves from previous classes.',
  },
  {
    id: 'G4',
    text:
      'Class 12 teaches a second element that its own description omits. It is ' +
      'listed here as “Step in a spot”, the only name the teachers give it — no ' +
      'Spanish name has been invented for it.',
  },
]
