import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { NextRequest } from 'next/server'

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

  // Handle non-public pages here  For now, we'll just call intlMiddleware for all routes
  return intlMiddleware(req)
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
