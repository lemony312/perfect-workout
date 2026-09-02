'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FIX_BAD_POSTURE,
  MUSIC_TRACKS,
  DEFAULT_LEAD_IN,
  type PostureMove,
} from '@/data/posture-routine'
import {
  unlockAudio,
  tick,
  startChime,
  switchChime,
  finishChime,
  say,
} from '@/lib/cues'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
const routine = FIX_BAD_POSTURE
// Move time only — drives the overall progress bar (lead-ins are excluded from
// both this and `elapsed`, so the two stay consistent).
const TOTAL_SECONDS = routine.moves.reduce((s, m) => s + m.duration, 0)
// Wall-clock estimate for the header, including each move's lead-in / rest.
const WALL_CLOCK_SECONDS = routine.moves.reduce(
  (s, m) => s + m.duration + (m.leadIn ?? DEFAULT_LEAD_IN),
  0,
)
// Five exercises fill the ten slots, so count distinct names for the header.
const UNIQUE_EXERCISES = new Set(
  routine.moves.map((m) => m.name.replace(/ — (right|left) leg$/, '')),
).size

// Slots grouped into their blocks for the list below, keeping each move's
// original index so numbering and current-move highlighting still line up.
const BLOCKS = routine.moves.reduce<
  { label?: string; items: { move: PostureMove; index: number }[] }[]
>((acc, move, index) => {
  if (move.blockLabel || acc.length === 0) acc.push({ label: move.blockLabel, items: [] })
  acc[acc.length - 1].items.push({ move, index })
  return acc
}, [])

type Status = 'idle' | 'running' | 'paused' | 'done'

// Lead-in ("Get ready") before a move's counter starts. Most moves use the
// default; slots that change your setup carry a longer break via `leadIn`.
const leadInFor = (m: PostureMove) => m.leadIn ?? DEFAULT_LEAD_IN

