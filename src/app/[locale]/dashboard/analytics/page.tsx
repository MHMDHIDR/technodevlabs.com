import { getDate, analytics } from '@/lib/utils'
import AnalyticsDashboard from '@/components/custom/analytics-charts'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/request'

export default async function DashboardAnalyticsPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  const TRACKING_DAYS = 10

  const pageviews = await analytics.retrieveDays('pageview', TRACKING_DAYS)

  const totalPageviews = pageviews.reduce(
    (acc: any, curr: { events: any[] }) =>
      acc +
      curr.events.reduce(
        (acc: number, curr: { [s: string]: unknown } | ArrayLike<unknown>) =>
          acc + Number(Object.values(curr)[0]!),
        0
      ),
    0
  )

  const avgVisitorsPerDay = (totalPageviews / TRACKING_DAYS).toFixed(1)

  const amtVisitorsToday = pageviews
    .filter((ev: { date: any }) => ev.date === getDate())
    .reduce(
      (acc: any, curr: { events: any[] }) =>
        acc +
        curr.events.reduce(
          (acc: number, curr: { [s: string]: unknown } | ArrayLike<unknown>) =>
            acc + Number(Object.values(curr)[0]!),
          0
        ),
      0
    )

  const topCountriesMap = new Map<string, number>()

  for (let i = 0; i < pageviews.length; i++) {
    const day = pageviews[i]
    if (!day) continue

    for (let j = 0; j < day.events.length; j++) {
      const event = day.events[j]
      if (!event) continue

      const key = Object.keys(event)[0]!
      const value = Object.values(event)[0]!

      const parsedKey = JSON.parse(key)
      const country = parsedKey?.country

      if (country) {
        if (topCountriesMap.has(country)) {
          const prevValue = topCountriesMap.get(country)!
          topCountriesMap.set(country, prevValue + value)
        } else {
          topCountriesMap.set(country, value)
        }
      }
    }
  }

  const topCountries = Array.from(topCountriesMap.entries())
    .sort((a, b) => {
      if (a[1] > b[1]) return -1
      else return 1
    })
    .slice(0, 5)

  return (
    <div className='flex justify-center items-center py-12 w-full min-h-screen'>
      <div className='relative mx-auto w-full max-w-6xl text-white'>
        <AnalyticsDashboard
          avgVisitorsPerDay={avgVisitorsPerDay}
          amtVisitorsToday={amtVisitorsToday}
          timeseriesPageviews={pageviews}
          topCountries={topCountries}
        />
      </div>
    </div>
  )
}
