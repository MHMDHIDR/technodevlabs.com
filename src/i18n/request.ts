import { notFound } from 'next/navigation'
import { useRouter } from 'next/router'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export type localeTypes = (typeof routing.locales)[number]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as localeTypes)) notFound()

  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  }
})
