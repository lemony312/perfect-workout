'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'

// The tendon routine keeps its own start date rather than WorkoutContext's shared
// one. That one is shared by the 8-day lifting cycles, so picking "today is Tendon
// Day 3" on a 7-day cycle would also reshuffle the 2025 calendar.
//
// Read through useSyncExternalStore for the same reasons as salsa-tempo.ts. The
// snapshot is the stored string, not a Date, so it compares stable between renders.
const STORAGE_KEY = 'tendon-start-date'

const listeners = new Set<() => void>()

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onStorage)
  }
}

const getSnapshot = () => localStorage.getItem(STORAGE_KEY) ?? ''
const getServerSnapshot = () => ''

function today(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function format(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Unset or unparseable means today is Day 1. */
function parse(stored: string): Date {
  const [y, m, d] = stored.split('-').map(Number)
  const parsed = new Date(y, m - 1, d)
  return stored && !isNaN(parsed.getTime()) ? parsed : today()
}

export function useTendonStartDate() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const startDate = useMemo(() => parse(stored), [stored])

  /** Make today day `dayNumber` (1-indexed) of the cycle. */
  const setTodayAs = useCallback((dayNumber: number) => {
    const start = today()
    start.setDate(start.getDate() - (dayNumber - 1))
    localStorage.setItem(STORAGE_KEY, format(start))
    for (const l of listeners) l()
  }, [])

  return { startDate, setTodayAs }
}
