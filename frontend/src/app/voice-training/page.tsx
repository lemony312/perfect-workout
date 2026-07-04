'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  VOICE_TRAINING,
  DO_DONT,
  PROGRESSION,
  MINDSET,
  type VoiceDrill,
} from '@/data/voice-training-routine'
import { unlockAudio, tick, startChime, finishChime, say } from '@/lib/cues'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
const routine = VOICE_TRAINING
const TOTAL_SECONDS = routine.drills.reduce((s, d) => s + d.duration, 0)

type Status = 'idle' | 'running' | 'paused' | 'done'

// Evenly-spaced `remaining` values at which a drill's rep cue is spoken, kept
// clear of both the lead-in and the final countdown.
function repSeconds(d: VoiceDrill): number[] {
  if (!d.reps) return []
  return Array.from({ length: d.reps }, (_, i) =>
    d.duration - Math.round(((i + 1) * d.duration) / (d.reps! + 1)),
  )
}

export default function VoiceTrainingPage() {
  // Each drill begins with a short lead-in before its counter starts.
  const LEAD_IN_SECONDS = 3

  const [status, setStatus] = useState<Status>('idle')
  const [drillIndex, setDrillIndex] = useState(0)
  const [remaining, setRemaining] = useState(routine.drills[0].duration)
  const [leadIn, setLeadIn] = useState(false)
  const [leadRemaining, setLeadRemaining] = useState(0)
  const [muteVoice, setMuteVoice] = useState(false)

  // Refs so the interval callback always sees fresh values without resubscribing.
  const drillIndexRef = useRef(drillIndex)
  const remainingRef = useRef(remaining)
  const muteVoiceRef = useRef(muteVoice)
  const leadInRef = useRef(leadIn)
  const leadRemainingRef = useRef(leadRemaining)
  const coachSpokenRef = useRef(false)
  const repsFiredRef = useRef<Set<number>>(new Set())
  drillIndexRef.current = drillIndex
  remainingRef.current = remaining
  muteVoiceRef.current = muteVoice
  leadInRef.current = leadIn
  leadRemainingRef.current = leadRemaining

  const drill = routine.drills[drillIndex]
  const nextDrill: VoiceDrill | undefined = routine.drills[drillIndex + 1]

  const speak = useCallback((text: string) => {
    if (!muteVoiceRef.current) say(text)
  }, [])

  // Move to `idx` and begin its lead-in. Announce the drill name now.
  const beginDrill = useCallback(
    (idx: number) => {
      coachSpokenRef.current = false
      repsFiredRef.current = new Set()
      setDrillIndex(idx)
      setRemaining(routine.drills[idx].duration)
      setLeadIn(true)
      setLeadRemaining(LEAD_IN_SECONDS)
      startChime()
      speak(routine.drills[idx].name)
    },
    [speak],
  )

  const tickSecond = useCallback(() => {
    // --- Lead-in phase: "Get ready" before the drill's counter starts ---
    if (leadInRef.current) {
      const r = leadRemainingRef.current
      if (r > 1) {
        setLeadRemaining(r - 1)
        return
      }
      // Lead-in over — start the counter and coach the drill out loud.
      setLeadIn(false)
      setLeadRemaining(0)
      return
    }

    // --- Active drill phase ---
    const cur = remainingRef.current
    const idx = drillIndexRef.current
    const d = routine.drills[idx]

    // Coach the drill once, at the top of the active phase.
    if (!coachSpokenRef.current) {
      coachSpokenRef.current = true
      speak(d.coach ?? d.description)
    } else if (d.repCue) {
      // Prompt each rep at its evenly-spaced moment (not on the coaching tick,
      // so the spoken coaching line is never cut off).
      const reps = repSeconds(d)
      if (reps.includes(cur) && !repsFiredRef.current.has(cur)) {
        repsFiredRef.current.add(cur)
        tick()
        speak(d.repCue)
      }
    }

    // Countdown ticks for the last 3 seconds of the drill.
    if (cur <= 3 && cur > 0) tick()

    if (cur > 1) {
      setRemaining(cur - 1)
      return
    }

    // Drill finished — advance to the next (which starts with its lead-in).
    const isLast = idx >= routine.drills.length - 1
    if (isLast) {
      setStatus('done')
      finishChime()
      speak('Nicely done. Go be your most confident self.')
      return
    }
    beginDrill(idx + 1)
  }, [beginDrill, speak])

  // Drive the timer.
  useEffect(() => {
    if (status !== 'running') return
    const id = window.setInterval(tickSecond, 1000)
    return () => window.clearInterval(id)
  }, [status, tickSecond])

  const start = () => {
    unlockAudio()
    setStatus('running')
    beginDrill(0)
  }

  const pause = () => setStatus('paused')
  const resume = () => setStatus('running')

  const reset = () => {
    setStatus('idle')
    setDrillIndex(0)
    setRemaining(routine.drills[0].duration)
    setLeadIn(false)
    setLeadRemaining(0)
    coachSpokenRef.current = false
    repsFiredRef.current = new Set()
  }

  const skip = () => {
    const idx = drillIndexRef.current
    const isLast = idx >= routine.drills.length - 1
    if (isLast) {
      setStatus('done')
      finishChime()
      return
    }
    beginDrill(idx + 1)
  }

  // Stop speech if the user leaves mid-routine.
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Keep the screen awake while practicing. Released on pause / done / unmount.
  // Re-acquired if the tab regains visibility, since the OS drops the lock when
  // the page is hidden.
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
  const elapsedBefore = routine.drills
    .slice(0, drillIndex)
    .reduce((s, d) => s + d.duration, 0)
  const elapsed = elapsedBefore + (drill.duration - remaining)
  const overallPct = Math.min(100, (elapsed / TOTAL_SECONDS) * 100)
  const drillPct = ((drill.duration - remaining) / drill.duration) * 100

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">{routine.title}</h1>
          <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">{routine.subtitle}</p>
          <p className="text-[#707070] mt-1 text-xs">
            {routine.drills.length} drills · about {Math.round(TOTAL_SECONDS / 60)} min · guided out loud
          </p>
        </header>

        {/* Quick reference — the dos and don'ts of the first two seconds */}
        <DoDontBars />

        {/* Guided practice */}
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-1">Guided practice</h2>
          <p className="text-[#707070] text-xs mb-4">
            Your device coaches each drill out loud. Sound on.
          </p>

          {status === 'idle' && <IdleView onStart={start} />}

          {(status === 'running' || status === 'paused') && (
            <TimerView
              drill={drill}
              nextDrill={nextDrill}
              remaining={remaining}
              leadIn={leadIn}
              leadRemaining={leadRemaining}
              drillPct={drillPct}
              overallPct={overallPct}
              drillIndex={drillIndex}
              total={routine.drills.length}
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

          {/* Full drill list */}
          <ol className="mt-8 space-y-2">
            {routine.drills.map((d, i) => {
              const isCurrent =
                (status === 'running' || status === 'paused') && i === drillIndex
              const isDone =
                status === 'done' ||
                ((status === 'running' || status === 'paused') && i < drillIndex)
              return (
                <li
                  key={d.name}
                  className={`rounded-lg border p-3 flex items-start gap-3 transition-colors ${
                    isCurrent ? 'border-[#e53e3e] bg-[#1a1a1a]' : 'border-white/5 bg-[#141414]'
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
                      <span className="font-medium">{d.name}</span>
                      {d.reps && (
                        <span className="text-[10px] uppercase tracking-wide text-[#fbbf24] border border-[#fbbf24]/40 rounded px-1.5 py-0.5">
                          {d.reps}×
                        </span>
                      )}
                      <span className="text-xs text-[#707070]">{d.duration}s</span>
                    </div>
                    <p className="text-sm text-[#a0a0a0] mt-0.5">{d.description}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        {/* Where to practice — phone → video → in person */}
        <ProgressionSection />

        {/* Mindset cues — reference, not timed */}
        <MindsetSection />

        {/* Source attribution */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <a
            href={routine.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1a1a1a] hover:bg-[#252525] active:bg-[#303030] transition-colors border border-white/5 rounded-xl py-4 px-6 text-sm font-medium text-[#a0a0a0]"
          >
            ▶ Watch the full talk
          </a>
          <p className="text-[#5a5a5a] text-[10px] mt-3">Based on: {routine.sourceCredit}</p>
        </div>
      </div>
    </main>
  )
}

function DoDontBars() {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3">The first two seconds</h2>
      <div className="space-y-2">
        {DO_DONT.map((row) => (
          <div
            key={row.do}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg overflow-hidden"
          >
            <div className="flex items-start gap-2 bg-green-600/10 border border-green-600/20 rounded-lg p-3">
              <span className="text-green-400 shrink-0">✅</span>
              <span className="text-sm text-[#d8d8d8]">{row.do}</span>
            </div>
            <div className="flex items-start gap-2 bg-[#e53e3e]/10 border border-[#e53e3e]/20 rounded-lg p-3">
              <span className="text-[#e53e3e] shrink-0">🚫</span>
              <span className="text-sm text-[#d8d8d8]">{row.dont}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProgressionSection() {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold mb-1">Where to practice</h2>
      <p className="text-[#707070] text-xs mb-4">
        Start in the lowest-pressure channel and layer cues as you go.
      </p>
      <div className="space-y-3">
        {PROGRESSION.map((c, i) => (
          <div
            key={c.title}
            className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#141414] p-4"
          >
            <span className="text-2xl shrink-0">{c.icon}</span>
            <div>
              <div className="font-medium">
                <span className="text-[#707070] mr-1">{i + 1}.</span>
                {c.title}
              </div>
              <p className="text-sm text-[#a0a0a0] mt-0.5">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function MindsetSection() {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold mb-4">Mindset</h2>
      <div className="space-y-3">
        {MINDSET.map((c) => (
          <div
            key={c.title}
            className="flex items-start gap-3 rounded-lg border border-white/5 bg-[#141414] p-4"
          >
            <span className="text-2xl shrink-0">{c.icon}</span>
            <div>
              <div className="font-medium">{c.title}</div>
              <p className="text-sm text-[#a0a0a0] mt-0.5">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
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
        Each drill is coached out loud — say the reps along with the prompt.
      </p>
    </div>
  )
}

function TimerView({
  drill,
  nextDrill,
  remaining,
  leadIn,
  leadRemaining,
  drillPct,
  overallPct,
  drillIndex,
  total,
  status,
  muteVoice,
  onPause,
  onResume,
  onSkip,
  onReset,
  onToggleVoice,
}: {
  drill: VoiceDrill
  nextDrill?: VoiceDrill
  remaining: number
  leadIn: boolean
  leadRemaining: number
  drillPct: number
  overallPct: number
  drillIndex: number
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

  // Keep an optional demo clip in step with the timer.
  useEffect(() => {
    const v = clipRef.current
    if (!v) return
    if (status === 'running') void v.play().catch(() => {})
    else v.pause()
  }, [status, drillIndex, leadIn])

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6">
      {/* Overall progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-[#707070] mb-1">
          <span>
            Drill {drillIndex + 1} of {total}
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

      {/* Optional demo clip — only shown when the drill has one. */}
      {drill.clip && (
        <div className="relative rounded-xl overflow-hidden bg-black mb-5 aspect-[9/16] max-h-[42vh] mx-auto">
          <video
            key={drill.clip}
            ref={clipRef}
            src={`${BASE_PATH}${drill.clip}`}
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
                <div className="text-2xl font-bold mt-1">{drill.name}</div>
              </div>
            </div>
          )}
        </div>
      )}

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
            strokeDashoffset={leadIn ? 0 : C - (drillPct / 100) * C}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center px-8">
          {leadIn ? (
            <div>
              <div className="text-sm uppercase tracking-widest text-[#fbbf24]">Get ready</div>
              <div className="text-7xl font-bold tabular-nums">{leadRemaining}</div>
              <div className="text-base font-semibold mt-1 text-[#a0a0a0]">{drill.name}</div>
            </div>
          ) : (
            <div>
              <div className="text-7xl font-bold tabular-nums">{remaining}</div>
              <div className="text-lg font-semibold mt-1">{drill.name}</div>
            </div>
          )}
        </div>
      </div>

      {drill.repCue && (
        <p className="text-center text-[#fbbf24] text-sm mt-3">
          🗣️ Say it out loud: “{drill.repCue}”
        </p>
      )}
      <p className="text-center text-[#a0a0a0] text-sm mt-3 min-h-[2.5rem]">{drill.description}</p>
      {nextDrill && (
        <p className="text-center text-[#707070] text-xs mt-2">Next: {nextDrill.name}</p>
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
      <h2 className="text-2xl font-bold">Warm-up complete</h2>
      <p className="text-[#a0a0a0] mt-2">
        Carry one cue into your next hello. Real beats perfect.
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
