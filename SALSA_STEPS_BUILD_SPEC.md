# Beginners Cuban Salsa Steps Course — build spec

> **Status: decided, not built.** This is the implementation contract for the
> solo-steps half of the Salsa tab. Charter: `SALSA_TAB_GOALS.md` (requirements
> R1–R5). Primary research input: `SALSA_STEPS_OUTLINES.md`. Deferred sibling:
> `SALSA_COUPLES_PLAN.md`.
>
> Everything a coding agent needs to build is inlined here: the full TypeScript
> model, the full clip window table with exact seconds and output filenames, the
> page structure, and the rules for the known data defects. The one thing that
> is *not* inlined is the ~300 verbatim cue strings — those are bulk data, and
> §7 gives the transfer rules for lifting them out of the outlines' per-class
> "Cues" tables.

---

## 0. Decisions at a glance

| # | Question | Decision |
|---|---|---|
| 1 | Data model | One file, `frontend/src/data/salsa-steps.ts`. Normalised into a **move index** (`SALSA_MOVES`) joined to a **class list** (`STEPS_COURSE.classes`) by id. Clips hang off a *teaching source*, not off the move, so one move can be taught in several classes and courses. Full interfaces in §1. |
| 2 | Clip windows | 22 moves × slow + fast. All windows exact, all cuttable, in §3. 43 distinct files + 1 class clip. Class 15 has **no slow window** and is not a move. |
| 3a | Cue granularity | **One action = one cue**, anchored to the beat the action starts on. Not one cue per 8-count bar. §5. |
| 3b | Session shape | **Browse-and-loop reference is the default; the timed drill is a mode reached by one button.** §6. |
| 4 | Page | Single route `/salsa`, client-side state in the query string. Search-first landing, one player with a `Slow / Slow→Fast / Full tempo` control (default `Slow→Fast`, so both are always shown), cue panel that can never be collapsed. §8. |
| — | Long grain | YouTube deep links (`youtu.be/<id>?t=<s>`). We do **not** self-host the 15 full classes — 1.2 GB. |
| — | Short grain | Self-hosted h264/aac clips in `frontend/public/clips/salsa/moves/`, **audio kept**. |
| — | Music | Off by default on the salsa pages. The clip's own count *is* the metronome. `MUSIC_TRACKS` is re-exported so the toggle exists. |

---

## 1. The data model

**File: `frontend/src/data/salsa-steps.ts`.** Types and data together, matching
the house style (`frontend/src/data/posture-routine.ts`). The types below are
course-agnostic on purpose: when `salsa-couples.ts` is written it imports and
re-exports them from here, exactly as `posture-routine.ts` imports and
re-exports `MUSIC_TRACKS` from `stretching-routine.ts`.

Two helper modules, both thin:

| File | Contents |
|---|---|
| `frontend/src/lib/salsa-search.ts` | `searchMoves()` — the R1 name/alias matcher (§8.2) |
| `frontend/src/lib/salsa-drill.ts` | `buildDrill()` — the zero-choice session builder (§6.3) |

```ts
// Beginners Cuban Salsa Steps Course — La Suerte Dance School, playlist
// PL8hFYIpg2Jp1XK-ADBSd0B78_KgkdckYH (15 classes, solo footwork).
//
// Provenance for every number in this file:
//   segment boundaries + cues -> data/cache/salsa/whisper/<VIDEO_ID>.norm.json
//                                (local mlx-whisper large-v3-turbo, term-normalised,
//                                 word-level timings)
//   clip windows             -> SALSA_STEPS_BUILD_SPEC.md §3, which records the
//                                transcript event each boundary is anchored to
//   move names + aliases     -> the class descriptions and the teachers' own
//                                spoken naming. Nothing here is translated or
//                                invented (charter R1 and the non-goals).
//
// Music is shared with the Morning Mobility routine rather than duplicated —
// but note the salsa pages default it to OFF: these clips keep their audio
// because the spoken count is the point.
import { MUSIC_TRACKS, type MusicTrack } from './stretching-routine'

export { MUSIC_TRACKS, type MusicTrack }

// ---------------------------------------------------------------------------
// Vocabulary
// ---------------------------------------------------------------------------

/** Which La Suerte playlist a class or clip came from. */
export type SalsaCourse = 'steps' | 'couples' | 'shorts' | 'body-movement'

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
 */
export type CueKind =
  | 'footwork'
  | 'lead'
  | 'arms'
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

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const STEPS_COURSE: SalsaCourseData = { /* §2, §4 */ } as SalsaCourseData
export const SALSA_MOVES: SalsaMove[] = [ /* §2 */ ]
export const MOVES_BY_ID: Record<MoveId, SalsaMove> = Object.fromEntries(
  SALSA_MOVES.map((m) => [m.id, m]),
)

/** Course-wide caveats worth showing once, not per move (outlines G1–G5). */
export const COURSE_FLAGS: { id: string; text: string }[] = [ /* §7.3 */ ]

/** Deep link to a second in a source video — the R3 "check it yourself" link. */
export const youtubeLink = (videoId: string, seconds: number) =>
  `https://youtu.be/${videoId}?t=${Math.floor(seconds)}`
