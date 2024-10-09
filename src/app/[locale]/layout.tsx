import { Providers } from '@/providers'
import { cn } from '@/lib/utils'
import { Cairo as FontSans } from 'next/font/google'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import { routing } from '@/i18n/routing'
import { unstable_setRequestLocale } from 'next-intl/server'
import '../globals.css'
import type { localeTypes } from '@/i18n/request'
import type { Metadata } from 'next'

const fontSans = FontSans({ subsets: ['arabic'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: APP_LOGO_opengraph,
        width: 1200,
        height: 630,
        alt: APP_DESCRIPTION
      }
    ],
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [APP_LOGO_opengraph]
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: localeTypes }
}) {
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1 maximum-scale=1' />
        <link rel='icon' href='/images/logo.svg' type='image/svg+xml' />
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased overflow-x-clip dark:border-gray-950',
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
