// Tendon training — Mr. White, "It's Weird, but Tendon Training Will Give You
// Jaw-Dropping Strength" (vwWLRG9r1YU).
//
// The video teaches five methods and closes with a 3-day weekly routine, with at
// least one rest day between sessions because tendons rebuild between workouts,
// not during them. Each session is 20–30 minutes, on its own or before a regular
// workout. The tab shows all three sessions on one page rather than a calendar.
//
// Everything here is taken from the transcript. Progressions are listed only where
// the video offers them, easiest first. Clips are cut by scripts/clip_tendon_moves.py.

export const TENDON_VIDEO_ID = 'vwWLRG9r1YU'
export const TENDON_VIDEO_TITLE =
  "It's Weird, but Tendon Training Will Give You Jaw-Dropping Strength"

export interface TendonProgression {
  name: string
  detail: string
  clip?: string
}

export interface TendonExercise {
  name: string
  /** Which of the video's five methods this belongs to. */
  method: string
  sets: string
  reps: string
  rest?: string
  notes: string
  /** The one mistake the video calls out for this method. */
  mistake?: string
  clip?: string
  /** Shown under the clip when it demos the method on a different exercise. */
  clipCaption?: string
  progressions?: TendonProgression[]
  /** The video says not to start this until N weeks of the other methods. */
  startsAfterWeeks?: number
}

export interface TendonSession {
  slug: string
  label: string
  focus: string
  exercises: TendonExercise[]
}

const CLIP = '/clips/tendons'

const TOWEL_ISOMETRIC: TendonExercise = {
  name: 'Towel Isometric Pull',
  method: 'Heavy isometrics',
  sets: '4–5',
  reps: '30–45s hold',
  rest: '2 min',
  notes:
    'Stand on the middle of a thick towel, feet hip-width. Hinge into a short deadlift — neutral spine, chest up, shoulders back — and pull at 70–80% effort. Breathe short; don\'t hold your breath the whole set.',
  mistake:
    'Pulling at 100% from the start. Strength falls off a cliff within 10 seconds — consistent force beats peak force.',
  clip: `${CLIP}/towel-isometric-pull.mp4`,
  progressions: [
    {
      name: 'One angle at 70%',
      detail: 'Start at 70% effort and hold it there for the whole set.',
    },
    {
      name: 'Change the angle',
      detail:
        'One set with knees deeply bent, one almost standing, one in the middle. Each position loads the tendon differently, so you get strong through the whole range.',
      clip: `${CLIP}/towel-isometric-angles.mp4`,
    },
  ],
}

const SLOW_RESISTANCE_PROGRESSIONS: TendonProgression[] = [
  {
    name: 'Find the weight',
    detail:
      "If you can't hold the 3-second tempo on your last rep, it's too heavy. If you finish 8 and could do 5 more at the same tempo, it's too light.",
  },
  {
    name: 'Build to 8 clean reps',
    detail: 'Stay at the weight until every set hits 8 reps at full tempo.',
  },
  {
    name: 'Add the smallest jump',
    detail:
      'Add about 5 lb and drop back to 6 reps, then build back to 8. Repeat the cycle — it is slow on purpose.',
  },
]

const SLOW_RESISTANCE_SHARED = {
  method: 'Heavy slow resistance',
  sets: '3–4',
  reps: '6–8 @ 3s down / 3s up',
  rest: '2–3 min',
  mistake:
    'Too light turns it into a burn workout; too heavy and the lowering turns into a drop. The tempo matters more than the exercise.',
  clip: `${CLIP}/slow-tempo-push-up.mp4`,
  clipCaption: 'Tempo demo — shown on a push-up',
  progressions: SLOW_RESISTANCE_PROGRESSIONS,
}

const ECCENTRIC_CALF_RAISE: TendonExercise = {
  name: 'Eccentric Calf Raise',
  method: 'Controlled eccentrics',
  sets: '3',
  reps: '12–15 each leg',
  notes:
    'Balls of the feet on a step, heels hanging off. Rise on both legs, lift one foot, and lower on the other for a 4-count until the heel is below the step. Put the other foot back down and repeat. Loads the Achilles.',
  mistake:
    'Controlling the start and dropping through the last few inches — that final stretch is the part that loads the tendon most.',
  clip: `${CLIP}/eccentric-calf-raise.mp4`,
  progressions: [
    {
      name: 'Hold a wall',
      detail: "If you can't control it all the way down, hold onto a wall for assistance.",
    },
    {
      name: 'Half volume',
      detail: 'Eccentrics cause the most soreness. For the first few weeks do 2 sets.',
    },
    {
      name: 'Full volume, unassisted',
      detail: '3 sets of 12–15 per leg with a full 4-second lower.',
    },
  ],
}

