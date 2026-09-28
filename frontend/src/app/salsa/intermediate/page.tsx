'use client'

// /salsa/intermediate — the intermediate solo steps course, 14 classes from the
// same channel as /salsa. A sibling route rather than a mode of /salsa, for the
// same reason /salsa/couples is: the two share types and components but not data,
// and a `?level=` param on one page would mean one bundle carrying both courses'
// move tables to render either.
//
// Differences from /salsa that are deliberate:
//
//   1. **No drill mode.** The drill stores its cursor under a single key and
//      assumes the beginners course's move list; pointing it at a second course
//      would interleave the two courses' progress in one saved position. Left out
//      until the drill takes a course id, rather than half-wired now.
//   2. **Some moves are honestly incomplete.** Six classes have footwork
//      paragraphs marked UNRESOLVED in the spec — they need someone to watch the
//      video to say which foot on which beat. Those moves render with
//      `complete: false` and say so. An admitted gap beats a plausible guess.
//   3. **Elegua has no full-tempo clip at all.** Its class never dances it at
//      tempo. `ClipPair.missingReason` explains that, and SalsaClipPlayer renders
//      the reason where the video would be.
//   4. **Every clip is cut from the class video**, because this course has no
//      official shorts. So the "full tempo" clips have the teachers talking over
//      them, and three carry a `caveat` saying so.
//
// Tempo is NOT local state. It comes from `useTempoMode()`, the same persisted
// store the other three courses read, so choosing "Slow" survives moving between
// courses as well as between moves — see the note at the top of salsa-tempo.ts.

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  INT_STEPS_COURSE,
  INT_STEPS_MOVES,
  INT_STEPS_COURSE_FLAGS,
  intStepsClassTitle,
} from '@/data/salsa-int-steps'
import {
  youtubeLink,
  DRILLABLE_CUE_KINDS,
  type SalsaMove,
  type SalsaCue,
} from '@/data/salsa-types'
import { searchMoves } from '@/lib/salsa-search'
import { useTempoMode } from '@/lib/salsa-tempo'
import { SalsaClipPlayer } from '@/components/SalsaClipPlayer'
import { SalsaCourseSwitcher } from '@/components/SalsaCourseSwitcher'

export default function SalsaIntermediateStepsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <IntStepsContent />
    </Suspense>
  )
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">{children}</div>
    </main>
  )
}

function LoadingFallback() {
  return (
    <PageShell>
      <header className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Intermediate Salsa — Solo Steps
        </h1>
        <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">Loading...</p>
      </header>
    </PageShell>
  )
}

function IntStepsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const moveId = searchParams.get('move')
  const queryString = searchParams.get('q') ?? ''

  const navigate = useCallback(
    (params: Record<string, string | null>) => {
      const sp = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(params)) {
        if (value === null) sp.delete(key)
        else sp.set(key, value)
      }
      const qs = sp.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname)
    },
    [searchParams, pathname, router],
  )

  if (moveId) {
    const move = INT_STEPS_MOVES.find((m) => m.id === moveId)
    if (move) {
      return <DetailView move={move} onBack={() => navigate({ move: null })} />
    }
    // Unknown id (stale bookmark, or a link to a beginners move): fall through to
    // the index rather than rendering a blank detail view. Deliberately not
    // calling `navigate` here — that mutates history during render and would
    // fight the `move` param on the first paint.
  }

  return <IndexView queryString={queryString} onNavigate={navigate} />
}

// ============================================================================
// Index
// ============================================================================

