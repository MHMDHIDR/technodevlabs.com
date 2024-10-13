'use server'

import { auth } from '@/auth'
import { env } from '@/env'
import { AnalyticsTypes, GetAnalyticsActionProps } from '@/types'
import { cookies } from 'next/headers'

type AnalyticsData = {
  data: {
    key: string
    total: number
    devices: number
  }[]
  type: GetAnalyticsActionProps['type']
}

export async function getAnalyticsAction({
  type = AnalyticsTypes.PATH
}: GetAnalyticsActionProps): Promise<AnalyticsData> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    if (!env.NEXT_PUBLIC_VERCEL_TEAM_ID || !env.NEXT_PUBLIC_VERCEL_PROJECT_ID) {
      throw new Error('Missing Vercel API configuration')
    }

    const currentDate = new Date().toISOString().split('T')[0]
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    const baseUrl = `https://vercel.com/api/web-analytics/stats?environment=production&filter=%7B%7D&from=${sevenDaysAgo}T00%3A00%3A00.000Z&limit=250&projectId=${env.NEXT_PUBLIC_VERCEL_PROJECT_ID}&teamId=${env.NEXT_PUBLIC_VERCEL_TEAM_ID}&to=${currentDate}&type=${type}`

    const cookieStore = cookies()
    const authCookie = cookieStore.get('authorization')
    const isLoggedIn = cookieStore.get('isLoggedIn')

    const headers = new Headers({
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
      Referer: 'https://vercel.com'
    })

    // If we have the authorization cookie, use it
    if (authCookie) {
      headers.append('Cookie', `authorization=${authCookie.value}; isLoggedIn=${isLoggedIn?.value}`)
    } else {
      // If we don't have the cookie, try to use an API token
      const apiToken = env.VERCEL_API_TOKEN
      if (!apiToken) {
        throw new Error('No authorization method available')
      }
      headers.append('Authorization', `Bearer ${apiToken}`)
    }

    const results = await fetch(baseUrl, { headers, cache: 'no-store' })

    if (!results.ok) {
      const errorText = await results.text()
      console.error('Error response body:', errorText)
      throw new Error(`HTTP error! status: ${results.status}, body: ${errorText}`)
    }

    const { data } = await results.json()

    return { data, type }
  } catch (error) {
    console.error('Error in getAnalyticsAction:', error)
    throw error
  }
}
