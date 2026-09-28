'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import {
  SALSA_MOVES,
  STEPS_COURSE,
  MUSIC_TRACKS,
  COURSE_FLAGS,
  youtubeLink,
  DRILLABLE_CUE_KINDS,
  type SalsaMove,
  type SalsaCue,
} from '@/data/salsa-steps'
import { searchMoves } from '@/lib/salsa-search'
import { mediaUrl } from '@/lib/media'
import { useTempoMode } from '@/lib/salsa-tempo'
import { SalsaClipPlayer } from '@/components/SalsaClipPlayer'
import { SalsaCourseSwitcher } from '@/components/SalsaCourseSwitcher'
import {
  buildDrill,
  advanceCursor,
  getCursorFromStorage,
  type DrillSlot,
} from '@/lib/salsa-drill'
import {
  unlockAudio,
  tick,
  startChime,
  switchChime,
  finishChime,
  say,
} from '@/lib/cues'


type DrillStatus = 'idle' | 'running' | 'paused' | 'done'
type DrillPhase = 'leadIn' | 'slow' | 'fast'

// Get class title by number.
function getClassTitle(n: number): string {
  const c = STEPS_COURSE.classes.find((cl) => cl.number === n)
  return c?.title ?? `Class ${n}`
}

export default function SalsaPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SalsaContent />
    </Suspense>
  )
}

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Cuban Salsa — Solo Steps</h1>
          <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">Loading...</p>
        </header>
      </div>
    </main>
  )
}

function SalsaContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const mode = searchParams.get('mode')
  const moveId = searchParams.get('move')
  const queryString = searchParams.get('q') ?? ''

  // Navigate by updating query string with history.replaceState (instant, no server round-trip).
  const navigate = useCallback(
    (params: Record<string, string | null>) => {
      const sp = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(params)) {
        if (value === null) sp.delete(key)
        else sp.set(key, value)
      }
      const newUrl = `${pathname}?${sp.toString()}`
      router.replace(newUrl)
    },
    [searchParams, pathname, router],
  )

  if (mode === 'drill') {
    return <DrillView onExit={() => navigate({ mode: null })} />
  }

  if (moveId) {
    const move = SALSA_MOVES.find((m) => m.id === moveId)
    if (!move) {
      navigate({ move: null })
      return <IndexView queryString={queryString} onNavigate={navigate} />
    }
    return <DetailView move={move} onBack={() => navigate({ move: null })} />
  }

  return <IndexView queryString={queryString} onNavigate={navigate} />
}

// ============================================================================
// Index view — search + list
// ============================================================================

function IndexView({
  queryString,
  onNavigate,
}: {
  queryString: string
  onNavigate: (params: Record<string, string | null>) => void
}) {
  const [query, setQuery] = useState(queryString)
  const [filter, setFilter] = useState<string>('all')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Autofocus search on desktop only.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      searchInputRef.current?.focus()
    }
  }, [])

  const filtered = searchMoves(query, SALSA_MOVES, getClassTitle)
  const groups = groupMoves(filtered, filter)

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Cuban Salsa — Solo Steps</h1>
          <p className="text-[#a0a0a0] mt-1 text-sm md:text-base">
            La Suerte Dance School · {STEPS_COURSE.classes.length} classes ·{' '}
            {SALSA_MOVES.length} steps
          </p>
        </header>

        {/* Search box */}
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
            placeholder="Search a step — try “exib”, “3 2 1”, “charanga”"
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-[#f5f5f5] placeholder:text-[#707070] focus:outline-none focus:ring-2 focus:ring-[#e53e3e]/50"
          />
        </div>

        {/* Drill button */}
        <div className="mb-6 flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => onNavigate({ mode: 'drill', minutes: '10' })}
            className="bg-[#e53e3e] hover:bg-[#c53030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium text-white"
          >
            ▶ 10-minute drill
          </button>
          <button
            onClick={() => onNavigate({ mode: 'drill', minutes: '5' })}
            className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
          >
            5 min
          </button>
          <span className="text-[#5a5a5a]">·</span>
          <button
            onClick={() => onNavigate({ mode: 'drill', minutes: '15' })}
            className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
          >
            15 min
          </button>
        </div>

        {/* Filter chips */}
        <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
          {['all', 'basics', 'turns', 'crosses', 'footworks', 'skills', 'drills'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
                filter === f
                  ? 'border-[#e53e3e]/50 text-[#f5f5f5] bg-[#e53e3e]/10'
                  : 'border-white/10 text-[#707070] hover:text-[#a0a0a0]'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <SalsaCourseSwitcher active="steps" />

        {/* Move list, grouped by class */}
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.label}>
              <h2 className="text-[11px] uppercase tracking-widest text-[#fbbf24] mb-2">
                {group.label}
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

        {/* About this course */}
        <details className="mt-8 border-t border-white/5 pt-6">
          <summary className="cursor-pointer text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
            About this course ▸
          </summary>
          <div className="mt-4 space-y-2 text-xs text-[#707070]">
            {COURSE_FLAGS.map((flag) => (
              <p key={flag.id}>• {flag.text}</p>
            ))}
          </div>
        </details>
      </div>
    </main>
  )
}

