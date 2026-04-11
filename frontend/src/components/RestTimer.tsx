'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const PRESET_SECONDS = [30, 60, 90, 120, 180]

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

type TimerMode = 'countdown' | 'stopwatch'

export default function RestTimer() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<TimerMode>('countdown')
  const [targetSeconds, setTargetSeconds] = useState(60)
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)
  const elapsedBeforePauseRef = useRef<number>(0)

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  const tick = useCallback(() => {
    const now = Date.now()
    const total = elapsedBeforePauseRef.current + Math.floor((now - startTimeRef.current) / 1000)
    setElapsed(total)
  }, [])

  const start = useCallback(() => {
    startTimeRef.current = Date.now()
    intervalRef.current = setInterval(tick, 250)
    setIsRunning(true)
  }, [tick])

  // Auto-stop countdown when done
  useEffect(() => {
    if (mode === 'countdown' && elapsed >= targetSeconds && isRunning) {
      stop()
    }
  }, [elapsed, targetSeconds, mode, isRunning, stop])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleStartPause = () => {
    if (isRunning) {
      elapsedBeforePauseRef.current = elapsed
      stop()
    } else {
      start()
    }
  }

  const handleReset = () => {
    stop()
    setElapsed(0)
    elapsedBeforePauseRef.current = 0
  }

  const handlePreset = (seconds: number) => {
    handleReset()
    setMode('countdown')
    setTargetSeconds(seconds)
  }

  const handleSwitchMode = (newMode: TimerMode) => {
    handleReset()
    setMode(newMode)
  }

  const displaySeconds = mode === 'countdown'
    ? Math.max(0, targetSeconds - elapsed)
    : elapsed

  const countdownDone = mode === 'countdown' && elapsed >= targetSeconds && elapsed > 0
  const progress = mode === 'countdown' ? Math.min(1, elapsed / targetSeconds) : 0

  return (
    <>
      {/* Floating trigger button — fixed bottom-right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-4 z-40 bg-[#e53e3e] hover:bg-[#c53030] active:bg-[#b52c2c] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-black/40 transition-colors"
        aria-label="Rest Timer"
        style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Clock icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
        </svg>
        {/* Pulsing dot when running */}
        {isRunning && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#e53e3e] animate-pulse" />
        )}
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom sheet */}
          <div
            className="relative w-full max-w-lg bg-[#1a1a1a] rounded-t-2xl border-t border-white/10 p-6 pb-8 animate-[slideUp_0.2s_ease-out]"
            style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Header with close */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f5f5f5]">Rest Timer</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#a0a0a0] hover:text-[#f5f5f5] p-2 -mr-2 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mode toggle */}
            <div className="flex bg-[#252525] rounded-lg p-1 mb-6">
              <button
                onClick={() => handleSwitchMode('countdown')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  mode === 'countdown'
                    ? 'bg-[#e53e3e] text-white'
                    : 'text-[#a0a0a0] hover:text-[#f5f5f5]'
                }`}
              >
                Countdown
              </button>
              <button
                onClick={() => handleSwitchMode('stopwatch')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  mode === 'stopwatch'
                    ? 'bg-[#e53e3e] text-white'
                    : 'text-[#a0a0a0] hover:text-[#f5f5f5]'
                }`}
              >
                Stopwatch
              </button>
            </div>

            {/* Timer display */}
            <div className="text-center mb-6">
              {mode === 'countdown' && (
                <div className="relative w-48 h-48 mx-auto mb-2">
                  {/* Progress ring */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#252525" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="44" fill="none"
                      stroke={countdownDone ? '#4ade80' : '#e53e3e'}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 44}`}
                      strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress)}`}
                      className="transition-[stroke-dashoffset] duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-mono font-bold ${countdownDone ? 'text-green-400' : 'text-[#f5f5f5]'}`}>
                      {formatTime(displaySeconds)}
                    </span>
                    {countdownDone && (
                      <span className="text-green-400 text-sm font-medium mt-1">Done!</span>
                    )}
                  </div>
                </div>
              )}
              {mode === 'stopwatch' && (
                <div className="py-8">
                  <span className="text-6xl font-mono font-bold text-[#f5f5f5]">
                    {formatTime(displaySeconds)}
                  </span>
                </div>
              )}
            </div>

            {/* Preset buttons (countdown only) */}
            {mode === 'countdown' && !isRunning && elapsed === 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {PRESET_SECONDS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handlePreset(s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      targetSeconds === s
                        ? 'bg-[#e53e3e] text-white'
                        : 'bg-[#252525] text-[#a0a0a0] hover:text-[#f5f5f5] hover:bg-[#303030]'
                    }`}
                  >
                    {formatTime(s)}
                  </button>
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReset}
                className="w-16 h-16 rounded-full bg-[#252525] text-[#a0a0a0] hover:text-[#f5f5f5] hover:bg-[#303030] flex items-center justify-center transition-colors"
                aria-label="Reset"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
              </button>
              <button
                onClick={handleStartPause}
                disabled={countdownDone}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors text-white ${
                  countdownDone
                    ? 'bg-green-600 cursor-default'
                    : isRunning
                      ? 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800'
                      : 'bg-[#e53e3e] hover:bg-[#c53030] active:bg-[#b52c2c]'
                }`}
                aria-label={isRunning ? 'Pause' : 'Start'}
              >
                {countdownDone ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : isRunning ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
