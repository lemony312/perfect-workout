'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface WorkoutContextType {
  startDate: Date
  /** Set which day in the cycle today should be (1-7) */
  setTodayAs: (dayNumber: number, cycleLength: number) => void
}

const STORAGE_KEY = 'workout-start-date'

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

function calculateStartDate(todayDayNumber: number, cycleLength: number): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  // If today should be dayNumber N (1-indexed), then startDate = today - (N-1) days
  const offset = todayDayNumber - 1
  const start = new Date(today)
  start.setDate(start.getDate() - offset)
  return start
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [startDate, setStartDate] = useState<Date>(() => {
    // Default: today is Day 1
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })

  // Load persisted start date from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const d = new Date(stored)
      if (!isNaN(d.getTime())) {
        d.setHours(0, 0, 0, 0)
        setStartDate(d)
      }
    }
  }, [])

  const setTodayAs = useCallback((dayNumber: number, cycleLength: number) => {
    const newStart = calculateStartDate(dayNumber, cycleLength)
    setStartDate(newStart)
    localStorage.setItem(STORAGE_KEY, newStart.toISOString().split('T')[0])
  }, [])

  return (
    <WorkoutContext.Provider value={{ startDate, setTodayAs }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider')
  }
  return context
}
