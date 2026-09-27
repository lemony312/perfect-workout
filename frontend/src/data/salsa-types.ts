// Type vocabulary for the Salsa tab — La Suerte Dance School content.
//
// These types are course-agnostic on purpose. `salsa-steps.ts` populates them
// from the Beginners Cuban Salsa Steps Course; when `salsa-couples.ts` is
// written it imports the same types from here rather than redefining them, so
// one move can carry teaching sources from both courses without a migration
// (see SALSA_COUPLES_PLAN.md, "Data model must already fit").
//
// Why this is a separate file from the data, when SALSA_STEPS_BUILD_SPEC.md §1
// specifies one: the data is ~22 moves and ~300 cues, large enough that writing
// it in a single pass is unreliable. It is assembled from the per-class
// fragments under `salsa-steps/` instead, and every one of them needs these
// types. `salsa-steps.ts` re-exports all of this, so importers see one module.
//
// Music is shared with the Morning Mobility routine rather than duplicated —
// but note the salsa pages default it to OFF: these clips keep their audio
// because the spoken count is the point.
import { MUSIC_TRACKS, type MusicTrack } from './stretching-routine'

export { MUSIC_TRACKS, type MusicTrack }

// ---------------------------------------------------------------------------
// Vocabulary
// ---------------------------------------------------------------------------

/**
 * Which La Suerte playlist a class or clip came from.
 *
 * `int-couples` is not a numbered course, unlike the other four. Its playlist is
 * 22 individually-titled move videos plus 4 sequences, and the channel never
 * numbers them — so anything rendering a course label must not print
 * "Class 13" for an int-couples move. See `SALSA_INTERMEDIATE_PLAN.md` §5.
 */
export type SalsaCourse =
  | 'steps'
  | 'couples'
  | 'shorts'
  | 'body-movement'
  | 'int-steps'
  | 'int-couples'

/**
 * Normalised segment role, from the charter's chapter vocabulary.
 * `count` = demonstrated slowly with a spoken count, no music.
 * `music` = danced at tempo over music.
 */
export type SegmentRole = 'teach' | 'count' | 'music' | 'review' | 'skip'

/**
 * The teachers' own categories. They distinguish these on camera:
 * "the first step that we can call a footwork" (Class 8 @16.60) means a step
 * that breaks the 1-2-3 / 5-6-7 pattern; "instead of teaching you a new
 * footwork, we'll teach you a skill" (Class 9 @9.78) means a tool you apply to
 * other steps. `body-movement` is the bonus/drill material (Class 6).
 */
export type SalsaMoveKind = 'step' | 'turn' | 'footwork' | 'skill' | 'body-movement'

/**
 * Whose action a cue describes. `both` is for genuinely role-independent
 * instruction ("bend your knees") — it is NOT a merge of the two roles, which
 * R4 forbids. If the teachers give different instructions to leaders and
 * followers, that is two cues, never one `both` cue mentioning both hands.
 * A `both` cue must not contain a possessive limb reference that differs by role.
 */
export type CueRole = 'leader' | 'follower' | 'both'

/**
 * What kind of instruction a cue is. Drives which cues are drillable and which
 * are collapsed as background: see DRILLABLE_CUE_KINDS below.
 * `lead` is the partner hand-signal category — empty in the solo steps course,
 * and the reason R3 exists once the couples course lands.
 *
 * `body-movement` was added in the intermediate pass, where it is the whole
 * point of several classes: "the movement comes from the hip, not the shoulder"
 * is neither footwork nor `styling`. The distinction that matters is that
 * `styling` is optional decoration a dancer may skip, while body movement is
 * required technique — so the two cannot share a kind without making the drill
 * filter wrong in one direction or the other. It also already exists as a
 * `SalsaCourse` and a `SalsaMoveKind` above, so the vocabulary is not new here.
 */
export type CueKind =
  | 'footwork'
  | 'lead'
  | 'arms'
  | 'body-movement'
  | 'styling'
  | 'rhythm'
  | 'musicality'
  | 'concept'
  | 'context'

/**
 * How much we trust a value. Defaults to `transcript` for everything produced
 * by the outlines pass. Nothing is ever silently upgraded.
 *
 * - `verified`   — a human watched the video and confirmed it.
 * - `transcript` — faithfully copied from the normalised Whisper transcript,
 *                  timestamp from word-level timings, not yet eye-checked.
 * - `suspect`    — the source contradicts itself or another cue. Rendered with
 *                  a warning, and NEVER spoken aloud in drill mode.
 */
