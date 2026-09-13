'use client'

// Pause / rewind / restart / scrub for a <video> this component does not own.
//
// It takes a ref rather than rendering the element because every player in this
// app has its own reason for how the video is set up — the salsa player swaps
// between two elements, the drill players autoplay on a timer, the day pages
// lazy-load `src` on scroll. Owning the element here would mean rewriting all of
// them; owning only the transport means each player keeps its behaviour and gains
// the controls.
//
// Why not just `controls` (which posture and stretching use)? Native controls put
// a persistent bar across the bottom of the frame, which on these clips covers
// the feet — the one part you need to see. These are also loops with no meaningful
// "end", so a native scrubber invites seeking past the end of a 15-second clip.
// This sits below the frame instead and never covers the picture.
//
// The element the ref points at is allowed to change (the salsa player passes
// slowRef or fastRef depending on which clip is visible). That works because the
// caller passes a *different ref object* per clip, so the subscribe effect re-runs
// and re-binds. Passing one mutable ref whose `.current` is reassigned would NOT
// re-run it, and the transport would keep reporting the old element's time.

import { useCallback, useRef, useSyncExternalStore, type RefObject } from 'react'

/** Seconds a single rewind/forward press moves. */
const SKIP_SECONDS = 5

// Every event that can change what the transport displays. `emptied` is in here
// for the day pages, which set `src` only once the clip scrolls into view.
const MEDIA_EVENTS = [
  'play', 'pause', 'ended', 'timeupdate',
  'loadedmetadata', 'durationchange', 'seeked', 'emptied',
] as const

