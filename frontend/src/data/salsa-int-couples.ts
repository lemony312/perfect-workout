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
// Positions 2-7 (Balsero, Tiramisu Complicado, La Botella, Setenta Complicado,
// El Dos, Paseala Complicado) are marked `complete: false`: they have cues but no
// clips. The reason is upstream of this file — no clip windows were ever specified
// for them. SALSA_INTERMEDIATE_SPEC_PARTC.md says so plainly in its closing
// section: positions 8-13 have chapter-grade windows, position 1 demonstrates the
// pattern for an auto-generated-chapter video, and "full completion of positions
// 2-7 ... was not completed within the agent's time budget. No values were
// guessed."
//
// So these six render with their cues, their segment map and a deep link to the
// source video, and say honestly that no clip exists yet. That is the accurate
// state. Do not fabricate windows here to make the pages look uniform — a window
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
      `Six moves (positions 2-7: Balsero, Tiramisu Complicado, La Botella, Setenta Complicado, El Dos, Paseala Complicado) have cues but no clips yet, and are marked incomplete. Their videos carry auto-generated YouTube chapters or none at all, so no clip windows have been specified for them — position 1 shows what an auto-generated-chapter video looks like once it has been worked through. You get the cues, the segment map and a link into the source video; the clips will follow.`,
  },
  {
    id: `ICC-c`,
    text:
      `Positions 8-31 (Sombrero por Debajo onwards) have authored chapters, with "Table of contents / video index:" blocks in their descriptions. These are fully clipped and complete.`,
  },
  {
    id: `ICC-d`,
    text:
      `Most fast clips (positions 8-13, 24, 27, 31) are official shorts: vertical (9/16 aspect), music-only, no spoken cues. Positions 15-20 have no official shorts, so their fast clips are cut from the music chapters of the main videos (landscape 16/9).`,
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
