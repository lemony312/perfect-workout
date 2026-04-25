import BodyweightDayClient from './client'

export function generateStaticParams() {
  const params = []
  const start = new Date(2025, 0, 1)
  const end = new Date(2027, 0, 1)
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    params.push({ date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` })
  }
  return params
}

export default async function BodyweightDayPage({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date } = await params
  return <BodyweightDayClient dateStr={date} />
}
