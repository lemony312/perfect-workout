import WorkoutDetail2025Client from './client'

export function generateStaticParams() {
  const params = []
  const start = new Date(2025, 0, 1)
  const end = new Date(2027, 0, 1)
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    params.push({ date: d.toISOString().split('T')[0] })
  }
  return params
}

export default async function WorkoutDetail2025Page({
  params,
}: {
  params: Promise<{ date: string }>
}) {
  const { date } = await params
  return <WorkoutDetail2025Client dateStr={date} />
}
