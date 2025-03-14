import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import localFont from 'next/font/local'
import { routing } from '@/i18n/routing'
import { Providers } from '@/providers'
import type { Locale } from '@/i18n/request'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

const Orbitron = localFont({
  src: '../../../public/fonts/Orbitron-VariableFont_wght.ttf',
  variable: '--font-orbitron',
  weight: '100 900'
})

const Cairo = localFont({
  src: '../../../public/fonts/Cairo-VariableFont_slnt,wght.ttf',
  variable: '--font-orbitron',
  weight: '100 900'
})

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale = 'en' } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
