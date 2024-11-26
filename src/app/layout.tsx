import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { env } from '@/env'
import './globals.css'
import localFont from 'next/font/local'
import type { Metadata } from 'next'

const Orbitron = localFont({
  src: '../../public/fonts/Orbitron-VariableFont_wght.ttf',
  variable: '--font-orbitron',
  weight: '100 900'
})

const Cairo = localFont({
  src: '../../public/fonts/Cairo-VariableFont_slnt,wght.ttf',
  variable: '--font-orbitron',
  weight: '100 900'
})

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta content='width=device-width, initial-scale=1 maximum-scale=1' name='viewport' />
        <link href='/images/logo.svg' rel='icon' type='image/svg+xml' />
        <script
          defer
          src='https://analytics.technodevlabs.com/script.js'
          data-website-id='1ace02ab-0574-4966-98ee-de95c2473cac'
        ></script>
      </head>
      <body
        className={`${Orbitron.variable} rtl:${Cairo.variable} rtl:font-cairo min-h-screen font-sans antialiased overflow-x-clip dark:border-gray-950`}
      >
        {children}
      </body>
    </html>
  )
}
