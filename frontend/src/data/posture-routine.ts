// Posture routine — ATHLEAN-X "Fix Bad Posture in 5 Minutes (FOREVER!)".
// Five unique exercises (Jeff labels them A–E) filling ten 30s slots:
//
//   A B A B E  |  C D(right) C D(left) E
//
// Slots 1–5 are a complete 2:30 routine on their own — Jeff's "if you don't
// have a lot of time you can stop right there". Slots 6–10 are the optional
// second half, hence `blockLabel` marking where each block begins.
//
// Music is shared with the Morning Mobility routine rather than duplicated.
import { MUSIC_TRACKS, type MusicTrack } from './stretching-routine'

export { MUSIC_TRACKS, type MusicTrack }

export interface PostureMove {
  name: string
  duration: number
  /** Short coaching note shown under the move name. */
  description: string
  /** Spoken/beeped cue at the halfway point, e.g. a form reminder. */
  halfwayCue?: string
  /**
   * Lead-in ("Get ready") countdown before the move's counter starts, in
   * seconds. Defaults to DEFAULT_LEAD_IN. Slots that change your setup
   * (floor -> chair -> wall -> floor) get a longer break.
   */
  leadIn?: number
  /** Equipment/position this slot needs, shown as a badge. */
  setup?: string
  /** Set on the first move of a block — renders as a heading in the list. */
  blockLabel?: string
  /** Per-move looping demo clip, path under /public (cut from the source video). */
  clip: string
}

/**
 * Default lead-in before each move. Longer than the stretching routine's 2s:
 * these moves are all floor/chair/wall positions that take a moment to get into.
 */
export const DEFAULT_LEAD_IN = 5

/** Lead-in for slots that require moving to different equipment. */
const SETUP_CHANGE_LEAD_IN = 12

export interface PostureRoutine {
  id: string
  title: string
  subtitle: string
  /** Path under /public — the source video, used as a follow-along reference. */
  video: string
  moves: PostureMove[]
}

// Clip paths reused across slots — A, B, C, D and E each appear twice.
const CLIP = {
  supermans: '/clips/posture/moves/supermans.mp4',
  gluteBridgeMarches: '/clips/posture/moves/glute-bridge-marches.mp4',
  kneelingThoracicDrops: '/clips/posture/moves/kneeling-thoracic-drops.mp4',
  wallDls: '/clips/posture/moves/wall-dls.mp4',
  bridgeAndReachOvers: '/clips/posture/moves/bridge-and-reach-overs.mp4',
}

const SUPERMANS = {
  name: 'Supermans',
  duration: 30,
  description:
    'Fists on your sternum, spread across the chest and dig your elbows down. Lift the sternum to engage between the shoulder blades — quality reps, not a hold.',
  setup: 'Floor · face down',
  clip: CLIP.supermans,
}

const GLUTE_BRIDGE_MARCHES = {
  name: 'Glute Bridge Marches',
  duration: 30,
  description:
    'Straight line from thighs to torso. Alternate lifting each foot five or six inches without letting the pelvis sag or tilt to one side.',
  halfwayCue: "Don't let the pelvis drop",
  setup: 'Floor · face up',
  clip: CLIP.gluteBridgeMarches,
}

const BRIDGE_AND_REACH_OVERS = {
  name: 'Bridge and Reach Overs',
  duration: 30,
  description:
    'The combo move. Bridge up, then reach across and back with the opposite arm — thoracic rotation and extension while the glutes stay switched on.',
  setup: 'Floor · face up',
  clip: CLIP.bridgeAndReachOvers,
}

const KNEELING_THORACIC_DROPS = {
  name: 'Kneeling Thoracic Drops',
  duration: 30,
  description:
    'Elbows on the chair, hands on your upper back. Sink down leading with your chest, then lift and reset. Reps, not a hold — you also get a lat stretch.',
  leadIn: SETUP_CHANGE_LEAD_IN,
  setup: 'Chair',
  clip: CLIP.kneelingThoracicDrops,
}

const wallDls = (side: 'right' | 'left') => ({
  name: `Wall DLs — ${side} leg`,
  duration: 30,
  description:
    'Hands and the opposite knee pressed into the wall. Kick the down foot back to hinge, then drive through that glute to full hip extension.',
  leadIn: SETUP_CHANGE_LEAD_IN,
  setup: 'Wall',
  clip: CLIP.wallDls,
})

export const FIX_BAD_POSTURE: PostureRoutine = {
  id: 'fix-bad-posture',
  title: 'Fix Bad Posture',
  subtitle: '5 minutes a day for rounded shoulders, a forward head and pelvic tilt',
  video: '/clips/posture/fix-bad-posture.mp4',
  moves: [
    // --- Block 1: the standalone 2:30 version ---
    { ...SUPERMANS, blockLabel: 'Block 1 · the 2:30 short version' },
    { ...GLUTE_BRIDGE_MARCHES },
    { ...SUPERMANS },
    { ...GLUTE_BRIDGE_MARCHES },
    { ...BRIDGE_AND_REACH_OVERS },
    // --- Block 2: optional second half. Every slot here changes your setup. ---
    {
      ...KNEELING_THORACIC_DROPS,
      blockLabel: 'Block 2 · optional second half — grab a chair and a wall',
    },
    wallDls('right'),
    { ...KNEELING_THORACIC_DROPS },
    wallDls('left'),
    { ...BRIDGE_AND_REACH_OVERS, leadIn: SETUP_CHANGE_LEAD_IN },
  ],
}
