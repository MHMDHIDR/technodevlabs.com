import React from 'react'
import { getAnalyticsAction } from '@/actions'
import { AnalyticsTypes } from '@/types'
import AnalyticsCharts from '@/components/custom/analytics-charts'

export default async function DashboardAnalyticsPage() {
  // analyticsDataPath: is for getting the page views for the last 7 days
  const analyticsDataPath = await getAnalyticsAction({ type: AnalyticsTypes.PATH })
  // analyticsDataOsName: is for getting the os name for the last 7 days
  const analyticsDataOsName = await getAnalyticsAction({ type: AnalyticsTypes.OS_NAME })
  // analyticsDataCountry: is for getting the country for the last 7 days
  const analyticsDataCountry = await getAnalyticsAction({ type: AnalyticsTypes.COUNTRY })
  // analyticsDataDeviceType: is for getting the device type for the last 7 days
  const analyticsDataDeviceType = await getAnalyticsAction({ type: AnalyticsTypes.DEVICE_TYPE })

  return (
    <div className='container mx-auto p-4 space-y-4'>
      <AnalyticsCharts analyticsDataResult={analyticsDataPath} />
      <AnalyticsCharts analyticsDataResult={analyticsDataOsName} />
      <AnalyticsCharts analyticsDataResult={analyticsDataCountry} />
      <AnalyticsCharts analyticsDataResult={analyticsDataDeviceType} />
    </div>
  )
}