export default function PosturePage() {
  // Each move begins with a lead-in: its own demo clip plays and a "Get ready"
  // countdown runs, THEN the move's counter starts.

  const [status, setStatus] = useState<Status>('idle')
  const [moveIndex, setMoveIndex] = useState(0)
  const [remaining, setRemaining] = useState(routine.moves[0].duration)
  const [leadIn, setLeadIn] = useState(false)
  const [leadRemaining, setLeadRemaining] = useState(0)
  const [muteVoice, setMuteVoice] = useState(false)
  const [trackId, setTrackId] = useState<string>(MUSIC_TRACKS[0].id)
  const [musicOn, setMusicOn] = useState(true)
  const musicRef = useRef<HTMLAudioElement>(null)

  const track = MUSIC_TRACKS.find((t) => t.id === trackId) ?? MUSIC_TRACKS[0]

  // Background music follows the timer: play while running, pause otherwise.
  // Re-runs on track change so switching songs mid-routine keeps playing.
  useEffect(() => {
    const a = musicRef.current
    if (!a) return
    if (musicOn && status === 'running') {
      void a.play().catch(() => {})
    } else {
      a.pause()
      if (status === 'idle' || status === 'done') a.currentTime = 0
    }
  }, [musicOn, status, trackId])

  // Refs so the interval callback always sees fresh values without resubscribing.
  const moveIndexRef = useRef(moveIndex)
  const remainingRef = useRef(remaining)
  const halfwayFiredRef = useRef(false)
  const muteVoiceRef = useRef(muteVoice)
  const leadInRef = useRef(leadIn)
  const leadRemainingRef = useRef(leadRemaining)
  moveIndexRef.current = moveIndex
  remainingRef.current = remaining
  muteVoiceRef.current = muteVoice
  leadInRef.current = leadIn
  leadRemainingRef.current = leadRemaining

  const move = routine.moves[moveIndex]
  const nextMove: PostureMove | undefined = routine.moves[moveIndex + 1]

  const speak = useCallback((text: string) => {
    if (!muteVoiceRef.current) say(text)
  }, [])

  // Move to `idx` and begin its lead-in: the move's own clip is on screen and a
  // "Get ready" countdown runs before the counter starts. Announce the name now.
  const beginMove = useCallback(
    (idx: number) => {
      halfwayFiredRef.current = false
      setMoveIndex(idx)
      setRemaining(routine.moves[idx].duration)
      setLeadIn(true)
      setLeadRemaining(leadInFor(routine.moves[idx]))
      startChime()
      speak(routine.moves[idx].name)
    },
    [speak],
  )

  const tickSecond = useCallback(() => {
    // --- Lead-in phase: showing this move's clip before its counter starts ---
    if (leadInRef.current) {
      const r = leadRemainingRef.current
      if (r > 1) {
        setLeadRemaining(r - 1)
        return
      }
      // Lead-in over — start the move's counter.
      setLeadIn(false)
      setLeadRemaining(0)
      return
    }

    // --- Active move phase ---
    const cur = remainingRef.current
    const idx = moveIndexRef.current
    const m = routine.moves[idx]

    // Halfway cue (form reminder) — fire once when we cross the midpoint.
    if (
      m.halfwayCue &&
      !halfwayFiredRef.current &&
      cur === Math.ceil(m.duration / 2)
    ) {
      halfwayFiredRef.current = true
      switchChime()
      speak(m.halfwayCue)
    } else if (cur > 3 && cur % 10 === 0) {
      // Spoken time-remaining reminder at each 10s boundary (e.g. 20s, 10s left).
      // Skipped when it coincides with the halfway cue above.
      tick()
      speak(`${cur} seconds left`)
    }

    // Countdown ticks for the last 3 seconds of the move.
    if (cur <= 3 && cur > 0) tick()

    if (cur > 1) {
      setRemaining(cur - 1)
      return
    }

    // Move finished — advance to the next move (which starts with its lead-in).
    const isLast = idx >= routine.moves.length - 1
    if (isLast) {
      setStatus('done')
      finishChime()
      speak('All done. Great work.')
      return
    }
    beginMove(idx + 1)
  }, [beginMove, speak])

  // Drive the timer.
  useEffect(() => {
    if (status !== 'running') return
    const id = window.setInterval(tickSecond, 1000)
    return () => window.clearInterval(id)
  }, [status, tickSecond])

  const start = () => {
    unlockAudio()
    setStatus('running')
    beginMove(0)
  }

  const pause = () => setStatus('paused')
  const resume = () => setStatus('running')

  const reset = () => {
    setStatus('idle')
    setMoveIndex(0)
    setRemaining(routine.moves[0].duration)
    setLeadIn(false)
    setLeadRemaining(0)
    halfwayFiredRef.current = false
  }

  const skip = () => {
    const idx = moveIndexRef.current
    const isLast = idx >= routine.moves.length - 1
    if (isLast) {
      setStatus('done')
      finishChime()
      return
    }
    beginMove(idx + 1)
  }

  // Finish early after the fifth slot — Jeff's "if you don't have a lot of time
  // you can stop right there" 2:30 version.
  const finishShort = () => {
    setStatus('done')
    finishChime()
    speak('Short version complete. Nice work.')
  }

  // Stop speech if the user leaves mid-routine.
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Keep the screen awake while the routine is actively running (like a video
  // player). Released on pause / done / unmount. Re-acquired if the tab regains
  // visibility, since the OS drops the lock when the page is hidden.
  useEffect(() => {
    if (status !== 'running') return
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) return

    let lock: WakeLockSentinel | null = null
    let cancelled = false

    const acquire = async () => {
      try {
        lock = await navigator.wakeLock.request('screen')
      } catch {
        // Denied (e.g. low battery) — nothing more we can do.
      }
    }

    const onVisible = () => {
      if (!cancelled && document.visibilityState === 'visible') void acquire()
    }

    void acquire()
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisible)
      void lock?.release().catch(() => {})
    }
  }, [status])

  // Elapsed seconds for the overall progress bar.
  const elapsedBefore = routine.moves
    .slice(0, moveIndex)
    .reduce((s, m) => s + m.duration, 0)
  const elapsed = elapsedBefore + (move.duration - remaining)
  const overallPct = Math.min(100, (elapsed / TOTAL_SECONDS) * 100)
  const movePct = ((move.duration - remaining) / move.duration) * 100

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">{routine.title}</h1>
          <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">{routine.subtitle}</p>
          <p className="text-[#707070] mt-1 text-xs">
            {UNIQUE_EXERCISES} exercises · {routine.moves.length} × 30s · ~
            {Math.round(WALL_CLOCK_SECONDS / 60)} min
          </p>
        </header>

        {/* Background music — loops; play/pause driven by the timer effect above */}
        <audio ref={musicRef} src={`${BASE_PATH}${track.src}`} loop preload="none" />

        {/* Music picker */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setMusicOn((v) => !v)}
            className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
              musicOn
                ? 'border-[#e53e3e]/50 text-[#f5f5f5] bg-[#e53e3e]/10'
                : 'border-white/10 text-[#707070]'
            }`}
          >
            {musicOn ? '🎵 Music on' : '🔇 Music off'}
          </button>
          <select
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            disabled={!musicOn}
            className="text-xs rounded-full px-3 py-1.5 bg-[#1a1a1a] border border-white/10 text-[#a0a0a0] disabled:opacity-40"
          >
            {MUSIC_TRACKS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {status === 'idle' && <IdleView onStart={start} />}

        {(status === 'running' || status === 'paused') && (
          <TimerView
            move={move}
            nextMove={nextMove}
            remaining={remaining}
            leadIn={leadIn}
            leadRemaining={leadRemaining}
            movePct={movePct}
            overallPct={overallPct}
            moveIndex={moveIndex}
            total={routine.moves.length}
            status={status}
            muteVoice={muteVoice}
            onPause={pause}
            onResume={resume}
            onSkip={skip}
            onReset={reset}
            onFinishShort={finishShort}
            onToggleVoice={() => setMuteVoice((v) => !v)}
          />
        )}

        {status === 'done' && <DoneView onRestart={start} onReset={reset} />}

        {/* Full slot list, grouped into the two blocks */}
        <div className="mt-8 space-y-6">
          {BLOCKS.map((block) => (
            <section key={block.label ?? 'block'}>
              {block.label && (
                <h2 className="text-[11px] uppercase tracking-widest text-[#fbbf24] mb-2">
                  {block.label}
                </h2>
              )}
              <ol className="space-y-2">
                {block.items.map(({ move: m, index: i }) => {
                  const isCurrent =
                    (status === 'running' || status === 'paused') && i === moveIndex
                  const isDone =
                    status === 'done' ||
                    ((status === 'running' || status === 'paused') && i < moveIndex)
                  return (
                    <li
                      key={i}
                      className={`rounded-lg border p-3 flex items-start gap-3 transition-colors ${
                        isCurrent
                          ? 'border-[#e53e3e] bg-[#1a1a1a]'
                          : 'border-white/5 bg-[#141414]'
                      }`}
                    >
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full grid place-items-center text-xs font-semibold ${
                          isDone
                            ? 'bg-green-600/20 text-green-400'
                            : isCurrent
                              ? 'bg-[#e53e3e] text-white'
                              : 'bg-[#252525] text-[#a0a0a0]'
                        }`}
                      >
                        {isDone ? '✓' : i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{m.name}</span>
                          {m.setup && (
                            <span className="text-[10px] uppercase tracking-wide text-[#a0a0a0] border border-white/10 rounded px-1.5 py-0.5">
                              {m.setup}
                            </span>
                          )}
                          <span className="text-xs text-[#707070]">{m.duration}s</span>
                        </div>
                        <p className="text-sm text-[#a0a0a0] mt-0.5">{m.description}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </section>
          ))}
        </div>

        {/* Full source video — lazy-loaded only when the user asks for it */}
        <FullVideo src={`${BASE_PATH}${routine.video}`} />

        {/* Music attribution (CC BY 3.0 requires credit) */}
        <p className="text-center text-[#5a5a5a] text-[10px] mt-6">Music: {track.credit}</p>
      </div>
    </main>
  )
}

