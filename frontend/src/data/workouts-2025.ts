export interface Exercise {
  name: string;
  sets: number | string;
  reps: string;
  notes?: string;
}

export interface WorkoutSession2025 {
  name: string;
  muscleGroups: string[];
  exercises: Exercise[];
  videoId: string;
  videoTitle: string;
  isPrimary: boolean;
  notes?: string;
}

export interface WorkoutDay2025 {
  dayNumber: number;
  name: string;
  slug: string;
  sessions: WorkoutSession2025[];
  isRest: boolean;
  dayLabel: string;
}

export const CYCLE_LENGTH_2025 = 8;

export const WORKOUT_CYCLE_2025: WorkoutDay2025[] = [
  {
    dayNumber: 1,
    name: "Chest & Triceps - Workout 1",
    slug: "chest-triceps-workout-1",
    dayLabel: "Push Day 1",
    isRest: false,
    sessions: [
      {
        name: "Perfect Chest Workout 1",
        muscleGroups: ["Chest"],
        isPrimary: true,
        videoId: "zD266B2jk0s",
        videoTitle: "The PERFECT Chest Workout (Sets and Reps Included)",
        exercises: [
          {
            name: "Banded ER",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer - sub max"
          },
          {
            name: "Incline DB Bench Press",
            sets: 3,
            reps: "5-8",
            notes: "To failure; thumbs up and forward for extra adduction"
          },
          {
            name: "Crossovers",
            sets: 3,
            reps: "10-12 + Partials",
            notes: "Lean back; partials after failure"
          },
          {
            name: "Floor Flys",
            sets: "2-3",
            reps: "8-10 + Eccentric Only Reps",
            notes: "Floor press up then control eccentric to failure"
          },
          {
            name: "Deficit 1.5 Rep Ladder Pushups",
            sets: 1,
            reps: "to failure",
            notes: "1.5 rep with ascending hold ladder: rep 1=1s, rep 2=2s..."
          },
          {
            name: "Dips",
            sets: 1,
            reps: "to failure + Partial Reps"
          }
        ]
      },
      {
        name: "Perfect Triceps Workout 1",
        muscleGroups: ["Triceps"],
        isPrimary: false,
        videoId: "8Nkfuhxsl-0",
        videoTitle: "The PERFECT Triceps Workout (Sets and Reps Included)",
        exercises: [
          {
            name: "Triceps Pushdowns",
            sets: "2-3",
            reps: "6-8",
            notes: "To failure - heavy, lateral/medial heads"
          },
          {
            name: "Lying DB Extensions",
            sets: "2-3",
            reps: "8-10 + Eccentric Only Reps",
            notes: "Cheat up, control eccentric"
          },
          {
            name: "DB/Cable Triceps Kickbacks",
            sets: "2-3",
            reps: "10-12 + Partials",
            notes: "Long head contracted position"
          },
          {
            name: "Cobra Pushups",
            sets: 1,
            reps: "to failure",
            notes: "Bodyweight burnout"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 2,
    name: "Back & Biceps - Workout 1",
    slug: "back-biceps-workout-1",
    dayLabel: "Pull Day 1",
    isRest: false,
    sessions: [
      {
        name: "Perfect Back Workout 1",
        muscleGroups: ["Back"],
        isPrimary: true,
        videoId: "fX36liNtKzw",
        videoTitle: "The PERFECT Back Workout (Sets and Reps Included)",
        exercises: [
          {
            name: "Scap Pulldown",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer - sub max"
          },
          {
            name: "Seated Cable Rows (elbows wide)",
            sets: 3,
            reps: "5-8",
            notes: "To failure - wide elbows, pull high for rear delts/upper back"
          },
          {
            name: "Lat Pulldowns (narrow grip)",
            sets: 3,
            reps: "10-12 + Partials"
          },
          {
            name: "Straight Arm Pushdowns",
            sets: "2-3",
            reps: "8-10 + Eccentric Only Reps"
          },
          {
            name: "1.5 Rep DB Pullover Ladder",
            sets: 1,
            reps: "to failure",
            notes: "Ascending hold in stretch"
          },
          {
            name: "Bodyweight/Banded Pullups",
            sets: 1,
            reps: "to failure",
            notes: "Bodyweight to failure, then band-assisted, then partials"
          }
        ]
      },
      {
        name: "Perfect Biceps Workout 1",
        muscleGroups: ["Biceps"],
        isPrimary: false,
        videoId: "hmeTQHsBwv8",
        videoTitle: "The PERFECT Biceps Workout (Sets and Reps Included)",
        exercises: [
          {
            name: "Barbell Strict Curl → Cheat Curls",
            sets: "2-3",
            reps: "6-8",
            notes: "To failure - mechanical drop set: strict against wall, then step away for cheat reps to eccentric failure"
          },
          {
            name: "DB Cross Body Hammer Curls",
            sets: "2-3",
            reps: "8-10",
            notes: "Pronated forearm, targets brachialis"
          },
          {
            name: "Cable Stretch Drag Curls",
            sets: "2-3",
            reps: "10-12 + Partials",
            notes: "Arms behind torso, long head emphasis"
          },
          {
            name: "Mentzer Pulldowns (Trap Set)",
            sets: 1,
            reps: "to failure",
            notes: "Escalating tempo: 1s/1s → 5s/5s → 1s/1s"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 3,
    name: "Legs & Shoulders - Workout 1",
    slug: "legs-shoulders-workout-1",
    dayLabel: "Legs & Shoulders Day 1",
    isRest: false,
    sessions: [
      {
        name: "Perfect Legs Workout 1",
        muscleGroups: ["Legs"],
        isPrimary: true,
        videoId: "QXtXEug0PLU",
        videoTitle: "The PERFECT Leg Workout (Sets and Reps Included)",
        exercises: [
          {
            name: "Reverse Hyper",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer - sub max; warm up low back and glutes"
          },
          {
            name: "Deadlifts / Trap Bar Deadlifts",
            sets: 3,
            reps: "5 @ 80%",
            notes: "NOT to failure; add 5 lbs each session"
          },
          {
            name: "Barbell Front Squats",
            sets: "2-3",
            reps: "6-8"
          },
          {
            name: "Alternating DB Reverse Lunges",
            sets: "2-3",
            reps: "10 each leg"
          },
          {
            name: "Seated Hamstring Curls / Slick Floor Bridge Curls",
            sets: 1,
            reps: "12-15 to failure + Eccentric Only Reps"
          },
          {
            name: "Standing Calf Raises",
            sets: "2-3",
            reps: "10-12 + Partial Reps",
            notes: "4s hold contracted, 4s hold stretched"
          }
        ]
      },
      {
        name: "Perfect Shoulders Workout 1",
        muscleGroups: ["Shoulders"],
        isPrimary: false,
        videoId: "zEf4pKoKc70",
        videoTitle: "The PERFECT Shoulder Workout (Sets and Reps Included)",
        exercises: [
          {
            name: "DB Single Arm OHP / Barbell OHP",
            sets: "2-3",
            reps: "6-8",
            notes: "To failure - single arm for shoulder issues, barbell if healthy"
          },
          {
            name: "DB Lateral Raises (Straight Arm → Bent Arm)",
            sets: "3-4",
            reps: "10-12 + Partials",
            notes: "Mechanical drop set"
          },
          {
            name: "DB Rear Delt Rows",
            sets: 2,
            reps: "10-12",
            notes: "Extension of elbow behind body"
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
    name: "Chest & Triceps - Workout 2",
    slug: "chest-triceps-workout-2",
    dayLabel: "Push Day 2",
    isRest: false,
    sessions: [
      {
        name: "Perfect Chest Workout 2",
        muscleGroups: ["Chest"],
        isPrimary: true,
        videoId: "zD266B2jk0s",
        videoTitle: "The PERFECT Chest Workout (Sets and Reps Included)",
        notes: "Exercise details from video - Workout 2",
        exercises: [
          {
            name: "Band Pull Apart (Primer)",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer - sub max"
          },
          {
            name: "Flat DB Bench Press",
            sets: 3,
            reps: "5-8",
            notes: "To failure - heavy compound movement"
          },
          {
            name: "High-to-Low Crossover",
            sets: 3,
            reps: "10-12 + Partials",
            notes: "Lower chest cable emphasis"
          },
          {
            name: "Incline Cable Press",
            sets: "2-3",
            reps: "8-10 + Eccentric Only Reps",
            notes: "Upper chest emphasis"
          },
          {
            name: "Dip (1.5 Rep Ladder)",
            sets: 1,
            reps: "to failure",
            notes: "Ascending hold ladder"
          },
          {
            name: "Prison Yard Pushup",
            sets: 1,
            reps: "to failure + Partial Reps",
            notes: "Bodyweight burnout"
          }
        ]
      },
      {
        name: "Perfect Triceps Workout 2",
        muscleGroups: ["Triceps"],
        isPrimary: false,
        videoId: "8Nkfuhxsl-0",
        videoTitle: "The PERFECT Triceps Workout (Sets and Reps Included)",
        notes: "Exercise details from video - Workout 2",
        exercises: [
          {
            name: "PJR Pullover",
            sets: "2-3",
            reps: "6-8",
            notes: "To failure - elbow extension focus"
          },
          {
            name: "Cable Tricep Push Away",
            sets: "2-3",
            reps: "8-10 + Eccentric Only Reps",
            notes: "Arms overhead, perpendicular cable angle"
          },
          {
            name: "X Push Down",
            sets: "2-3",
            reps: "10-12 + Partials",
            notes: "Cross-grip cable pushdown, elbows behind body"
          },
          {
            name: "Bench Dip",
            sets: 1,
            reps: "to failure",
            notes: "Bodyweight burnout - palms out, chest up"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 6,
    name: "Back & Biceps - Workout 2",
    slug: "back-biceps-workout-2",
    dayLabel: "Pull Day 2",
    isRest: false,
    sessions: [
      {
        name: "Perfect Back Workout 2",
        muscleGroups: ["Back"],
        isPrimary: true,
        videoId: "fX36liNtKzw",
        videoTitle: "The PERFECT Back Workout (Sets and Reps Included)",
        notes: "Exercise details from video - Workout 2",
        exercises: [
          {
            name: "Face Pulls (Primer)",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer - sub max"
          },
          {
            name: "Barbell Row",
            sets: 3,
            reps: "5-8",
            notes: "To failure - heavy compound"
          },
          {
            name: "Wide Grip Lat Pulldown",
            sets: 3,
            reps: "10-12 + Partials",
            notes: "Wide grip for upper back width"
          },
          {
            name: "DB High Pull",
            sets: "2-3",
            reps: "8-10 + Eccentric Only Reps",
            notes: "Upper back and rear delt focus"
          },
          {
            name: "1.5 Rep High Cable Row Ladder",
            sets: 1,
            reps: "to failure",
            notes: "Ascending hold ladder"
          },
          {
            name: "Inverted Row",
            sets: 1,
            reps: "to failure",
            notes: "Bodyweight burnout"
          }
        ]
      },
      {
        name: "Perfect Biceps Workout 2",
        muscleGroups: ["Biceps"],
        isPrimary: false,
        videoId: "hmeTQHsBwv8",
        videoTitle: "The PERFECT Biceps Workout (Sets and Reps Included)",
        notes: "Exercise details from video - Workout 2",
        exercises: [
          {
            name: "Chin-Up Curls",
            sets: "2-3",
            reps: "6-8",
            notes: "Bodyweight biceps compound"
          },
          {
            name: "DB Spider Curl",
            sets: "2-3",
            reps: "10-12",
            notes: "Short head emphasis - incline bench"
          },
          {
            name: "DB Incline Curl",
            sets: "2-3",
            reps: "10-12 + Partials",
            notes: "Long head emphasis - stretched position"
          },
          {
            name: "Standing DB Curl (Trap Set)",
            sets: 1,
            reps: "to failure",
            notes: "Escalating tempo trap set burnout"
          }
        ]
      }
    ]
  },
  {
    dayNumber: 7,
    name: "Legs & Shoulders - Workout 2",
    slug: "legs-shoulders-workout-2",
    dayLabel: "Legs & Shoulders Day 2",
    isRest: false,
    sessions: [
      {
        name: "Perfect Legs Workout 2",
        muscleGroups: ["Legs"],
        isPrimary: true,
        videoId: "QXtXEug0PLU",
        videoTitle: "The PERFECT Leg Workout (Sets and Reps Included)",
        notes: "Exercise details from video - Workout 2",
        exercises: [
          {
            name: "Banded Overhead Squat (Primer)",
            sets: "1-2",
            reps: "10-15",
            notes: "Primer - sub max; mobility and activation"
          },
          {
            name: "Barbell Squat",
            sets: 3,
            reps: "5-8",
            notes: "To failure - quad dominant compound"
          },
          {
            name: "Barbell Hip Thrust",
            sets: "2-3",
            reps: "6-8",
            notes: "Glute focus"
          },
          {
            name: "DB Spanish Squat",
            sets: "2-3",
            reps: "10 each leg",
            notes: "Quad focus with band assist"
          },
          {
            name: "Glute-Ham Raise (GHR)",
            sets: 1,
            reps: "12-15 to failure + Eccentric Only Reps",
            notes: "Hamstring burnout"
          },
          {
            name: "Seated Calf Raises",
            sets: "2-3",
            reps: "10-12 + Partial Reps",
            notes: "Soleus focus"
          }
        ]
      },
      {
        name: "Perfect Shoulders Workout 2",
        muscleGroups: ["Shoulders"],
        isPrimary: false,
        videoId: "zEf4pKoKc70",
        videoTitle: "The PERFECT Shoulder Workout (Sets and Reps Included)",
        notes: "Exercise details from video - Workout 2",
        exercises: [
          {
            name: "DB Cheat Lateral Raise",
            sets: "2-3",
            reps: "6-8",
            notes: "To failure - heavy lateral delts with momentum"
          },
          {
            name: "Incline Stretch Front Raise",
            sets: "3-4",
            reps: "10-12 + Partials",
            notes: "Front delt emphasis from incline stretch"
          },
          {
            name: "Face Pulls",
            sets: 2,
            reps: "10-12",
            notes: "Rear delt focus"
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

/**
 * Calculates which day in the 2025 workout cycle a given date falls on.
 * @param startDate - The date when the workout cycle begins (Day 1)
 * @param targetDate - The date to find the workout for
 * @returns The WorkoutDay2025 object for the target date
 */
export function getWorkoutForDate2025(startDate: Date, targetDate: Date): WorkoutDay2025 {
  // Calculate the difference in days between start and target
  const msPerDay = 1000 * 60 * 60 * 24;
  const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
  const targetTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
  const daysDiff = Math.floor((targetTime - startTime) / msPerDay);

  // Calculate which day in the cycle (0-indexed)
  const cycleIndex = ((daysDiff % CYCLE_LENGTH_2025) + CYCLE_LENGTH_2025) % CYCLE_LENGTH_2025;

  return WORKOUT_CYCLE_2025[cycleIndex];
}
