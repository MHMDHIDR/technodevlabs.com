import { createI18nServer } from 'next-international/server'

const locales = {
  en: () => import('./en'),
  ar: () => import('./ar')
}

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer<typeof locales>(locales)
