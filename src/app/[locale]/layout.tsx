import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import { env } from '@/env'
import { Providers } from '@/providers'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/request'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    openGraph: {
      title: APP_TITLE,
      description: APP_DESCRIPTION,
      url: env.NEXT_PUBLIC_URL,
      siteName: APP_TITLE,
      images: [{ url: APP_LOGO_opengraph, width: 1200, height: 630, alt: APP_TITLE }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: APP_TITLE,
      description: APP_DESCRIPTION,
      images: [APP_LOGO_opengraph]
    }
  }
}

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
      <head>
        <meta content='width=device-width, initial-scale=1 maximum-scale=1' name='viewport' />
        <link href='/images/logo.svg' rel='icon' type='image/svg+xml' />
      </head>
      <body className={'min-h-screen font-sans antialiased overflow-x-clip dark:border-gray-950'}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
