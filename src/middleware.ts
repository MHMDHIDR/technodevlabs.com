import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { analytics } from '@/lib/utils'

const publicPages = [
  '/',
  '/auth',
  '/terms',
  '/privacy',
  '/posts',
  '/projects',
  '/services',
  '/contact',
  '/about',
  '/dashboard',
  '/dashboard/:*'
]

const intlMiddleware = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
  // Analytics tracking for the home page
  if (req.nextUrl.pathname === '/') {
    try {
      await analytics.track('pageview', {
        page: '/',
        country: req.geo?.country
      })
    } catch (err) {
      // fail silently to not affect request
      console.error(err)
    }
  }

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  const isDashboardPath = req.nextUrl.pathname.startsWith('/dashboard')
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname) || isDashboardPath

  if (isPublicPage) {
    return intlMiddleware(req)
  }

  // Handle non-public pages here
  return intlMiddleware(req)
}

export const config = {
  // Matcher combining both previous configurations
  matcher: ['/', '/((?!api|_next|.*\\..*).*)']
}
