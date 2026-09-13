// Zero-choice drill session builder for the salsa tab (§6.3, Success test 5).
//
// Deterministic, no randomness, no UI. Playlist order is preserved. The cursor
// walks the whole course over consecutive sessions so you drill different moves
// each time, not the same three forever.

import type { SalsaMove, SalsaCue } from '@/data/salsa-steps'
import { DRILLABLE_CUE_KINDS } from '@/data/salsa-steps'

const CURSOR_KEY = 'salsa.drill.cursor'
const SESSION_COUNT_KEY = 'salsa.drill.sessionCount'

/**
 * One slot in a drill session. 70 seconds: 10s lead-in (name + up to 3 cues
 * spoken), 30s slow clip, 30s fast clip.
 */
export interface DrillSlot {
  move: SalsaMove
  /** Up to 3 drillable cues to speak during the lead-in, in beat order. */
  cues: SalsaCue[]
}

/**
 * Build a drill session of `minutes` duration. One slot per move, 70s each:
 * - Slot 1: basic-side on even sessions, basic-front-and-back on odd (warm-up).
 * - Slots 2..n: walk the course from the persisted cursor, wrapping.
 * - Skip: basic-body-movement unless minutes >= 15 (it's a drill class, not a step).
 * - Never speak: cues with confidence 'suspect'.
 *
 * The cursor advances by (n-1) when the session finishes (call `advanceCursor()`),
 * so consecutive sessions walk the whole course instead of drilling the same moves.
 */
export function buildDrill(
  minutes: number,
  moves: SalsaMove[],
  getCursor: () => number,
): DrillSlot[] {
  const slotsNeeded = Math.floor((minutes * 60) / 70)
  if (slotsNeeded === 0) return []

  const sessionCount = getSessionCount()
  const cursor = getCursor()

  // Slot 1: alternate between the two basics.
  const warmUpMove =
    sessionCount % 2 === 0
      ? moves.find((m) => m.id === 'basic-side')
      : moves.find((m) => m.id === 'basic-front-and-back')
  if (!warmUpMove) throw new Error('Basic moves not found in SALSA_MOVES')

  const slots: DrillSlot[] = [
    {
      move: warmUpMove,
      cues: selectDrillCues(warmUpMove, 3),
    },
  ]

  // Slots 2..n: walk the course from the cursor, wrapping.
  let idx = cursor
  const includeBodyMovement = minutes >= 15
  while (slots.length < slotsNeeded) {
    const move = moves[idx % moves.length]
    // Skip basic-body-movement unless it's a long session.
    if (move.id === 'basic-body-movement' && !includeBodyMovement) {
      idx++
      continue
    }
    slots.push({
      move,
      cues: selectDrillCues(move, 3),
    })
    idx++
  }

  return slots
}

/**
 * Select up to `max` drillable cues from a move, in beat order, excluding
 * suspect cues. Drillable cues are: footwork, lead, arms, rhythm (not styling,
 * concept, musicality, context).
 */
function selectDrillCues(move: SalsaMove, max: number): SalsaCue[] {
  const drillable = move.cues.filter(
    (c) =>
      DRILLABLE_CUE_KINDS.includes(c.kind) &&
      c.confidence !== 'suspect',
  )
  // Sort by beat (undefined beats go last), then take the first `max`.
  drillable.sort((a, b) => {
    const beatA = a.beat ?? a.beats?.[0] ?? Infinity
    const beatB = b.beat ?? b.beats?.[0] ?? Infinity
    return beatA - beatB
  })
  return drillable.slice(0, max)
}

/**
 * Persist the cursor for the next session. Call this when a drill session
 * completes (not when it starts), so the cursor advances by the number of
 * slots actually drilled.
 */
export function advanceCursor(slotsCompleted: number): void {
  if (typeof window === 'undefined') return
  const cursor = getCursorFromStorage()
  // Advance by (slots - 1) because slot 1 is always a basic, not a course slot.
  const delta = Math.max(0, slotsCompleted - 1)
  localStorage.setItem(CURSOR_KEY, String(cursor + delta))
  // Increment the session count so the next session uses the other basic.
  const sessionCount = getSessionCount()
  localStorage.setItem(SESSION_COUNT_KEY, String(sessionCount + 1))
}

/** Get the persisted cursor, defaulting to 0. */
export function getCursorFromStorage(): number {
  if (typeof window === 'undefined') return 0
  const raw = localStorage.getItem(CURSOR_KEY)
  const n = raw ? parseInt(raw, 10) : 0
  return isNaN(n) ? 0 : n
}

/** Get the persisted session count (for alternating basics), defaulting to 0. */
function getSessionCount(): number {
  if (typeof window === 'undefined') return 0
  const raw = localStorage.getItem(SESSION_COUNT_KEY)
  const n = raw ? parseInt(raw, 10) : 0
  return isNaN(n) ? 0 : n
}