function IndexView({
  queryString,
  onNavigate,
}: {
  queryString: string
  onNavigate: (params: Record<string, string | null>) => void
}) {
  const [query, setQuery] = useState(queryString)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      searchInputRef.current?.focus()
    }
  }, [])

  const filtered = searchMoves(query, INT_STEPS_MOVES, intStepsClassTitle)
  const groups = groupByClass(filtered)

  return (
    <PageShell>
      <header className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Intermediate Salsa — Solo Steps
        </h1>
        <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">
          La Suerte Dance School · {INT_STEPS_COURSE.classes.length} classes ·{' '}
          {INT_STEPS_MOVES.length} steps
        </p>
      </header>

      <SalsaCourseSwitcher active="int-steps" />

      <div className="mb-6">
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onNavigate({ q: e.target.value || null })
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filtered.length > 0) {
              onNavigate({ move: filtered[0].id, q: null })
            } else if (e.key === 'Escape') {
              setQuery('')
              onNavigate({ q: null })
            }
          }}
          placeholder="Search a step — try “pilon”, “mojito”, “arara”"
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-[#f5f5f5] placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-[#e53e3e]/50"
        />
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <section key={group.classNumber}>
            <h2 className="text-[11px] uppercase tracking-widest text-[#fbbf24] mb-2">
              Class {group.classNumber} — {intStepsClassTitle(group.classNumber)}
            </h2>
            <div className="space-y-2">
              {group.moves.map((move) => (
                <MoveCard
                  key={move.id}
                  move={move}
                  onClick={() => onNavigate({ move: move.id, q: null })}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <details className="mt-8 border-t border-white/5 pt-6">
        <summary className="cursor-pointer text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
          About this course ▸
        </summary>
        <div className="mt-4 space-y-2 text-xs text-[#707070]">
          {INT_STEPS_COURSE_FLAGS.map((flag) => (
            <p key={flag.id}>• {flag.text}</p>
          ))}
        </div>
      </details>
    </PageShell>
  )
}

function groupByClass(moves: SalsaMove[]): { classNumber: number; moves: SalsaMove[] }[] {
  const byClass = new Map<number, SalsaMove[]>()
  for (const move of moves) {
    // A move with more than one source (Arara has two, one per rhythm) groups
    // under its int-steps source, and under the first if the course field is ever
    // wrong — better than dropping it into an unnumbered bucket.
    const source = intStepsSource(move)
    const classNum = source?.classNumber ?? 0
    if (!byClass.has(classNum)) byClass.set(classNum, [])
    byClass.get(classNum)!.push(move)
  }
  return Array.from(byClass.entries())
    .sort(([a], [b]) => a - b)
    .map(([classNumber, moves]) => ({ classNumber, moves }))
}

/** This course's teaching source for a move, or the first one as a fallback. */
function intStepsSource(move: SalsaMove) {
  return move.sources.find((s) => s.course === 'int-steps') ?? move.sources[0]
}

function MoveCard({ move, onClick }: { move: SalsaMove; onClick: () => void }) {
  const source = intStepsSource(move)
  const slow = source?.clips.slow
  const fast = source?.clips.fast
  const drillable = move.cues.filter((c) => DRILLABLE_CUE_KINDS.includes(c.kind)).length

  return (
    <button
      onClick={onClick}
      className="w-full bg-[#141414] hover:bg-[#1a1a1a] border border-white/5 hover:border-white/10 rounded-lg p-3 text-left transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 text-xs text-[#707070] font-mono">
          {source?.classNumber ?? '—'}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium">{move.name}</span>
            {!move.complete && (
              <span className="text-[10px] text-[#fbbf24]">⚠ incomplete</span>
            )}
          </div>
          <p className="text-sm text-[#a0a0a0] mt-0.5">{move.summary}</p>
          <div className="text-xs text-[#707070] mt-1 flex items-center gap-2 flex-wrap">
            <span>{drillable} cues</span>
            {slow ? (
              <span>· slow {Math.round(slow.end - slow.start)}s</span>
            ) : (
              <span className="text-[#fbbf24]">· no slow demo</span>
            )}
            {fast ? (
              <span>· fast {Math.round(fast.end - fast.start)}s</span>
            ) : (
              <span className="text-[#fbbf24]">· no full-tempo demo</span>
            )}
            {(slow?.caveat || fast?.caveat) && (
              <span className="text-[#fbbf24]">· ⓘ see caveat</span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

// ============================================================================
// Detail
// ============================================================================

function DetailView({ move, onBack }: { move: SalsaMove; onBack: () => void }) {
  const [tempoMode, setTempoMode] = useTempoMode()
  const [clipMuted, setClipMuted] = useState(false)

  // Arara carries two sources — the folkloric 6/8 original and the salsa-timed
  // adaptation — and both are worth practising, so this page renders every
  // int-steps source rather than only the first. Every other move has one.
  const sources = move.sources.filter((s) => s.course === 'int-steps')
  const shown = sources.length > 0 ? sources : move.sources

  if (shown.length === 0) {
    return (
      <PageShell>
        <button
          onClick={onBack}
          className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5] mb-4"
        >
          ← All intermediate steps
        </button>
        <p className="text-[#a0a0a0]">No teaching source recorded for this step yet.</p>
      </PageShell>
    )
  }

  const classNum = shown[0].classNumber

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <button onClick={onBack} className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
            ← All intermediate steps
          </button>
          <span className="text-xs text-[#707070]">
            Class {classNum} · {move.kind}
          </span>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">{move.name}</h1>
          {move.aliases.length > 0 && (
            <p className="text-sm text-[#a0a0a0] mt-1">
              also: {move.aliases.slice(0, 4).join(' · ')}
            </p>
          )}
          <p className="text-sm text-[#a0a0a0] mt-2">{move.summary}</p>
          {!move.complete && (
            <p className="text-xs text-[#fbbf24] mt-3 border border-[#fbbf24]/30 rounded-lg p-3">
              ⚠ This step is incomplete. Its footwork breakdown needs someone to watch
              the class and say which foot moves on which beat — the transcript alone
              does not settle it. The cues and clips below are accurate; the footwork
              paragraph is the gap.
            </p>
          )}
        </header>

        {shown.map((source, i) => (
          <section key={`${source.videoId}-${source.teachStart}`} className={i > 0 ? 'mt-8' : ''}>
            {shown.length > 1 && (
              <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-3">
                {source.clips.slow?.label ?? `Version ${i + 1}`}
              </h2>
            )}
            {/* `key` remounts the player per source so a Slow→Fast cycle restarts
                on the counted demo instead of carrying over mid-cycle. */}
            <SalsaClipPlayer
              key={`${move.id}-${source.teachStart}`}
              clips={source.clips}
              aspect={source.clips.slow?.aspect ?? source.clips.fast?.aspect ?? '16/9'}
              tempoMode={tempoMode}
              onTempoChange={setTempoMode}
              muted={clipMuted}
              onMutedChange={setClipMuted}
              origin={`Class ${source.classNumber}`}
            />
            {source.note && <p className="text-xs text-[#707070] mt-3">{source.note}</p>}
          </section>
        ))}

        {/* Solo course, so there are no lead cues and every cue is `role: both`.
            Grouping by kind rather than by role is what is informative here. */}
        <CueBlock
          title="Footwork"
          subtitle="Which foot, which beat."
          cues={move.cues.filter((c) => c.kind === 'footwork')}
          emphasise
        />
        <CueBlock
          title="Rhythm"
          cues={move.cues.filter((c) => c.kind === 'rhythm')}
        />
        <CueBlock
          title="Arms"
          cues={move.cues.filter((c) => c.kind === 'arms')}
        />
        <CueBlock
          title="Body movement & styling"
          cues={move.cues.filter(
            (c) => c.kind === 'body-movement' || c.kind === 'styling',
          )}
        />
        <CueBlock
          title="Context"
          subtitle="What the step is, where it comes from, what it is for."
          cues={move.cues.filter((c) => c.kind === 'concept' || c.kind === 'context')}
        />

        <section className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">Footwork</h2>
          <p className="text-sm text-[#e0e0e0]">{move.footwork}</p>
          {move.base && (
            <p className="text-xs text-[#a0a0a0] mt-2">
              Built on: <MoveLink id={move.base} />
            </p>
          )}
          {move.composedOf && move.composedOf.length > 0 && (
            <p className="text-xs text-[#a0a0a0] mt-2">
              Composed of:{' '}
              {move.composedOf.map((id, i) => (
                <span key={id}>
                  {i > 0 && ' + '}
                  <MoveLink id={id} />
                </span>
              ))}
            </p>
          )}
          {move.exceptions?.map((ex, i) => (
            <p key={i} className="text-xs text-[#fbbf24] mt-3">
              ⚠ {ex.text} → Overrides <MoveLink id={ex.overrides} />
            </p>
          ))}
        </section>

        {/* Taught but not clippable — kept so nothing is silently dropped. */}
        {move.notes && move.notes.length > 0 && (
          <section className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
            <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">
              Also taught here
            </h2>
            <div className="space-y-3">
              {move.notes.map((n, i) => (
                <p key={i} className="text-sm text-[#a0a0a0]">
                  {n.text}{' '}
                  <a
                    href={youtubeLink(n.sourceVideo, n.sourceStart)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e53e3e] hover:text-[#c53030]"
                  >
                    watch ↗
                  </a>
                </p>
              ))}
            </div>
          </section>
        )}

        {/* The long grain: the class itself, plus every segment the clips came from. */}
        <section className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">
            Watch the class
          </h2>
          {shown.map((source) => {
            const cls = INT_STEPS_COURSE.classes.find((c) => c.number === source.classNumber)
            return (
              <div
                key={`${source.videoId}-${source.teachStart}`}
                className="flex items-center gap-3 flex-wrap text-xs mb-2 last:mb-0"
              >
                <a
                  href={youtubeLink(source.videoId, source.teachStart)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e53e3e] hover:text-[#c53030]"
                >
                  Full teach block ↗
                </a>
                {source.segmentIds.map((segId) => {
                  const seg = cls?.segments.find((s) => s.id === segId)
                  if (!seg) return null
                  return (
                    <a
                      key={segId}
                      href={youtubeLink(source.videoId, seg.start)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a0a0a0] hover:text-[#e53e3e]"
                    >
                      {seg.role} {formatTime(seg.start)} ↗
                    </a>
                  )
                })}
              </div>
            )
          })}
        </section>
      </div>
    </PageShell>
  )
}

function CueBlock({
  title,
  subtitle,
  cues,
  emphasise = false,
}: {
  title: string
  subtitle?: string
  cues: SalsaCue[]
  emphasise?: boolean
}) {
  if (cues.length === 0) return null
  return (
    <section
      className={`mt-6 rounded-xl border p-6 ${
        emphasise ? 'bg-[#1f1a12] border-[#fbbf24]/25' : 'bg-[#1a1a1a] border-white/5'
      }`}
    >
      <h2
        className={`text-sm uppercase tracking-widest mb-1 ${
          emphasise ? 'text-[#fbbf24]' : 'text-[#a0a0a0]'
        }`}
      >
        {title}
      </h2>
      {subtitle && <p className="text-xs text-[#707070] mb-4">{subtitle}</p>}
      <div className={`space-y-3 ${subtitle ? '' : 'mt-4'}`}>
        {cues.map((cue) => (
          <CueItem key={cue.id} cue={cue} />
        ))}
      </div>
    </section>
  )
}

function CueItem({ cue }: { cue: SalsaCue }) {
  const beatLabel = cue.beat
    ? `Beat ${cue.beat}`
    : cue.beats
      ? `Beats ${cue.beats.join(', ')}`
      : '—'
  // Resolve the class from the cue's own source video rather than the move's: a
  // cue can legitimately come from a different class than the one teaching the
  // move, and labelling it with the move's class would send you to the wrong video.
  const cueClass = INT_STEPS_COURSE.classes.find((c) => c.videoId === cue.sourceVideo)

  return (
    <div className="text-sm">
      <div className="flex items-start gap-3">
        <span className="shrink-0 font-mono text-xs text-[#707070] w-14">{beatLabel}</span>
        <div className="flex-1">
          <p className="text-[#e0e0e0]">
            {cue.text}
            {cue.confidence === 'suspect' && (
              <span className="ml-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-[#fbbf24] border border-[#fbbf24]/50 rounded px-1.5 py-0.5">
                Unverified
              </span>
            )}
          </p>
          {cue.warning && <p className="text-xs text-[#fbbf24] mt-1">⚠ {cue.warning}</p>}
          <a
            href={youtubeLink(cue.sourceVideo, cue.sourceStart)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#a0a0a0] hover:text-[#e53e3e] mt-1 inline-block"
          >
            {cueClass ? `Class ${cueClass.number}` : 'Source'} @{' '}
            {formatTime(cue.sourceStart)} ↗
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Links to another intermediate step. A `base` or `composedOf` id often points at
 * a beginners move (most intermediate steps build on one), so an id not in this
 * course links across to /salsa instead of rendering as dead text.
 */
function MoveLink({ id }: { id: string }) {
  const move = INT_STEPS_MOVES.find((m) => m.id === id)
  if (move) {
    return (
      <Link
        href={`/salsa/intermediate?move=${id}`}
        className="text-[#e53e3e] hover:text-[#c53030] hover:underline"
      >
        {move.name}
      </Link>
    )
  }
  return (
    <Link
      href={`/salsa?move=${id}`}
      className="text-[#a0a0a0] hover:text-[#e53e3e] hover:underline"
    >
      {id}
    </Link>
  )
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}
