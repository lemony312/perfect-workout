'use client'

import { createContext, useContext, ReactNode } from 'react'

interface WorkoutContextType {
  startDate: Date
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

export function WorkoutProvider({ children }: { children: ReactNode }) {
  // Default to today as Day 1
  // This can be easily swapped to a DB-backed start date later
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)

  return (
    <WorkoutContext.Provider value={{ startDate }}>
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