```

### 1.1 Why this shape

- **Move index keyed by name + aliases** satisfies R1 and makes the search test
  (§8.2) a pure string match over local data — no network, no fuzzy library.
- **Three grains are three different fields**: `sources[].teachStart` (long,
  YouTube), `sources[].clips` (short, self-hosted), `cues` (cue). A move with a
  hole in any of them sets `complete: false` and says so on screen.
- **`role` is on the cue, never on a merged blob.** `both` exists because most
  solo-footwork instruction is genuinely role-independent; the renderer still
  sections leader / follower / both separately so "your left hand" is never
  ambiguous (R4).
- **Uncertainty is a first-class field.** `Confidence` plus `warning` on cues,
  clips and segments is how the known defects reach the screen instead of being
  papered over. §7 gives the per-defect rules.
- **Clips on the teaching source** is the join that makes "one move, many
  teaching sources" work without a later migration (couples plan §6).

---

## 2. The move index — 22 moves

Playlist order. `group` is presentation only. `base` is the basic the move
modifies. Aliases include every mangling the outlines' alias table recorded, so
name search survives Whisper's phonetics.

| id | Canonical name (R1) | kind | group | base | Class | Aliases to ship |
|---|---|---|---|---|---|---|
| `basic-side` | Basic to the side | step | basics | — | 1 | basic side, basic step to the side, **basic sign** |
| `basic-front-and-back` | Basic front and back | step | basics | — | 1 | basic front and back, front and back basic, and front |
| `right-turn-side` | Right turn (from the basic side) | turn | turns | `basic-side` | 2 | right turn, basic right turn |
| `left-turn-side` | Left turn (from the basic side) | turn | turns | `basic-side` | 2 | left turn |
| `right-turn-front-back` | Right turn (from the basic front and back) | turn | turns | `basic-front-and-back` | 2 | right turn front and back |
| `hook-turn` | Hook turn | turn | turns | `basic-front-and-back` | 3 | hook turn, hook |
| `double-right-turn` | Double right turn | turn | turns | `basic-front-and-back` | 3 | double right turn, double right |
| `enchufla` | Enchufla | step | — | `basic-side` | 4 | **choupla**, **Shufla**, And Shufla, enchufla rotate |
| `left-turn-front-back` | Left turn (from the basic front and back) | turn | turns | `basic-front-and-back` | 4 | left turn front and back |
| `exhibela-crossing` | Exhibela crossing | step | — | — | 5 | Exhibela, **exibela**, **exit below**, **like Zibela**, **Exhibit and**, exhibela side and cross |
| `basic-body-movement` | Basic body movement | body-movement | drills | — | 6 | body movement, hips, ribcage, arms |
| `mambo-cubano` | Mambo Cubano | footwork | — | — | 7 | **Mamba Cubano**, **manpo cubano**, **Mambo Kumano** |
| `three-two-one` | Three, Two, One | footwork | — | `basic-front-and-back` | 8 | **3 to 1**, **3 2 1**, **three to one** |
| `tapping` | Tapping | skill | skills | — | 9 | tap, taps, tapping |
| `tapping-on-8` | "Tapping on 8" footwork | footwork | — | `basic-front-and-back` | 10 | tap on eight, tapping on eight, tap on 8 |
| `cross-front-and-back` | Cross front and back | step | crosses | `basic-front-and-back` | 11 | cross, just cross, crossing front and back |
| `cross-and-slide` | Cross and slide | step | crosses | `cross-front-and-back` | 11 | cross slide, hop and slide |
| `cross-slide-cha-cha-cha` | Cross, slide, cha cha cha | step | crosses | `cross-and-slide` | 11 | cha cha cha, triple step |
| `charanga` | Charanga | step | — | — | 12 | charanga, side and clap |
| `step-in-a-spot` | Step in a spot | step | — | `basic-side` | 12 | step in a spot, spot, dancing in a spot, stepping spot |
| `cuban-rumba-basic` | Cuban Rumba Basic | step | — | — | 13 | rumba, Rumba Guaguancó, guaguanco |
| `quick-5` | Quick 5 | footwork | — | `basic-front-and-back` | 14 | quick five, quick 5 |

Composition and exception edges to encode:

| Move | Field | Value |
|---|---|---|
| `double-right-turn` | `composedOf` | `['right-turn-front-back', 'hook-turn']` — "if we combine right turn and hook turn, we'll get double right turn" (C3 @130.98) |
| `cross-and-slide` | `composedOf` | `['cross-front-and-back']` |
| `cross-slide-cha-cha-cha` | `composedOf` | `['cross-and-slide']` |
| `tapping-on-8` | `composedOf` | `['tapping', 'basic-front-and-back']` |
| `three-two-one` | `composedOf` | `['basic-front-and-back']` |
| `quick-5` | `exceptions` | "In Quick 5 the arms do *not* follow the feet — swing both arms with the direction of movement instead." overrides `basic-body-movement`, `tlUegbWymak` @303.26 |
| `tapping` | `exceptions` | "Tapping applies only to steps on the 1-2-3 / 5-6-7 rhythm — not to Rumba, and Mambo Cubano already has taps." overrides `cuban-rumba-basic` and `mambo-cubano`, `k4H5m9hJ_nA` @345.66 |
| `basic-side`, `basic-front-and-back` | `notes` | "Transitions between the two directions: finish a full side basic, then start the front-and-back on the next 1; going back, do one full front-and-back and open on 7 with the right." `Bah_PB9Ga4A` @322.72 / @361.64 |

Three deliberate exclusions from the move index:

| Not a move | Why |
|---|---|
| Class 1's "Transitions between both directions" (320–398) | Really taught, but there is no counted window inside it, so it can never have a short grain. Making it a move would ship a permanent R2 violation. It becomes `notes` on both basics, keeping its deep link (flag C1-a resolved). |
| Class 6 as a *step* | It is body-movement drilling, indexed as `kind: 'body-movement'`, `group: 'drills'` — it keeps its position as class 6 in the sequence but is presented with the drills, per R5 (flag C6-a). |
| Class 15 "Salsa warm-up" | A review class, not a move. It becomes a `SalsaClass` with a `callSheet` and a class `clip`. Its value is as a call sheet: a timestamped list of which step is danced when, in the teachers' own naming (flag C15-d). |

**`left-turn-side` is in this index even though the outlines' summary clip table
omits it.** The Class 2 segment map does teach it (teach block 213.4–280.1,
nested count 241.2–280.1, cue "Left turn works exactly the same but it's in
different time in space and in the rhythm" @213.44) — the summary table just
dropped the row. Building from that table alone would lose a move.

---

## 3. Clip windows — final, all cuttable

Every row below is a concrete cut. Source videos are already downloaded at
`data/cache/salsa/videos/<VIDEO_ID>.mp4` — all 15 verified **h264 / aac /
1280x720 / 30 fps**, so no codec conversion is forced, but keyframe-accurate
cutting still requires a re-encode.

Output directory: **`frontend/public/clips/salsa/moves/`** (precedent:
`frontend/public/clips/posture/moves/`, `.../stretching/moves/`). Filenames are
`<move-slug>-slow.mp4` / `<move-slug>-fast.mp4`. The one class-level clip goes
one level up at `frontend/public/clips/salsa/warm-up-review.mp4`, mirroring
`clips/posture/fix-bad-posture.mp4`.

Trust column:

| | Meaning |
|---|---|
| **A** | Both boundaries land on a transcript event or segment boundary (word-level timings). Cut as given. |
| **D** | One boundary anchored, the other derived to end the phrase or clear the next move. Cut as given, eyeball once. |
| **V** | Contains something worth knowing about — see the note. Still cut as given. |

### 3.1 Slow clips (counted demo, no music)

| # | Move | Class | Video | In | Out | Len | File | Trust | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `basic-side` | 1 | `Bah_PB9Ga4A` | 137.6 | 166.4 | 28.8 | `basic-side-slow.mp4` | D | Anchored @137.58 "so five six seven left cheeky cheeky left…"; both halves, spoken rhythm. |
| 2 | `basic-front-and-back` | 1 | `Bah_PB9Ga4A` | 250.9 | 272.4 | 21.5 | `basic-front-and-back-slow.mp4` | D | Anchored @250.94 "front, back together, and back, front together". |
| 3 | `right-turn-side` | 2 | `4qMJzwT6xPM` | 187.8 | 211.6 | 23.8 | `right-turn-side-slow.mp4` | D | Cue @185.82 "Let's try to do it slowly together"; ends before the 213.4 teach boundary. |
| 4 | `left-turn-side` | 2 | `4qMJzwT6xPM` | 241.2 | 280.1 | 38.9 | `left-turn-side-slow.mp4` | A | Anchored @241.18 "5, 6, 7, cheeky, cheeky, left" → the 280.1 teach boundary. Longest slow clip; inside R2's 23–47s band. |
| 5 | `right-turn-front-back` | 2 | `4qMJzwT6xPM` | 341.1 | 365.4 | 24.3 | `right-turn-front-back-slow.mp4` | D | Anchored to the 341.08 segment end (@337.0 "okay, let's travel front and back"). |
| 6 | `hook-turn` | 3 | `FUB6hqwNo0o` | 83.0 | 99.1 | 16.1 | `hook-turn-slow.mp4` | V | **Shortest clip in the set.** Anchored @81.24 "Let's do one, two, three and then hook turn" → cue @99.08. Under the 23s reference floor; extend by eye toward 105.0 if a longer loop is wanted, but do not pad blind. |
| 7 | `double-right-turn` | 3 | `FUB6hqwNo0o` | 149.5 | 176.8 | 27.3 | `double-right-turn-slow.mp4` | A | Anchored @149.48 "…double, right turn, watch us slowly". |
| 8 | `enchufla` | 4 | `seH4eLK_S6o` | 83.3 | 100.5 | 17.2 | `enchufla-slow.mp4` | V | Anchored @83.32 "And again, back, front and open…". 17.2s, under the floor. Alternate: 120.6→149.6. |
| 9 | `left-turn-front-back` | 4 | `seH4eLK_S6o` | 217.2 | 245.0 | 27.8 | `left-turn-front-back-slow.mp4` | A | Anchored @217.16 "1, 2, 3, with numbers, hop, left, turn" → 244.90 segment end. |
| 10 | `exhibela-crossing` | 5 | `WMgTtp-CRaQ` | 78.2 | 102.6 | 24.4 | `exhibela-crossing-slow.mp4` | A | Anchored @78.04 "Let's do it. 5, 6, 7, go." Footwork only, before the arms are added — the cleanest look at the crossing. |
| 11 | `basic-body-movement` | 6 | `U454lXjpKi8` | 645.6 | 668.7 | 23.1 | `basic-body-movement-slow.mp4` | D | Cue @639.72 "all basic steps, front and back, arms, ribcage, hips, and knees" — all four layers at once. |
| 12 | `mambo-cubano` | 7 | `FNuS26xguaI` | 306.6 | 335.3 | 28.7 | `mambo-cubano-slow.mp4` | A | The 306.56–335.30 count run (@305.74 "Let's do our step"). With arms and styling. |
| 13 | `three-two-one` | 8 | `E8Y7VwC4ODY` | 152.0 | 187.1 | 35.1 | `three-two-one-slow.mp4` | A | @146.70 "okay very slowly but fluently" → cue @187.10. Best count window in the course. |
| 14 | `tapping` | 9 | `k4H5m9hJ_nA` | 133.8 | 158.6 | 24.8 | `tapping-slow.mp4` | A | Tap added to the side basic → cue @158.58. Contains @140.14 "and suddenly this step looks a lot more Latin" — the point of the class. |
| 15 | `tapping-on-8` | 10 | `nOABL5GW_qk` | 61.9 | 95.1 | 33.2 | `tapping-on-8-slow.mp4` | A | @60.06 "I'll start from basic" and @78.16 "And we can loop it. Tap, step, open, close." → cue @95.10. Cleanest count window in the course. |
| 16 | `cross-front-and-back` | 11 | `8b0zqIk1AHE` | 74.4 | 97.2 | 22.8 | `cross-front-and-back-slow.mp4` | A | Anchored @74.40 → the 97.18 teach boundary. |
| 17 | `cross-and-slide` | 11 | `8b0zqIk1AHE` | 126.4 | 150.7 | 24.3 | `cross-and-slide-slow.mp4` | A | Anchored @126.38 "1, 2, 3 and tap together, open, close and tap". |
| 18 | `cross-slide-cha-cha-cha` | 11 | `8b0zqIk1AHE` | 246.0 | 272.5 | 26.5 | `cross-slide-cha-cha-cha-slow.mp4` | A | Anchored @246.04 "now triple step cha-cha-cha…" → the 272.5 boundary. |
| 19 | `charanga` | 12 | `Gy8jEBggrLc` | 189.5 | 210.3 | 20.8 | `charanga-slow.mp4` | A | Anchored @189.54 → @210.30 (the clap instruction). Open-close pattern clearly visible. |
| 20 | `step-in-a-spot` | 12 | `Gy8jEBggrLc` | 62.9 | 93.3 | 30.4 | `step-in-a-spot-slow.mp4` | A | Anchored @62.86 "let's think about feet…" → @93.28. Feet only, before the upper body is added. |
| 21 | `cuban-rumba-basic` | 13 | `ZArlfy9EakM` | 344.2 | 368.0 | 23.8 | `cuban-rumba-basic-slow.mp4` | D | @340.26 "let's try to combine it with salsa step one more time". The salsa→rumba→salsa transition — more useful than the isolated basic, because the *entry* is the hard part. |
| 22 | `quick-5` | 14 | `tlUegbWymak` | 145.4 | 188.3 | 42.9 | `quick-5-slow.mp4` | A | Anchored @145.40 "Five, six, a bit faster". The step run repeated while the tempo is raised — the tempo contrast *is* Quick 5, and you can hear it happen. |

### 3.2 Fast clips (full tempo, with music)

| # | Move | Class | Video | In | Out | Len | File | Trust | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `basic-side` | 1 | `Bah_PB9Ga4A` | 414.2 | 448.7 | 34.5 | `basic-side-fast.mp4` | V | **Corrected from the outlines' 412.0→448.0.** Word timings show the teacher is still talking at 412.0 ("…put it in slower motion") and counting in at 410.2–413.9; the dancing run is 414.2 ("3 5 6 7 1 2 3…") to 437.1, then "basic side" is explicitly re-called @437.8 and the front-and-back begins @448.76. Caveat to ship: the first ~23s is not verbally identified as side vs front — verify by eye. |
| 2 | `basic-front-and-back` | 1 | `Bah_PB9Ga4A` | 448.8 | 460.6 | 11.8 | `basic-front-and-back-fast.mp4` | V | **Corrected from the outlines' 448.8→485.1.** Word timings: "let's go front with a left hop" @448.76, then "and basic side" @~458 and the 460.60–485.10 segment is all side basic ("cheeky cheeky left, and cheeky cheeky right"). Class 1's music block only spends ~12s on the front-and-back basic. Ship the 11.8s clip with a `caveat`, set `complete: true` (all three grains exist), and log a follow-up to extend by eye if the dancers are in fact still travelling front-and-back after 460.6. Do not stretch the window on the transcript's evidence — it says the opposite. |
| 3 | `right-turn-side` | 2 | `4qMJzwT6xPM` | 371.3 | 400.0 | 28.7 | `right-turn-side-fast.mp4` | A | Dancing from @371.26. Word-anchored calls: "right turn" @381.26, "left turn" @386.42, "right turn" @394.96. |
| 4 | `left-turn-side` | 2 | `4qMJzwT6xPM` | 371.3 | 400.0 | 28.7 | `right-turn-side-fast.mp4` (**shared**) | A | **Shared file, marked `shared: true`.** The left turn is called at 386.42 and again at 400.16, so no contiguous left-turn-only window exists inside the music review. Reusing the class-2 window with the label "Class 2 music review — side basic, right turn @9.9s, left turn @15.1s into the clip" is honest; inventing a window would not be. |
| 5 | `right-turn-front-back` | 2 | `4qMJzwT6xPM` | **409.1** | **442.9** | 33.8 | `right-turn-front-back-fast.mp4` | A | **New window; the outlines only said "(within 371.3 → 452.7)".** Resolved from word-level timings in `4qMJzwT6xPM.norm.json`: "front and back, let's start forward" @409.08–411.06, two plain front-and-back basics (411.4, 416.1), then three right turns from it — "and right, turn, go" @419.80 with the foot count "left right left right back six seven one" @421.5–424.9, "right turn, go and hop" @426.40, "right turn, one more time, let's go" @436.04 — then "basic side" @442.90 ends it. Start 409.1 and end 442.9 are both word-anchored. |
| 6 | `hook-turn` | 3 | `FUB6hqwNo0o` | 264.9 | 296.6 | 31.7 | `hook-turn-fast.mp4` | A | Three hook turns: @264.86 "And hook, turn, 1, cross, right, left, front", @273.96 "The same again, hook turn", "hook turn again"; ends at the 296.56 "double right turn" call. |
| 7 | `double-right-turn` | 3 | `FUB6hqwNo0o` | 296.6 | 316.9 | 20.3 | `double-right-turn-fast.mp4` | A | Called by name @296.56 and @306.46; ends @316.90 ("5 6 7 and small review"). |
| 8 | `enchufla` | 4 | `seH4eLK_S6o` | 274.4 | **301.9** | 27.5 | `enchufla-fast.mp4` | A | The 274.40–301.88 segment is exactly the Enchufla block ("and Enchufla rotate back, with left back, back cheeky cheek…"). End trimmed from the outlines' 302.0 to the 301.88 segment boundary. |
| 9 | `left-turn-front-back` | 4 | `seH4eLK_S6o` | 309.8 | **335.1** | 25.3 | `left-turn-front-back-fast.mp4` | A | Anchored @309.80 "and front and back we go one and left turn hop"; three left turns (@319.40, @329.40); end pulled back from 336.3 to 335.1, because @335.14 is "and now a bit of combos" and @336.26 is "double right turn". |
| 10 | `exhibela-crossing` | 5 | `WMgTtp-CRaQ` | 226.4 | 255.4 | 29.0 | `exhibela-crossing-fast.mp4` | A | The 226.36–255.36 segment is the Exhibela block, called by name twice. |
| 11 | `basic-body-movement` | 6 | `U454lXjpKi8` | **678.9** | **720.0** | 41.1 | `basic-body-movement-fast.mp4` | V | Start moved to the first dancing segment @678.94 (from the outlines' 683.2); end 720.0 sits before "And front and back, let's go" @721.04. **Two caveats, both must ship:** (i) the music here is *deliberately slow* — @674.52 "with slow music so you can have a clear view for what is happen with our bodies" — so label this clip "With music (slow, by the teachers' choice)", not "Full tempo"; (ii) the teacher talks over it from 686.7 to 696.3. |
| 12 | `mambo-cubano` | 7 | `FNuS26xguaI` | 372.0 | 400.0 | 28.0 | `mambo-cubano-fast.mp4` | A | Called by name @383.34 and @392.76; last mambo rep ends 399.38 and "Right turn, only one" starts 402.42, so the 400.0 end lands cleanly in the gap. Announced as 156 BPM (@337.12) — see G1. |
| 13 | `three-two-one` | 8 | `E8Y7VwC4ODY` | 410.1 | **434.9** | 24.8 | `three-two-one-fast.mp4` | V | **Do not extend the start earlier than 410.1.** Whisper hallucinated a repetition loop from 387.7 to 410.08 (the phrase "one and 3 to 1." ~18 times, several segments with start == end == 410.00), so the music block's true start is unrecoverable from the transcript; the safe interval is 380.10 (last real speech) → 410.10 (first real call). Caveats to ship: the teacher counts the steps aloud over the music, so this is not a silent demo; the final ~1s begins the next call ("…and one Exhibela"). |
| 14 | `tapping` | 9 | `k4H5m9hJ_nA` | 374.9 | 396.6 | 21.7 | `tapping-fast.mp4` | A | @374.88 "Five, six, seven, and one" → @377.44 "And start tapping"; ends at the 396.60 "right turn" call. Shows the basic without tap, then with. |
| 15 | `tapping-on-8` | 10 | `nOABL5GW_qk` | 158.7 | 189.3 | 30.6 | `tapping-on-8-fast.mp4` | A | Anchored @158.68 "front and back and tapping on eight"; called again @166.30 and @179.90; ends at the 189.32 segment boundary. |
| 16 | `cross-front-and-back` | 11 | `8b0zqIk1AHE` | 293.0 | **310.2** | 17.2 | `cross-front-and-back-fast.mp4` | V | **Corrected from the outlines' 293.0→325.1.** From 310.18 the teachers switch to cross *and slide* ("cross front and back, let's go, with the left, hop and slide"), which contaminates a plain-cross demo. 293.0–310.2 is pure "just cross" reps. 17.2s, under the 23s floor — accepted, because a clean 17s loop beats a 32s loop of the wrong move. |
| 17 | `cross-and-slide` | 11 | `8b0zqIk1AHE` | **310.2** | **334.8** | 24.6 | `cross-and-slide-fast.mp4` | A | **New exact window; the outlines only said "(within 310.2 → 334.8)".** Resolved from the transcript: start anchored to the verbatim call at 310.18 "cross front and back, let's go, with the left, hop and slide"; the slide reps run through 317.02–324.88; end 334.80 is the segment boundary, and the next segment @337.30 is the cha-cha-cha variant. Caveat: the last ~9s drifts back to the plain front-and-back basic ("and front and back, six, seven, one"). |
| 18 | `cross-slide-cha-cha-cha` | 11 | `8b0zqIk1AHE` | 337.3 | 357.1 | 19.8 | `cross-slide-cha-cha-cha-fast.mp4` | A | Anchored @337.30 "and one more time cross and slide boom one six seven and cha-cha-cha" → 357.08, where "left turn double right Exhibela" begins. 19.8s. |
| 19 | `charanga` | 12 | `Gy8jEBggrLc` | 294.8 | 318.7 | 23.9 | `charanga-fast.mp4` | V | Anchored @294.84 "and charanga, side and clap, five, six, seven and one, charanga". Caveat: from ~305 the teacher starts explaining the Mambo Cubano combination while dancing it (@312.74 "So Mambo Cubano, hop, and Charanga") — which is genuinely useful, but it is not 24s of plain Charanga. |
| 20 | `step-in-a-spot` | 12 | `Gy8jEBggrLc` | 268.5 | 294.8 | 26.3 | `step-in-a-spot-fast.mp4` | A | Anchored @268.48 "Tiki Tiki right and Tiki Tiki left and spot spot spot"; called again @~281 ("and spot again"); ends where Charanga starts @294.84. Caveat: the first ~3s is still the side basic. |
| 21 | `cuban-rumba-basic` | 13 | `ZArlfy9EakM` | **389.7** | 424.5 | 34.8 | `cuban-rumba-basic-fast.mp4` | A | **Start corrected from the outlines' 394.1**, which falls mid-phrase. 389.66 is the segment start "And front and back, six, seven" — the entry call — then "Rumba" @399.26, "And front" @407.90, "Rumba" @413.16, "And salsa, hop and one" @422.40, ending 424.50. Shows salsa→rumba→salsa→rumba→salsa, which is the useful thing. |
| 22 | `quick-5` | 14 | `tlUegbWymak` | 351.0 | **382.0** | 31.0 | `quick-5-fast.mp4` | V | Anchored @350.98; "Quick 5" called @363.46, @371.60, @378.72; end pulled to the 381.96 segment boundary, before "Left turn" @384.86. Caveat: Class 14's music is announced only as "slow tempo" with **no BPM** (@346.20), and @488.06 the teacher says "Rumba feels very slow with this music" — so this "fast" clip is slower than Class 7's. Do not infer a BPM. |

### 3.3 Class 15 — no slow clip, and it is not a move

| Field | Value |
|---|---|
| Class clip | `qD6Vp3qj48o` **14.8 → 52.3** (37.5s) → `frontend/public/clips/salsa/warm-up-review.mp4` |
| Content | basic side → right turn → left turn → front → left turn → double right turn → Exhibela, each called by name |
| `clips.slow` | **`null`.** `missingReason`: "Class 15 is one continuous full-tempo song from 12 to 316 with no counted, un-musicked passage anywhere in it. Do not synthesise one — for a slow grain, use the move's own class." |
| Alternate (review page only) | 99.5 → 137.2 (37.7s): tapping on 8 → cross, slide → just cross |
| Also ship | The 40-entry `callSheet` (14.80 "basic sign" … 302.30 "And Enchufla"), each entry resolved to a `move` where unambiguous. It is the only per-move deep-link index into this class, which has no internal chapters. |
| Song title | The transcript's "Soy de tierra y demar by Mazbajo" (@7.26) is a Whisper guess at Spanish spoken by a Polish speaker. **Do not publish it** until it is checked against the video description (flag C15-a). |

### 3.4 Totals and the cutting script

- **44 files**: 22 slow + 21 fast (`left-turn-side` shares `right-turn-side-fast.mp4`) + 1 class clip.
- **Measured size**: a real test cut of window #1 (28.8s, crf 23, 720p, aac 128k)
  is **4.25 MB**, i.e. ~148 KB/s. 44 clips averaging ~26s ≈ **165–175 MB**.
  `frontend/public/clips/` is already 574 MB and committed, so this is within
  precedent. If it needs to shrink, `-crf 26` or `-vf scale=-2:540` roughly
  halves it (measured: 2.6 MB for the same window at 540p/crf 24).

**`scripts/clip_salsa_steps.py`** (new, uv), modelled directly on
`scripts/clip_posture_moves.py`:

```
uv run scripts/clip_salsa_steps.py --review   # -> data/review/salsa/ + index.html
uv run scripts/clip_salsa_steps.py            # -> frontend/public/clips/salsa/moves/
uv run scripts/clip_salsa_steps.py --only quick-5
```

ffmpeg args — identical to the posture script **except that `-an` is dropped**,
because the spoken count is the entire point of a salsa clip:

```
ffmpeg -ss <start> -i <source> -t <duration>
       -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p
       -c:a aac -b:a 128k
       -movflags +faststart -y <dest>
