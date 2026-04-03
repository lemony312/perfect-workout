'use client'

import { use } from 'react'
import Link from 'next/link'
import { useWorkout } from '@/context/WorkoutContext'
import { getWorkoutForDate2025 } from '@/data/workouts-2025'

const MUSCLE_GROUP_COLORS: Record<string, string> = {
  Chest: 'border-red-600 bg-red-600/10',
  Back: 'border-blue-600 bg-blue-600/10',
  Legs: 'border-green-600 bg-green-600/10',
  Triceps: 'border-purple-600 bg-purple-600/10',
  Biceps: 'border-amber-600 bg-amber-600/10',
  Shoulders: 'border-orange-600 bg-orange-600/10',
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

export default function WorkoutDetail2025Page({
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
  const workout = getWorkoutForDate2025(startDate, targetDate)

  // Format the date
  const dayOfWeek = DAYS_OF_WEEK[targetDate.getDay()]
  const month = MONTHS[targetDate.getMonth()]
  const day = targetDate.getDate()
  const year = targetDate.getFullYear()

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/2025"
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-3">
                {workout.dayLabel}
              </h2>
              <div className="flex flex-wrap gap-2">
                {workout.sessions.map((session, idx) => (
                  <span
                    key={idx}
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
                      MUSCLE_GROUP_COLORS[session.muscleGroups[0]] || 'border-gray-600 bg-gray-600/10'
                    }`}
                    style={{
                      color: session.muscleGroups[0] === 'Chest' ? '#f87171' :
                             session.muscleGroups[0] === 'Back' ? '#60a5fa' :
                             session.muscleGroups[0] === 'Legs' ? '#4ade80' :
                             session.muscleGroups[0] === 'Triceps' ? '#a78bfa' :
                             session.muscleGroups[0] === 'Biceps' ? '#fbbf24' :
                             session.muscleGroups[0] === 'Shoulders' ? '#fb923c' :
                             '#9ca3af'
                    }}
                  >
                    {session.muscleGroups.join(' + ')}
                  </span>
                ))}
              </div>
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
            {/* Workout Sessions */}
            <div className="space-y-8">
              {workout.sessions.map((session, sessionIdx) => {
                const primaryMuscle = session.muscleGroups[0]
                const colorClass = MUSCLE_GROUP_COLORS[primaryMuscle] || 'border-gray-600 bg-gray-600/10'
                const textColor = primaryMuscle === 'Chest' ? '#f87171' :
                                 primaryMuscle === 'Back' ? '#60a5fa' :
                                 primaryMuscle === 'Legs' ? '#4ade80' :
                                 primaryMuscle === 'Triceps' ? '#a78bfa' :
                                 primaryMuscle === 'Biceps' ? '#fbbf24' :
                                 primaryMuscle === 'Shoulders' ? '#fb923c' :
                                 '#9ca3af'

                return (
                  <div
                    key={sessionIdx}
                    className={`bg-[#1a1a1a] rounded-lg border-l-4 border-t border-r border-b border-white/5 ${colorClass.split(' ')[0]} p-6`}
                  >
                    {/* Session Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-[#f5f5f5] mb-2">
                        {session.name}
                      </h3>
                      <p className="text-sm text-[#a0a0a0] mb-4">
                        {session.isPrimary ? 'Primary Workout' : 'Secondary Workout'}
                      </p>

                      {/* YouTube Video Thumbnail */}
                      <a
                        href={`https://www.youtube.com/watch?v=${session.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mb-4 group"
                      >
                        <div className="relative rounded-lg overflow-hidden border border-white/10 transition-all group-hover:border-[#e53e3e] group-hover:scale-[1.02]">
                          <img
                            src={`https://img.youtube.com/vi/${session.videoId}/mqdefault.jpg`}
                            alt={session.videoTitle}
                            className="w-full h-auto"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="bg-[#e53e3e] rounded-full p-4 group-hover:scale-110 transition-transform">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-white"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#a0a0a0] mt-2 group-hover:text-[#f5f5f5] transition-colors">
                          {session.videoTitle}
                        </p>
                      </a>
                    </div>

                    {/* Session Notes */}
                    {session.notes && (
                      <div className="mb-6 p-4 bg-[#252525] rounded-lg border border-white/5">
                        <p className="text-sm text-[#a0a0a0] italic">
                          {session.notes}
                        </p>
                      </div>
                    )}

                    {/* Exercises */}
                    {session.exercises.length > 0 ? (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-[#f5f5f5]">Exercises</h4>
                        {session.exercises.map((exercise, exIdx) => (
                          <div
                            key={exIdx}
                            className="bg-[#252525] rounded-lg border border-white/5 p-5 hover:bg-[#2a2a2a] transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex-1">
                                <h5 className="text-base font-semibold text-[#f5f5f5] mb-2">
                                  {exIdx + 1}. {exercise.name}
                                </h5>
                                {exercise.notes && (
                                  <p className="text-sm text-[#a0a0a0] mt-2">
                                    {exercise.notes}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-[#a0a0a0] mb-1">Sets × Reps</div>
                                <div className="text-lg font-bold" style={{ color: textColor }}>
                                  {exercise.sets} × {exercise.reps}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 bg-[#252525] rounded-lg border border-white/5 text-center">
                        <p className="text-[#a0a0a0] mb-4">
                          Watch the video for exercise details
                        </p>
                        <a
                          href={`https://www.youtube.com/watch?v=${session.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#e53e3e] hover:bg-[#c53030] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                          Watch on YouTube
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
