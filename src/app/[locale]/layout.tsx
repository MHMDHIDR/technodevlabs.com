import { ReactNode } from 'react'
import { Cairo as FontSans } from 'next/font/google'
import { Providers } from '@/providers'
import { cn } from '@/lib/utils'
import './globals.css'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'

import type { Metadata } from 'next'
import { getCurrentLocale } from 'locales/server'

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

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const locale = getCurrentLocale()
  const dir = new Intl.Locale(locale).language === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
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
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  )
}