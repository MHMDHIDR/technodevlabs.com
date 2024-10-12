'use client'

import { analytics } from '@/lib/utils'
import { IconArrowDownRight, IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import ReactCountryFlag from 'react-country-flag'
import { Card, LineChart } from '@tremor/react'
import { useTranslations } from 'next-intl'

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string
  amtVisitorsToday: number
  timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>
  topCountries: [string, number][]
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0
  const isNeutral = percentage === 0
  const isNegative = percentage < 0

  if (isNaN(percentage)) return null

  const positiveClassname = 'bg-green-900/25 text-green-400 ring-green-400/25'
  const neutralClassname = 'bg-zinc-900/25 text-zinc-400 ring-zinc-400/25'
  const negativeClassname = 'bg-red-900/25 text-red-400 ring-red-400/25'

  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive ? positiveClassname : isNeutral ? neutralClassname : negativeClassname
      }`}
    >
      {isPositive ? <IconArrowUpRight className='h-3 w-3' /> : null}
      {isNeutral ? <IconArrowRight className='h-3 w-3' /> : null}
      {isNegative ? <IconArrowDownRight className='h-3 w-3' /> : null}
      {percentage.toFixed(0)}%
    </span>
  )
}

export default function AnalyticsDashboard({
  avgVisitorsPerDay,
  amtVisitorsToday,
  timeseriesPageviews,
  topCountries
}: AnalyticsDashboardProps) {
  const analyticsTranslations = useTranslations('dashboard.analytics')

  return (
    <div className='flex flex-col gap-6'>
      <div className='grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6'>
        <Card className='w-full'>
          <p className='text-tremor-default text-neutral-800 dark:text-neutral-100'>
            {analyticsTranslations('avgVisitorsPerDay')}
          </p>
          <p className='text-3xl text-neutral-800 dark:text-neutral-100 font-semibold'>
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className='w-full'>
          <p className='flex gap-2.5 items-center text-tremor-default text-neutral-800 dark:text-neutral-100'>
            {analyticsTranslations('visitorsToday')}
            <Badge percentage={(amtVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100} />
          </p>
          <p className='text-3xl text-neutral-800 dark:text-neutral-100 font-semibold'>
            {amtVisitorsToday}
          </p>
        </Card>
      </div>

      <Card className='flex flex-col sm:grid grid-cols-4 gap-6'>
        <h2 className='w-full text-neutral-800 dark:text-neutral-100 font-semibold text-lg'>
          {analyticsTranslations('topVisitorsThisWeek')}
        </h2>
        <div className='col-span-3 flex items-center justify-between flex-wrap gap-8'>
          {topCountries?.map(([countryCode, number]) => {
            return (
              <div
                key={countryCode}
                className='flex items-center gap-3 text-dark-tremor-content-strong'
              >
                <p className='hidden sm:block text-tremor-content'>{countryCode}</p>
                <ReactCountryFlag className='text-5xl sm:text-3xl' svg countryCode={countryCode} />

                <p className='text-tremor-content sm:text-dark-tremor-content-strong'>{number}</p>
              </div>
            )
          })}
        </div>
      </Card>

      <Card>
        {timeseriesPageviews ? (
          <LineChart
            allowDecimals={false}
            showAnimation
            data={timeseriesPageviews.map(day => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!
              }, 0)
            }))}
            categories={[` -- ${analyticsTranslations('visitors')}`]}
            index='name'
            className='text-neutral-800 dark:text-neutral-100'
          />
        ) : null}
      </Card>
    </div>
  )
}
