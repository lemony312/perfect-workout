'use client'

// /salsa/couples — the partnerwork course, a sibling of /salsa rather than a
// mode of it. It lives under /salsa because it is the same channel, the same
// vocabulary and the same tab; it is its own route because a partner figure is
// not a step and does not render like one.
//
// Three things are deliberately different from /salsa:
//
//   1. **Leader cues come first, and `kind: 'lead'` is highlighted.** In the solo
//      course the lead category is empty; here it is the reason the page exists.
//      A figure you cannot lead is not learnable, so the hand signal is promoted
//      above the footwork rather than buried under it.
//   2. **Leader and follower are never merged** (charter R4). They render as
//      separate blocks even when that means repeating a beat number. A cue marked
//      `both` is genuinely role-independent — it is not a summary of the two.
//   3. **No drill mode.** The steps drill assumes one 8-count of solo footwork per
//      slot and stores its cursor under a single key; running partner figures
//      through it would both mis-time the slots and interleave the two courses'
//      progress. Left out on purpose rather than half-wired.
//
// Tempo is NOT local state here. It comes from `useTempoMode()`, the same
// persisted store /salsa reads, so choosing "Slow" survives moving between the
// two courses as well as between moves — see the note at the top of
// salsa-tempo.ts.

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  COUPLES_COURSE,
  COUPLES_MOVES,
  COUPLES_COURSE_FLAGS,
  couplesClassTitle,
} from '@/data/salsa-couples'
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

export default function SalsaCouplesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CouplesContent />
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
        <h1 className="text-2xl md:text-3xl font-bold">Cuban Salsa — Couples</h1>
        <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">Loading...</p>
      </header>
    </PageShell>
  )
}

function CouplesContent() {
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
    const move = COUPLES_MOVES.find((m) => m.id === moveId)
    if (move) {
      return <DetailView move={move} onBack={() => navigate({ move: null })} />
    }
    // Unknown id (stale bookmark, or a move not indexed yet): fall through to the
    // index rather than rendering a blank detail view. The steps page calls
    // `navigate` here, which mutates history during render; doing it on this
    // route would fight the `move` param on the very first paint.
  }

  return <IndexView queryString={queryString} onNavigate={navigate} />
}

// ============================================================================
// Index
// ============================================================================

/** Which cue roles a move actually carries — drives the badges on each card. */
function roleSummary(move: SalsaMove) {
  const leadCues = move.cues.filter((c) => c.kind === 'lead')
  return {
    lead: leadCues.length,
    leader: move.cues.filter((c) => c.role === 'leader').length,
    follower: move.cues.filter((c) => c.role === 'follower').length,
    drillable: move.cues.filter((c) => DRILLABLE_CUE_KINDS.includes(c.kind)).length,
  }
}

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

  const filtered = searchMoves(query, COUPLES_MOVES, couplesClassTitle)
  const groups = groupByClass(filtered)

  return (
    <PageShell>
      <header className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Cuban Salsa — Couples</h1>
        <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">
          La Suerte Dance School · {COUPLES_COURSE.classes.length} classes ·{' '}
          {COUPLES_MOVES.length} partner moves
        </p>
      </header>

      <SalsaCourseSwitcher active="couples" />

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
          placeholder="Search a move — try “setenta”, “basila”, “sombrero”"
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-[#f5f5f5] placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-[#e53e3e]/50"
        />
      </div>

      {COUPLES_MOVES.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.classNumber}>
              <h2 className="text-[11px] uppercase tracking-widest text-[#fbbf24] mb-2">
                Class {group.classNumber} — {couplesClassTitle(group.classNumber)}
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
      )}

      <details className="mt-8 border-t border-white/5 pt-6">
        <summary className="cursor-pointer text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
          About this course ▸
        </summary>
        <div className="mt-4 space-y-2 text-xs text-[#707070]">
          {COUPLES_COURSE_FLAGS.map((flag) => (
            <p key={flag.id}>• {flag.text}</p>
          ))}
        </div>
      </details>
    </PageShell>
  )
}

/**
 * Shown while the move index is still being built out. It states what is
 * actually true rather than rendering an empty list that reads as a bug — the
 * clips and cues land per class range, mirroring the three spec files.
 */
function EmptyState() {
  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-white/5 p-6 text-sm text-[#a0a0a0]">
      <p className="text-[#f5f5f5] font-medium mb-2">Move index still being cut.</p>
      <p>
        All {COUPLES_COURSE.classes.length} classes are transcribed and chaptered, and
        the clip windows are chosen. The counted “slow” demos and the full-tempo
        clips are being cut from the source videos now, and moves appear here a
        class range at a time.
      </p>
      <p className="mt-3">
        The solo footwork course is complete in the meantime —{' '}
        <Link href="/salsa" className="text-[#e53e3e] hover:text-[#c53030]">
          Cuban Salsa — Solo Steps
        </Link>
        .
      </p>
    </div>
  )
}

function groupByClass(moves: SalsaMove[]): { classNumber: number; moves: SalsaMove[] }[] {
  const byClass = new Map<number, SalsaMove[]>()
  for (const move of moves) {
    // A move taught in both courses carries two sources; pick the couples one,
    // or this groups Enchufla under its solo class number.
    const source =
      move.sources.find((s) => s.course === 'couples') ?? move.sources[0]
    const classNum = source?.classNumber ?? 0
    if (!byClass.has(classNum)) byClass.set(classNum, [])
    byClass.get(classNum)!.push(move)
  }
  return Array.from(byClass.entries())
    .sort(([a], [b]) => a - b)
    .map(([classNumber, moves]) => ({ classNumber, moves }))
}

