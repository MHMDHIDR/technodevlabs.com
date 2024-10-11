import { NextIntlClientProvider, useMessages } from 'next-intl'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import { Providers } from '@/providers'
import { cn } from '@/lib/utils'
import { Cairo as FontSans } from 'next/font/google'
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

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()

  return (
    <html dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
      <head>
        <meta content='width=device-width, initial-scale=1 maximum-scale=1' name='viewport' />
        <link href='/images/logo.svg' rel='icon' type='image/svg+xml' />
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased overflow-x-clip dark:border-gray-950',
          fontSans.variable
        )}
      >
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