function MoveCard({ move, onClick }: { move: SalsaMove; onClick: () => void }) {
  const classNum = move.sources[0]?.classNumber ?? 0
  const slow = move.sources[0]?.clips.slow
  const fast = move.sources[0]?.clips.fast
  const drillableCues = move.cues.filter((c) => DRILLABLE_CUE_KINDS.includes(c.kind))

  // Completeness indicators (●○○◌ pattern).
  const hasLong = move.sources.length > 0
  const hasSlow = slow !== null
  const hasFast = fast !== null
  const hasCues = drillableCues.length > 0
  const indicators = [hasLong, hasSlow, hasFast, hasCues]
    .map((v, i) => (v ? (i < 2 ? '●' : '○') : '◌'))
    .join('')

  return (
    <button
      onClick={onClick}
      className="w-full bg-[#141414] hover:bg-[#1a1a1a] border border-white/5 hover:border-white/10 rounded-lg p-3 text-left transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 text-xs text-[#707070] font-mono">{classNum}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium">{move.name}</span>
            <span className="text-[10px] uppercase tracking-wide text-[#a0a0a0] border border-white/10 rounded px-1.5 py-0.5">
              {move.kind}
            </span>
            {!move.complete && (
              <span className="text-[10px] text-[#fbbf24]">⚠ incomplete</span>
            )}
          </div>
          <p className="text-sm text-[#a0a0a0] mt-0.5">{move.summary}</p>
          <div className="text-xs text-[#707070] mt-1 flex items-center gap-2 flex-wrap">
            <span className="font-mono">{indicators}</span>
            <span>{drillableCues.length} cues</span>
            {slow && <span>slow {Math.round(slow.end - slow.start)}s</span>}
            {fast && <span>· fast {Math.round(fast.end - fast.start)}s</span>}
            {slow?.caveat && <span className="text-[#fbbf24]">⚠ {slow.caveat.slice(0, 30)}...</span>}
            {fast?.caveat && <span className="text-[#fbbf24]">⚠ {fast.caveat.slice(0, 30)}...</span>}
          </div>
        </div>
      </div>
    </button>
  )
}

function groupMoves(moves: SalsaMove[], filter: string): { label: string; moves: SalsaMove[] }[] {
  let filtered = moves
  if (filter !== 'all') {
    const groupMap: Record<string, string> = {
      basics: 'basics',
      turns: 'turns',
      crosses: 'crosses',
      footworks: 'footwork',
      skills: 'skill',
      drills: 'body-movement',
    }
    const targetGroup = groupMap[filter]
    filtered = moves.filter(
      (m) => m.group === targetGroup || (filter === 'footworks' && m.kind === 'footwork') || (filter === 'skills' && m.kind === 'skill') || (filter === 'drills' && m.kind === 'body-movement'),
    )
  }

  // Group by class, preserving playlist order.
  const byClass = new Map<number, SalsaMove[]>()
  for (const move of filtered) {
    const classNum = move.sources[0]?.classNumber ?? 0
    if (!byClass.has(classNum)) byClass.set(classNum, [])
    byClass.get(classNum)!.push(move)
  }

  return Array.from(byClass.entries())
    .sort(([a], [b]) => a - b)
    .map(([classNum, moves]) => ({
      label: `CLASS ${classNum} ${' '.repeat(60)}`.slice(0, 60).padEnd(60, '─'),
      moves,
    }))
}

