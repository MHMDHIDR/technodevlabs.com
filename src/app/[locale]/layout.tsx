import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Providers } from '@/providers'
import type { Locale } from '@/i18n/request'

export default async function LocaleLayout({
  children,
  params: { locale = 'en' }
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
