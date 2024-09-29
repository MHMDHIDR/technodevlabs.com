import { ReactNode } from 'react'
import { Cairo as FontSans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from '@/app/providers'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import './globals.css'
import { metadata } from '@/lib/get-metadata'

const fontSans = FontSans({ subsets: ['arabic'], variable: '--font-sans' })
metadata({})

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
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased overflow-x-clip dark:border-gray-950',
          fontSans.variable
        )}
      >
        <Providers>
          {children}
          <Analytics />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