function FullVideo({ src }: { src: string }) {
  const [show, setShow] = useState(false)
  return (
    <div className="mt-10 border-t border-white/5 pt-6">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="w-full bg-[#1a1a1a] hover:bg-[#252525] active:bg-[#303030] transition-colors border border-white/5 rounded-xl py-4 text-sm font-medium text-[#a0a0a0]"
        >
          ▶ Watch the full original video
        </button>
      ) : (
        <div className="rounded-xl overflow-hidden border border-white/5 bg-black">
          <video
            src={src}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full max-h-[70vh] mx-auto"
          />
          <p className="text-center text-[#707070] text-xs py-2">
            Fix Bad Posture in 5 Minutes (FOREVER!) · ATHLEAN-X
          </p>
        </div>
      )}
    </div>
  )
}

function IdleView({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center py-8">
      <button
        onClick={onStart}
        className="bg-[#e53e3e] hover:bg-[#c53030] active:scale-95 transition-all text-white text-xl font-bold rounded-full w-40 h-40 mx-auto grid place-items-center shadow-lg shadow-[#e53e3e]/20"
      >
        ▶ Start
      </button>
      <p className="text-[#707070] text-sm mt-4">
        Audio cues guide every slot. Block 2 needs a chair and a bit of wall —
        you can stop after slot 5 for the 2:30 version.
      </p>
    </div>
  )
}

