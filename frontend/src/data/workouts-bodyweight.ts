import type { Exercise, WorkoutSession2025, WorkoutDay2025 } from './workouts-2025'

export const CYCLE_LENGTH_BODYWEIGHT = 8;

export const WORKOUT_CYCLE_BODYWEIGHT: WorkoutDay2025[] = [
  {
    dayNumber: 1,
    name: "Push - Workout 1",
    slug: "push-workout-1",
    dayLabel: "Push Day 1",
    isRest: false,
    sessions: [
      {
        name: "Bodyweight Chest Workout 1",
        muscleGroups: ["Chest"],
        isPrimary: true,
        videoId: "bodyweight-chest",
        videoTitle: "Bodyweight Chest — Push Focus",
        exercises: [
          {
            name: "Scapula Push-ups",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer — protract and retract at top of push-up position"
          },
          {
            name: "Incline Push-ups → Flat Push-ups",
            sets: 3,
            reps: "8-12",
            notes: "Mechanical drop set: start elevated, move to floor when fatigued"
          },
          {
            name: "Decline Push-ups",
            sets: 3,
            reps: "10-12",
            notes: "Feet elevated on chair/step; upper chest emphasis"
          },
          {
            name: "Archer Push-ups",
            sets: "2-3",
            reps: "6-8 each side",
            notes: "Wide stance, shift weight to working arm; unilateral overload"
          },
          {
            name: "Push-up Plus",
            sets: 2,
            reps: "12-15",
            notes: "Full protraction at top for serratus anterior"
          },
          {
            name: "Deficit Push-up Ladder",
            sets: 1,
            reps: "to failure",
            notes: "Hands on books/blocks; ascending hold: rep 1=1s, rep 2=2s..."
          }
        ]
      },
      {
        name: "Bodyweight Triceps Workout 1",
        muscleGroups: ["Triceps"],
        isPrimary: false,
        videoId: "bodyweight-triceps",
        videoTitle: "Bodyweight Triceps — Push Focus",
        exercises: [
          {
            name: "Bodyweight Triceps Extensions",
            sets: "2-3",
            reps: "8-12",
            notes: "Hands on elevated surface, lower forehead toward hands; long head stretch"
          },
          {
            name: "Diamond Push-ups",
            sets: "2-3",
            reps: "10-12",
            notes: "Hands together under chest; medial head emphasis"
          },
          {
            name: "Bench Dips",
            sets: "2-3",
            reps: "12-15 + Partial Reps",
            notes: "Hands on chair behind you; keep chest up, elbows back"
          },
          {
            name: "Cobra Push-ups",
            sets: 1,
            reps: "to failure",
            notes: "Hips on floor, press up with arms only; burnout"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 2,
    name: "Pull - Workout 1",
    slug: "pull-workout-1",
    dayLabel: "Pull Day 1",
    isRest: false,
    sessions: [
      {
        name: "Bodyweight Back Workout 1",
        muscleGroups: ["Back"],
        isPrimary: true,
        videoId: "bodyweight-back",
        videoTitle: "Bodyweight Back — Pull Focus",
        exercises: [
          {
            name: "Scap Pull-ups",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer — dead hang, depress and retract scapulae without bending elbows"
          },
          {
            name: "Pull-ups",
            sets: 3,
            reps: "5-8",
            notes: "To failure; overhand grip, full dead hang to chin over bar"
          },
          {
            name: "Inverted Rows (overhand wide)",
            sets: 3,
            reps: "10-12",
            notes: "Under a table or bar; wide grip for upper back width"
          },
          {
            name: "Prone Y-T-W Raises",
            sets: "2-3",
            reps: "8 each position",
            notes: "Lying face down; Y for lower traps, T for mid traps, W for rotator cuff"
          },
          {
            name: "Superman Hold",
            sets: "2-3",
            reps: "20-30 sec hold",
            notes: "Arms and legs extended off floor; posterior chain activation"
          },
          {
            name: "Dead Hang",
            sets: 1,
            reps: "to failure",
            notes: "Grip endurance and spinal decompression"
          }
        ]
      },
      {
        name: "Bodyweight Biceps Workout 1",
        muscleGroups: ["Biceps"],
        isPrimary: false,
        videoId: "bodyweight-biceps",
        videoTitle: "Bodyweight Biceps — Pull Focus",
        exercises: [
          {
            name: "Chin-ups",
            sets: "2-3",
            reps: "6-8",
            notes: "Supinated grip, focus on biceps contraction at top"
          },
          {
            name: "Inverted Curls (supinated)",
            sets: "2-3",
            reps: "10-12",
            notes: "Under bar/table, palms up; curl body toward hands"
          },
          {
            name: "Doorway Curls",
            sets: "2-3",
            reps: "10-12 + Partials",
            notes: "Grip doorframe, lean back, curl yourself up; adjust angle for difficulty"
          },
          {
            name: "Headbanger Pull-ups",
            sets: 1,
            reps: "to failure",
            notes: "At top of chin-up, push and pull horizontally; biceps burnout"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 3,
    name: "Legs & Core - Workout 1",
    slug: "legs-core-workout-1",
    dayLabel: "Legs & Core Day 1",
    isRest: false,
    sessions: [
      {
        name: "Bodyweight Legs Workout 1",
        muscleGroups: ["Legs"],
        isPrimary: true,
        videoId: "bodyweight-legs",
        videoTitle: "Bodyweight Legs — Lower Body Focus",
        exercises: [
          {
            name: "Bodyweight Squats",
            sets: "1-2",
            reps: "15-20",
            notes: "Primer — full depth, controlled tempo"
          },
          {
            name: "Pistol Squats (assisted if needed)",
            sets: 3,
            reps: "5-8 each leg",
            notes: "Hold doorframe or wall for balance; full single-leg squat"
          },
          {
            name: "Bulgarian Split Squats",
            sets: 3,
            reps: "10-12 each leg",
            notes: "Rear foot on chair; torso upright for quad emphasis, lean forward for glutes"
          },
          {
            name: "Reverse Lunges",
            sets: "2-3",
            reps: "10 each leg",
            notes: "Step back, knee touches floor; glute-dominant lunge variation"
          },
          {
            name: "Nordic Hamstring Curls",
            sets: "2-3",
            reps: "5-8 + Eccentric Only Reps",
            notes: "Anchor feet under couch/door; control the negative, push up from floor"
          },
          {
            name: "Single Leg Calf Raises",
            sets: "2-3",
            reps: "12-15 + Partial Reps",
            notes: "Edge of step; 3s up, 3s hold, 3s down"
          }
        ]
      },
      {
        name: "Bodyweight Core Workout 1",
        muscleGroups: ["Core"],
        isPrimary: false,
        videoId: "bodyweight-core",
        videoTitle: "Bodyweight Core — Abs & Obliques",
        exercises: [
          {
            name: "Dead Bugs",
            sets: "2-3",
            reps: "10-12 each side",
            notes: "Press low back into floor; opposite arm/leg extension"
          },
          {
            name: "Ab Wheel Rollout / Body Saw",
            sets: "2-3",
            reps: "10-12",
            notes: "Use towel on smooth floor if no wheel; anti-extension"
          },
          {
            name: "Hanging Leg Raises",
            sets: "2-3",
            reps: "10-12",
            notes: "Toes to bar if possible; control the negative"
          },
          {
            name: "Side Plank + Hip Dip",
            sets: 2,
            reps: "30-45 sec each side",
            notes: "Dip hip toward floor and back up; oblique focus"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 4,
    name: "Rest Day",
    slug: "rest-day-1",
    dayLabel: "Rest Day",
    isRest: true,
    sessions: []
  },
  {
    dayNumber: 5,
    name: "Push - Workout 2",
    slug: "push-workout-2",
    dayLabel: "Push Day 2",
    isRest: false,
    sessions: [
      {
        name: "Bodyweight Chest Workout 2",
        muscleGroups: ["Chest"],
        isPrimary: true,
        videoId: "bodyweight-chest",
        videoTitle: "Bodyweight Chest — Push Variation",
        exercises: [
          {
            name: "Band Pull Apart (Primer)",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer — light band, open chest and activate rear delts"
          },
          {
            name: "Wide Push-ups",
            sets: 3,
            reps: "10-12",
            notes: "Hands wider than shoulders; chest stretch emphasis"
          },
          {
            name: "Pseudo Planche Push-ups",
            sets: 3,
            reps: "6-10",
            notes: "Hands by hips, fingers pointing back; lean forward for overload"
          },
          {
            name: "Hindu Push-ups",
            sets: "2-3",
            reps: "10-12",
            notes: "Flow from downward dog through to upward dog; full range chest + shoulders"
          },
          {
            name: "Typewriter Push-ups",
            sets: "2-3",
            reps: "5-8 each side",
            notes: "At bottom, shift side to side; unilateral chest emphasis"
          },
          {
            name: "Push-up Burnout 21s",
            sets: 1,
            reps: "7 bottom half + 7 top half + 7 full",
            notes: "No rest between segments; complete chest burnout"
          }
        ]
      },
      {
        name: "Bodyweight Shoulders Workout 2",
        muscleGroups: ["Shoulders"],
        isPrimary: false,
        videoId: "bodyweight-shoulders",
        videoTitle: "Bodyweight Shoulders — Delt Focus",
        exercises: [
          {
            name: "Pike Push-ups",
            sets: "2-3",
            reps: "8-12",
            notes: "Hips high in inverted V; overhead press pattern"
          },
          {
            name: "Wall Handstand Hold",
            sets: "2-3",
            reps: "20-30 sec",
            notes: "Chest facing wall; full shoulder activation"
          },
          {
            name: "Prone I-Y-T Raises",
            sets: 2,
            reps: "8-10 each position",
            notes: "Lying face down; rear delt and rotator cuff health"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 6,
    name: "Pull - Workout 2",
    slug: "pull-workout-2",
    dayLabel: "Pull Day 2",
    isRest: false,
    sessions: [
      {
        name: "Bodyweight Back Workout 2",
        muscleGroups: ["Back"],
        isPrimary: true,
        videoId: "bodyweight-back",
        videoTitle: "Bodyweight Back — Pull Variation",
        exercises: [
          {
            name: "Band Face Pulls (Primer)",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer — light band, external rotation at end range"
          },
          {
            name: "Commando Pull-ups",
            sets: 3,
            reps: "6-8 alternating",
            notes: "Hands staggered on bar; pull to each side alternately"
          },
          {
            name: "Inverted Rows (underhand close)",
            sets: 3,
            reps: "10-12",
            notes: "Supinated narrow grip; lower lat emphasis"
          },
          {
            name: "Sliding Pullover",
            sets: "2-3",
            reps: "10-12",
            notes: "Knees on towel/slider, hands on floor; lat stretch and contraction"
          },
          {
            name: "Reverse Snow Angels",
            sets: "2-3",
            reps: "10-12",
            notes: "Lying face down, arms sweep floor to overhead; full back activation"
          },
          {
            name: "Flexed Arm Hang",
            sets: 1,
            reps: "to failure",
            notes: "Chin over bar; time under tension burnout"
          }
        ]
      },
      {
        name: "Bodyweight Biceps Workout 2",
        muscleGroups: ["Biceps"],
        isPrimary: false,
        videoId: "bodyweight-biceps",
        videoTitle: "Bodyweight Biceps — Pull Variation",
        exercises: [
          {
            name: "Close-Grip Chin-ups",
            sets: "2-3",
            reps: "6-8",
            notes: "Hands touching; maximum bicep recruitment"
          },
          {
            name: "Pelican Curls (rings/bar)",
            sets: "2-3",
            reps: "6-10",
            notes: "Lean forward from straight arms, curl back; intense eccentric"
          },
          {
            name: "Inverted Curls (1.5 rep)",
            sets: "2-3",
            reps: "8-10",
            notes: "Full curl + half curl = 1 rep; extra time under tension"
          },
          {
            name: "Towel Isometric Curls",
            sets: 1,
            reps: "3 × 10 sec holds",
            notes: "Step on towel, curl and hold at 3 angles; max contraction burnout"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 7,
    name: "Legs & Core - Workout 2",
    slug: "legs-core-workout-2",
    dayLabel: "Legs & Core Day 2",
    isRest: false,
    sessions: [
      {
        name: "Bodyweight Legs Workout 2",
        muscleGroups: ["Legs"],
        isPrimary: true,
        videoId: "bodyweight-legs",
        videoTitle: "Bodyweight Legs — Lower Body Variation",
        exercises: [
          {
            name: "Cossack Squats",
            sets: "1-2",
            reps: "8-10 each side",
            notes: "Primer — lateral squat for hip mobility and adductors"
          },
          {
            name: "Shrimp Squats (assisted if needed)",
            sets: 3,
            reps: "5-8 each leg",
            notes: "Rear foot held behind; single-leg quad emphasis"
          },
          {
            name: "Step-ups (high box)",
            sets: 3,
            reps: "10-12 each leg",
            notes: "Box/chair height at knee; drive through heel, no push off back foot"
          },
          {
            name: "Walking Lunges",
            sets: "2-3",
            reps: "12 each leg",
            notes: "Long stride for glute emphasis, short stride for quads"
          },
          {
            name: "Sliding Hamstring Curls",
            sets: "2-3",
            reps: "8-12 + Eccentric Only Reps",
            notes: "Towel or socks on smooth floor; bridge position, curl heels to glutes"
          },
          {
            name: "Wall Sit + Calf Raises",
            sets: "2-3",
            reps: "30 sec hold + 15 calf raises",
            notes: "Quads isometric hold combined with calf raises; compound burnout"
          }
        ]
      },
      {
        name: "Bodyweight Core Workout 2",
        muscleGroups: ["Core"],
        isPrimary: false,
        videoId: "bodyweight-core",
        videoTitle: "Bodyweight Core — Anti-Movement Focus",
        exercises: [
          {
            name: "Reverse Crunches",
            sets: "2-3",
            reps: "12-15",
            notes: "Curl hips off floor toward chest; lower abs emphasis"
          },
          {
            name: "Pallof Press (band) / Plank Shoulder Taps",
            sets: "2-3",
            reps: "10-12 each side",
            notes: "Anti-rotation; band press away from chest, or plank with alternating taps"
          },
          {
            name: "Dragon Flag Negatives",
            sets: "2-3",
            reps: "5-8",
            notes: "Lie on bench, lower straight body slowly; full core anti-extension"
          },
          {
            name: "Hollow Body Hold",
            sets: 1,
            reps: "30-60 sec",
            notes: "Arms overhead, legs extended, low back pressed flat; gymnast core"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 8,
    name: "Rest Day",
    slug: "rest-day-2",
    dayLabel: "Rest Day",
    isRest: true,
    sessions: []
  }
];

export function getWorkoutForDateBodyweight(startDate: Date, targetDate: Date): WorkoutDay2025 {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
  const targetTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
  const daysDiff = Math.floor((targetTime - startTime) / msPerDay);
  const cycleIndex = ((daysDiff % CYCLE_LENGTH_BODYWEIGHT) + CYCLE_LENGTH_BODYWEIGHT) % CYCLE_LENGTH_BODYWEIGHT;
  return WORKOUT_CYCLE_BODYWEIGHT[cycleIndex];
}
