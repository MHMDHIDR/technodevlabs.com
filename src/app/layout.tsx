import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { env } from '@/env'
import './globals.css'
import { cookies } from 'next/headers'
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
      type: 'website',
      images: [
        {
          url: `${env.NEXT_PUBLIC_URL}${APP_LOGO_opengraph}`,
          secureUrl: `${env.NEXT_PUBLIC_URL}${APP_LOGO_opengraph}`,
          width: 1200,
          height: 630,
          alt: APP_TITLE
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: APP_TITLE,
      description: APP_DESCRIPTION,
      images: [APP_LOGO_opengraph]
    }
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()
  const cookieStore = cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value as Locale

  unstable_setRequestLocale(locale || 'en')

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
