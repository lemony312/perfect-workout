'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  getTendonDayForDate,
  CYCLE_LENGTH_TENDONS,
  TENDON_CYCLE,
  TENDON_TESTS,
  TENDON_VIDEO_ID,
  TENDON_VIDEO_TITLE,
} from '@/data/workouts-tendons'
import { useTendonStartDate } from '@/lib/tendon-start'
import WorkoutPicker from '@/components/WorkoutPicker'

const TENDON_COLOR = '#2dd4bf'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function CalendarTendons() {
  const { startDate, setTodayAs } = useTendonStartDate()
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startingDayOfWeek = firstDay.getDay()

  const calendarDays: Array<Date | null> = []
  for (let i = 0; i < startingDayOfWeek; i++) calendarDays.push(null)
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(new Date(year, month, day))

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))

  const handleDayClick = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    router.push(`/tendons/day/${dateStr}`)
  }

  const isToday = (date: Date) => date.toDateString() === today.toDateString()

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-2 tracking-tight">
            TENDON TRAINING
          </h1>
          <p className="text-lg text-[#a0a0a0]">3 days a week · 20–30 min · think in months</p>
        </div>

        {/* Workout Picker */}
        <div className="mb-6 max-w-sm mx-auto">
          <WorkoutPicker
            options={TENDON_CYCLE.map((day) => ({
              dayNumber: day.dayNumber,
              label: day.dayLabel,
              detail: day.isRest ? 'Rest & Recovery' : day.focus,
              isRest: day.isRest,
            }))}
            cycleLength={CYCLE_LENGTH_TENDONS}
            currentDayNumber={getTendonDayForDate(startDate, today).dayNumber}
            onSelect={setTodayAs}
          />
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6 bg-[#1a1a1a] p-4 rounded-lg border border-white/5">
          <button
            onClick={handlePrevMonth}
            className="p-3 hover:bg-[#252525] active:bg-[#303030] rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#f5f5f5]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#f5f5f5]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-[#1a1a1a] rounded-lg border border-white/5 p-4 shadow-2xl">
          <div className="grid grid-cols-7 gap-0.5 sm:gap-2 mb-4">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-[10px] sm:text-sm font-semibold text-[#a0a0a0] py-1 sm:py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 sm:gap-2">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const day = getTendonDayForDate(startDate, date)

              return (
                <button
                  key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                  onClick={() => handleDayClick(date)}
                  className={`
                    aspect-square p-0.5 sm:p-2 rounded sm:rounded-lg border border-white/5 transition-all overflow-hidden
                    hover:scale-105 hover:bg-[#252525] active:bg-[#303030] bg-[#1a1a1a]/50
                    ${isToday(date) ? 'ring-2 ring-[#e53e3e] ring-offset-1 sm:ring-offset-2 ring-offset-[#0f0f0f]' : ''}
                  `}
                >
                  <div className="flex flex-col h-full overflow-hidden">
                    <span className="text-[10px] sm:text-sm font-semibold mb-0 sm:mb-1 text-[#f5f5f5] leading-tight">
                      {date.getDate()}
                    </span>
                    {day.isRest ? (
                      <span className="text-[8px] sm:text-xs text-gray-400">Rest</span>
                    ) : (
                      <div
                        className="text-[7px] sm:text-xs leading-tight border-l sm:border-l-2 pl-0.5 sm:pl-1 border-teal-600"
                        style={{ color: TENDON_COLOR }}
                        title={day.focus}
                      >
                        <span className="sm:hidden">{day.dayLabel.replace('Tendon Day ', 'D')}</span>
                        <span className="hidden sm:inline">{day.dayLabel}</span>
                        <span className="hidden md:block text-[10px] text-[#a0a0a0] mt-0.5 line-clamp-2">{day.focus}</span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Progress tests */}
        <div className="mt-6 bg-[#1a1a1a] rounded-lg border border-white/5 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-[#f5f5f5] mb-1">Test every 4 weeks</h3>
          <p className="text-sm text-[#a0a0a0] mb-3">Don&apos;t trust the mirror — write the numbers down.</p>
          <ol className="space-y-1.5 text-sm text-[#d4d4d4] list-decimal list-inside">
            {TENDON_TESTS.map((test) => (
              <li key={test}>{test}</li>
            ))}
          </ol>
        </div>

        {/* Source video */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <a
            href={`https://www.youtube.com/watch?v=${TENDON_VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#a0a0a0] hover:text-[#e53e3e] transition-colors"
          >
            Source video: {TENDON_VIDEO_TITLE}
          </a>
        </div>
      </div>
    </div>
  )
}