export const TENDON_SESSIONS: TendonSession[] = [
  {
    slug: 'day-1',
    label: 'Day 1',
    focus: 'Isometric + Slow Strength',
    exercises: [
      TOWEL_ISOMETRIC,
      {
        ...SLOW_RESISTANCE_SHARED,
        name: 'Slow Bulgarian Split Squat',
        notes:
          'Your one leg exercise. 3 seconds down, 3 seconds up, no resting at the top and no bouncing at the bottom. At home, load it with a backpack.',
      },
      {
        ...SLOW_RESISTANCE_SHARED,
        name: 'Slow Row',
        notes:
          'Your one pulling exercise — rows, or inverted rows under a sturdy table at home. Same 3-up / 3-down tempo with no pause at either end.',
      },
    ],
  },
  {
    slug: 'day-2',
    label: 'Day 2',
    focus: 'Holds + Negatives',
    exercises: [
      {
        name: 'Dead Hang',
        method: 'End-range holds',
        sets: '4 × 30s → 3 × 60s',
        reps: '2 min total to start',
        rest: '1 min',
        notes:
          'Hands shoulder-width on a pull-up bar, feet off the ground. Forearm burn is the tissue you want — hold through it. Sharp pain, stabbing or tingling means stop.',
        mistake: 'Letting go at the first burn.',
        clip: `${CLIP}/dead-hang.mp4`,
        progressions: [
          {
            name: '2 minutes accumulated',
            detail: 'As many sets as you need — e.g. 4 × 30s with 1 min rest.',
          },
          {
            name: 'Passive vs active hang',
            detail:
              'Passive: relax the shoulders and let the body stretch. Active: pull the shoulder blades down without bending the elbows. Passive loads the stretched shoulder; active trains control under load.',
            clip: `${CLIP}/active-passive-hang.mp4`,
          },
          {
            name: '3 × 60s',
            detail: 'Once 2 minutes total gets easy.',
          },
          {
            name: 'Towel hang',
            detail:
              'Drape a towel over each side of the bar and hang from those. Much harder grip — finger tendons work like never before.',
            clip: `${CLIP}/towel-hang.mp4`,
          },
          {
            name: 'Assisted one-arm hang',
            detail:
              'One hand grips the bar, the other barely touches it, shifting most of your weight to one side.',
          },
          {
            name: 'Weighted hang',
            detail: 'Add extra weight strapped to your body.',
            clip: `${CLIP}/weighted-hang.mp4`,
          },
        ],
      },
      {
        name: 'Dip Support Hold',
        method: 'End-range holds',
        sets: '3',
        reps: '20–40s hold',
        notes:
          'Up on parallel bars, arms completely locked out, shoulders down, body tight. The pushing opposite of the hang — together they cover the shoulders, elbows and wrists.',
        clip: `${CLIP}/dip-support-hold.mp4`,
      },
      {
        name: 'Pull-up Negative',
        method: 'Controlled eccentrics',
        sets: '3–4',
        reps: '5 @ 5s down',
        rest: '2 min',
        notes:
          'Use a bench to get your chin over the bar, take your feet off and lower as slowly as you can — aim for 5 seconds. Perfect if you can\'t do a full pull-up yet.',
        mistake: 'Dropping through the last few inches instead of controlling all the way down.',
        clip: `${CLIP}/pull-up-negative.mp4`,
        progressions: [
          {
            name: 'Foot-assisted',
            detail: "If you can't control it all the way down, keep one foot lightly touching the bench.",
          },
          {
            name: 'Half volume',
            detail: 'For the first few weeks do 2 sets, not 4 — eccentrics cause the most soreness.',
          },
          {
            name: 'Full volume',
            detail: '3–4 sets of 5 with a full 5-second lower.',
          },
        ],
      },
    ],
  },
  {
    slug: 'day-3',
    label: 'Day 3',
    focus: 'Isometric + Eccentric + Hops',
    exercises: [
      TOWEL_ISOMETRIC,
      ECCENTRIC_CALF_RAISE,
      {
        name: 'Short, Stiff Hops',
        method: 'Explosive plyometrics',
        sets: '3–4',
        reps: '20–30 contacts',
        rest: '90s',
        notes:
          'Feet hip-width, knees almost straight. Low, quick hops off the ankles only — land on the balls of the feet and leave again like the floor is hot. The sound should be short, light and rhythmic. Jumping rope done right is this exercise.',
        mistake:
          'Turning it into a squat jump — landing on the heels and sinking into the knees. The goal is the least time on the ground, not height.',
        clip: `${CLIP}/short-stiff-hops.mp4`,
        startsAfterWeeks: 4,
        progressions: [
          {
            name: 'Two-legged, in place',
            detail: 'Start with 2 sets of 20 contacts, not 4 of 30.',
          },
          {
            name: 'Forward and back',
            detail: 'Hop forward and back over an imaginary line.',
          },
          {
            name: 'Side to side',
            detail: 'Hop side to side over the line.',
          },
          {
            name: 'Single-leg hops',
            detail: 'Doubles the load on the tendon.',
            clip: `${CLIP}/single-leg-hops.mp4`,
          },
        ],
      },
    ],
  },
]

/** Repeat every 4 weeks and write the numbers down. Think in months, not weeks. */
export const TENDON_TESTS = [
  'How long you can hang from the bar without letting go',
  'How many single-leg calf raises you can do at a controlled tempo',
  'How the heavy exercise that bothers your joints most feels right now',
]
