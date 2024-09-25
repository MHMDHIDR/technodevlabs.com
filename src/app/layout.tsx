import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Nav from './components/nav'
import { Providers } from './providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'TechnoDevLabs',
  description:
    'Software development agency that provides software development services to clients mainly towards the middle-eastern.',
  openGraph: {
    title: 'TechnoDevLabs',
    description:
      'Software development agency providing services to clients in the Middle East.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'TechnoDevLabs default Open Graph image'
      }
    ],
    type: 'website',
    locale: 'en_US'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1 maximum-scale=1'
        />
        <link rel='icon' href='/images/logo.png' type='image/png' />
        <meta property='og:image' content='/images/logo.png' />
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
        <meta name='twitter:image' content='/images/logo.png' />
        <meta
          name='twitter:card'
          content='TechnoDevLabs.com is a software development agency that provides software development services to clients mainly towards the middle-eastern.'
        />
        <meta name='twitter:site' content='@mohmdhidr' />
        <meta
          property='twitter:description'
          content='TechnoDevLabs.com is a software development agency that provides software development services to clients mainly towards the middle-eastern.'
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  )
}
