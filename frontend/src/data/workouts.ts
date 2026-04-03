export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

export interface WorkoutDay {
  dayNumber: number;
  name: string;
  slug: string;
  muscleGroup: string;
  exercises: Exercise[];
  isRest: boolean;
  youtubeSearchQuery: string;
}

export const CYCLE_LENGTH = 7;

export const WORKOUT_CYCLE: WorkoutDay[] = [
  {
    dayNumber: 1,
    name: "Perfect Chest Workout",
    slug: "perfect-chest-workout",
    muscleGroup: "Chest",
    exercises: [
      {
        name: "Barbell Bench Press",
        sets: 4,
        reps: "6-8",
        notes: "heavy compound"
      },
      {
        name: "Incline Dumbbell Bench Press",
        sets: 3,
        reps: "10-12"
      },
      {
        name: "High-to-Low Cable Crossover",
        sets: 3,
        reps: "12-15"
      },
      {
        name: "Dip (Chest Version)",
        sets: 3,
        reps: "to failure"
      },
      {
        name: "Push-Up Plus",
        sets: 2,
        reps: "15",
        notes: "serratus activation"
      }
    ],
    isRest: false,
    youtubeSearchQuery: "AthleanX Perfect Chest Workout"
  },
  {
    dayNumber: 2,
    name: "Perfect Back Workout",
    slug: "perfect-back-workout",
    muscleGroup: "Back",
    exercises: [
      {
        name: "Deadlift",
        sets: 4,
        reps: "6-8"
      },
      {
        name: "Weighted Chin-Up",
        sets: 3,
        reps: "6-10"
      },
      {
        name: "Barbell Row",
        sets: 3,
        reps: "8-10"
      },
      {
        name: "One-Arm Dumbbell Row",
        sets: 3,
        reps: "10-12"
      },
      {
        name: "Straight Arm Pushdown",
        sets: 2,
        reps: "12-15"
      },
      {
        name: "Hyper Y/W Raise",
        sets: 2,
        reps: "15"
      }
    ],
    isRest: false,
    youtubeSearchQuery: "AthleanX Perfect Back Workout"
  },
  {
    dayNumber: 3,
    name: "Perfect Shoulder Workout",
    slug: "perfect-shoulder-workout",
    muscleGroup: "Shoulders",
    exercises: [
      {
        name: "Barbell Overhead Press",
        sets: 4,
        reps: "6-8"
      },
      {
        name: "Dumbbell Cheat Lateral",
        sets: 3,
        reps: "6-8",
        notes: "heavy"
      },
      {
        name: "Cable Face Pull",
        sets: 3,
        reps: "12-15"
      },
      {
        name: "Dumbbell Front Raise (thumb up)",
        sets: 2,
        reps: "10-12"
      },
      {
        name: "Rear Delt Cable Pull",
        sets: 2,
        reps: "12-15"
      }
    ],
    isRest: false,
    youtubeSearchQuery: "AthleanX Perfect Shoulder Workout"
  },
  {
    dayNumber: 4,
    name: "Perfect Leg Workout",
    slug: "perfect-leg-workout",
    muscleGroup: "Legs",
    exercises: [
      {
        name: "Barbell Squat",
        sets: 4,
        reps: "6-8"
      },
      {
        name: "Barbell Hip Thrust",
        sets: 3,
        reps: "8-10"
      },
      {
        name: "Dumbbell Bulgarian Split Squat",
        sets: 3,
        reps: "10-12 each"
      },
      {
        name: "Leg Curl (Slick Floor Bridge Curl alt.)",
        sets: 3,
        reps: "10-12"
      },
      {
        name: "Single Leg Calf Raise",
        sets: 3,
        reps: "10-15 each"
      },
      {
        name: "Adductor Squeeze",
        sets: 2,
        reps: "30 sec hold"
      }
    ],
    isRest: false,
    youtubeSearchQuery: "AthleanX Perfect Leg Workout"
  },
  {
    dayNumber: 5,
    name: "Perfect Arm Workout",
    slug: "perfect-arm-workout",
    muscleGroup: "Biceps & Triceps",
    exercises: [
      {
        name: "Barbell Cheat Curl",
        sets: 3,
        reps: "6-8"
      },
      {
        name: "Close-Grip Bench Press",
        sets: 3,
        reps: "6-8"
      },
      {
        name: "Incline Dumbbell Curl",
        sets: 3,
        reps: "10-12"
      },
      {
        name: "Lying Tricep Extension (skull crusher)",
        sets: 3,
        reps: "10-12"
      },
      {
        name: "Chin Curl",
        sets: 2,
        reps: "to failure"
      },
      {
        name: "Overhead Tricep Extension (cable)",
        sets: 2,
        reps: "12-15"
      }
    ],
    isRest: false,
    youtubeSearchQuery: "AthleanX Perfect Arm Workout"
  },
  {
    dayNumber: 6,
    name: "Perfect Ab Workout",
    slug: "perfect-ab-workout",
    muscleGroup: "Abs / Total Body",
    exercises: [
      {
        name: "Hanging Leg Raise",
        sets: 3,
        reps: "10-15"
      },
      {
        name: "Ab Wheel Rollout",
        sets: 3,
        reps: "10-12"
      },
      {
        name: "Woodchop (Cable)",
        sets: 3,
        reps: "12-15 each side"
      },
      {
        name: "Farmer's Carry",
        sets: 3,
        reps: "40 yards"
      },
      {
        name: "Plank",
        sets: 3,
        reps: "45-60 sec hold"
      }
    ],
    isRest: false,
    youtubeSearchQuery: "AthleanX Perfect Ab Workout"
  },
  {
    dayNumber: 7,
    name: "Rest Day",
    slug: "rest-day",
    muscleGroup: "Recovery",
    exercises: [],
    isRest: true,
    youtubeSearchQuery: "AthleanX Recovery Tips"
  }
];

/**
 * Calculates which day in the workout cycle a given date falls on.
 * @param startDate - The date when the workout cycle begins (Day 1)
 * @param targetDate - The date to find the workout for
 * @returns The WorkoutDay object for the target date
 */
export function getWorkoutForDate(startDate: Date, targetDate: Date): WorkoutDay {
  // Calculate the difference in days between start and target
  const msPerDay = 1000 * 60 * 60 * 24;
  const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
  const targetTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
  const daysDiff = Math.floor((targetTime - startTime) / msPerDay);

  // Calculate which day in the cycle (0-indexed)
  const cycleIndex = ((daysDiff % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;

  return WORKOUT_CYCLE[cycleIndex];
}
