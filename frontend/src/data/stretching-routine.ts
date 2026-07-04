// Morning Mobility routine — transcribed from the source reel.
// "5 minutes of mobility every morning will absolutely change your life.
//  We do each movement for 30 seconds..."
//
// Each move runs for `duration` seconds. Moves with a `halfwayCue` fire a
// spoken + audible signal at the midpoint — used for left/right stretches
// ("switch sides") and direction reversals ("other way").

export interface StretchMove {
  name: string
  duration: number
  /** Short coaching note shown under the move name. */
  description: string
  /** Spoken/beeped cue at the halfway point, e.g. for switching sides. */
  halfwayCue?: string
  /**
   * Lead-in ("Get ready") countdown before the move's counter starts, in
   * seconds. Defaults to DEFAULT_LEAD_IN when omitted. Used to add a longer
   * rest between later moves (10s breaks from Squat Twist onward).
   */
  leadIn?: number
  /** Per-move looping demo clip, path under /public (cut from the source reel). */
  clip: string
}

/** Default lead-in before each move; overridden per-move via `leadIn`. */
export const DEFAULT_LEAD_IN = 2

export interface StretchRoutine {
  id: string
  title: string
  subtitle: string
  /** Path under /public — the source reel, used as a follow-along reference. */
  video: string
  moves: StretchMove[]
}

export interface MusicTrack {
  id: string
  name: string
  /** Path under /public. */
  src: string
  /** Required attribution (these are Kevin MacLeod / CC-BY 3.0). */
  credit: string
}

// Royalty-free background music (Kevin MacLeod, incompetech.com, CC-BY 3.0).
export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'funkorama',
    name: 'Funkorama (funky)',
    src: '/audio/upbeat-funkorama.mp3',
    credit: '"Funkorama" by Kevin MacLeod (incompetech.com) — CC BY 3.0',
  },
  {
    id: 'pixelland',
    name: 'Pixelland (bouncy)',
    src: '/audio/upbeat-pixelland.mp3',
    credit: '"Pixelland" by Kevin MacLeod (incompetech.com) — CC BY 3.0',
  },
  {
    id: 'hepcats',
    name: 'Hep Cats (swing)',
    src: '/audio/upbeat-hepcats.mp3',
    credit: '"Hep Cats" by Kevin MacLeod (incompetech.com) — CC BY 3.0',
  },
]

export const MORNING_MOBILITY: StretchRoutine = {
  id: 'morning-mobility',
  title: 'Morning Mobility',
  subtitle: '5 minutes every morning to undo the damage of sitting',
  video: '/clips/stretching/morning-mobility.mp4',
  moves: [
    {
      name: 'Bounces',
      duration: 30,
      description: 'Wake the body up and shake out all the gunk from sleep.',
      clip: '/clips/stretching/moves/bounces.mp4',
    },
    {
      name: 'Arm Circles',
      duration: 30,
      description: 'Full range of motion — daily shoulder insurance.',
      halfwayCue: 'Reverse direction',
      clip: '/clips/stretching/moves/arm-circles.mp4',
    },
    {
      name: 'Aura Farmers',
      duration: 30,
      description: 'Open the chest, arms and thoracic spine.',
      clip: '/clips/stretching/moves/aura-farmers.mp4',
    },
    {
      name: "McGregor's",
      duration: 30,
      description: 'Release all the tension in your upper body.',
      clip: '/clips/stretching/moves/mcgregors.mp4',
    },
    {
      name: 'Yogi Lunges',
      duration: 30,
      description:
        'Stretch and strengthen the muscles tight and weak from sitting. Take these slow — they test your balance.',
      halfwayCue: 'Switch sides',
      clip: '/clips/stretching/moves/yogi-lunges.mp4',
    },
    {
      name: 'Pump Stretch',
      duration: 30,
      description: 'Hands, arms, shoulders, and the entire back and front side of your body.',
      clip: '/clips/stretching/moves/pump-stretch.mp4',
    },
    // 10s breaks from here on — a longer lead-in before each remaining move.
    {
      name: 'Squat Twist',
      duration: 30,
      description: 'Feet, ankles, knees, hips, back and shoulders.',
      leadIn: 10,
      clip: '/clips/stretching/moves/squat-twist.mp4',
    },
    {
      name: '90-90 Switches',
      duration: 30,
      description: 'Internal and external rotation of the hips — buttery hips mean no more back pain.',
      leadIn: 10,
      clip: '/clips/stretching/moves/ninety-ninety.mp4',
    },
    {
      name: 'Windshield Wipers',
      duration: 30,
      description: 'Twist the body and reset the spine.',
      leadIn: 10,
      clip: '/clips/stretching/moves/windshield-wipers.mp4',
    },
    {
      name: 'Bridge Hold',
      duration: 30,
      description: 'Open up the upper body and counteract the damage done by sitting.',
      leadIn: 10,
      clip: '/clips/stretching/moves/bridge-hold.mp4',
    },
  ],
}
