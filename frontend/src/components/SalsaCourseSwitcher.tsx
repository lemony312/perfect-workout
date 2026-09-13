// Switch between the two salsa courses.
//
// Its own component rather than an export from either page, so neither page has
// to import the other's module — a `page.tsx` importing a sibling `page.tsx`
// drags that whole route's tree into this route's bundle.
//
// Nothing about the tempo preference is carried in the href on purpose: it lives
// in localStorage (see `salsa-tempo.ts`), so slow-vs-full-tempo survives moving
// between the courses, and a copied link doesn't pin someone else to your choice.
import Link from 'next/link'

export function SalsaCourseSwitcher({ active }: { active: 'steps' | 'couples' }) {
  const base =
    'text-xs rounded-full px-3 py-1.5 border transition-colors whitespace-nowrap'
  const on = 'border-[#e53e3e]/50 text-[#f5f5f5] bg-[#e53e3e]/10'
  const off = 'border-white/10 text-[#707070] hover:text-[#a0a0a0]'
  return (
    <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
      <Link href="/salsa" className={`${base} ${active === 'steps' ? on : off}`}>
        Solo steps
      </Link>
      <Link
        href="/salsa/couples"
        className={`${base} ${active === 'couples' ? on : off}`}
      >
        Couples dance moves
      </Link>
    </div>
  )
}
