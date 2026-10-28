'use client'

import { useState } from 'react'
import {
  TENDON_SESSIONS,
  TENDON_TESTS,
  TENDON_VIDEO_ID,
  TENDON_VIDEO_TITLE,
  type TendonExercise,
} from '@/data/workouts-tendons'
import RestTimer from '@/components/RestTimer'
import LoopClip from '@/components/LoopClip'

const TENDON_COLOR = '#2dd4bf'

const YOUTUBE_ICON =
  'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'

function ExerciseCard({ exercise, index }: { exercise: TendonExercise; index: number }) {
  // Which clip the player shows: the exercise's own (-1) or a progression's.
  const [activeStep, setActiveStep] = useState(-1)
  const activeProgression = activeStep >= 0 ? exercise.progressions?.[activeStep] : undefined
  const clip = activeProgression?.clip ?? exercise.clip
  const clipLabel = activeProgression?.clip
    ? activeProgression.name
    : exercise.clipCaption ?? exercise.name

  return (
    <div className="bg-[#252525] rounded-lg border border-white/5 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row gap-4">
        {clip && <LoopClip src={clip} label={clipLabel} />}

        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wide mb-1" style={{ color: TENDON_COLOR }}>
            {exercise.method}
          </div>
          <h5 className="text-lg font-semibold text-[#f5f5f5] mb-2">
            {index + 1}. {exercise.name}
          </h5>
          {exercise.startsAfterWeeks && (
            <div className="mb-2 inline-block text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded px-2 py-1">
              Only after {exercise.startsAfterWeeks}+ weeks of the other methods
            </div>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
            <div>
              <div className="text-xs text-[#a0a0a0]">Sets</div>
              <div className="text-base font-bold" style={{ color: TENDON_COLOR }}>{exercise.sets}</div>
            </div>
            <div>
              <div className="text-xs text-[#a0a0a0]">Reps / Hold</div>
              <div className="text-base font-bold" style={{ color: TENDON_COLOR }}>{exercise.reps}</div>
            </div>
            {exercise.rest && (
              <div>
                <div className="text-xs text-[#a0a0a0]">Rest</div>
                <div className="text-base font-bold" style={{ color: TENDON_COLOR }}>{exercise.rest}</div>
              </div>
            )}
          </div>
          <p className="text-sm text-[#d4d4d4]">{exercise.notes}</p>
          {exercise.mistake && (
            <p className="text-sm text-[#a0a0a0] mt-2">
              <span className="text-red-400 font-semibold">Common mistake: </span>
              {exercise.mistake}
            </p>
          )}
        </div>
      </div>

      {exercise.progressions && exercise.progressions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <h6 className="text-sm font-semibold text-[#f5f5f5] mb-3">
            Progressions <span className="font-normal text-[#a0a0a0]">· easiest first</span>
          </h6>
          <ol className="space-y-2">
            {exercise.progressions.map((step, stepIdx) => {
              const isActive = stepIdx === activeStep
              return (
                <li key={step.name} className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${TENDON_COLOR}22`, color: TENDON_COLOR }}
                  >
                    {stepIdx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-[#f5f5f5]">{step.name}</span>
                      {step.clip && (
                        <button
                          onClick={() => setActiveStep(isActive ? -1 : stepIdx)}
                          className={`text-xs px-2 py-1 rounded border transition-colors ${
                            isActive
                              ? 'border-teal-400 bg-teal-400/15 text-teal-300'
                              : 'border-white/10 text-[#a0a0a0] hover:text-[#f5f5f5] hover:bg-white/5'
                          }`}
                        >
                          {isActive ? '✓ Showing demo' : '▶ Show demo'}
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-[#a0a0a0]">{step.detail}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </div>
  )
}

export default function TendonsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-2 tracking-tight">
            TENDON TRAINING
          </h1>
          <p className="text-lg text-[#a0a0a0]">3 days a week · 20–30 min · think in months</p>
          <p className="text-sm text-[#a0a0a0] mt-2 max-w-2xl mx-auto">
            Keep at least one rest day between sessions — tendons rebuild during recovery, not during the workout.
          </p>
        </div>

        {/* Sessions */}
        <div className="space-y-8">
          {TENDON_SESSIONS.map((session) => (
            <section
              key={session.slug}
              className="bg-[#1a1a1a] rounded-lg border-l-4 border-t border-r border-b border-white/5 border-l-teal-600 p-4 sm:p-6"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-[#f5f5f5]">{session.label}</h2>
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-semibold border border-teal-600 bg-teal-600/10"
                  style={{ color: TENDON_COLOR }}
                >
                  {session.focus}
                </span>
              </div>
              <div className="space-y-4">
                {session.exercises.map((exercise, idx) => (
                  <ExerciseCard key={`${session.slug}-${idx}`} exercise={exercise} index={idx} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Progress tests */}
        <div className="mt-8 bg-[#1a1a1a] rounded-lg border border-white/5 p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-[#f5f5f5] mb-1">Test every 4 weeks</h3>
          <p className="text-sm text-[#a0a0a0] mb-3">Don&apos;t trust the mirror — write the numbers down.</p>
          <ol className="space-y-1.5 text-sm text-[#d4d4d4] list-decimal list-inside">
            {TENDON_TESTS.map((test) => (
              <li key={test}>{test}</li>
            ))}
          </ol>
        </div>

        <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
          <p className="text-sm text-[#a0a0a0]">
            <span className="text-[#f5f5f5] font-semibold">Already in pain? </span>
            Tendon pain that lasts for weeks, gets worse during training, swells, or shows up at rest needs a health professional first — training doesn&apos;t replace a diagnosis.
          </p>
        </div>

        {/* Source video */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <a
            href={`https://www.youtube.com/watch?v=${TENDON_VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#a0a0a0] hover:text-[#e53e3e] transition-colors inline-flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0">
              <path d={YOUTUBE_ICON} />
            </svg>
            Watch full video: {TENDON_VIDEO_TITLE}
          </a>
        </div>
      </div>
      <RestTimer />
    </div>
  )
}
