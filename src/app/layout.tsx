import { ReactNode } from 'react'
import { Cairo as FontSans } from 'next/font/google'
import { Providers } from '@/app/providers'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const fontSans = FontSans({ subsets: ['arabic'], variable: '--font-sans' })

import { APP_TITLE, APP_DESCRIPTION } from '@/data/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/images/technodevlabs-opengraph.png',
        width: 1200,
        height: 650,
        alt: APP_DESCRIPTION
      }
    ],
    type: 'website',
    locale: 'en_US'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1 maximum-scale=1'
        />
        <link rel='icon' href='/images/logo.svg' type='image/svg+xml' />
        <meta property='og:image' content='/images/logo.svg' />
        <meta property='og:image:width' content='192' />
        <meta property='og:image:height' content='128' />
        <meta property='og:url' content='https://www.technodevlabs.com/' />
        <meta property='og:locale' content='en_GB' />
        <meta property='og:locale:alternate' content='ar_AR' />
        {/* Twitter Data */}
        <meta
          property='twitter:title'
          content='TechnoDevLabs | Software Development Agency'
        />
        <meta name='twitter:image' content='/images/logo.svg' />
        <meta
          name='twitter:card'
          content='TechnoDevLabs.com is a software development agency that provides software development services to clients mainly towards the middle-eastern.'
        />
        <meta name='twitter:site' content='@technodevl94965' />
        <meta
          property='twitter:description'
          content='TechnoDevLabs.com is a software development agency that provides software development services to clients mainly towards the middle-eastern.'
        />
        <meta
          http-equiv='Content-Security-Policy'
          content="default-src 'self' ; script-src 'self'; style-src 'self' 'unsafe-inline'; script-src-elem *; connect-src *; worker-src blob: *; img-src *"
        />
      </head>
      <ClerkProvider afterSignOutUrl={`/auth`}>
        <body
          className={cn(
            'min-h-screen font-sans antialiased overflow-x-clip dark:border-gray-950',
            fontSans.variable
          )}
        >
          <Providers>{children}</Providers>
        </body>
      </ClerkProvider>
    </html>
  )
}
