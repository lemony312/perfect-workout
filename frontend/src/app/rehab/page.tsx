'use client'

import { useState } from 'react'
import { REHAB_EXERCISES, type RehabExercise } from '@/data/rehab'
import LoopClip from '@/components/LoopClip'

const REHAB_COLOR = '#a78bfa'

const YOUTUBE_ICON =
  'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'

function Heading({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <h3 className="text-lg font-semibold text-[#f5f5f5] mb-3">
      {children}
      {note && <span className="font-normal text-sm text-[#a0a0a0]"> · {note}</span>}
    </h3>
  )
}

function SignList({ exercise }: { exercise: RehabExercise }) {
  // One sign open at a time, so the list stays scannable on a phone.
  const [open, setOpen] = useState<number | null>(null)
  return (
    <ul className="space-y-2">
      {exercise.signs.map((s, i) => {
        const isOpen = open === i
        return (
          <li key={s.sign} className="rounded-md border border-white/5 bg-[#252525]">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left flex items-start gap-3 px-3 py-2.5"
              aria-expanded={isOpen}
            >
              <span className="mt-0.5 text-xs flex-shrink-0" style={{ color: REHAB_COLOR }}>
                {isOpen ? '▼' : '▶'}
              </span>
              <span className="text-sm text-[#f5f5f5]">{s.sign}</span>
            </button>
            {isOpen && <p className="px-3 pb-3 pl-9 text-sm text-[#a0a0a0]">{s.why}</p>}
          </li>
        )
      })}
    </ul>
  )
}

function FollowAlong({ exercise }: { exercise: RehabExercise }) {
  const [active, setActive] = useState(0)
  // The last step may have no clip; keep showing the most recent one.
  const clipStep = exercise.steps.slice(0, active + 1).reverse().find((s) => s.clip)

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {clipStep?.clip && (
        <div className="md:w-[380px] flex-shrink-0 md:sticky md:top-4 self-start w-full">
          <LoopClip src={clipStep.clip} label={clipStep.name} className="w-full" />
        </div>
      )}
      <ol className="flex-1 min-w-0 space-y-2">
        {exercise.steps.map((step, i) => {
          const isActive = i === active
          return (
            <li key={step.name}>
              <button
                onClick={() => setActive(i)}
                className={`w-full text-left flex gap-3 rounded-md border px-3 py-2.5 transition-colors ${
                  isActive ? 'border-violet-400/60 bg-violet-400/10' : 'border-white/5 bg-[#252525] hover:bg-white/5'
                }`}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${REHAB_COLOR}22`, color: REHAB_COLOR }}
                >
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-[#f5f5f5]">{step.name}</span>
                  <span className={`block text-sm text-[#a0a0a0] ${isActive ? '' : 'line-clamp-1'}`}>
                    {step.detail}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
        <li className="flex gap-2 pt-1">
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className="text-sm px-3 py-2 rounded border border-white/10 text-[#a0a0a0] hover:text-[#f5f5f5] disabled:opacity-30"
          >
            ← Back
          </button>
          <button
            onClick={() => setActive(Math.min(exercise.steps.length - 1, active + 1))}
            disabled={active === exercise.steps.length - 1}
            className="text-sm px-3 py-2 rounded border border-violet-400/40 text-violet-300 hover:bg-violet-400/10 disabled:opacity-30"
          >
            Next step →
          </button>
        </li>
      </ol>
    </div>
  )
}

function ExerciseSection({ exercise }: { exercise: RehabExercise }) {
  return (
    <section
      id={exercise.slug}
      className="bg-[#1a1a1a] rounded-lg border-l-4 border-t border-r border-b border-white/5 border-l-violet-500 p-4 sm:p-6 space-y-8"
    >
      <div>
        <div className="text-xs uppercase tracking-wide mb-1" style={{ color: REHAB_COLOR }}>
          {exercise.area}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] mb-2">{exercise.name}</h2>
        <p className="text-sm text-[#d4d4d4] max-w-3xl">{exercise.summary}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
          <div>
            <div className="text-xs text-[#a0a0a0]">Time</div>
            <div className="text-base font-bold" style={{ color: REHAB_COLOR }}>{exercise.time}</div>
          </div>
          <div className="max-w-md">
            <div className="text-xs text-[#a0a0a0]">How often</div>
            <div className="text-sm text-[#f5f5f5]">{exercise.dose}</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Heading note="tap one to see why">Try this if you have…</Heading>
          <SignList exercise={exercise} />
        </div>
        <div>
          <Heading note="30 seconds">Check yourself first</Heading>
          <ol className="space-y-2 text-sm text-[#d4d4d4] list-decimal list-outside pl-5">
            {exercise.selfCheck.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
          <details className="mt-6 group">
            <summary className="cursor-pointer text-sm font-semibold text-[#f5f5f5] hover:text-violet-300">
              Why it works
            </summary>
            <ul className="mt-3 space-y-2 text-sm text-[#a0a0a0] list-disc list-outside pl-5">
              {exercise.why.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </details>
        </div>
      </div>

      <div>
        <Heading>Before you start</Heading>
        <ul className="space-y-1.5 text-sm text-[#d4d4d4] list-disc list-outside pl-5">
          {exercise.setup.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div>
        <Heading note="tap a step or use Next">Follow along</Heading>
        <FollowAlong exercise={exercise} />
      </div>

      <div>
        <Heading>Watch for</Heading>
        <ul className="space-y-1.5 text-sm text-[#d4d4d4] list-disc list-outside pl-5">
          {exercise.watchFor.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-white/5">
        <a
          href={`https://www.youtube.com/watch?v=${exercise.source.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#a0a0a0] hover:text-[#e53e3e] transition-colors inline-flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0">
            <path d={YOUTUBE_ICON} />
          </svg>
          {exercise.source.channel}: {exercise.source.title}
        </a>
      </div>
    </section>
  )
}

export default function RehabPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-2 tracking-tight">
            REHAB
          </h1>
          <p className="text-lg text-[#a0a0a0]">Match the symptom, check yourself, follow along</p>
        </div>

        <div className="space-y-8">
          {REHAB_EXERCISES.map((exercise) => (
            <ExerciseSection key={exercise.slug} exercise={exercise} />
          ))}
        </div>

        <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-white/5">
          <p className="text-sm text-[#a0a0a0]">
            <span className="text-[#f5f5f5] font-semibold">Not a diagnosis. </span>
            Stop if you get dizzy, sick, double vision or a headache that keeps building. Sudden changes in your vision, or symptoms after a recent head injury, need a health professional before any exercise.
          </p>
        </div>
      </div>
    </div>
  )
}
