'use client'

import { useEffect, useRef, useState } from 'react'
import { mediaUrl } from '@/lib/media'
import { VideoTransport } from '@/components/VideoTransport'

/** A muted, looping demo clip that loads once scrolled into view; click to play/pause. */
export default function LoopClip({
  src,
  label,
  className = 'w-full sm:w-[260px] md:w-[300px] flex-shrink-0',
  autoPlay = false,
}: {
  src: string
  label: string
  /** Sizing of the outer box; defaults to the fixed-width card thumbnail. */
  className?: string
  /** Play without a tap, including each new src — for guided, hands-free routines. */
  autoPlay?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Lazy load: only set the src once the clip scrolls into view.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // A new source swapped in: keep playing if we already were, or if told to.
  useEffect(() => {
    setHasError(false)
    const video = videoRef.current
    if (video && (isPlaying || autoPlay)) video.play().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, autoPlay])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  if (hasError) return null

  return (
    // Transport sits outside the clickable frame so its buttons don't also toggle play.
    <div className={className}>
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-lg overflow-hidden bg-white cursor-pointer group"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={isVisible ? mediaUrl(src) : undefined}
          autoPlay={autoPlay}
          className="w-full h-full object-contain"
          loop
          muted
          playsInline
          preload="metadata"
          onError={() => setHasError(true)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 sm:w-10 sm:h-10 text-white/90">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 sm:w-10 sm:h-10 text-white/90">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <p className="text-xs text-white font-medium truncate">{label}</p>
        </div>
      </div>
      <VideoTransport videoRef={videoRef} compact className="mt-1.5 justify-center" />
    </div>
  )
}