export type Confidence = 'verified' | 'transcript' | 'suspect'

export type MoveId = string

/** Cue kinds a drill session is allowed to speak. */
export const DRILLABLE_CUE_KINDS: CueKind[] = ['footwork', 'lead', 'arms', 'rhythm']

// ---------------------------------------------------------------------------
// Cues (R3, R4)
// ---------------------------------------------------------------------------

/**
 * One practisable instruction. **One action per cue** — never a whole 8-count
 * bar (see spec §5). Anchored to the beat the action starts on where the
 * teachers give one, and always to a source timestamp, which is mandatory:
 * a cue without a source is a guess and does not belong in the data (R3).
 *
 * The `LeadCue` shape required by SALSA_COUPLES_PLAN.md is this interface with
 * `beat` and `role` narrowed, so every LeadCue is already a valid SalsaCue and
 * the couples work needs no migration:
 *
 *     const c: SalsaCue = {
 *       id: 'setenta-2', beat: 3, role: 'leader', kind: 'lead',
 *       text: 'Left hand up, over her head, palm forward. Elbow soft.',
 *       sourceVideo: 'QueWxI6vMrc', sourceStart: 102,
 *       verbatim: '…', confidence: 'transcript',
 *     }
 */
export interface SalsaCue {
  id: string
  /**
   * Which beat of the eight the action starts on: 1..8. Omitted when the
   * teachers do not anchor it — definitions, styling advice and context often
   * are not beat-anchored, and inventing a beat would be a guess.
   */
  beat?: number
  /**
   * Set instead of `beat` when one instruction covers several beats — e.g.
   * Charanga's "clap also on 2, 4, 6 and 8" (Class 12 @210.30).
   */
  beats?: number[]
  /** The cue as it should be read: imperative, tightened, no filler. */
  text: string
  role: CueRole
  kind: CueKind
  /** Seconds into the source video. Mandatory (R3). */
  sourceStart: number
  sourceVideo: string
  /** The teachers' exact words, kept so the cue can be re-checked later. */
  verbatim: string
  confidence: Confidence
  /** Why this is `suspect`, or what to double-check. Rendered next to the cue. */
  warning?: string
  /** Flag id from SALSA_STEPS_OUTLINES.md, e.g. 'C7-b'. Traceability only. */
  flag?: string
}

// ---------------------------------------------------------------------------
// Clips (R2 — the "short" grain)
// ---------------------------------------------------------------------------

export interface SalsaClip {
  /** Path under /public. Several moves may point at the same file (see `shared`). */
  src: string
  sourceVideo: string
  /** Cut window, seconds into the source video. */
  start: number
  end: number
  /**
   * Aspect ratio of the source. Steps classes are all 16/9 landscape; the
   * couples course's official shorts are 9/16 vertical and must not be cropped
   * to landscape. Present now so one player handles both without a migration
   * (POSTURE_ROUTINE_PLAN.md step 4 hit exactly this).
   */
  aspect: '16/9' | '9/16'
  /** Overrides the plain "Slow" / "Full tempo" label under the player. */
  label?: string
  /**
   * Why this window is imperfect — teacher talking over it, deliberately slow
   * music, a neighbouring move drifting into the last seconds. Always rendered,
   * never hidden. Honesty beats tidiness.
   */
  caveat?: string
  confidence: Confidence
  /** true when the file was cut for another move and is reused here. */
  shared?: boolean
}

/**
 * The short grain, in both tempos. R2 wants both: a counted demo you can
 * follow and a full-tempo demo you dance to. `slow` is nullable because the
 * Class 15 warm-up is one continuous full-tempo song with no counted passage
 * anywhere in it — do not synthesise one.
 */
export interface ClipPair {
  slow: SalsaClip | null
  fast: SalsaClip | null
  /** Required when either side is null: why, and what to do instead. */
  missingReason?: string
  /** Extra windows kept for the review page. Not published by default. */
  alternates?: SalsaClip[]
}

// ---------------------------------------------------------------------------
// Classes and segments
// ---------------------------------------------------------------------------

