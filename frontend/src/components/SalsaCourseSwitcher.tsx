// Switch between the four salsa courses.
//
// Its own component rather than an export from any page, so no page has to import
// a sibling `page.tsx` — that drags the other route's whole tree into this
// route's bundle.
//
// Nothing about the tempo preference is carried in the href on purpose: it lives
// in localStorage (see `salsa-tempo.ts`), so slow-vs-full-tempo survives moving
// between the courses, and a copied link doesn't pin someone else to your choice.
//
// Four pills is the point at which this stops fitting one line on a phone, so the
// beginners/intermediate level is a row label rather than a fifth pill: two rows
// of two, each labelled, instead of four equal pills that wrap unpredictably and
// leave you unsure which level you are in. `flex-wrap` still catches 320px.
import Link from 'next/link'

export type SalsaCourseKey = 'steps' | 'couples' | 'int-steps' | 'int-couples'

const ROWS: { level: string; courses: { key: SalsaCourseKey; href: string; label: string }[] }[] = [
  {
    level: 'Beginners',
    courses: [
      { key: 'steps', href: '/salsa', label: 'Solo steps' },
      { key: 'couples', href: '/salsa/couples', label: 'Couples moves' },
    ],
  },
  {
    level: 'Intermediate',
    courses: [
      { key: 'int-steps', href: '/salsa/intermediate', label: 'Solo steps' },
      { key: 'int-couples', href: '/salsa/intermediate/couples', label: 'Couples moves' },
    ],
  },
]

export function SalsaCourseSwitcher({ active }: { active: SalsaCourseKey }) {
  const base =
    'text-xs rounded-full px-3 py-1.5 border transition-colors whitespace-nowrap'
  const on = 'border-[#e53e3e]/50 text-[#f5f5f5] bg-[#e53e3e]/10'
  const off = 'border-white/10 text-[#707070] hover:text-[#a0a0a0]'
  return (
    <nav className="mb-6 space-y-2" aria-label="Salsa courses">
      {ROWS.map((row) => (
        <div key={row.level} className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest text-[#707070] w-full text-center sm:w-auto sm:text-right sm:min-w-[92px]">
            {row.level}
          </span>
          {row.courses.map((course) => (
            <Link
              key={course.key}
              href={course.href}
              aria-current={active === course.key ? 'page' : undefined}
              className={`${base} ${active === course.key ? on : off}`}
            >
              {course.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}
