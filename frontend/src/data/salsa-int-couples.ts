// Intermediate Salsa Moves for **Couples** — La Suerte Dance School, 22 partner
// moves plus 4 multi-move sequences. The sibling of `salsa-int-steps.ts`, sharing every
// type from `salsa-types.ts`.
//
// Provenance for every number in this file and its fragments:
//   SALSA_INTERMEDIATE_SPEC_PARTC.md (positions 1-13)
//   SALSA_INTERMEDIATE_SPEC_PARTD.md (positions 15-20, 24, 27, 31)
//   SALSA_INTERMEDIATE_SPEC_PARTE.md (4 sequences)
//   SALSA_INTERMEDIATE_CUES_ic-*.md (13 cue files)
//   CLIP_MANIFEST_INTERMEDIATE.md (all clip paths and metadata)
//
// **This is not a numbered course.** Unlike the beginners courses, this playlist has
// no class numbers — it's 22 individually-titled move videos plus 4 sequences. The
// channel never numbers these. The `classNumber` field uses playlist position, NOT a
// class number, and no UI may render "Class 13" for a move in this course.
//
// **Every move in this course is now clipped.** Positions 2-7 (Balsero, Tiramisu
// Complicado, La Botella, Setenta Complicado, El Dos, Paseala Complicado) were the
// last to arrive and were the hard ones: their videos carry auto-generated YouTube
// chapters or none at all, so there was no chapter boundary to read a window off.
// Each of their 12 windows was derived from the Whisper word timings instead and is
// logged as a trust-D departure in the audit for exactly that reason — the boundary
// is a real word timing, but it was chosen rather than published.
//
// **This course has no segment data.** There is no `SalsaCourseData` export here
// and no `ClassSegment[]` anywhere, because the moves are standalone videos
// rather than classes with a count/music structure. The `segmentIds` on each
// TeachingSource are therefore names with nothing to resolve against — positions
// 2-7 carry `[]`, and the rest carry ids no module defines. Having clips does not
// change that: a clip is a start and an end in a file, a segment is a named block
// of a class, and this course has the former and not the latter. The page must not try
// to look them up: `youtubeLink(videoId, teachStart)` is the only deep link this
// course can honestly offer. Do not fabricate windows here to make the pages look uniform — a window
// invented in this file would have no transcript anchor behind it, and the clip
// audit that guards every other window (scripts/extract_intermediate_clip_windows.py)
// reads the specs, not this module, so it could not catch one.

import type { SalsaMove, MoveId } from './salsa-types'
import { MOVES_PARTC } from './salsa-int-couples-moves/partc'
import { MOVES_PARTD } from './salsa-int-couples-moves/partd'
import { SEQUENCES_PARTE } from './salsa-int-couples-moves/parte'

export const INT_COUPLES_MOVES: SalsaMove[] = [...MOVES_PARTC, ...MOVES_PARTD, ...SEQUENCES_PARTE]

export const INT_COUPLES_MOVES_BY_ID: Record<MoveId, SalsaMove> = Object.fromEntries(
  INT_COUPLES_MOVES.map((m) => [m.id, m]),
)

/**
 * The 4 multi-move sequences, as ids. Derived from the PARTE export rather than
 * matched on name or `kind`, because they carry `kind: 'step'` like everything
 * else — a sequence is not a distinct move kind, it is a combination of moves,
 * and the only authority on which entries are sequences is which spec they came
 * from. A page that needs to list them apart from the 22 single moves should test
 * membership here, not parse names for the word "sequence".
 */
export const INT_COUPLES_SEQUENCE_IDS: ReadonlySet<MoveId> = new Set(
  SEQUENCES_PARTE.map((m) => m.id),
)

/**
 * Playlist position -> move name, for search haystacks and captions.
 *
 * **This is not a class-number lookup.** The intermediate couples playlist has no
 * class numbers — it's a collection of individually-titled move videos. The position
 * is the video's place in the playlist, not a course progression number.
 */
export function intCouplesMoveName(position: number): string {
  const move = INT_COUPLES_MOVES.find((m) =>
    m.sources.some((s) => s.course === 'int-couples' && s.classNumber === position),
  )
  return move?.name ?? `Position ${position}`
}

/**
 * Course-level caveats, shown once under "About this course" rather than repeated
 * on every move. These are honest limits of the source material, not a to-do list.
 *
 * Positions 1-7: Sombrero Complicado through Paseala Complicado.
 * Positions 8-13: Sombrero por Debajo through Montaña.
 * Positions 15-20, 24, 27, 31: Chocolate through Chihuahua (9 moves).
 * Positions 14, 21, 22, 25: The 4 sequences.
 */
export const INT_COUPLES_COURSE_CAVEATS: { id: string; text: string }[] = [
  {
    id: `ICC-a`,
    text:
      `This is not a numbered course. The channel never numbers these move videos — they are a playlist of 22 individually-titled partner moves plus 4 multi-move sequences. Position numbers shown are playlist order, not class numbers.`,
  },
  {
    id: `ICC-b`,
    text:
      `Six moves (positions 2-7: Balsero, Tiramisu Complicado, La Botella, Setenta Complicado, El Dos, Paseala Complicado) come from videos with auto-generated chapters or none at all, so their clip windows were derived from the spoken count in the transcript rather than read off a published chapter. The boundaries are real word timings, but they were chosen — expect a clip to occasionally start a beat early or run a beat long. Everything else about them is the same as the rest of the course.`,
  },
  {
    id: `ICC-c`,
    text:
      `Positions 8-31 (Sombrero por Debajo onwards) have authored chapters, with "Table of contents / video index:" blocks in their descriptions — the teachers published the boundaries themselves, so the clip windows for these are quoted rather than derived.`,
  },
  {
    id: `ICC-d`,
    text:
      `Most fast clips are official shorts: vertical (9/16 aspect), music-only, no spoken cues. Eight moves have no short — positions 3 and 6 (Tiramisu Complicado, El Dos) and positions 15-20 — so their fast clips are cut from the music section of the main video instead: landscape 16/9, and the teachers are still counting over the music, so full tempo but not silent. Each of those carries a caveat on the clip itself.`,
  },
  {
    id: `ICC-e`,
    text:
      `The 4 sequences (Casino con Estilo, Casino con Estilo 2, Salsa con Rumba, Aguajea + Caminala) are multi-move combinations, not single moves. Each has one slow/fast clip pair for the complete sequence. Salsa con Rumba has two clips that legitimately exceed the 52s length ceiling (67.64s and 124.0s) because one complete run of the 4-part sequence does not fit.`,
  },
  {
    id: `ICC-f`,
    text:
      `All cues are extracted from normalized Whisper transcripts (local mlx-whisper large-v3-turbo, word-level timings). Confidence is "transcript" for everything — nobody has watched the videos to verify. Timestamps are from the transcript, never invented or rounded.`,
  },
]
