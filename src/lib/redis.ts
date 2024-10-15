import { Redis } from '@upstash/redis'

let redis: Redis | null = null

if (typeof window === 'undefined') {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!
    })
  }
}

export function getRedisClient() {
  if (!redis) {
    throw new Error(
      'Redis client is not initialized. This method should only be called on the server side.'
    )
  }
  return redis
}