function MoveCard({ move, onClick }: { move: SalsaMove; onClick: () => void }) {
  const source = move.sources.find((s) => s.course === 'couples') ?? move.sources[0]
  const slow = source?.clips.slow
  const fast = source?.clips.fast
  const { lead, drillable } = roleSummary(move)

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
            {lead > 0 && (
              <span className="text-[10px] uppercase tracking-wide text-[#fbbf24] border border-[#fbbf24]/40 rounded px-1.5 py-0.5">
                {lead} lead
              </span>
            )}
            {!move.complete && <span className="text-[10px] text-[#fbbf24]">⚠ incomplete</span>}
          </div>
          <p className="text-sm text-[#a0a0a0] mt-0.5">{move.summary}</p>
          <div className="text-xs text-[#707070] mt-1 flex items-center gap-2 flex-wrap">
            <span>{drillable} cues</span>
            {slow ? (
              <span>· slow {Math.round(slow.end - slow.start)}s</span>
            ) : (
              <span className="text-[#fbbf24]">· no slow demo</span>
            )}
            {fast && <span>· fast {Math.round(fast.end - fast.start)}s</span>}
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

  // A move taught in both courses has two sources; this page shows the couples
  // one. Falling back to sources[0] keeps a couples-only move working if its
  // `course` field is ever wrong, rather than rendering "no teaching source".
  const source = move.sources.find((s) => s.course === 'couples') ?? move.sources[0]

  if (!source) {
    return (
      <PageShell>
        <button onClick={onBack} className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5] mb-4">
          ← All couples moves
        </button>
        <p className="text-[#a0a0a0]">No teaching source recorded for this move yet.</p>
      </PageShell>
    )
  }

  const classNum = source.classNumber
  const cls = COUPLES_COURSE.classes.find((c) => c.number === classNum)

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <button onClick={onBack} className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
            ← All couples moves
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
        </header>

        {/* `key` remounts the player per move so a Slow→Fast cycle restarts on
            the counted demo instead of carrying over mid-cycle. */}
        <SalsaClipPlayer
          key={move.id}
          clips={source.clips}
          aspect={source.clips.slow?.aspect ?? source.clips.fast?.aspect ?? '16/9'}
          tempoMode={tempoMode}
          onTempoChange={setTempoMode}
          muted={clipMuted}
          onMutedChange={setClipMuted}
          classNum={classNum}
        />

        {/* Leading comes first: it is what makes a partner figure work. */}
        <CueBlock
          title="Leading"
          subtitle="The hand signals and body cues that make the figure happen."
          cues={move.cues.filter((c) => c.kind === 'lead')}
          emphasise
          classNumber={classNum}
        />

        <CueBlock
          title="Leader — footwork & arms"
          cues={move.cues.filter(
            (c) => c.role === 'leader' && c.kind !== 'lead' && DRILLABLE_CUE_KINDS.includes(c.kind),
          )}
          classNumber={classNum}
        />

        <CueBlock
          title="Follower — footwork & arms"
          cues={move.cues.filter(
            (c) =>
              c.role === 'follower' && c.kind !== 'lead' && DRILLABLE_CUE_KINDS.includes(c.kind),
          )}
          classNumber={classNum}
        />

        <CueBlock
          title="Both"
          subtitle="Genuinely role-independent instructions — not a merge of the two."
          cues={move.cues.filter(
            (c) => c.role === 'both' && c.kind !== 'lead' && DRILLABLE_CUE_KINDS.includes(c.kind),
          )}
          classNumber={classNum}
        />

        {/* Footwork */}
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

        {/* Watch the class — the long grain (R2) and the R3 "check it yourself" link. */}
        <section className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">
            Watch the class
          </h2>
          <div className="flex items-center gap-3 flex-wrap text-xs">
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
          {source.note && <p className="text-xs text-[#707070] mt-3">{source.note}</p>}
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
  classNumber,
}: {
  title: string
  subtitle?: string
  cues: SalsaCue[]
  emphasise?: boolean
  classNumber: number
}) {
  if (cues.length === 0) return null
  return (
    <section
      className={`mt-6 rounded-xl border p-6 ${
        emphasise
          ? 'bg-[#1f1a12] border-[#fbbf24]/25'
          : 'bg-[#1a1a1a] border-white/5'
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
          <CueItem key={cue.id} cue={cue} classNumber={classNumber} />
        ))}
      </div>
    </section>
  )
}

function CueItem({ cue, classNumber }: { cue: SalsaCue; classNumber: number }) {
  const beatLabel = cue.beat
    ? `Beat ${cue.beat}`
    : cue.beats
      ? `Beats ${cue.beats.join(', ')}`
      : '—'
  // Resolve the class from the cue's own source video, not the move's, because a
  // cue can legitimately be drawn from a different class than the one that
  // teaches the move (an earlier class introducing the hold, say).
  const cueClass =
    COUPLES_COURSE.classes.find((c) => c.videoId === cue.sourceVideo)?.number ?? classNumber

  return (
    <div className="text-sm">
      <div className="flex items-start gap-3">
        <span className="shrink-0 font-mono text-xs text-[#707070] w-14">{beatLabel}</span>
        <div className="flex-1">
          <p className="text-[#e0e0e0]">
            {cue.role !== 'both' && (
              <span className="text-[10px] uppercase tracking-wide text-[#707070] mr-2">
                {cue.role}
              </span>
            )}
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
            Class {cueClass} @ {formatTime(cue.sourceStart)} ↗
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Links to another couples move. A `composedOf` or `base` id may legitimately
 * point at a solo-course move (Enchufla is taught in both), so an id that is not
 * in this course links across to /salsa instead of rendering as dead text.
 */
function MoveLink({ id }: { id: string }) {
  const move = COUPLES_MOVES.find((m) => m.id === id)
  if (move) {
    return (
      <Link
        href={`/salsa/couples?move=${id}`}
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
