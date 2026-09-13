// Name / alias search for salsa moves — R1 and Success test 1.
//
// Local, substring-based, no fuzzy matching, no debounce. Filtering runs on
// every keystroke over 22 objects. The alias list is what makes this work: the
// channel's own inconsistent spellings plus Whisper's phonetic manglings mean
// "exib" must hit Exhibela through the "exibela" alias, because Class 5 says
// "exibela" 10 times and "exhibela" zero.

import type { SalsaMove } from '@/data/salsa-steps'

/**
 * Normalise a string for comparison: lowercase, strip diacritics, collapse
 * whitespace, drop punctuation. So "3 2 1", "321" and "3-2-1" all match
 * "three-two-one".
 */
function normalise(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Build a searchable haystack for a move: name + every alias + kind + group +
 * class title. Built once at module load, not per keystroke.
 */
function buildHaystack(move: SalsaMove, classTitle: string): string {
  const parts = [
    move.name,
    ...move.aliases,
    move.kind,
    move.group ?? '',
    classTitle,
  ]
  return normalise(parts.join(' '))
}

/**
 * Rank: name prefix (0) → alias prefix (1) → word-start inside name/alias (2) →
 * substring anywhere (3). Ties break on playlist order (sources[0].classNumber).
 */
function rankMatch(needle: string, move: SalsaMove): number {
  const name = normalise(move.name)
  const aliases = move.aliases.map(normalise)

  if (name.startsWith(needle)) return 0
  for (const alias of aliases) {
    if (alias.startsWith(needle)) return 1
  }
  // Word-start match: the needle appears at the start of a word.
  const wordBoundaryRE = new RegExp(`\\b${needle}`, 'i')
  if (wordBoundaryRE.test(name)) return 2
  for (const alias of aliases) {
    if (wordBoundaryRE.test(alias)) return 2
  }
  // Substring match anywhere.
  return 3
}

/**
 * Search moves by name, alias, kind or group. Returns moves sorted by relevance,
 * then by playlist order. Empty query returns all moves in playlist order.
 */
export function searchMoves(
  query: string,
  moves: SalsaMove[],
  getClassTitle: (classNumber: number) => string,
): SalsaMove[] {
  const needle = normalise(query)
  if (!needle) {
    // No query: return all moves in playlist order.
    return [...moves].sort((a, b) => {
      const classA = a.sources[0]?.classNumber ?? Infinity
      const classB = b.sources[0]?.classNumber ?? Infinity
      return classA - classB
    })
  }

  // Filter: keep moves whose haystack contains the needle.
  const matched = moves.filter((m) => {
    const classTitle = getClassTitle(m.sources[0]?.classNumber ?? 0)
    const haystack = buildHaystack(m, classTitle)
    return haystack.includes(needle)
  })

  // Sort by rank, then by playlist order.
  return matched.sort((a, b) => {
    const rankA = rankMatch(needle, a)
    const rankB = rankMatch(needle, b)
    if (rankA !== rankB) return rankA - rankB
    const classA = a.sources[0]?.classNumber ?? Infinity
    const classB = b.sources[0]?.classNumber ?? Infinity
    return classA - classB
  })
}
