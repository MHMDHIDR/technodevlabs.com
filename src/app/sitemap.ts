import { MetadataRoute } from 'next'
import { getProjects } from '@/data/projects'
import { env } from '@/env'
import { createSlug } from '@/lib/create-slug'
import type { Locale } from '@/i18n/request'

export const baseUrl = env.NEXT_PUBLIC_URL

// Available locales
const locales: Locale[] = ['en', 'ar']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getProjects()

  // Base routes that need localization
  const baseRoutes = [
    '',
    '/projects',
    '/about',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
    '/cookies-policy',
    '/services'
  ]

  // Static routes that don't need localization (policies, etc.)
  const staticRoutes = ['/privacy', '/terms', '/cookies-policy']

  // Create localized routes
  const localizedRoutes = baseRoutes.flatMap(route =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date().toISOString()
    }))
  )

  // Add static routes
  const staticRoutesWithMeta = staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }))

  // Create localized project routes
  const projectsSitemap = projects.flatMap(project =>
    locales.map(locale => ({
      url: `${baseUrl}/${locale}/projects/${project.slug || createSlug(project.title)}`,
      lastModified: project.updatedAt
    }))
  )

  return [...localizedRoutes, ...staticRoutesWithMeta, ...projectsSitemap]
}
