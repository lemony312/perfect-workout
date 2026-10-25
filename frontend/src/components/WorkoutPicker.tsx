'use client'

import { useState } from 'react'
import { useWorkout } from '@/context/WorkoutContext'

interface WorkoutOption {
  dayNumber: number
  label: string
  detail: string
  isRest: boolean
}

export default function WorkoutPicker({
  options,
  cycleLength,
  currentDayNumber,
}: {
  options: WorkoutOption[]
  cycleLength: number
  currentDayNumber: number
}) {
  const { setTodayAs } = useWorkout()
  const [isOpen, setIsOpen] = useState(false)

  const currentOption = options.find((o) => o.dayNumber === currentDayNumber)

  const handleSelect = (dayNumber: number) => {
    setTodayAs(dayNumber, cycleLength)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-left hover:bg-[#252525] active:bg-[#303030] transition-colors"
      >
        <div className="min-w-0">
          <div className="text-xs text-[#a0a0a0] mb-0.5">Today&apos;s workout</div>
          <div className="text-sm font-semibold text-[#f5f5f5] truncate">
            {currentOption ? currentOption.label : 'Select workout'}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-5 h-5 text-[#a0a0a0] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute left-0 right-0 z-50 mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl overflow-hidden max-h-[70vh] overflow-y-auto">
            <div className="px-3 py-2 border-b border-white/5">
              <p className="text-xs text-[#a0a0a0]">What are you doing today?</p>
            </div>
            {options.map((option) => (
              <button
                key={option.dayNumber}
                onClick={() => handleSelect(option.dayNumber)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  option.dayNumber === currentDayNumber
                    ? 'bg-[#e53e3e]/10 border-l-2 border-[#e53e3e]'
                    : 'hover:bg-[#252525] active:bg-[#303030] border-l-2 border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  option.dayNumber === currentDayNumber
                    ? 'bg-[#e53e3e] text-white'
                    : option.isRest
                      ? 'bg-gray-600/20 text-gray-400'
                      : 'bg-white/5 text-[#f5f5f5]'
                }`}>
                  {option.dayNumber}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#f5f5f5] truncate">
                    {option.label}
                  </div>
                  <div className="text-xs text-[#a0a0a0] truncate">
                    {option.detail}
                  </div>
                </div>
                {option.dayNumber === currentDayNumber && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#e53e3e] flex-shrink-0 ml-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
