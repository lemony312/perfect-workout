'use client'

// The slow/fast tempo preference, persisted and shared across the whole Salsa
// tab.
//
// Why this is a module and not `useState` in the detail view: the counted slow
// demo is how you actually learn a move, and picking "Slow" is a statement about
// how you're working right now, not about the move you happen to be looking at.
// Resetting it to `auto` every time you open a different move means re-selecting
// it on every single move — and worse, it means the *default* silently overrides
// a deliberate choice, so you start dancing to full tempo you didn't ask for.
//
// So the preference outlives navigation: move -> move, index -> move, steps ->
// couples, and across reloads. Both `/salsa` and `/salsa/couples` read the same
// key, because "I am drilling slowly today" spans both courses.
//
// It is deliberately NOT in the query string, unlike `?move=` and `?mode=drill`.
// Those describe *what you're looking at* and should survive being shared or
// bookmarked; tempo describes *how you're practising* and should survive
// navigation instead. A shared link shouldn't force your tempo on someone else.

import { useCallback, useSyncExternalStore } from 'react'

/**
 * `auto` plays the counted clip once and then the full-tempo one, which is the
 * teachers' own progression within a class. `slow` and `fast` pin one of them.
 */
export type TempoMode = 'slow' | 'auto' | 'fast'

const STORAGE_KEY = 'salsa-tempo-mode'

export const TEMPO_MODES: TempoMode[] = ['slow', 'auto', 'fast']

/** Labels used on the toggle. `auto` names the sequence, not the word "auto". */
export const TEMPO_LABELS: Record<TempoMode, string> = {
  slow: 'Slow ◐',
  auto: 'Slow → Fast',
  fast: 'Full tempo ▶',
}

const isTempoMode = (v: unknown): v is TempoMode =>
  v === 'slow' || v === 'auto' || v === 'fast'

// localStorage is an external store, so it is read through
// useSyncExternalStore rather than mirrored into state inside an effect. That
// avoids the cascading render the lint rule warns about, and more importantly it
// gets the static-export case right: `getServerSnapshot` supplies 'auto' for the
// prerendered HTML while `getSnapshot` reads the real value on the client, which
// is precisely the hydration-mismatch problem this hook has to solve.

/** Same-document listeners. `storage` only fires cross-document, so writes here
 *  must notify local subscribers explicitly or the toggle won't re-render. */
const listeners = new Set<() => void>()

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange()
  }
  // Keeps two tabs — or the steps and couples pages open side by side — in step.
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot(): TempoMode {
  const raw = localStorage.getItem(STORAGE_KEY)
  return isTempoMode(raw) ? raw : 'auto'
}

/** The prerendered HTML cannot know a per-browser preference. */
const getServerSnapshot = (): TempoMode => 'auto'

/** Read/write the shared tempo preference. */
export function useTempoMode(): [TempoMode, (m: TempoMode) => void] {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const update = useCallback((next: TempoMode) => {
    localStorage.setItem(STORAGE_KEY, next)
    for (const l of listeners) l()
  }, [])

  return [mode, update]
}