```

Requirements on the script:

1. **`--review` mode is mandatory before publishing.** It writes
   `data/review/salsa/index.html` looping every clip side by side with its
   move name, class, in/out seconds, trust grade, note and caveat — the same
   shape as `data/review/posture/index.html`. The outlines close by saying every
   window "should still be eyeballed against the video before cutting"; this is
   how that happens.
2. `--review` also cuts the alternates listed in §3.5; a plain run does not
   publish them (precedent: the posture alternates were cut, reviewed, unused).
3. Dedupe by `(source, start, end)` so the shared class-2 window is encoded once.
4. Log the output duration of each file and warn when it differs from
   `end - start` by more than 0.2s, and when a published clip is under 15s.

### 3.5 Alternates — cut for review, not published

| Move | Tempo | Window | Why it is an alternate |
|---|---|---|---|
| `basic-side` | slow | 183.3 → 201.9 | Same step with numbers spoken on top |
| `enchufla` | slow | 120.6 → 149.6 | Longer, but mixed with the basic |
| `exhibela-crossing` | slow | 160.3 → 190.0 | With arms — but the transcript there is almost entirely rhythm vocalisation, so verify by eye |
| `three-two-one` | slow | 337.5 → 360.0 | With arm styling |
| `hook-turn` | slow | 119.3 → 129.8 | 10.5s, too short to publish |
| `cross-and-slide` | slow | 194.8 → 223.3 | Arms styling, leader then follower — this is where the beat-4 cue lives |
| `charanga` | slow | 216.3 → 225.9 | 9.6s, with the clap |
| `cuban-rumba-basic` | slow | 210.5 → 224.3 / 254.8 → 277.0 | The isolated basic (13.8s, too short) and the arms version (22.2s) |
| `quick-5` | slow | 329.0 → 343.6 | Arms, 14.6s |
| Class 15 | fast | 99.5 → 137.2 | Second call-sheet stretch |

---

## 4. Segment maps

Encode the outlines' per-class segment tables verbatim as `ClassSegment[]`,
one class at a time, with:

- `provenance` = the quoted transcript phrase or chapter title from the outlines'
  "Source" column. Never a bare number.
- `nestedIn` set on every `count` window that sits inside a `teach` block — which
  is all of them in this course.
- `reviewsEarlierMoves: true` on the "`music` + `review`" and "`count` + `review`"
  blocks.
- `chaptered: true` only for classes **1 and 15**. Class 3's chapters are usable
  for the two step boundaries; Class 2's are actively wrong (§7.2); classes 4–14
  have none.
- `confidence: 'transcript'` everywhere, except the two segments named in §7.

The segments are what power the long grain: each `teach` / `count` / `music`
window renders a `youtu.be/<id>?t=<start>` link, which is Success test 4.

---

## 5. Charter open question 2 — how granular is a cue?

**Decision: one action = one cue, anchored to the beat the action starts on. An
8-count bar is not the practisable unit.**

Reasoning, all of it from the charter:

1. The user's own worked example is a single action — "men, raise your hand on
   3" — and R3 states it as a rule: "Every lead action a leader performs gets
   its own line, anchored to a count."
2. Success test 2 is "see its **5 lead cues** as text, beat-numbered". Setenta
   is ~5 lead actions over 8 counts. Five cues over eight beats is one action
   per cue by arithmetic; one cue per bar would give one, and one cue per beat
   would give eight mostly-empty ones.
3. The whole point of the cue grain (charter, "the spirit", point 3) is that the
   hard part is *one* detail — which hand, which beat, how high. A bar-sized cue
   re-buries the detail inside a paragraph, which is the failure mode the tab
   exists to fix.
4. A drill unit has to be small enough to repeat. "Beat 4: heel of the right
   foot down, left arm up" can be practised twenty times in thirty seconds. "The
   second half of the eight" cannot be practised at all — it can only be watched.

The bar view is not lost, it is derived. Because every cue carries `beat`, the
page renders an 8-beat strip with each cue sitting on its beat (§8.4), which
gives the bar reading for free and with no data change. That is the right
direction of derivation: bar from actions, never actions from a bar.

Two guardrails so this does not degenerate into 300 undifferentiated lines:

- **Only `DRILLABLE_CUE_KINDS` (`footwork`, `lead`, `arms`, `rhythm`) go in the
  main list.** `styling`, `concept`, `musicality` and `context` render in a
  collapsed "More from this class" block. Class 7 spends 138 seconds — over a
  quarter of the class — on styling talk and an anecdote about Cuban dancers
  holding their trousers; it is real, quotable content and it is not a drill.
- **Target ≤ 8 drillable cues per move.** If a move has more, they are being
  split too finely — merge the ones that describe one action with two clauses.

---

## 6. Charter open question 3 — session shape

**Decision: `/salsa` is a browse-and-loop reference. The timed drill is a mode,
entered with one button, and it reuses the posture timer wholesale.**

### 6.1 Why the reference is the default

Four of the five success tests are lookup or loop tests, and a timer actively
obstructs three of them:

| Success test | Needs |
|---|---|
| 1. Type "seten", land on Setenta in <3s | A search box on the first screen |
| 2. See its 5 lead cues as text, without playing a video | Text, rendered, not gated behind a play button |
| 3. Loop its 45s demo hands-free while dancing | A loop that never advances on its own |
| 4. Jump to 1:42 of Class 11 to check one cue | A deep link next to the cue |
| 5. A 10-minute mixed session without choosing what to practise | A timed drill with zero decisions |

Test 3 is the one that settles it: a timed routine's defining behaviour is that
it *moves on*. Posture works that way because the routine is fixed and you never
need to dwell. Salsa is the opposite — you dwell on one move until the feet
work. A page that marched from move to move every 30 seconds would fail tests
1–4 to serve test 5.

But test 5 is a hard requirement too, and "without choosing what to practise" is
the operative phrase. So it gets a mode, and the mode must require zero choices:
one button, no pickers.

### 6.2 What the drill is

Reuses `frontend/src/app/posture/page.tsx`'s machinery unchanged: the
`status`/`leadIn` state machine, the countdown ring, `startChime` /
`switchChime` / `finishChime` / `tick` / `say` from `@/lib/cues`, the wake lock
effect, and the music element.

One slot per move, 70 seconds:

| Phase | Length | What happens |
|---|---|---|
| Lead-in | 10s | Ring amber, "Get ready". The move name is spoken, then up to 3 of its drillable cues in beat order. Cue text is on screen. |
| Slow | 30s | The slow clip loops with its own audio. Ring red, label "SLOW · counted". |
| Fast | 30s | The fast clip loops. `switchChime` on the transition, label "FULL TEMPO". |

Eight slots = **9:20**, which is the 10-minute session. Presets: 5 min (4
slots), 10 min (8), 15 min (12).

Deliberate deviations from the posture page, both forced by the material:

- **Clips are not muted and music is off by default.** The spoken count in the
  clip is the metronome; music over it would make both unusable. `MUSIC_TRACKS`
  is still re-exported and the toggle still exists, defaulting to off.
- **No halfway form cue.** The cue list is on screen for the whole slot instead,
  which is the prominence rule (§8.4) applied to the drill.

### 6.3 Zero-choice selection — `buildDrill(minutes)`

```
slot 1        : basic-side on even sessions, basic-front-and-back on odd — you
                always warm up on a basic
