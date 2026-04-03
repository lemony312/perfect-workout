'use client'

import { use, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useWorkout } from '@/context/WorkoutContext'
import {
  getWorkoutForDate2025,
  type Exercise,
  type WorkoutSession2025,
} from '@/data/workouts-2025'

const MUSCLE_GROUP_COLORS: Record<string, string> = {
  Chest: 'border-red-600 bg-red-600/10',
  Back: 'border-blue-600 bg-blue-600/10',
  Legs: 'border-green-600 bg-green-600/10',
  Triceps: 'border-purple-600 bg-purple-600/10',
  Biceps: 'border-amber-600 bg-amber-600/10',
  Shoulders: 'border-orange-600 bg-orange-600/10',
}

const MUSCLE_TEXT_COLORS: Record<string, string> = {
  Chest: '#f87171',
  Back: '#60a5fa',
  Legs: '#4ade80',
  Triceps: '#a78bfa',
  Biceps: '#fbbf24',
  Shoulders: '#fb923c',
}

const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Manifest type
type ClipEntry = {
  exercise: string
  slug: string
  file: string
  duration: number
}

type ManifestWorkout = {
  workout1: ClipEntry[]
  workout2: ClipEntry[]
}

type ClipManifest = Record<string, ManifestWorkout>

/** Match exercise name to a clip slug using the same logic as the Python clipper */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/\//g, '-')
    .replace(/→/g, 'to')
    .replace(/[^a-z0-9.-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function ExerciseClip({ clipPath, exerciseName }: { clipPath: string; exerciseName: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  if (hasError) {
    return null
  }

  return (
    <div className="relative w-full max-w-[200px] aspect-[9/16] rounded-lg overflow-hidden bg-black flex-shrink-0 cursor-pointer group"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={clipPath}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {/* Play/Pause overlay */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-white/80">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-white/80">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="text-xs text-white/90 font-medium truncate">{exerciseName}</p>
      </div>
    </div>
  )
}

function ExerciseCard({
  exercise,
  index,
  textColor,
  clipPath,
}: {
  exercise: Exercise
  index: number
  textColor: string
  clipPath: string | null
}) {
  return (
    <div className="bg-[#252525] rounded-lg border border-white/5 p-5 hover:bg-[#2a2a2a] transition-colors">
      <div className="flex gap-4">
        {/* Video clip on the left */}
        {clipPath && (
          <ExerciseClip clipPath={clipPath} exerciseName={exercise.name} />
        )}

        {/* Exercise info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h5 className="text-base font-semibold text-[#f5f5f5] mb-2">
              {index + 1}. {exercise.name}
            </h5>
            {exercise.notes && (
              <p className="text-sm text-[#a0a0a0] mt-1">{exercise.notes}</p>
            )}
          </div>
          <div className="mt-3">
            <div className="text-xs text-[#a0a0a0] mb-1">Sets × Reps</div>
            <div className="text-lg font-bold" style={{ color: textColor }}>
              {exercise.sets} × {exercise.reps}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SessionBlock({
  session,
  sessionIdx,
  manifest,
  workoutNumber,
}: {
  session: WorkoutSession2025
  sessionIdx: number
  manifest: ClipManifest | null
  workoutNumber: number
}) {
  const primaryMuscle = session.muscleGroups[0]
  const colorClass = MUSCLE_GROUP_COLORS[primaryMuscle] || 'border-gray-600 bg-gray-600/10'
  const textColor = MUSCLE_TEXT_COLORS[primaryMuscle] || '#9ca3af'

  // Look up clips from manifest
  const workoutKey = workoutNumber <= 1 ? 'workout1' : 'workout2'
  const videoClips = manifest?.[session.videoId]?.[workoutKey] ?? []

  function findClip(exerciseName: string): string | null {
    const slug = toSlug(exerciseName)
    const match = videoClips.find(
      (c) => c.slug === slug || slug.includes(c.slug) || c.slug.includes(slug)
    )
    if (match) return `/clips/${match.file}`
    return null
  }

  return (
    <div
      className={`bg-[#1a1a1a] rounded-lg border-l-4 border-t border-r border-b border-white/5 ${colorClass.split(' ')[0]} p-6`}
    >
      {/* Session Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-[#f5f5f5]">{session.name}</h3>
          <span className="text-xs text-[#a0a0a0] px-2 py-1 rounded bg-white/5">
            {session.isPrimary ? 'Primary' : 'Secondary'}
          </span>
        </div>
        <p className="text-sm text-[#a0a0a0]">{session.videoTitle}</p>
      </div>

      {/* Session Notes */}
      {session.notes && (
        <div className="mb-6 p-4 bg-[#252525] rounded-lg border border-white/5">
          <p className="text-sm text-[#a0a0a0] italic">{session.notes}</p>
        </div>
      )}

      {/* Exercises */}
      {session.exercises.length > 0 ? (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-[#f5f5f5]">Exercises</h4>
          {session.exercises.map((exercise, exIdx) => (
            <ExerciseCard
              key={exIdx}
              exercise={exercise}
              index={exIdx}
              textColor={textColor}
              clipPath={findClip(exercise.name)}
            />
          ))}
        </div>
      ) : (
        <div className="p-6 bg-[#252525] rounded-lg border border-white/5 text-center">
          <p className="text-[#a0a0a0] mb-4">Watch the video for exercise details</p>
          <a
            href={`https://www.youtube.com/watch?v=${session.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#e53e3e] hover:bg-[#c53030] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch on YouTube
          </a>
        </div>
      )}

      {/* Full video link at bottom */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <a
          href={`https://www.youtube.com/watch?v=${session.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#a0a0a0] hover:text-[#e53e3e] transition-colors inline-flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Watch full workout video
        </a>
      </div>
    </div>
  )
}

export default function WorkoutDetail2025Page({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date: dateStr } = use(params)
  const { startDate } = useWorkout()
  const [manifest, setManifest] = useState<ClipManifest | null>(null)

  // Load clip manifest
  useEffect(() => {
    fetch('/clips/manifest.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setManifest(data))
      .catch(() => setManifest(null))
  }, [])

  const targetDate = new Date(dateStr)
  targetDate.setHours(0, 0, 0, 0)

  const workout = getWorkoutForDate2025(startDate, targetDate)

  const dayOfWeek = DAYS_OF_WEEK[targetDate.getDay()]
  const month = MONTHS[targetDate.getMonth()]
  const day = targetDate.getDate()
  const year = targetDate.getFullYear()

  // Determine workout number (1 for days 1-3, 2 for days 5-7)
  const workoutNumber = workout.dayNumber <= 3 ? 1 : 2

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/2025"
          className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Calendar
        </Link>

        {/* Date Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-2">{dayOfWeek}</h1>
          <p className="text-lg text-[#a0a0a0]">{month} {day}, {year}</p>
        </div>

        {/* Workout Title Card */}
        <div className="bg-[#1a1a1a] rounded-lg border border-white/5 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-3">
                {workout.dayLabel}
              </h2>
              <div className="flex flex-wrap gap-2">
                {workout.sessions.map((session, idx) => (
                  <span
                    key={idx}
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
                      MUSCLE_GROUP_COLORS[session.muscleGroups[0]] || 'border-gray-600 bg-gray-600/10'
                    }`}
                    style={{ color: MUSCLE_TEXT_COLORS[session.muscleGroups[0]] || '#9ca3af' }}
                  >
                    {session.muscleGroups.join(' + ')}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#a0a0a0]">Day</div>
              <div className="text-3xl font-bold text-[#e53e3e]">{workout.dayNumber}</div>
            </div>
          </div>
        </div>

        {/* Rest Day Content */}
        {workout.isRest ? (
          <div className="bg-[#1a1a1a] rounded-lg border border-white/5 p-8 text-center">
            <div className="text-6xl mb-4">🛌</div>
            <h3 className="text-2xl font-bold text-[#f5f5f5] mb-4">Rest & Recovery Day</h3>
            <div className="text-[#a0a0a0] space-y-2 max-w-2xl mx-auto">
              <p>Take this day to let your muscles recover and grow stronger.</p>
              <p className="text-sm">Recovery tips:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>Get 7-9 hours of quality sleep</li>
                <li>Stay hydrated throughout the day</li>
                <li>Consider light stretching or yoga</li>
                <li>Focus on nutrition and proper protein intake</li>
                <li>Foam roll or massage sore muscles</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {workout.sessions.map((session, sessionIdx) => (
              <SessionBlock
                key={sessionIdx}
                session={session}
                sessionIdx={sessionIdx}
                manifest={manifest}
                workoutNumber={workoutNumber}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
