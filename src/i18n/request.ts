import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export type Locale = (typeof routing.locales)[number]

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`@/../messages/${locale ?? 'en'}.json`)).default
  }
})
