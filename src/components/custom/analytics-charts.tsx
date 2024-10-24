'use client'

import { IconArrowDownRight, IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import { BarChart, Card } from '@tremor/react'
import { useTranslations } from 'next-intl'
import ReactCountryFlag from 'react-country-flag'
import type { AnalyticsDashboardProps } from '@/types'

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0
  const isNeutral = percentage === 0
  const isNegative = percentage < 0

  if (isNaN(percentage)) return null

  const positiveClassname = 'bg-green-900/25 text-green-700 dark:text-green-400 ring-green-400/25'
  const neutralClassname = 'bg-zinc-900/25 text-zinc-400 ring-zinc-400/25'
  const negativeClassname = 'bg-red-900/25 text-red-400 ring-red-400/25'

  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive ? positiveClassname : isNeutral ? neutralClassname : negativeClassname
      }`}
    >
      {isPositive ? <IconArrowUpRight className='w-3 h-3' /> : null}
      {isNeutral ? <IconArrowRight className='w-3 h-3' /> : null}
      {isNegative ? <IconArrowDownRight className='w-3 h-3' /> : null}
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
      <div className='grid grid-cols-1 gap-6 mx-auto w-full sm:grid-cols-2'>
        <Card className='w-full'>
          <span className='text-tremor-default text-dark-tremor-content'>
            {analyticsTranslations('avgVisitorsPerDay')}
          </span>
          <p className='text-3xl font-semibold text-dark-tremor-content dark:text-dark-tremor-content-strong'>
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className='w-full'>
          <p className='flex gap-2.5 items-center text-tremor-default text-dark-tremor-content'>
            {analyticsTranslations('visitorsToday')}
            <Badge percentage={(amtVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100} />
          </p>
          <p className='text-3xl font-semibold text-dark-tremor-content dark:text-dark-tremor-content-strong'>
            {amtVisitorsToday}
          </p>
        </Card>
      </div>

      <Card className='flex flex-col grid-cols-4 gap-6 sm:grid'>
        <h2 className='w-full text-xl font-semibold text-center text-dark-tremor-content dark:text-dark-tremor-content-strong sm:left-left'>
          {analyticsTranslations('topVisitorsThisWeek')}
        </h2>
        <div className='flex flex-wrap col-span-3 gap-8 justify-between items-center'>
          {topCountries?.map(([countryCode, number]) => (
            <div
              key={countryCode}
              className='flex gap-3 items-center text-dark-tremor-contentdark:text-dark-tremor-content-strong '
            >
              <p className='hidden sm:block text-tremor-content'>{countryCode}</p>
              <ReactCountryFlag className='text-5xl sm:text-3xl' svg countryCode={countryCode} />

              <p className='text-tremor-content sm:text-dark-tremor-content dark:text-dark-tremor-content-strong'>
                {number}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        {timeseriesPageviews ? (
          <BarChart
            data={timeseriesPageviews.map(day => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
            }))}
            allowDecimals={false}
            categories={['Visitors']}
            index='name'
            showAnimation
          />
        ) : null}
      </Card>
    </div>
  )
}
