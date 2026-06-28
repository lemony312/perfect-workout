'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  MORNING_MOBILITY,
  MUSIC_TRACKS,
  type StretchMove,
} from '@/data/stretching-routine'
import {
  unlockAudio,
  tick,
  startChime,
  switchChime,
  finishChime,
  say,
} from '@/lib/cues'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
const routine = MORNING_MOBILITY
const TOTAL_SECONDS = routine.moves.reduce((s, m) => s + m.duration, 0)

type Status = 'idle' | 'running' | 'paused' | 'done'

export default function StretchingPage() {
  const REST_SECONDS = 2

  const [status, setStatus] = useState<Status>('idle')
  const [moveIndex, setMoveIndex] = useState(0)
  const [remaining, setRemaining] = useState(routine.moves[0].duration)
  const [resting, setResting] = useState(false)
  const [restRemaining, setRestRemaining] = useState(0)
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
  const restingRef = useRef(resting)
  const restRemainingRef = useRef(restRemaining)
  moveIndexRef.current = moveIndex
  remainingRef.current = remaining
  muteVoiceRef.current = muteVoice
  restingRef.current = resting
  restRemainingRef.current = restRemaining

  const move = routine.moves[moveIndex]
  const nextMove: StretchMove | undefined = routine.moves[moveIndex + 1]

  const speak = useCallback((text: string) => {
    if (!muteVoiceRef.current) say(text)
  }, [])

  // Announce a move starting: chime + spoken name.
  const announceMove = useCallback(
    (idx: number) => {
      const m = routine.moves[idx]
      startChime()
      speak(m.name)
    },
    [speak],
  )

  // Begin the short rest between moves. The interval keeps running and the
  // rest branch of tickSecond handles the countdown.
  const beginRest = useCallback(
    (nextIdx: number) => {
      setResting(true)
      setRestRemaining(REST_SECONDS)
      switchChime()
      speak(`Next, ${routine.moves[nextIdx].name}`)
    },
    [speak],
  )

  const tickSecond = useCallback(() => {
    // --- Rest phase: counting down to the next move ---
    if (restingRef.current) {
      const r = restRemainingRef.current
      if (r > 1) {
        setRestRemaining(r - 1)
        return
      }
      // Rest over — start the next move.
      const next = moveIndexRef.current + 1
      halfwayFiredRef.current = false
      setResting(false)
      setRestRemaining(0)
      setMoveIndex(next)
      setRemaining(routine.moves[next].duration)
      announceMove(next)
      return
    }

    // --- Active move phase ---
    const cur = remainingRef.current
    const idx = moveIndexRef.current
    const m = routine.moves[idx]

    // Halfway cue (switch sides / reverse) — fire once when we cross the midpoint.
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
      // Skipped when it coincides with the halfway switch cue above.
      tick()
      speak(`${cur} seconds left`)
    }

    // Countdown ticks for the last 3 seconds of the move.
    if (cur <= 3 && cur > 0) tick()

    if (cur > 1) {
      setRemaining(cur - 1)
      return
    }

    // Move finished — rest before the next move, or finish.
    const isLast = idx >= routine.moves.length - 1
    if (isLast) {
      setStatus('done')
      finishChime()
      speak('All done. Great work.')
      return
    }
    beginRest(idx)
  }, [announceMove, beginRest, speak])

  // Drive the timer.
  useEffect(() => {
    if (status !== 'running') return
    const id = window.setInterval(tickSecond, 1000)
    return () => window.clearInterval(id)
  }, [status, tickSecond])

  const start = () => {
    unlockAudio()
    setMoveIndex(0)
    setRemaining(routine.moves[0].duration)
    setResting(false)
    setRestRemaining(0)
    halfwayFiredRef.current = false
    setStatus('running')
    announceMove(0)
  }

  const pause = () => setStatus('paused')
  const resume = () => setStatus('running')

  const reset = () => {
    setStatus('idle')
    setMoveIndex(0)
    setRemaining(routine.moves[0].duration)
    setResting(false)
    setRestRemaining(0)
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
    const next = idx + 1
    halfwayFiredRef.current = false
    setResting(false)
    setRestRemaining(0)
    setMoveIndex(next)
    setRemaining(routine.moves[next].duration)
    if (status === 'running') announceMove(next)
  }

  // Stop speech if the user leaves mid-routine.
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

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
            {routine.moves.length} moves · {Math.round(TOTAL_SECONDS / 60)} min · 30s each
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

        {status === 'idle' && (
          <IdleView onStart={start} />
        )}

        {(status === 'running' || status === 'paused') && (
          <TimerView
            move={move}
            nextMove={nextMove}
            remaining={remaining}
            resting={resting}
            restRemaining={restRemaining}
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
            onToggleVoice={() => setMuteVoice((v) => !v)}
          />
        )}

        {status === 'done' && <DoneView onRestart={start} onReset={reset} />}

        {/* Full move list */}
        <ol className="mt-8 space-y-2">
          {routine.moves.map((m, i) => {
            const isCurrent = (status === 'running' || status === 'paused') && i === moveIndex
            const isDone =
              status === 'done' || ((status === 'running' || status === 'paused') && i < moveIndex)
            return (
              <li
                key={m.name}
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
                    {m.halfwayCue && (
                      <span className="text-[10px] uppercase tracking-wide text-[#fbbf24] border border-[#fbbf24]/40 rounded px-1.5 py-0.5">
                        {m.halfwayCue === 'Switch sides' ? 'L / R' : m.halfwayCue}
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

        {/* Full source video — lazy-loaded only when the user asks for it */}
        <FullVideo src={`${BASE_PATH}${routine.video}`} />

        {/* Music attribution (CC BY 3.0 requires credit) */}
        <p className="text-center text-[#5a5a5a] text-[10px] mt-6">
          Music: {track.credit}
        </p>
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
            Original reel · @trevorsinstinct
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
        Audio cues will guide each move and tell you when to switch sides.
      </p>
    </div>
  )
}

function TimerView({
  move,
  nextMove,
  remaining,
  resting,
  restRemaining,
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
  onToggleVoice,
}: {
  move: StretchMove
  nextMove?: StretchMove
  remaining: number
  resting: boolean
  restRemaining: number
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
  onToggleVoice: () => void
}) {
  const R = 130
  const C = 2 * Math.PI * R
  const clipRef = useRef<HTMLVideoElement>(null)

  // During the rest gap, preview the NEXT move's clip so the user can get set.
  const clipMove = resting && nextMove ? nextMove : move

  // Keep the demo clip in step with the timer: pause when paused, play when running.
  useEffect(() => {
    const v = clipRef.current
    if (!v) return
    if (status === 'running') void v.play().catch(() => {})
    else v.pause()
  }, [status, moveIndex, resting])

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

      {/* Per-move demo clip — keyed on the clip so it reloads each move.
          During the rest gap it previews the next move and dims slightly. */}
      <div className="relative rounded-xl overflow-hidden bg-black mb-5 aspect-[9/16] max-h-[42vh] mx-auto">
        <video
          key={clipMove.clip}
          ref={clipRef}
          src={`${BASE_PATH}${clipMove.clip}`}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-opacity ${resting ? 'opacity-40' : 'opacity-100'}`}
        />
        {resting && (
          <div className="absolute inset-0 grid place-items-center text-center">
            <div className="text-xs uppercase tracking-widest text-[#fbbf24] bg-black/50 rounded-full px-3 py-1">
              Up next
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
            stroke={remaining <= 3 ? '#fbbf24' : '#e53e3e'}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C - (movePct / 100) * C}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center px-8">
          {resting ? (
            <div>
              <div className="text-sm uppercase tracking-widest text-[#fbbf24]">Get ready</div>
              <div className="text-7xl font-bold tabular-nums">{restRemaining}</div>
              {nextMove && (
                <div className="text-base font-semibold mt-1 text-[#a0a0a0]">{nextMove.name}</div>
              )}
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
          ⟳ {move.halfwayCue} at the halfway mark
        </p>
      )}
      <p className="text-center text-[#a0a0a0] text-sm mt-3 min-h-[2.5rem]">
        {move.description}
      </p>
      {nextMove && (
        <p className="text-center text-[#707070] text-xs mt-2">
          Next: {nextMove.name}
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
      <p className="text-[#a0a0a0] mt-2">Feel it for yourself. See you tomorrow morning.</p>
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
