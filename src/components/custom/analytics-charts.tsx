'use client'

import React from 'react'
import { CartesianGrid, LabelList, Line, LineChart, XAxis, ResponsiveContainer } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/custom/chart'
import { IconTrendingUp } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import type { GetAnalyticsActionProps } from '@/types'

type AnalyticsChartsProps = {
  analyticsDataResult: {
    type: GetAnalyticsActionProps['type']
    data: {
      key: string
      total: number
      devices: number
    }[]
  }
}

const chartConfig = {
  total: {
    label: 'Total Views',
    color: 'hsl(var(--chart-1))'
  },
  devices: {
    label: 'Unique Devices',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export default function AnalyticsCharts({ analyticsDataResult }: AnalyticsChartsProps) {
  const { data: analyticsData, type: analyticsType } = analyticsDataResult
  const analyticsTranslations = useTranslations('dashboard.analytics')

  // Sort the data by total views and take the top 6
  const topPages = analyticsData
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)
    .map(item => ({
      page: item.key,
      total: item.total,
      devices: item.devices
    }))

  const totalViews = topPages.reduce((sum, item) => sum + item.total, 0)
  const totalDevices = topPages.reduce((sum, item) => sum + item.devices, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className='uppercase'>
          {analyticsTranslations('analyticsType', { analyticsType })}
        </CardTitle>
        <CardDescription>
          {analyticsTranslations('analyticsForLast7Days', { analyticsType })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={topPages}
              margin={{
                top: 20,
                left: 12,
                right: 12,
                bottom: 20
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='page'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 15) + (value.length > 15 ? '...' : '')}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
              <Line
                type='monotone'
                dataKey='total'
                stroke='var(--color-total)'
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-total)'
                }}
                activeDot={{
                  r: 6
                }}
              >
                <LabelList
                  dataKey='total'
                  position='top'
                  offset={12}
                  className='fill-foreground'
                  fontSize={12}
                />
              </Line>
              <Line
                type='monotone'
                dataKey='devices'
                stroke='var(--color-devices)'
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-devices)'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          {analyticsTranslations('totalViews', { totalViews, totalDevices })}
          <IconTrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          {analyticsTranslations('showingTop6', { analyticsType })}
        </div>
      </CardFooter>
    </Card>
  )
}