function TimerView({
  move,
  nextMove,
  remaining,
  leadIn,
  leadRemaining,
  movePct,
  overallPct,
  moveIndex,
  total,
  status,
  muteVoice,
  onPause,
  onResume,
  onSkip,
  onReset,
  onFinishShort,
  onToggleVoice,
}: {
  move: PostureMove
  nextMove?: PostureMove
  remaining: number
  leadIn: boolean
  leadRemaining: number
  movePct: number
  overallPct: number
  moveIndex: number
  total: number
  status: Status
  muteVoice: boolean
  onPause: () => void
  onResume: () => void
  onSkip: () => void
  onReset: () => void
  onFinishShort: () => void
  onToggleVoice: () => void
}) {
  const R = 130
  const C = 2 * Math.PI * R
  const clipRef = useRef<HTMLVideoElement>(null)

  // The clip always shows the CURRENT move (during its lead-in and while active).
  // Keep it in step with the timer: pause when paused, play when running.
  useEffect(() => {
    const v = clipRef.current
    if (!v) return
    if (status === 'running') void v.play().catch(() => {})
    else v.pause()
  }, [status, moveIndex, leadIn])

  // Slot 5 ends the 2:30 version, so offer the early finish while it's running.
  const isShortVersionEnd = moveIndex === 4

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6">
      {/* Overall progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-[#707070] mb-1">
          <span>
            Move {moveIndex + 1} of {total}
          </span>
          <span>{Math.round(overallPct)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#252525] overflow-hidden">
          <div
            className="h-full bg-[#e53e3e] transition-all duration-300"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Per-move demo clip — keyed on the clip so it reloads each move. Shows
          the CURRENT move's clip during its lead-in and while active. The source
          video is landscape, so this is 16:9 rather than the stretching 9:16. */}
      <div className="relative rounded-xl overflow-hidden bg-black mb-5 aspect-video max-h-[42vh] mx-auto">
        <video
          key={move.clip}
          ref={clipRef}
          src={`${BASE_PATH}${move.clip}`}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        {leadIn && (
          <div className="absolute inset-0 grid place-items-center text-center bg-black/40">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#fbbf24]">Get ready</div>
              <div className="text-2xl font-bold mt-1">{move.name}</div>
              {move.setup && (
                <div className="text-sm text-[#e0e0e0] mt-1">{move.setup}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Countdown ring */}
      <div className="relative w-[300px] h-[300px] max-w-full mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r={R} fill="none" stroke="#252525" strokeWidth="14" />
          <circle
            cx="150"
            cy="150"
            r={R}
            fill="none"
            stroke={leadIn ? '#fbbf24' : remaining <= 3 ? '#fbbf24' : '#e53e3e'}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={leadIn ? 0 : C - (movePct / 100) * C}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center px-8">
          {leadIn ? (
            <div>
              <div className="text-sm uppercase tracking-widest text-[#fbbf24]">Get ready</div>
              <div className="text-7xl font-bold tabular-nums">{leadRemaining}</div>
              <div className="text-base font-semibold mt-1 text-[#a0a0a0]">{move.name}</div>
            </div>
          ) : (
            <div>
              <div className="text-7xl font-bold tabular-nums">{remaining}</div>
              <div className="text-lg font-semibold mt-1">{move.name}</div>
            </div>
          )}
        </div>
      </div>

      {move.halfwayCue && (
        <p className="text-center text-[#fbbf24] text-sm mt-3">
          ⟳ {move.halfwayCue} — cued at the halfway mark
        </p>
      )}
      <p className="text-center text-[#a0a0a0] text-sm mt-3 min-h-[2.5rem]">
        {move.description}
      </p>
      {nextMove && (
        <p className="text-center text-[#707070] text-xs mt-2">
          Next: {nextMove.name}
          {nextMove.setup ? ` · ${nextMove.setup}` : ''}
        </p>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {status === 'running' ? (
          <button
            onClick={onPause}
            className="bg-[#252525] hover:bg-[#303030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            onClick={onResume}
            className="bg-[#e53e3e] hover:bg-[#c53030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
          >
            ▶ Resume
          </button>
        )}
        <button
          onClick={onSkip}
          className="bg-[#252525] hover:bg-[#303030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
        >
          ⏭ Skip
        </button>
        <button
          onClick={onReset}
          className="bg-[#252525] hover:bg-[#303030] active:scale-95 transition-all rounded-full px-5 py-3 font-medium"
          aria-label="Reset routine"
        >
          ↺
        </button>
      </div>

      {isShortVersionEnd && (
        <button
          onClick={onFinishShort}
          className="block mx-auto mt-4 text-xs text-[#fbbf24] hover:text-[#fcd34d] transition-colors"
        >
          Finish here — that&rsquo;s the 2:30 version done
        </button>
      )}

      <button
        onClick={onToggleVoice}
        className="block mx-auto mt-4 text-xs text-[#707070] hover:text-[#a0a0a0] transition-colors"
      >
        {muteVoice ? '🔇 Voice cues off' : '🔊 Voice cues on'}
      </button>
    </div>
  )
}

function DoneView({ onRestart, onReset }: { onRestart: () => void; onReset: () => void }) {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-green-600/30 p-8 text-center">
      <div className="text-5xl mb-3">🎉</div>
      <h2 className="text-2xl font-bold">Routine complete</h2>
      <p className="text-[#a0a0a0] mt-2">
        Stand tall. Consistency is the whole trick — same time tomorrow.
      </p>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={onRestart}
          className="bg-[#e53e3e] hover:bg-[#c53030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
        >
          ▶ Go again
        </button>
        <button
          onClick={onReset}
          className="bg-[#252525] hover:bg-[#303030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
        >
          Done
        </button>
      </div>
    </div>
  )
}
