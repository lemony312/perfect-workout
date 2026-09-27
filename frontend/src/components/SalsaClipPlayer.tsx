'use client'

// The Salsa clip player, shared by the solo steps course and the couples course.
//
// Both courses need the identical control, so it lives here rather than being
// copied: the tempo toggle is the main way you interact with a move, and two
// implementations would drift. The couples course is also where `aspect` starts
// earning its keep — its official shorts are 1080x1920 vertical while every
// class is 1920x1080 landscape, and a vertical demo must not be cropped to
// landscape.
//
// Tempo mode is NOT state here. It comes in as a prop from `useTempoMode()` so
// the choice persists across navigation and across both courses — see the note
// at the top of salsa-tempo.ts. Only the position within a Slow->Fast cycle is
// local, and that resets per move.

import { useEffect, useRef, useState } from 'react'
import type { ClipPair } from '@/data/salsa-types'
import type { TempoMode } from '@/lib/salsa-tempo'
import { mediaUrl } from '@/lib/media'
import { VideoTransport } from './VideoTransport'

/** mm:ss, for the "Class 7 @ 2:23" source caption under the player. */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function SalsaClipPlayer({
  clips,
  aspect,
  tempoMode,
  onTempoChange,
  muted,
  onMutedChange,
  classNum,
}: {
  clips: ClipPair
  aspect: '16/9' | '9/16'
  tempoMode: TempoMode
  onTempoChange: (mode: TempoMode) => void
  muted: boolean
  onMutedChange: (muted: boolean) => void
  classNum: number
}) {
  const slow = clips.slow
  const fast = clips.fast

  // Where we are within a Slow->Fast cycle. Initialised, not synchronised: the
  // caller passes `key={...}` derived from the clip so a new move remounts this
  // component, which resets the cycle to the counted demo. Otherwise the value
  // would survive the navigation (same component, new props) and a fresh move
  // could open at full tempo with the slow demo skipped — the one thing the
  // tempo control exists to prevent.
  //
  // `tempoMode` is deliberately not reset. It is the persisted preference and
  // outlives every navigation; only the cycle position is per-move.
  const [activeClip, setActiveClip] = useState<'slow' | 'fast'>(
    tempoMode === 'fast' || !clips.slow ? 'fast' : 'slow',
  )
  const slowRef = useRef<HTMLVideoElement>(null)
  const fastRef = useRef<HTMLVideoElement>(null)

  // In auto mode, both clips loop={false} and swap on ended.
  const isAuto = tempoMode === 'auto'
  // Falling back to the other clip matters for moves that only have one — a
  // pinned 'slow' must still show something when only a full-tempo short exists,
  // rather than rendering an empty black box.
  const showSlow = slow != null && (tempoMode === 'slow' || (isAuto && activeClip === 'slow') || !fast)
  const showFast = fast != null && (tempoMode === 'fast' || (isAuto && activeClip === 'fast') || !slow)

  // Play the visible clip, pause the hidden one.
  //
  // The dependency list is deliberately only [showSlow, showFast], and that is
  // what makes the VideoTransport pause button work: this effect re-runs only when
  // the *visible clip changes*, so an unrelated re-render cannot resume a clip the
  // user paused on purpose. Adding a `playing` dependency here would fight it.
  useEffect(() => {
    const s = slowRef.current
    const f = fastRef.current
    if (showSlow && s) void s.play().catch(() => {})
    else if (s) s.pause()
    if (showFast && f) void f.play().catch(() => {})
    else if (f) f.pause()
  }, [showSlow, showFast])

  const onSlowEnded = () => {
    if (isAuto && fast) setActiveClip('fast')
  }

  const onFastEnded = () => {
    if (isAuto && slow) setActiveClip('slow')
  }

  if (!slow && !fast) {
    return (
      <div className="bg-[#1a1a1a] rounded-xl border border-white/5 p-6 text-center text-sm text-[#a0a0a0]">
        {clips.missingReason ?? 'No clips available for this move.'}
      </div>
    )
  }

  const aspectClass = aspect === '9/16' ? 'aspect-[9/16]' : 'aspect-video'

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-white/5 p-4">
      {/* Video container */}
      <div className={`relative rounded-xl overflow-hidden bg-black mb-4 ${aspectClass} max-h-[50vh] mx-auto`}>
        {slow && (
          <video
            ref={slowRef}
            src={mediaUrl(slow.src)}
            loop={!isAuto}
            muted={muted}
            playsInline
            preload="auto"
            onEnded={onSlowEnded}
            className={`absolute inset-0 w-full h-full object-contain ${showSlow ? '' : 'hidden'}`}
          />
        )}
        {fast && (
          <video
            ref={fastRef}
            src={mediaUrl(fast.src)}
            loop={!isAuto}
            muted={muted}
            playsInline
            preload="auto"
            onEnded={onFastEnded}
            className={`absolute inset-0 w-full h-full object-contain ${showFast ? '' : 'hidden'}`}
          />
        )}
      </div>

      {/* Transport, on its own row above the tempo buttons. It drives whichever
          clip is currently visible — hence the ref switch rather than a single
          ref: VideoTransport re-subscribes when the ref object identity changes,
          which is exactly what happens on a Slow<->Fast swap. */}
      <VideoTransport
        videoRef={showFast && !showSlow ? fastRef : slowRef}
        className="mb-3"
      />

      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {slow && fast && (
            <>
              <button
                onClick={() => {
                  onTempoChange('slow')
                  setActiveClip('slow')
                }}
                disabled={!slow}
                className={`text-xs rounded px-3 py-1.5 border transition-colors ${
                  tempoMode === 'slow'
                    ? 'border-[#e53e3e] bg-[#e53e3e]/10 text-[#f5f5f5]'
                    : 'border-white/10 text-[#707070] hover:text-[#a0a0a0]'
                }`}
              >
                ◀ Slow
              </button>
              <button
                onClick={() => {
                  onTempoChange('auto')
                  setActiveClip('slow')
                }}
                className={`text-xs rounded px-3 py-1.5 border transition-colors ${
                  tempoMode === 'auto'
                    ? 'border-[#e53e3e] bg-[#e53e3e]/10 text-[#f5f5f5]'
                    : 'border-white/10 text-[#707070] hover:text-[#a0a0a0]'
                }`}
              >
                Slow→Fast
              </button>
              <button
                onClick={() => {
                  onTempoChange('fast')
                  setActiveClip('fast')
                }}
                disabled={!fast}
                className={`text-xs rounded px-3 py-1.5 border transition-colors ${
                  tempoMode === 'fast'
                    ? 'border-[#e53e3e] bg-[#e53e3e]/10 text-[#f5f5f5]'
                    : 'border-white/10 text-[#707070] hover:text-[#a0a0a0]'
                }`}
              >
                Full tempo ▶
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => onMutedChange(!muted)}
          className="text-xs text-[#707070] hover:text-[#a0a0a0]"
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Caption */}
      <div className="mt-3 text-xs text-[#a0a0a0]">
        {showSlow && slow && (
          <div>
            <p>
              {slow.label ?? 'Counted, no music'} · {Math.round(slow.end - slow.start)}s · Class{' '}
              {classNum} @ {formatTime(slow.start)}
            </p>
            {slow.caveat && <p className="text-[#fbbf24] mt-1">ⓘ {slow.caveat}</p>}
          </div>
        )}
        {showFast && fast && (
          <div>
            <p>
              {fast.label ?? 'Full tempo'} · {Math.round(fast.end - fast.start)}s · Class{' '}
              {classNum} @ {formatTime(fast.start)}
            </p>
            {fast.caveat && <p className="text-[#fbbf24] mt-1">ⓘ {fast.caveat}</p>}
          </div>
        )}
      </div>

      {/* CRITICAL COMMENT: clips are NOT muted by default. The spoken count in
          the salsa clips IS the metronome, so the clip's audio must play. This
          is a deliberate deviation from the posture page, which mutes its clips
          and plays its own background music. */}
    </div>
  )
}