// ============================================================================
// Detail view — one move
// ============================================================================

function DetailView({ move, onBack }: { move: SalsaMove; onBack: () => void }) {
  // Shared and persisted, not local: see the note at the top of salsa-tempo.ts.
  // Choosing "Slow" has to survive moving to the next move, or you re-pick it
  // 22 times.
  const [tempoMode, setTempoMode] = useTempoMode()
  const [clipMuted, setClipMuted] = useState(false)
  const [showMoreCues, setShowMoreCues] = useState(false)

  const source = move.sources[0]
  if (!source) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5] mb-4"
          >
            ← All steps
          </button>
          <p className="text-[#a0a0a0]">No teaching source available for this move.</p>
        </div>
      </main>
    )
  }

  const classNum = source.classNumber

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <button onClick={onBack} className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
            ← All steps
          </button>
          <span className="text-xs text-[#707070]">
            Class {classNum} · {move.kind}
          </span>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">{move.name}</h1>
          {move.aliases.length > 0 && (
            <p className="text-sm text-[#a0a0a0] mt-1">
              also: {move.aliases.slice(0, 3).join(' · ')}
            </p>
          )}
        </header>

        {/* Video player. `key` remounts it per move so a Slow→Fast cycle
            restarts at the counted demo rather than carrying over. */}
        <SalsaClipPlayer
          key={move.id}
          clips={source.clips}
          aspect={source.clips.slow?.aspect ?? source.clips.fast?.aspect ?? '16/9'}
          tempoMode={tempoMode}
          onTempoChange={setTempoMode}
          muted={clipMuted}
          onMutedChange={setClipMuted}
          origin={`Class ${classNum}`}
        />

        {/* Cues */}
        <div className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">Cues</h2>
          <BeatStrip move={move} />
          <CueSections move={move} drillableOnly={false} />
          {move.cues.some((c) => !DRILLABLE_CUE_KINDS.includes(c.kind)) && (
            <details
              open={showMoreCues}
              onToggle={(e) => setShowMoreCues(e.currentTarget.open)}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <summary className="cursor-pointer text-xs text-[#a0a0a0] hover:text-[#f5f5f5]">
                ▸ More from this class (styling · context)
              </summary>
              <div className="mt-4">
                <CueSections move={move} drillableOnly={false} stylingOnly />
              </div>
            </details>
          )}
        </div>

        {/* Footwork */}
        <div className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">Footwork</h2>
          <p className="text-sm text-[#e0e0e0]">{move.footwork}</p>
          {move.base && (
            <p className="text-xs text-[#a0a0a0] mt-2">
              Built on: <MoveLink id={move.base} />
            </p>
          )}
          {move.composedOf && move.composedOf.length > 0 && (
            <p className="text-xs text-[#a0a0a0] mt-2">
              Composed of: {move.composedOf.map((id, i) => (
                <span key={id}>
                  {i > 0 && ' + '}
                  <MoveLink id={id} />
                </span>
              ))}
            </p>
          )}
          {move.exceptions && move.exceptions.length > 0 && (
            <div className="mt-3 space-y-1">
              {move.exceptions.map((ex, i) => (
                <p key={i} className="text-xs text-[#fbbf24]">
                  ⚠ {ex.text} → Overrides <MoveLink id={ex.overrides} />
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Watch the class */}
        <div className="mt-6 bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
          <h2 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4">
            Watch the class
          </h2>
          <div className="flex items-center gap-3 flex-wrap text-xs">
            {source.segmentIds.map((segId) => {
              const seg = STEPS_COURSE.classes
                .find((c) => c.number === classNum)
                ?.segments.find((s) => s.id === segId)
              if (!seg) return null
              const videoId = STEPS_COURSE.classes.find((c) => c.number === classNum)?.videoId
              if (!videoId) return null
              return (
                <a
                  key={segId}
                  href={youtubeLink(videoId, seg.start)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e53e3e] hover:text-[#c53030]"
                >
                  {seg.role} {formatTime(seg.start)} ↗
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

function MoveLink({ id }: { id: string }) {
  const move = SALSA_MOVES.find((m) => m.id === id)
  if (!move) return <span className="text-[#707070]">{id}</span>
  return (
    <a
      href={`/salsa?move=${id}`}
      className="text-[#e53e3e] hover:text-[#c53030] hover:underline"
    >
      {move.name}
    </a>
  )
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function BeatStrip({ move }: { move: SalsaMove }) {
  const beatMap = new Map<number, SalsaCue[]>()
  for (const cue of move.cues) {
    if (cue.beat) {
      if (!beatMap.has(cue.beat)) beatMap.set(cue.beat, [])
      beatMap.get(cue.beat)!.push(cue)
    } else if (cue.beats) {
      for (const b of cue.beats) {
        if (!beatMap.has(b)) beatMap.set(b, [])
        beatMap.get(b)!.push(cue)
      }
    }
  }

  // Moves that fill beats 4 and 8 (not pauses): tapping, tapping-on-8, mambo-cubano, charanga, three-two-one.
  const fillsPauses = [
    'tapping',
    'tapping-on-8',
    'mambo-cubano',
    'charanga',
    'three-two-one',
  ].includes(move.id)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs text-[#707070] mb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((beat) => {
          const isPause = !fillsPauses && (beat === 4 || beat === 8)
          return (
            <div key={beat} className="text-center w-8">
              <div className={isPause ? 'opacity-30' : ''}>{beat}</div>
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((beat) => {
          const cues = beatMap.get(beat) ?? []
          const hasLead = cues.some((c) => c.kind === 'lead' || c.kind === 'arms')
          const hasCue = cues.length > 0
          const isPause = !fillsPauses && (beat === 4 || beat === 8)
          return (
            <div key={beat} className="w-8 h-8 grid place-items-center">
              {hasCue ? (
                <div
                  className={`text-2xl ${isPause ? 'opacity-30' : ''} ${
                    hasLead ? 'text-[#fbbf24]' : 'text-[#e53e3e]'
                  }`}
                >
                  {hasLead ? '◆' : '●'}
                </div>
              ) : (
                <div className={`text-2xl ${isPause ? 'opacity-10' : 'opacity-20'} text-[#a0a0a0]`}>
                  ◌
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CueSections({
  move,
  drillableOnly,
  stylingOnly = false,
}: {
  move: SalsaMove
  drillableOnly: boolean
  stylingOnly?: boolean
}) {
  const leaderCues = move.cues.filter((c) => c.role === 'leader')
  const followerCues = move.cues.filter((c) => c.role === 'follower')
  const bothCues = move.cues.filter((c) => c.role === 'both')

  const filterCues = (cues: SalsaCue[]) => {
    if (stylingOnly) {
      return cues.filter((c) => !DRILLABLE_CUE_KINDS.includes(c.kind))
    }
    if (drillableOnly) {
      return cues.filter((c) => DRILLABLE_CUE_KINDS.includes(c.kind))
    }
    return cues.filter((c) => DRILLABLE_CUE_KINDS.includes(c.kind))
  }

  const leader = filterCues(leaderCues)
  const follower = filterCues(followerCues)
  const both = filterCues(bothCues)

  return (
    <div className="space-y-6">
      {leader.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-3">Leader</h3>
          <div className="space-y-3">
            {leader.map((cue, i) => (
              <CueItem key={i} cue={cue} />
            ))}
          </div>
        </div>
      )}
      {follower.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-3">Follower</h3>
          <div className="space-y-3">
            {follower.map((cue, i) => (
              <CueItem key={i} cue={cue} />
            ))}
          </div>
        </div>
      )}
      {both.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-3">Both</h3>
          <div className="space-y-3">
            {both.map((cue, i) => (
              <CueItem key={i} cue={cue} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CueItem({ cue }: { cue: SalsaCue }) {
  const beatLabel = cue.beat
    ? `Beat ${cue.beat}`
    : cue.beats
      ? `Beats ${cue.beats.join(', ')}`
      : '—'
  const classNum = STEPS_COURSE.classes.find((c) =>
    c.videoId === cue.sourceVideo
  )?.number ?? 0

  return (
    <div className="text-sm">
      <div className="flex items-start gap-3">
        <span className="shrink-0 font-mono text-xs text-[#707070] w-12">{beatLabel}</span>
        <div className="flex-1">
          <p className="text-[#e0e0e0]">
            {cue.text}
            {cue.confidence === 'suspect' && (
              <span className="ml-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-[#fbbf24] border border-[#fbbf24]/50 rounded px-1.5 py-0.5">
                Unverified
              </span>
            )}
          </p>
          {cue.warning && (
            <p className="text-xs text-[#fbbf24] mt-1">⚠ {cue.warning}</p>
          )}
          <a
            href={youtubeLink(cue.sourceVideo, cue.sourceStart)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#a0a0a0] hover:text-[#e53e3e] mt-1 inline-block"
          >
            Class {classNum} @ {formatTime(cue.sourceStart)} ↗
          </a>
        </div>
      </div>
    </div>
  )
}


// ============================================================================
// Drill view — timed session, reuses posture timer machinery
// ============================================================================

function DrillView({ onExit }: { onExit: () => void }) {
  const searchParams = useSearchParams()
  const minutes = parseInt(searchParams.get('minutes') ?? '10', 10)

  const [status, setStatus] = useState<DrillStatus>('idle')
  const [slotIndex, setSlotIndex] = useState(0)
  const [phase, setPhase] = useState<DrillPhase>('leadIn')
  const [remaining, setRemaining] = useState(0)
  const [muteVoice, setMuteVoice] = useState(false)
  const [trackId, setTrackId] = useState<string>(MUSIC_TRACKS[0].id)
  // CRITICAL: music defaults to OFF for salsa drill, because the clip's spoken
  // count is the metronome. This is the opposite of the posture/stretching pages.
  const [musicOn, setMusicOn] = useState(false)
  const musicRef = useRef<HTMLAudioElement>(null)

  const [drillSlots] = useState(() => buildDrill(minutes, SALSA_MOVES, getCursorFromStorage))

  const track = MUSIC_TRACKS.find((t) => t.id === trackId) ?? MUSIC_TRACKS[0]

  // Latest-value refs, so the setInterval callback reads current state instead
  // of the values captured when it was created. Assigned in an effect rather
  // than during render: a render can be thrown away or replayed, and mutating a
  // ref while rendering makes the tick observe state that was never committed.
  const statusRef = useRef(status)
  const slotIndexRef = useRef(slotIndex)
  const phaseRef = useRef(phase)
  const remainingRef = useRef(remaining)
  const muteVoiceRef = useRef(muteVoice)
  useEffect(() => {
    statusRef.current = status
    slotIndexRef.current = slotIndex
    phaseRef.current = phase
    remainingRef.current = remaining
    muteVoiceRef.current = muteVoice
  }, [status, slotIndex, phase, remaining, muteVoice])

  const slot = drillSlots[slotIndex]
  const nextSlot = drillSlots[slotIndex + 1]

  const speak = useCallback((text: string) => {
    if (!muteVoiceRef.current) say(text)
  }, [])

  // Background music follows the timer.
  useEffect(() => {
    const a = musicRef.current
    if (!a) return
    if (musicOn && status === 'running') {
      void a.play().catch(() => {})
    } else {
      a.pause()
      if (status === 'idle' || status === 'done') a.currentTime = 0
    }
  }, [musicOn, status, trackId])

  const beginSlot = useCallback(
    (idx: number) => {
      if (idx >= drillSlots.length) {
        setStatus('done')
        finishChime()
        speak('All done. Great work.')
        // Advance the cursor so the next session continues from here.
        advanceCursor(drillSlots.length)
        return
      }
      const slot = drillSlots[idx]
      setSlotIndex(idx)
      setPhase('leadIn')
      setRemaining(10)
      startChime()
      speak(slot.move.name)
      // Speak up to 3 cues during the lead-in.
      slot.cues.slice(0, 3).forEach((cue, i) => {
        window.setTimeout(() => {
          if (statusRef.current === 'running') speak(cue.text)
        }, (i + 1) * 2000)
      })
    },
    [drillSlots, speak],
  )

  const tickSecond = useCallback(() => {
    const cur = remainingRef.current
    const ph = phaseRef.current
    const idx = slotIndexRef.current

    if (cur > 1) {
      setRemaining(cur - 1)
      if (cur <= 3) tick()
      return
    }

    // Phase transition.
    if (ph === 'leadIn') {
      setPhase('slow')
      setRemaining(30)
      return
    }
    if (ph === 'slow') {
      setPhase('fast')
      setRemaining(30)
      switchChime()
      return
    }
    // Slot complete — move to next.
    beginSlot(idx + 1)
  }, [beginSlot])

  useEffect(() => {
    if (status !== 'running') return
    const id = window.setInterval(tickSecond, 1000)
    return () => window.clearInterval(id)
  }, [status, tickSecond])

  const start = () => {
    unlockAudio()
    setStatus('running')
    beginSlot(0)
  }

  const pause = () => setStatus('paused')
  const resume = () => setStatus('running')

  const reset = () => {
    setStatus('idle')
    setSlotIndex(0)
    setPhase('leadIn')
    setRemaining(0)
  }

  const skip = () => {
    const idx = slotIndexRef.current
    beginSlot(idx + 1)
  }

  // Stop speech on unmount.
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Wake lock.
  useEffect(() => {
    if (status !== 'running') return
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) return

    let lock: WakeLockSentinel | null = null
    let cancelled = false

    const acquire = async () => {
      try {
        lock = await navigator.wakeLock.request('screen')
      } catch {
        // Denied.
      }
    }

    const onVisible = () => {
      if (!cancelled && document.visibilityState === 'visible') void acquire()
    }

    void acquire()
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisible)
      void lock?.release().catch(() => {})
    }
  }, [status])

  const elapsed = slotIndex * 70 + (phase === 'leadIn' ? 10 - remaining : phase === 'slow' ? 10 + (30 - remaining) : 40 + (30 - remaining))
  const total = drillSlots.length * 70
  const overallPct = Math.min(100, (elapsed / total) * 100)

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <button onClick={onExit} className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5]">
            ← Leave drill
          </button>
          {status !== 'idle' && (
            <span className="text-xs text-[#707070]">
              Slot {slotIndex + 1} of {drillSlots.length} · ~{Math.round((total - elapsed) / 60)}{' '}
              min left
            </span>
          )}
        </header>

        {/* Background music */}
        <audio ref={musicRef} src={mediaUrl(track.src)} loop preload="none" />

        {/* Music picker */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setMusicOn((v) => !v)}
            className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
              musicOn
                ? 'border-[#e53e3e]/50 text-[#f5f5f5] bg-[#e53e3e]/10'
                : 'border-white/10 text-[#707070]'
            }`}
          >
            {musicOn ? '🎵 Music on' : '🔇 Music off (default)'}
          </button>
          <select
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            disabled={!musicOn}
            className="text-xs rounded-full px-3 py-1.5 bg-[#1a1a1a] border border-white/10 text-[#a0a0a0] disabled:opacity-40"
          >
            {MUSIC_TRACKS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {status === 'idle' && (
          <div className="text-center py-8">
            <button
              onClick={start}
              className="bg-[#e53e3e] hover:bg-[#c53030] active:scale-95 transition-all text-white text-xl font-bold rounded-full w-40 h-40 mx-auto grid place-items-center shadow-lg shadow-[#e53e3e]/20"
            >
              ▶ Start
            </button>
            <p className="text-[#707070] text-sm mt-4">
              {drillSlots.length} moves · ~{minutes} min
            </p>
          </div>
        )}

        {(status === 'running' || status === 'paused') && slot && (
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6">
            {/* Overall progress */}
            <div className="mb-5">
              <div className="h-1.5 rounded-full bg-[#252525] overflow-hidden">
                <div
                  className="h-full bg-[#e53e3e] transition-all duration-300"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
            </div>

            {/* Clip — two videos, swap based on phase. AUDIO IS ON. */}
            <DrillClip slot={slot} phase={phase} status={status} />

            {/* Countdown ring */}
            <CountdownRing
              remaining={remaining}
              phase={phase}
              moveName={slot.move.name}
            />

            {/* Cues on screen for the whole slot */}
            <div className="mt-4 space-y-2">
              {slot.cues.map((cue, i) => {
                const beatLabel = cue.beat
                  ? `Beat ${cue.beat}`
                  : cue.beats
                    ? `Beats ${cue.beats.join(', ')}`
                    : ''
                return (
                  <p key={i} className="text-xs text-[#a0a0a0]">
                    {beatLabel && <span className="font-mono mr-2">{beatLabel}</span>}
                    {cue.text}
                  </p>
                )
              })}
            </div>

            {nextSlot && (
              <p className="text-center text-[#707070] text-xs mt-4">
                Next: {nextSlot.move.name}
              </p>
            )}

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {status === 'running' ? (
                <button
                  onClick={pause}
                  className="bg-[#252525] hover:bg-[#303030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
                >
                  ⏸ Pause
                </button>
              ) : (
                <button
                  onClick={resume}
                  className="bg-[#e53e3e] hover:bg-[#c53030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
                >
                  ▶ Resume
                </button>
              )}
              <button
                onClick={skip}
                className="bg-[#252525] hover:bg-[#303030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
              >
                ⏭ Skip
              </button>
              <button
                onClick={reset}
                className="bg-[#252525] hover:bg-[#303030] active:scale-95 transition-all rounded-full px-5 py-3 font-medium"
                aria-label="Reset drill"
              >
                ↺
              </button>
            </div>

            <button
              onClick={() => setMuteVoice((v) => !v)}
              className="block mx-auto mt-4 text-xs text-[#707070] hover:text-[#a0a0a0] transition-colors"
            >
              {muteVoice ? '🔇 Voice cues off' : '🔊 Voice cues on'}
            </button>
          </div>
        )}

        {status === 'done' && (
          <div className="bg-[#1a1a1a] rounded-2xl border border-green-600/30 p-8 text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold">Drill complete</h2>
            <p className="text-[#a0a0a0] mt-2">Great work. Next session continues from here.</p>
            <button
              onClick={reset}
              className="mt-6 bg-[#252525] hover:bg-[#303030] active:scale-95 transition-all rounded-full px-6 py-3 font-medium"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

function DrillClip({
  slot,
  phase,
  status,
}: {
  slot: DrillSlot
  phase: DrillPhase
  status: DrillStatus
}) {
  const slowRef = useRef<HTMLVideoElement>(null)
  const fastRef = useRef<HTMLVideoElement>(null)

  const clips = slot.move.sources[0]?.clips
  const slow = clips?.slow
  const fast = clips?.fast
  const showSlow = phase === 'leadIn' || phase === 'slow'
  const showFast = phase === 'fast'

  // Play/pause based on status and phase. This must run before the "no clips"
  // bail-out below: hooks have to be called in the same order on every render,
  // and an early return above it would skip this one whenever a move happened
  // to have no clips, changing the hook order mid-drill.
  useEffect(() => {
    const s = slowRef.current
    const f = fastRef.current
    if (status === 'running') {
      if (showSlow && s) void s.play().catch(() => {})
      else if (s) s.pause()
      if (showFast && f) void f.play().catch(() => {})
      else if (f) f.pause()
    } else {
      s?.pause()
      f?.pause()
    }
  }, [status, showSlow, showFast])

  if (!clips) return null

  const phaseLabel =
    phase === 'leadIn'
      ? 'GET READY'
      : phase === 'slow'
        ? 'SLOW · counted'
        : 'FULL TEMPO'

  return (
    <div className="relative rounded-xl overflow-hidden bg-black mb-5 aspect-video max-h-[42vh] mx-auto">
      {slow && (
        <video
          key={`slow-${slot.move.id}`}
          ref={slowRef}
          src={mediaUrl(slow.src)}
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-contain ${showSlow ? '' : 'hidden'}`}
        />
      )}
      {fast && (
        <video
          key={`fast-${slot.move.id}`}
          ref={fastRef}
          src={mediaUrl(fast.src)}
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-contain ${showFast ? '' : 'hidden'}`}
        />
      )}
      <div className="absolute top-4 right-4 bg-black/60 rounded px-2 py-1 text-xs font-semibold">
        {phaseLabel}
      </div>
    </div>
  )
}

function CountdownRing({
  remaining,
  phase,
  moveName,
}: {
  remaining: number
  phase: DrillPhase
  moveName: string
}) {
  const R = 130
  const C = 2 * Math.PI * R
  const total = phase === 'leadIn' ? 10 : 30
  const pct = ((total - remaining) / total) * 100
  const color = phase === 'leadIn' ? '#fbbf24' : '#e53e3e'

  return (
    <div className="relative w-[300px] h-[300px] max-w-full mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r={R} fill="none" stroke="#252525" strokeWidth="14" />
        <circle
          cx="150"
          cy="150"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C - (pct / 100) * C}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center px-8">
        <div>
          <div className="text-7xl font-bold tabular-nums">{remaining}</div>
          <div className="text-base font-semibold mt-1 text-[#a0a0a0]">{moveName}</div>
        </div>
      </div>
    </div>
  )
}
