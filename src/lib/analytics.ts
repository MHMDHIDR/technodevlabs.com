import { redis } from '@/lib/redis'
import { parse } from 'date-fns'
import { getDate } from '@/lib/utils'

type AnalyticsArgs = {
  // Number of days to keep analytics data for
  retention?: number
}

type TrackOptions = {
  // Whether to persist the event in redis
  persist?: boolean
}

export class Analytics {
  private retention: number = 60 * 60 * 24 * 7

  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) this.retention = opts.retention
  }

  /**
   * Track an event
   * @param namespace - The namespace of the event (e.g. 'page_view')
   * @param event - The event to track (e.g. { page: '/', country: 'UK' })
   * @param opts - Options for the event (e.g. { persist: true })
   */
  async track(namespace: string, event: object = {}, opts?: TrackOptions) {
    let key = `analytics::${namespace}`

    if (!opts?.persist) {
      key += `::${getDate()}`
    }

    // db call to persist this event
    await redis.hincrby(key, JSON.stringify(event), 1)
    if (!opts?.persist) await redis.expire(key, this.retention)
  }

  async retrieveDays(namespace: string, nDays: number) {
    type AnalyticsPromise = ReturnType<typeof analytics.retrieve>
    const promises: AnalyticsPromise[] = []

    for (let i = 0; i < nDays; i++) {
      const formattedDate = getDate(i)
      const promise = analytics.retrieve(namespace, formattedDate)
      promises.push(promise)
    }

    const fetched = await Promise.all(promises)

    const data = fetched.sort((a, b) => {
      if (parse(a.date, 'dd/MM/yyyy', new Date()) > parse(b.date, 'dd/MM/yyyy', new Date())) {
        return 1
      } else {
        return -1
      }
    })

    return data
  }

  async retrieve(namespace: string, date: string) {
    const res = await redis.hgetall<Record<string, string>>(`analytics::${namespace}::${date}`)

    return {
      date,
      events: Object.entries(res ?? []).map(([key, value]) => ({
        [key]: Number(value)
      }))
    }
  }
}

export const analytics = new Analytics()
