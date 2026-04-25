'use client'

import Link from 'next/link'
import { useWorkout } from '@/context/WorkoutContext'
import {
  getWorkoutForDateBodyweight,
} from '@/data/workouts-bodyweight'
import type { Exercise, WorkoutSession2025 } from '@/data/workouts-2025'
import RestTimer from '@/components/RestTimer'

const MUSCLE_GROUP_COLORS: Record<string, string> = {
  Chest: 'border-red-600 bg-red-600/10',
  Back: 'border-blue-600 bg-blue-600/10',
  Legs: 'border-green-600 bg-green-600/10',
  Triceps: 'border-purple-600 bg-purple-600/10',
  Biceps: 'border-amber-600 bg-amber-600/10',
  Shoulders: 'border-orange-600 bg-orange-600/10',
  Core: 'border-teal-600 bg-teal-600/10',
}

const MUSCLE_TEXT_COLORS: Record<string, string> = {
  Chest: '#f87171',
  Back: '#60a5fa',
  Legs: '#4ade80',
  Triceps: '#a78bfa',
  Biceps: '#fbbf24',
  Shoulders: '#fb923c',
  Core: '#2dd4bf',
}

const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function ExerciseCard({
  exercise,
  index,
  textColor,
}: {
  exercise: Exercise
  index: number
  textColor: string
}) {
  return (
    <div className="bg-[#252525] rounded-lg border border-white/5 p-4 sm:p-5 hover:bg-[#2a2a2a] transition-colors">
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h5 className="text-base font-semibold text-[#f5f5f5] mb-2">
            {index + 1}. {exercise.name}
          </h5>
          {exercise.notes && (
            <p className="text-sm text-[#a0a0a0] mt-1">{exercise.notes}</p>
          )}
        </div>
        <div className="mt-3">
          <div className="text-xs text-[#a0a0a0] mb-1">Sets × Reps</div>
          <div className="text-lg font-bold" style={{ color: textColor }}>
            {exercise.sets} × {exercise.reps}
          </div>
        </div>
      </div>
    </div>
  )
}

function SessionBlock({ session }: { session: WorkoutSession2025 }) {
  const primaryMuscle = session.muscleGroups[0]
  const colorClass = MUSCLE_GROUP_COLORS[primaryMuscle] || 'border-gray-600 bg-gray-600/10'
  const textColor = MUSCLE_TEXT_COLORS[primaryMuscle] || '#9ca3af'

  return (
    <div
      className={`bg-[#1a1a1a] rounded-lg border-l-4 border-t border-r border-b border-white/5 ${colorClass.split(' ')[0]} p-6`}
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#f5f5f5]">{session.name}</h3>
          <span className="text-xs text-[#a0a0a0] px-2 py-1 rounded bg-white/5">
            {session.isPrimary ? 'Primary' : 'Secondary'}
          </span>
        </div>
      </div>

      {session.notes && (
        <div className="mb-6 p-4 bg-[#252525] rounded-lg border border-white/5">
          <p className="text-sm text-[#a0a0a0] italic">{session.notes}</p>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-[#f5f5f5]">Exercises</h4>
        {session.exercises.map((exercise, exIdx) => (
          <ExerciseCard
            key={exIdx}
            exercise={exercise}
            index={exIdx}
            textColor={textColor}
          />
        ))}
      </div>
    </div>
  )
}

export default function BodyweightDayClient({ dateStr }: { dateStr: string }) {
  const { startDate } = useWorkout()

  const [yr, mo, da] = dateStr.split('-').map(Number)
  const targetDate = new Date(yr, mo - 1, da)

  const workout = getWorkoutForDateBodyweight(startDate, targetDate)

  const dayOfWeek = DAYS_OF_WEEK[targetDate.getDay()]
  const month = MONTHS[targetDate.getMonth()]
  const day = targetDate.getDate()
  const year = targetDate.getFullYear()

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/bodyweight"
          className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Calendar
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-2">{dayOfWeek}</h1>
          <p className="text-lg text-[#a0a0a0]">{month} {day}, {year}</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg border border-white/5 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-3">
                {workout.dayLabel}
              </h2>
              <div className="flex flex-wrap gap-2">
                {workout.sessions.map((session, idx) => (
                  <span
                    key={idx}
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
                      MUSCLE_GROUP_COLORS[session.muscleGroups[0]] || 'border-gray-600 bg-gray-600/10'
                    }`}
                    style={{ color: MUSCLE_TEXT_COLORS[session.muscleGroups[0]] || '#9ca3af' }}
                  >
                    {session.muscleGroups.join(' + ')}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#a0a0a0]">Day</div>
              <div className="text-3xl font-bold text-[#2dd4bf]">{workout.dayNumber}</div>
            </div>
          </div>
        </div>

        {workout.isRest ? (
          <div className="bg-[#1a1a1a] rounded-lg border border-white/5 p-8 text-center">
            <div className="text-6xl mb-4">🛌</div>
            <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">Rest & Recovery Day</h3>
            <div className="text-[#a0a0a0] space-y-2 max-w-2xl mx-auto">
              <p>Take this day to let your muscles recover and grow stronger.</p>
              <p className="text-sm">Recovery tips:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>Get 7-9 hours of quality sleep</li>
                <li>Stay hydrated throughout the day</li>
                <li>Consider light stretching or yoga</li>
                <li>Focus on nutrition and proper protein intake</li>
                <li>Foam roll or massage sore muscles</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {workout.sessions.map((session, sessionIdx) => (
                <SessionBlock key={sessionIdx} session={session} />
              ))}
            </div>
            <RestTimer />
          </>
        )}
      </div>
    </div>
  )
}
