import { env } from '@/env'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_URL
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/api/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
