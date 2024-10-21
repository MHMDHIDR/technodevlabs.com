import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const validRoutes = [
    '/dashboard',
    '/posts',
    '/projects',
    '/services',
    '/contact',
    '/about',
    '/terms',
    '/privacy'
  ]
  const isValidRoute = validRoutes.some(route => pathname.startsWith(route)) || pathname === '/'

  if (!isValidRoute) {
    return intlMiddleware(req)
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/']
}