export interface ClassSegment {
  /** Stable id, e.g. 'c11-count-cross-slide'. Referenced by TeachingSource. */
  id: string
  start: number
  end: number
  role: SegmentRole
  label: string
  /** Which moves this segment is about. Empty for intro/outro. */
  moves: MoveId[]
  /**
   * The verbatim transcript phrase or chapter title the boundary came from.
   * Never a round number chosen for tidiness — 11 of the 15 classes have no
   * usable YouTube chapters at all, so every boundary is earned.
   */
  provenance: string
  /**
   * Set on `count` windows that sit *inside* a `teach` block. This course has
   * no separate "fluently with count" chapters, unlike the couples course.
   */
  nestedIn?: string
  /** true for the music blocks that also review earlier classes' steps. */
  reviewsEarlierMoves?: boolean
  confidence: Confidence
  warning?: string
}

/** Class 15 only: the teachers calling each step by name over one song. */
export interface CallSheetEntry {
  at: number
  /** Verbatim call, including manglings ("basic sign", "Exhibit and"). */
  call: string
  /** Resolved move, where the call is unambiguous. */
  move?: MoveId
  note?: string
}

export interface SalsaClass {
  course: SalsaCourse
  /** Playlist position. The presentation order, always (charter, "Decided"). */
  number: number
  title: string
  videoId: string
  /** Seconds, from the container — matches data/cache/salsa/videos/<id>.mp4. */
  duration: number
  /** true when YouTube chapters were usable; false when boundaries are derived. */
  chaptered: boolean
  teaches: MoveId[]
  segments: ClassSegment[]
  callSheet?: CallSheetEntry[]
  /** A clip of the class itself, where the class is not a single move (Class 15). */
  clip?: SalsaClip
  /** Flag ids from the outlines, e.g. ['C2-a', 'C2-b']. */
  flags?: string[]
}

export interface SalsaCourseData {
  id: SalsaCourse
  title: string
  playlistId: string
  /** Playlist order. Never sorted, never regrouped in the data. */
  classes: SalsaClass[]
}

// ---------------------------------------------------------------------------
// Moves (R1, R2)
// ---------------------------------------------------------------------------

/**
 * One move as taught in one place. A move taught solo in the steps course and
 * partnered in the couples course has two of these — one move, two teaching
 * sources, which is what `Enchufla` and `Exhibela` need (steps 4/5, couples
 * 4/10). Clips hang off the source, not the move, because each source films it
 * differently.
 */
export interface TeachingSource {
  course: SalsaCourse
  classNumber: number
  videoId: string
  /** Deep-link second for the LONG grain: the start of the teach block. */
  teachStart: number
  /** ClassSegment ids belonging to this move. */
  segmentIds: string[]
  clips: ClipPair
  note?: string
}

export interface SalsaMove {
  id: MoveId
  /** Canonical name, spelled as the channel writes it (R1). Never translated. */
  name: string
  /**
   * Everything a name search must match: the teachers' own inconsistent
   * spellings and Whisper's manglings. This is what makes R1 hold — Class 5
   * says "exibela" ten times and "exhibela" zero.
   */
  aliases: string[]
  kind: SalsaMoveKind
  /**
   * Presentation-only grouping — e.g. 'turns' surfaces the
   * {right,left} x {side, front-and-back} matrix spread over classes 2, 3, 4.
   * Grouping never reorders the course (charter, "Decided").
   */
  group?: string
  /** One line, shown in search results. */
  summary: string
  /** The footwork paragraph: what the feet actually do, over which beats. */
  footwork: string
  /** The basic this move modifies, where it modifies one. */
  base?: MoveId
  /** Moves this one is built from (double right turn = right turn + hook turn). */
  composedOf?: MoveId[]
  /**
   * A rule from another class that this move suspends. Quick 5 explicitly
   * overrides Class 6's "arms move with the foot" rule; without modelling it,
   * the two cues read as contradicting each other.
   */
  exceptions?: {
    text: string
    overrides: MoveId
    sourceVideo: string
    sourceStart: number
  }[]
  /**
   * Taught material that is real but not clippable — no counted window exists
   * for it. Keeps the deep link so nothing is lost (Class 1's "transitions
   * between both directions", 320–398).
   */
  notes?: { text: string; sourceVideo: string; sourceStart: number }[]
  cues: SalsaCue[]
  sources: TeachingSource[]
  /**
   * false when a grain is still missing. R2 says a move is not done until all
   * three exist; the page shows an honest badge rather than pretending.
   */
  complete: boolean
  /** Flag ids from SALSA_STEPS_OUTLINES.md. */
  flags?: string[]
}

/** Deep link to a second in a source video — the R3 "check it yourself" link. */
export const youtubeLink = (videoId: string, seconds: number) =>
  `https://youtu.be/${videoId}?t=${Math.floor(seconds)}`
