'use client'

import { use } from 'react'
import Link from 'next/link'
import { useWorkout } from '@/context/WorkoutContext'
import { getWorkoutForDate } from '@/data/workouts'

const MUSCLE_GROUP_COLORS: Record<string, string> = {
  Chest: 'bg-red-600/20 border-red-600 text-red-400',
  Back: 'bg-blue-600/20 border-blue-600 text-blue-400',
  Shoulders: 'bg-orange-600/20 border-orange-600 text-orange-400',
  Legs: 'bg-green-600/20 border-green-600 text-green-400',
  'Biceps & Triceps': 'bg-purple-600/20 border-purple-600 text-purple-400',
  'Abs / Total Body': 'bg-yellow-600/20 border-yellow-600 text-yellow-400',
  Recovery: 'bg-gray-600/20 border-gray-600 text-gray-400',
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date: dateStr } = use(params)
  const { startDate } = useWorkout()

  // Parse the date from the URL (YYYY-MM-DD format)
  const targetDate = new Date(dateStr)
  targetDate.setHours(0, 0, 0, 0)

  // Get the workout for this date
  const workout = getWorkoutForDate(startDate, targetDate)

  // Format the date
  const dayOfWeek = DAYS_OF_WEEK[targetDate.getDay()]
  const month = MONTHS[targetDate.getMonth()]
  const day = targetDate.getDate()
  const year = targetDate.getFullYear()

  const colorClass = MUSCLE_GROUP_COLORS[workout.muscleGroup] || MUSCLE_GROUP_COLORS.Recovery

  // Create YouTube search URL
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(workout.youtubeSearchQuery)}`

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Calendar
        </Link>

        {/* Date Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-2">
            {dayOfWeek}
          </h1>
          <p className="text-lg text-[#a0a0a0]">
            {month} {day}, {year}
          </p>
        </div>

        {/* Workout Title Card */}
        <div className="bg-[#1a1a1a] rounded-lg border border-white/5 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-2">
                {workout.name}
              </h2>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${colorClass}`}
              >
                {workout.muscleGroup}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#a0a0a0]">Day</div>
              <div className="text-3xl font-bold text-[#e53e3e]">
                {workout.dayNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Rest Day Content */}
        {workout.isRest ? (
          <div className="bg-[#1a1a1a] rounded-lg border border-white/5 p-8 text-center">
            <div className="text-6xl mb-4">🛌</div>
            <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">
              Rest & Recovery Day
            </h3>
            <div className="text-[#a0a0a0] space-y-2 max-w-2xl mx-auto">
              <p>
                Take this day to let your muscles recover and grow stronger.
              </p>
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
            {/* Exercise List */}
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-[#f5f5f5]">Exercises</h3>
              {workout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] rounded-lg border border-white/5 p-6 hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#f5f5f5] mb-2">
                        {index + 1}. {exercise.name}
                      </h4>
                      {exercise.notes && (
                        <p className="text-sm text-[#a0a0a0] mt-2">
                          {exercise.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#a0a0a0] mb-1">Sets × Reps</div>
                      <div className="text-xl font-bold text-[#e53e3e]">
                        {exercise.sets} × {exercise.reps}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* YouTube Search Link */}
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#e53e3e] hover:bg-[#c53030] text-white font-semibold py-4 px-6 rounded-lg transition-colors text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Search on YouTube
              </div>
            </a>
          </>
        )}
      </div>
    </div>
  )
}
