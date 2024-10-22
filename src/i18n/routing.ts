import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'
import Link from 'next/link'

export const locales = ['en', 'ar'] as const

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
})

export const { Link: IntlLink, redirect, usePathname, useRouter } = createNavigation(routing)
export { Link }
