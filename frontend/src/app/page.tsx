'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWorkout } from '@/context/WorkoutContext'
import { getWorkoutForDate, CYCLE_LENGTH, WORKOUT_CYCLE } from '@/data/workouts'
import WorkoutPicker from '@/components/WorkoutPicker'

const MUSCLE_GROUP_COLORS: Record<string, string> = {
  Chest: 'bg-red-600/20 border-red-600/40 text-red-400',
  Back: 'bg-blue-600/20 border-blue-600/40 text-blue-400',
  Shoulders: 'bg-orange-600/20 border-orange-600/40 text-orange-400',
  Legs: 'bg-green-600/20 border-green-600/40 text-green-400',
  'Biceps & Triceps': 'bg-purple-600/20 border-purple-600/40 text-purple-400',
  'Abs / Total Body': 'bg-yellow-600/20 border-yellow-600/40 text-yellow-400',
  Recovery: 'bg-gray-600/20 border-gray-600/40 text-gray-400',
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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

export default function Home() {
  const { startDate } = useWorkout()
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // Get first day of the month and total days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Generate calendar days
  const calendarDays: Array<Date | null> = []

  // Add empty cells for days before the first day
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day))
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const handleDayClick = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    router.push(`/day/${dateStr}`)
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const getWorkoutForDay = (date: Date) => {
    return getWorkoutForDate(startDate, date)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-2 tracking-tight">
            PERFECT WORKOUT
          </h1>
          <p className="text-lg text-[#a0a0a0]">AthleanX Series</p>
        </div>

        {/* Workout Picker */}
        <div className="mb-6 max-w-sm mx-auto">
          <WorkoutPicker
            options={WORKOUT_CYCLE.map((day) => ({
              dayNumber: day.dayNumber,
              label: day.name,
              detail: day.isRest ? 'Rest & Recovery' : day.muscleGroup,
              isRest: day.isRest,
            }))}
            cycleLength={CYCLE_LENGTH}
            currentDayNumber={getWorkoutForDate(startDate, today).dayNumber}
          />
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6 bg-[#1a1a1a] p-4 rounded-lg border border-white/5">
          <button
            onClick={handlePrevMonth}
            className="p-3 hover:bg-[#252525] active:bg-[#303030] rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-[#f5f5f5]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <h2 className="text-xl sm:text-2xl font-semibold text-[#f5f5f5]">
            {MONTHS[month]} {year}
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-3 hover:bg-[#252525] active:bg-[#303030] rounded-lg transition-colors"
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-[#f5f5f5]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-[#1a1a1a] rounded-lg border border-white/5 p-4 shadow-2xl">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs sm:text-sm font-semibold text-[#a0a0a0] py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const workout = getWorkoutForDay(date)
              const colorClass = MUSCLE_GROUP_COLORS[workout.muscleGroup] || MUSCLE_GROUP_COLORS.Recovery
              const isTodayDate = isToday(date)

              return (
                <button
                  key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                  onClick={() => handleDayClick(date)}
                  className={`
                    aspect-square p-1 sm:p-2 rounded-md sm:rounded-lg border transition-all
                    hover:scale-105 hover:bg-[#252525] active:bg-[#303030]
                    ${colorClass}
                    ${isTodayDate ? 'ring-2 ring-[#e53e3e] ring-offset-1 sm:ring-offset-2 ring-offset-[#0f0f0f]' : ''}
                  `}
                >
                  <div className="flex flex-col h-full">
                    <span className="text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1">
                      {date.getDate()}
                    </span>
                    <span className="text-[10px] sm:text-xs line-clamp-2 leading-tight" title={workout.name}>
                      {workout.name}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {Object.entries(MUSCLE_GROUP_COLORS).map(([group, colorClass]) => (
            <div key={group} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border ${colorClass}`} />
              <span className="text-sm text-[#a0a0a0]">{group}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
