'use client'

// /salsa/intermediate/couples — 22 intermediate partner moves plus 4 multi-move
// sequences, from the same channel as the other three courses.
//
// **This course has no classes.** It is not a numbered progression: it is a
// playlist of individually-titled move videos, and the channel never numbers
// them. Three consequences run through this file:
//
//   1. **Nothing renders "Class 13."** `TeachingSource.classNumber` is a required
//      field, so the data puts playlist position in it; this page labels that
//      "Position 13" and never the word Class. `SalsaClipPlayer` takes the label
//      as a string precisely so this page can say something true.
//   2. **No per-segment deep links.** There is no `ClassSegment` data for this
//      course — `segmentIds` on each source names segments no module defines, and
//      positions 2-7 carry an empty array. `youtubeLink(videoId, teachStart)` is
//      the only deep link this course can honestly offer, so that is the only one
//      rendered. Looking the ids up would silently render nothing.
//   3. **No grouping.** The index is one flat list in playlist order, with the 4
//      sequences separated out at the end, because a sequence is several moves and
//      is learned after them.
//
// Otherwise this follows /salsa/couples: leader cues first because a figure you
// cannot lead is not learnable, leader and follower never merged into one block
// (charter R4), and no drill mode — the drill assumes one 8-count of solo
// footwork per slot and stores one cursor, so partner figures from a second
// course would both mis-time the slots and interleave progress.
//
// Every move here is clipped, but the incomplete rendering path stays. It is not
// dead code kept out of sentiment: `complete: false` plus a `missingReason` is how
// this data set says "no clip yet", and the six moves that used to take that path
// were only finished last. The next course to be added will arrive the same way.

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  INT_COUPLES_MOVES,
  INT_COUPLES_SEQUENCE_IDS,
  INT_COUPLES_COURSE_CAVEATS,
  intCouplesMoveName,
} from '@/data/salsa-int-couples'
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

export default function SalsaIntermediateCouplesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <IntCouplesContent />
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
          Intermediate Salsa — Couples
        </h1>
        <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">Loading...</p>
      </header>
    </PageShell>
  )
}

function IntCouplesContent() {
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
    const move = INT_COUPLES_MOVES.find((m) => m.id === moveId)
    if (move) {
      return <DetailView move={move} onBack={() => navigate({ move: null })} />
    }
    // Unknown id: fall through to the index rather than rendering a blank detail
    // view. Deliberately not calling `navigate` here — that mutates history during
    // render and would fight the `move` param on the first paint.
  }

  return <IndexView queryString={queryString} onNavigate={navigate} />
}

// ============================================================================
// Index
// ============================================================================

/** This course's teaching source for a move, or the first as a fallback. */
function intCouplesSource(move: SalsaMove) {
  return move.sources.find((s) => s.course === 'int-couples') ?? move.sources[0]
}

