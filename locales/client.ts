'use client'

import { createI18nClient } from 'next-international/client'

const locales = {
  en: () => import('./en'),
  ar: () => import('./ar')
}

export const { useI18n, useScopedI18n, I18nProviderClient, useCurrentLocale, useChangeLocale } =
  createI18nClient<typeof locales>(locales)
