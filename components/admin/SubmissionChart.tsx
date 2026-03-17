'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { SubmissionChartPoint } from '@/lib/admin/types'

interface Props {
  data: SubmissionChartPoint[]
}

export function SubmissionChart({ data }: Props) {
  const formatted = data.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={formatted} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAssessments" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ca3726" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ca3726" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          tickLine={false}
          axisLine={false}
          interval={6}
        />
        <YAxis
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            fontSize: '12px',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
        <Area
          type="monotone"
          dataKey="contacts"
          name="Contacts"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#colorContacts)"
        />
        <Area
          type="monotone"
          dataKey="assessments"
          name="Assessments"
          stroke="#ca3726"
          strokeWidth={2}
          fill="url(#colorAssessments)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