/** Playlist position, used for ordering and for the "Position N" label. */
function position(move: SalsaMove): number {
  return intCouplesSource(move)?.classNumber ?? Infinity
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

  // `intCouplesMoveName` is the class-title argument searchMoves expects. It maps
  // a playlist position to the move's own name here, since there are no class
  // titles — so a position number is still searchable.
  const filtered = searchMoves(query, INT_COUPLES_MOVES, intCouplesMoveName)
  const moves = filtered
    .filter((m) => !INT_COUPLES_SEQUENCE_IDS.has(m.id))
    .sort((a, b) => position(a) - position(b))
  const sequences = filtered
    .filter((m) => INT_COUPLES_SEQUENCE_IDS.has(m.id))
    .sort((a, b) => position(a) - position(b))

  return (
    <PageShell>
      <header className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Intermediate Salsa — Couples
        </h1>
        <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">
          La Suerte Dance School ·{' '}
          {INT_COUPLES_MOVES.length - INT_COUPLES_SEQUENCE_IDS.size} partner moves ·{' '}
          {INT_COUPLES_SEQUENCE_IDS.size} sequences
        </p>
      </header>

      <SalsaCourseSwitcher active="int-couples" />

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
          placeholder="Search a move — try “setenta”, “sombrero”, “montaña”"
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-[#f5f5f5] placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-[#e53e3e]/50"
        />
      </div>

      {moves.length > 0 && (
        <section>
          <h2 className="text-[11px] uppercase tracking-widest text-[#fbbf24] mb-2">
            Partner moves — playlist order
          </h2>
          <div className="space-y-2">
            {moves.map((move) => (
              <MoveCard
                key={move.id}
                move={move}
                onClick={() => onNavigate({ move: move.id, q: null })}
              />
            ))}
          </div>
        </section>
      )}

      {sequences.length > 0 && (
        <section className="mt-6">
          <h2 className="text-[11px] uppercase tracking-widest text-[#fbbf24] mb-2">
            Sequences — several moves combined
          </h2>
          <div className="space-y-2">
            {sequences.map((move) => (
              <MoveCard
                key={move.id}
                move={move}
                onClick={() => onNavigate({ move: move.id, q: null })}
              />
            ))}
          </div>
        </section>
      )}

      <details className="mt-8 border-t border-white/5 pt-6">
        <summary className="cursor-pointer text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
          About this course ▸
        </summary>
        <div className="mt-4 space-y-2 text-xs text-[#707070]">
          {INT_COUPLES_COURSE_CAVEATS.map((caveat) => (
            <p key={caveat.id}>• {caveat.text}</p>
          ))}
        </div>
      </details>
    </PageShell>
  )
}

function MoveCard({ move, onClick }: { move: SalsaMove; onClick: () => void }) {
  const source = intCouplesSource(move)
  const slow = source?.clips.slow
  const fast = source?.clips.fast
  const lead = move.cues.filter((c) => c.kind === 'lead').length
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
            {lead > 0 && (
              <span className="text-[10px] uppercase tracking-wide text-[#fbbf24] border border-[#fbbf24]/40 rounded px-1.5 py-0.5">
                {lead} lead
              </span>
            )}
            {!move.complete && (
              <span className="text-[10px] text-[#fbbf24]">⚠ no clip yet</span>
            )}
          </div>
          <p className="text-sm text-[#a0a0a0] mt-0.5">{move.summary}</p>
          <div className="text-xs text-[#707070] mt-1 flex items-center gap-2 flex-wrap">
            <span>{drillable} cues</span>
            {slow && <span>· slow {Math.round(slow.end - slow.start)}s</span>}
            {fast && <span>· fast {Math.round(fast.end - fast.start)}s</span>}
            {!slow && !fast && <span className="text-[#fbbf24]">· cues only</span>}
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

  const source = intCouplesSource(move)

  if (!source) {
    return (
      <PageShell>
        <button
          onClick={onBack}
          className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5] mb-4"
        >
          ← All intermediate couples moves
        </button>
        <p className="text-[#a0a0a0]">No teaching source recorded for this move yet.</p>
      </PageShell>
    )
  }

  const isSequence = INT_COUPLES_SEQUENCE_IDS.has(move.id)

  return (
    <PageShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <button onClick={onBack} className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
            ← All intermediate couples moves
          </button>
          <span className="text-xs text-[#707070]">
            Position {source.classNumber} · {isSequence ? 'sequence' : move.kind}
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

        {/* `key` remounts the player per move so a Slow→Fast cycle restarts on the
            counted demo instead of carrying over mid-cycle. Where both clips are
            null the player renders `missingReason` in place of the video. */}
        <SalsaClipPlayer
          key={move.id}
          clips={source.clips}
          aspect={source.clips.slow?.aspect ?? source.clips.fast?.aspect ?? '16/9'}
          tempoMode={tempoMode}
          onTempoChange={setTempoMode}
          muted={clipMuted}
          onMutedChange={setClipMuted}
          origin={`Position ${source.classNumber}`}
        />

        {/* Leading comes first: it is what makes a partner figure work. */}
        <CueBlock
          title="Leading"
          subtitle="The hand signals and body cues that make the figure happen."
          cues={move.cues.filter((c) => c.kind === 'lead')}
          emphasise
        />

        <CueBlock
          title="Leader — footwork & arms"
          cues={move.cues.filter(
            (c) =>
              c.role === 'leader' &&
              c.kind !== 'lead' &&
              DRILLABLE_CUE_KINDS.includes(c.kind),
          )}
        />

        <CueBlock
          title="Follower — footwork & arms"
          cues={move.cues.filter(
            (c) =>
              c.role === 'follower' &&
              c.kind !== 'lead' &&
              DRILLABLE_CUE_KINDS.includes(c.kind),
          )}
        />

        <CueBlock
          title="Both"
          subtitle="Genuinely role-independent instructions — not a merge of the two."
          cues={move.cues.filter(
            (c) =>
              c.role === 'both' &&
              c.kind !== 'lead' &&
              DRILLABLE_CUE_KINDS.includes(c.kind),
          )}
        />

        <CueBlock
          title="Styling & context"
          cues={move.cues.filter((c) =>
            ['styling', 'body-movement', 'concept', 'context', 'musicality'].includes(
              c.kind,
            ),
          )}
        />

        <section className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">
            {isSequence ? 'The sequence' : 'Footwork'}
          </h2>
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

        {/* The long grain. One link only — see the note at the top of this file on
            why there are no per-segment links for this course. */}
        <section className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">
            Watch the video
          </h2>
          <a
            href={youtubeLink(source.videoId, source.teachStart)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#e53e3e] hover:text-[#c53030]"
          >
            Full teach block ↗
          </a>
          {source.note && <p className="text-xs text-[#707070] mt-3">{source.note}</p>}
          {!move.complete && (
            <p className="text-xs text-[#fbbf24] mt-3">
              ⚠ No clip has been cut for this move yet, so the cues above are the whole
              of what is here. Use the link to watch it in the class video. The cues and
              their timestamps are accurate; only the clips are missing.
            </p>
          )}
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
          {/* No class number in the label: this course has none. The timestamp and
              the link are what locate the cue. */}
          <a
            href={youtubeLink(cue.sourceVideo, cue.sourceStart)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#a0a0a0] hover:text-[#e53e3e] mt-1 inline-block"
          >
            Source @ {formatTime(cue.sourceStart)} ↗
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Links to another move. A `composedOf` id usually points at a beginners couples
 * move (Setenta Complicado is built on Setenta, Casino con Estilo on Dile que no
 * and Guapea), so an id not in this course links across to /salsa/couples rather
 * than rendering as dead text.
 */
function MoveLink({ id }: { id: string }) {
  const move = INT_COUPLES_MOVES.find((m) => m.id === id)
  if (move) {
    return (
      <Link
        href={`/salsa/intermediate/couples?move=${id}`}
        className="text-[#e53e3e] hover:text-[#c53030] hover:underline"
      >
        {move.name}
      </Link>
    )
  }
  return (
    <Link
      href={`/salsa/couples?move=${id}`}
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