/** m:ss. Clips here are all well under an hour, so no hours component. */
function clock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function VideoTransport({
  videoRef,
  className = '',
  showScrubber = true,
  compact = false,
}: {
  videoRef: RefObject<HTMLVideoElement | null>
  className?: string
  /** Off for thumbnail-sized players, where a 140px-wide scrubber is unusable. */
  showScrubber?: boolean
  /**
   * Restart + play/pause only. For the 140px exercise thumbnails, where four
   * buttons do not fit and ±5s on a ~10s loop is not a useful distinction
   * anyway — restart is the control that matters there.
   */
  compact?: boolean
}) {
  // A <video> element is an external mutable store, so it is read with
  // useSyncExternalStore rather than mirrored into useState from an effect. The
  // effect version needed a synchronous setState in the effect body to pick up an
  // element that had ALREADY loaded (a ref swap fires no further events), which
  // is the cascading-render pattern `react-hooks/set-state-in-effect` exists to
  // stop. This reads the element during render instead, so there is nothing to
  // synchronise and no stale first frame.
  // Runs in the commit phase, after React has attached the ref, so
  // `videoRef.current` is set by the time this is first called. It re-runs only
  // when the ref *object* changes — which is the Slow<->Fast swap, and is why the
  // caller must pass a different ref per clip rather than one reassigned ref.
  const subscribe = useCallback(
    (onChange: () => void) => {
      const v = videoRef.current
      if (!v) return () => {}
      for (const e of MEDIA_EVENTS) v.addEventListener(e, onChange)
      return () => {
        for (const e of MEDIA_EVENTS) v.removeEventListener(e, onChange)
      }
    },
    [videoRef],
  )

  // The snapshot is a single string because useSyncExternalStore compares
  // snapshots by identity, and any object built per call would look like a change
  // on every render. Time is quantised to a tenth of a second for the same
  // reason it is displayed that coarsely: it caps re-renders and keeps two reads
  // inside one render pass identical, which is what the "getSnapshot should be
  // cached" warning is about.
  const cached = useRef('nil')
  const getSnapshot = useCallback(() => {
    const v = videoRef.current
    // A video whose metadata has not loaded reports NaN for duration, and NaN
    // would make the scrubber's `max` NaN and pin the thumb to the far left.
    const next = v
      ? [
          v.paused || v.ended ? 0 : 1,
          Math.round(v.currentTime * 10),
          Number.isFinite(v.duration) ? Math.round(v.duration * 10) : 0,
        ].join('|')
      : 'nil'
    if (next !== cached.current) cached.current = next
    return cached.current
  }, [videoRef])

  // Static export prerenders this component, and there is no element on the
  // server — 'nil' renders the disabled state, which is also the correct first
  // client frame before the video attaches.
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => 'nil')

  const ready = snapshot !== 'nil'
  const [playFlag, tenthsTime, tenthsDuration] = ready
    ? snapshot.split('|').map(Number)
    : [0, 0, 0]
  const playing = playFlag === 1
  const time = tenthsTime / 10
  const duration = tenthsDuration / 10

  const seekTo = useCallback(
    (seconds: number) => {
      const v = videoRef.current
      if (!v) return
      const max = Number.isFinite(v.duration) ? v.duration : seconds
      // Clamped rather than trusted: seeking past the end of a short loop makes
      // some browsers fire `ended` and, in the salsa player's auto mode, that
      // would advance to the next tempo as if the clip had finished playing.
      v.currentTime = Math.min(Math.max(0, seconds), max)
    },
    [videoRef],
  )

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) void v.play().catch(() => {})
    else v.pause()
  }, [videoRef])

  const restart = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    // Restart means "watch it again from the top", so it plays even if paused.
    void v.play().catch(() => {})
  }, [videoRef])

  const btn =
    'rounded px-2 py-1.5 border border-white/10 text-[#a0a0a0] hover:text-[#f5f5f5] ' +
    'hover:border-white/25 active:bg-white/5 transition-colors disabled:opacity-40 ' +
    'disabled:hover:text-[#a0a0a0] disabled:hover:border-white/10'

  return (
    // flex-wrap is not cosmetic: at 320px the four buttons plus the scrubber and
    // the time readout need ~345px, and without wrapping they force the document
    // wider than the screen. Mobile browsers respond by widening the layout
    // viewport and scaling down EVERY page — the same failure the nav scroller
    // exists to avoid. scripts/test_mobile_layout.py catches it.
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={restart}
        disabled={!ready}
        aria-label="Restart from the beginning"
        title="Restart"
        className={`${btn} text-xs`}
      >
        ⏮
      </button>
      {!compact && (
        <button
          type="button"
          onClick={() => seekTo(time - SKIP_SECONDS)}
          disabled={!ready}
          aria-label={`Back ${SKIP_SECONDS} seconds`}
          title={`Back ${SKIP_SECONDS}s`}
          className={`${btn} text-xs`}
        >
          −{SKIP_SECONDS}s
        </button>
      )}
      <button
        type="button"
        onClick={togglePlay}
        disabled={!ready}
        aria-label={playing ? 'Pause' : 'Play'}
        title={playing ? 'Pause' : 'Play'}
        className={`${btn} text-xs min-w-[2.5rem]`}
      >
        {playing ? '❚❚' : '▶'}
      </button>
      {!compact && (
        <button
          type="button"
          onClick={() => seekTo(time + SKIP_SECONDS)}
          disabled={!ready}
          aria-label={`Forward ${SKIP_SECONDS} seconds`}
          title={`Forward ${SKIP_SECONDS}s`}
          className={`${btn} text-xs`}
        >
          +{SKIP_SECONDS}s
        </button>
      )}

      {showScrubber && !compact && (
        <>
          <input
            type="range"
            min={0}
            // A 0 max would make the track un-draggable before metadata loads.
            max={duration || 1}
            step={0.05}
            value={time}
            disabled={!ready || !duration}
            onChange={(e) => seekTo(Number(e.target.value))}
            aria-label="Scrub through the clip"
            // basis-24 + min-w-0 lets the scrubber shrink and, when it cannot,
            // wrap onto its own line rather than pushing the row past the screen.
            className="flex-1 basis-24 min-w-0 h-1 accent-[#e53e3e] cursor-pointer disabled:cursor-default"
          />
          {/* tabular-nums so the row does not jitter as the digits change. */}
          <span className="text-[10px] text-[#707070] tabular-nums whitespace-nowrap">
            {clock(time)} / {clock(duration)}
          </span>
        </>
      )}
    </div>
  )
}