slots 2..n    : walk SALSA_MOVES in playlist order from a cursor persisted at
                localStorage['salsa.drill.cursor'], wrapping; advance the cursor
                by n-1 when the session finishes, so consecutive sessions walk
                the whole course instead of drilling the same three moves
skip          : basic-body-movement, unless minutes >= 15 (it is a drill class,
                not a step, and its "fast" clip is deliberately slow music)
never speak   : any cue with confidence 'suspect' (§7.1)
```

Deterministic, no randomness, no UI. Playlist order is preserved, per the
charter's settled ordering decision.

---

## 7. The known defects, and how they surface

Rule: **the data records what the source actually says, and the page shows the
doubt.** No silent fixes, no invented corrections.

### 7.1 Per-defect handling

| Defect | Data | UI |
|---|---|---|
| **Class 7 @143.40 / @145.98** — the same arm cue transcribed twice ("So when I touch with the right arm goes up." / "When I touch with the right arm goes up."), which contradicts the stated rule at @140.86 that arms move *opposite* to the legs. One of them almost certainly says "left". | One cue, `confidence: 'suspect'`, `flag: 'C7-b'`, `warning: 'Whisper transcribed this line twice with the same words and as written it contradicts "arms move opposite to the legs" (@140.86). Check the audio before trusting it.'` Keep the companion cue @140.86 at `transcript`. | Amber "Unverified" chip, the warning text inline, and a deep link to `youtu.be/FNuS26xguaI?t=143`. **Excluded from spoken drill cues.** |
| **Class 8 @387.7–410.08** — Whisper repetition loop: "one and 3 to 1." ~18 times, several segments with `start == end == 410.00`. The music block's true start is unrecoverable. | The `music` segment starts at `380.1` with `confidence: 'suspect'`, `warning: 'Start not determinable — Whisper looped over the music from 387.7 to 410.1. Safe interval 380.1–410.1; first real call is @410.10.'` The fast clip starts at 410.1 and carries `caveat`. | The class timeline shows the 380.1–410.1 span hatched, with the warning. Any script that counts term frequency must not use this file — it over-counts "3 to 1" by ~18. |
| **Class 2 chapters** — `[10–212 "Basic Right and Left Turns"], [212–237 "Left Turn"], [237–466 "Basic Step"]` are wrong: chapter 2 covers only the right turn, chapter 3 is 25s and cannot hold the left-turn teach (213–280), chapter 4 labelled "Basic Step" actually holds the front-and-back right turn plus the whole music review. | `chaptered: false`. All boundaries from the transcript. | Nothing — this one is genuinely resolved, not uncertain. Record it in `COURSE_FLAGS` so nobody "fixes" it back. |
| **Class 12's second element** — the description names only Charanga; the class opens by teaching something the teachers call only **"step in a spot"** (@11.98) and call as "spot spot spot" over music. | `id: 'step-in-a-spot'`, `name: 'Step in a spot'`. **No Spanish name.** `flags: ['G4']`. | A small "named in English by the teachers; the channel gives no Spanish name for it" note. Inventing Spanish here would break R1 and the non-goals. |
| **Class 10 @54.66** — the teacher self-corrects the leading foot mid-sentence: "I step in a spot with the right. Sorry, with the left." | Cue text uses **left**. `verbatim` keeps the whole sentence including the correction. `flag: 'C10-a'`. | Nothing special; the verbatim is visible on expand. Noted here because any automated extraction that takes the first foot named gets it wrong. |
| **Class 14 vs Class 6 arms** — Class 6 @370.64 establishes that arms move *with* the foot; Class 14 @303.26 explicitly suspends that for Quick 5. | `quick-5.exceptions` (§2). | Rendered on `quick-5` as "Overrides Basic body movement →" with both deep links, so the two cues never read as a contradiction. |
| **Class 9 @345.66** — tapping applies only to steps on the 1-2-3 / 5-6-7 rhythm: not Rumba, and Mambo Cubano already has taps. | `tapping.exceptions` (§2). | A "does not combine with" line on `tapping`, `cuban-rumba-basic` and `mambo-cubano`. This is the one real compatibility constraint in the course and it is easy to lose. |
| **Class 8's arm cue disagreement** — @221.54 Michal starts to say "opposite arm", Ola corrects to the same arm, he concedes "That's perfectly fine." | **Two cues**: `role: 'leader'` "left arm up with the right foot — opposite arm to the leg" (@233.14) and `role: 'follower'` "right arm up, second hand on the hip when you tap — same arm as the foot" (@236.14). Both `transcript`. | Rendered in the separate Leader / Follower sections. Merging them into one list is exactly the ambiguity R4 forbids — and here the two roles genuinely use opposite arms. |
| **Class 5's arm styling** — @143.40 "I'm going to do it slightly different than Ola" and @150.82 "We are not going to go into details": the class declines to specify the difference. | **No follower arm cue for `exhibela-crossing`.** | Nothing. Do not manufacture one. |
| **Tempo numbers (G1)** — 140 / 144 / 156 / 117 BPM across the course. Reviewed and downgraded: Class 13's "picked up the pace" compares within its own class, and 117 BPM is plausible ("around regular salsa tempo"). | Do **not** store a `bpm` field. The numbers live in the cue verbatims where the teachers say them. | A single `COURSE_FLAGS` note. Class 14's music has no announced BPM at all — do not infer one. |
| **Rhythm vocalisations** — "cheeky cheeky", "kum kuku", "boom boom", "ticky ticky", "chaka tiki", "poku", "nya nya", "coo coo", "krum chiki", "bim bim". | **Never a cue.** They are the teachers singing the beat. They may appear inside a `verbatim`, never in a `text`. | — |
| **Steps called before they are taught (G3)** — Class 9 @480.08 calls "Rumba" then @485.98 "Oh, we haven't teach you Rumba yet"; Class 10 @260.36 calls charanga and @283.62 cross and slide; Class 11 @445.88 "Did we introduce stepping spot already or not?" | These are **not** `TeachingSource`s. At most a `CallSheetEntry`-style mention. | — |
| **Class 9 @184.64 "Pasa Yala"** — almost certainly Paseala, a couples-course move. | Alias on the couples move when it exists. **Not a steps teaching source** — a passing reference. | — |
| **Class 13 "rumba yambo" / "rumba columbia"** (@80.72, @99.42) — conventionally *yambú* and *columbia*. | Leave exactly as transcribed. The class does not teach those styles, so they never enter the index. Per R1 and the non-goals we do not add terminology La Suerte does not teach. | — |
| **Class 13's precise style** — the description says "Cuban Rumba Basic"; the class says it teaches **Rumba Guaguancó** specifically (@187.28). | `name: 'Cuban Rumba Basic'` (the channel's own words, R1), with "Rumba Guaguancó" as an alias and in the summary as the precise style. | — |
| **Class 15's song title** | Do not ship the title until it is verified against the description. | — |
| **Class 8's name instability** — description "Three, Two, One"; teacher "step that we call 3 to 1"; calls it "3 2 1" and "three to one". | `name: 'Three, Two, One'`, aliases `['3 to 1', '3 2 1', 'three to one']`. | — |
| **Class 11's "cha cha cha"** — a provisional label the teachers coined on camera (@236.04 "let's call it cha-cha-cha"), though the description does write it. | Index it; add a `summary` note that it is the teachers' own working name, not established Cuban terminology. | — |

### 7.2 Rendering rules for `Confidence`

| Value | Chip | Spoken in drill? |
|---|---|---|
| `verified` | none | yes |
| `transcript` | a small dot in the source line, tooltip "from the transcript, not yet checked against the video" | yes |
| `suspect` | amber "Unverified" chip + the `warning` text inline, always visible, never behind a disclosure | **no** |

A `caveat` on a clip renders as a caption under the player. It is never hidden
behind a toggle: a clip whose caveat you cannot see is worse than no clip.

### 7.3 `COURSE_FLAGS`

Ship the outlines' five global flags as one-liners, shown once at the bottom of
`/salsa` under "About this course": no chapters on classes 4–14 so boundaries
come from the transcript (G2); the count windows are nested inside teach blocks
and are shorter and less clean than the couples course's (G5); the BPM numbers
are inconsistent and unverified (G1); steps are sometimes called before they are
taught (G3); Class 12 teaches an element its description omits (G4).

### 7.4 Alias additions for the normalizer

The 12 rows in the outlines' alias table are already folded into §2's alias
column, which is what search uses. They should *also* be added to
`scripts/normalize_salsa_terms.py`'s `ALIASES` so future transcription passes
resolve them: `exit below`, `like Zibela`, `Exhibit and`, `exhibit our tap` →
Exhibela; `choupla`, `Shufla` → Enchufla; `Mamba Cubano`, `manpo cubano`,
`Mambo Kumano` → Mambo Cubano; `Pasa Yala` → Paseala; `3 to 1` / `3 2 1` /
`three to one` → Three, Two, One; `basic sign` → basic side. The data file is
authoritative for search; the normalizer keeps future transcripts clean.

---

## 8. The page

Route: **`/salsa`**, one route. Nav link "Salsa" appended after "Voice Training"
in `frontend/src/app/layout.tsx` — appended, not inserted, so the existing order
is undisturbed. The nav is horizontally scrollable and must stay that way: an
overflowing nav makes mobile browsers widen the layout viewport and scale down
*every* page (`scripts/test_mobile_layout.py`).

State lives in the query string, applied with `history.replaceState` from a
client component: `?move=<id>` for the detail view, `?mode=drill` for the drill,
`?q=<query>` for a shareable search. Two reasons for query state over a
`/salsa/[move]` dynamic route: switching moves stays instant with no navigation,
which is what keeps Success test 1 under three seconds; and it sidesteps the
`params` / `searchParams` API differences this Next version may have — read
`node_modules/next/dist/docs/` before writing any routing code, per
`frontend/AGENTS.md`.

### 8.1 First screen

```
┌──────────────────────────────────────────────────────────────┐
│  nav: Original · 2025 · Bodyweight · Stretching · Posture ·  │  (scrolls)
│       Voice Training · Salsa                                 │
├──────────────────────────────────────────────────────────────┤
│  Cuban Salsa — Solo Steps                                    │
│  La Suerte Dance School · 15 classes · 22 steps              │  ← counts
│                                                              │    computed
│                                                              │    from data
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🔍  Search a step — try "exib", "3 2 1", "charanga"    │  │ ← autofocus
│  └────────────────────────────────────────────────────────┘  │   (desktop only)
│                                                              │
│  ┌──────────────────────────┐                                │
│  │   ▶  10-minute drill     │   5 min · 15 min               │
│  └──────────────────────────┘                                │
│                                                              │
│  All · Basics · Turns · Crosses · Footworks · Skills · Drills│
│  Course:  [Solo steps]  Partnerwork — next                   │
│                                                              │
│  CLASS 1 ─────────────────────────────────────────────────── │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 1 │ Basic to the side              step             │    │
│  │   │ Two steps in place, then a third that opens     │    │
│  │   │ ●○○◌ ●○○◌   6 cues   slow 28.8s · fast 34.5s    │    │
│  └──────────────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 1 │ Basic front and back           step             │    │
│  │   │ …                              ⚠ short clip     │    │
│  └──────────────────────────────────────────────────────┘    │
│  CLASS 2 ─────────────────────────────────────────────────── │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ 2 │ Right turn (from the basic side)   turn         │    │
│  …                                                           │
│                                                              │
│  About this course  ▸  (the five global flags)               │
└──────────────────────────────────────────────────────────────┘
```

Classes in playlist order, always. The filter chips regroup for presentation
(`group`) and never reorder within a group.

### 8.2 Search — Success test 1

`searchMoves(query, moves)` in `frontend/src/lib/salsa-search.ts`:

1. Normalise both sides: lowercase, strip diacritics (`NFD` + strip
   `\p{Diacritic}`), collapse whitespace, drop punctuation. So "3 2 1", "321"
   and "3-2-1" all hit `three-two-one`.
2. Build each move's haystack once at module load: `name` + every alias + `kind`
   + `group` + class title.
3. Rank: name prefix (0) → alias prefix (1) → word-start inside name/alias (2)
   → substring anywhere (3). Ties break on playlist order.
4. No fuzzy matching, no debounce, no network. Filtering runs on every keystroke
   over 22 objects.

The alias list is what makes this work. "exib" hits `exhibela-crossing` through
the `exibela` alias — Class 5 says "exibela" ten times and "exhibela" zero, so
without aliases the move that class teaches would be unfindable by name. The
same mechanism gives "seten" → Setenta the moment the couples data lands.

Keyboard: `Enter` opens the top hit, `↑`/`↓` move the selection, `Esc` clears.
Typing four characters and pressing Enter is two seconds.

### 8.3 Move detail

```
┌──────────────────────────────────────────────────────────────┐
│  ← All steps                              Class 11 · step    │
│  Cross and slide                                             │
│  also: cross slide · hop and slide                           │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │            [ looping clip, audio ON ]                  │  │  aspect-video
│  │                                                        │  │  (aspect-[9/16]
│  └────────────────────────────────────────────────────────┘  │   when a clip's
│   ◀ SLOW ▶     [ Slow │ Slow→Fast │ Full tempo ]    🔊  ⛶   │   aspect is 9/16)
│   Counted, no music · 24.3s · Class 11 @ 2:06                │
│   ⓘ last ~9s drifts back to the plain front-and-back basic   │
├──────────────────────────────────────────────────────────────┤
│  CUES                                                        │
│   1   2   3   4   5   6   7   8       ← beat strip, cue dots │
│   ●   ○   ○   ◆   ●   ○   ○   ◌         on their own beats   │
│                                                              │
│  LEADER                                                      │
│   Beat 4  Heel of the right foot down, left arm up.          │
│           Then close, open, slide.                           │
│           Class 11 @ 2:39  ↗                                 │
│   —       Keep the arms relatively close to the body.        │
│           Class 11 @ 2:48  ↗                                 │
│  FOLLOWER                                                    │
│   Beat 4  Left arm up — or take the alternative and send     │
│           the same left arm out to the side.                 │
│           Class 11 @ 3:01  ↗                                 │
│  BOTH                                                        │
│   Beat 4  Tap on 4, close the legs, open left and slide      │
│           the other leg inside; weight to the right.         │
│           Class 11 @ 1:44  ↗                                 │
│                                                              │
│  ▸ More from this class (styling · context)                  │
├──────────────────────────────────────────────────────────────┤
│  FOOTWORK                                                    │
│  First three steps unchanged, then tap on 4, close, open to  │
│  the left and slide the other leg inside…                    │
│                                                              │
│  Built on: Cross front and back →                            │
│                                                              │
│  WATCH THE CLASS                                             │
│   teach  1:37 ↗   ·  counted  2:06 ↗  ·  with music  4:42 ↗  │
│   also called in the Class 15 warm-up @ 3:28 ↗               │
└──────────────────────────────────────────────────────────────┘
```

### 8.4 The two structural rules

**One player, both tempos.** A single video region with a three-position
control:

| Position | Behaviour |
|---|---|
| `Slow` | slow clip, `loop`, pinned |
| `Slow→Fast` | **default.** Slow plays once, then fast plays once, repeating forever. Both are always seen without touching anything, which is the explicit requirement that a short must show *both*. |
| `Full tempo` | fast clip, `loop`, pinned |

Implementation: two `<video>` elements, both `preload="auto"`, only one visible.
In `Slow→Fast` both have `loop={false}` and the `ended` handler swaps them; when
pinned, the active one gets `loop`. Neither is muted — the count is the point —
and one shared 🔊 button mutes both. Container is `aspect-video` with
`object-contain` for the steps course; switch to `aspect-[9/16]` when
`clip.aspect === '9/16'`, which is what the couples course's vertical shorts
will need. Cropping landscape footage of two dancers to 9:16 cuts them in half —
the posture page hit this exact problem in reverse.

**Cues can never be demoted.** Enforceable rules, because "if a future change
makes the lead cues less prominent, that change is wrong" needs to be
checkable:

1. The cue list is rendered as text on first paint, above the fold on a phone,
   with nothing to click first (Success test 2). It is never inside a tab,
   accordion or modal.
2. Leader, Follower and Both are separate labelled sections in that order. A
   cue's `role` is always visible next to it. Never one merged list (R4).
3. Every cue shows its source as a tapable `Class N @ M:SS` deep link (R3,
   Success test 4).
4. `styling` / `concept` / `musicality` / `context` cues may be collapsed.
   `footwork` / `lead` / `arms` / `rhythm` may not.
5. The player may be collapsed by the user ("cues only"); the cue list may not.
6. In drill mode the slot's cues stay on screen for the whole slot and are
   spoken during the lead-in.

The beat strip above the list is derived, not stored: eight numbered cells, a
dot on each beat that carries a cue, a diamond on the beat that carries a
`lead`/`arms` cue, and 4 and 8 dimmed as pauses — except on moves that fill
them, which the data already knows (`tapping`, `tapping-on-8`, `mambo-cubano`,
`charanga`, `three-two-one`).

### 8.5 Drill screen

```
┌──────────────────────────────────────────────────────────────┐
│  ← Leave drill              Slot 3 of 8 · 4:12 left          │
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░░  overall               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │        [ looping clip, audio ON ]                      │  │
│  │                              SLOW · counted            │  │
│  └────────────────────────────────────────────────────────┘  │
│              ╭──────────────────╮                            │
│              │       18         │   ← countdown ring         │
│              │   Hook turn      │                            │
│              ╰──────────────────╯                            │
│   Beat 5  Right crosses behind the left.                     │
│   Beat 7  Right steps forward, weight forward — this is the  │
│           step that brings you back to balance.              │
│                                                              │
│      ⏸ Pause      ⏭ Skip      ↺        🔊 voice   🔇 music   │
│  Next: Double right turn                                     │
└──────────────────────────────────────────────────────────────┘
```

---

## 9. Build order

1. **`scripts/clip_salsa_steps.py --review`** → `data/review/salsa/index.html`.
   Eyeball all 44 windows. Expect to adjust the ones graded **V** in §3.
2. Publish the clips → `frontend/public/clips/salsa/moves/` (+
   `warm-up-review.mp4`).
3. **`frontend/src/data/salsa-steps.ts`** — types from §1, the 22 moves from
   §2, the segment maps from §4, the clip windows from §3. Cue text transferred
   per §7 from the outlines' per-class "Cues" tables: `verbatim` exactly as
   transcribed, `text` tightened to an imperative, `role` from the outlines'
   `[leader]` / `[follower]` tags and `both` otherwise, `kind` per §5,
   `confidence: 'transcript'` unless §7.1 says otherwise, and rhythm
   vocalisations dropped.
4. **`frontend/src/lib/salsa-search.ts`**, then **`salsa-drill.ts`**.
5. **`frontend/src/app/salsa/page.tsx`** — index + detail (§8.1–8.4).
6. Drill mode (§8.5), cloning the posture timer.
7. Nav link. Then `uv run scripts/test_mobile_layout.py`.

Definition of done, checked against the five success tests:

| | Check |
|---|---|
| 1 | Type "exib" → Exhibela crossing is the top hit; Enter opens it. Under 3s, no network. |
| 2 | Every move's drillable cues are readable text on first paint, beat-numbered, no video played. |
| 3 | A move loops hands-free with the wake lock held, alternating slow and fast, and never advances on its own. |
| 4 | Every cue and every segment links to `youtu.be/<id>?t=<s>`. |
| 5 | One button starts a 9:20 session with no further choices. |

Known-incomplete on ship, recorded rather than hidden: `basic-front-and-back`'s
11.8s fast clip (§3.2 row 2), the six clips under the 23s reference floor
(`hook-turn` 16.1, `enchufla` 17.2, `cross-front-and-back` 17.2,
`cross-slide-cha-cha-cha` 19.8, `double-right-turn` 20.3, `charanga` 20.8), the
shared class-2 fast clip serving both side turns, and every `suspect` cue in
§7.1. All of them are visible on screen. None of them is a guess.
