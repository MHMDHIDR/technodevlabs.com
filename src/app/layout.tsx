import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
// import type { localeTypes } from '@/i18n/request'

export default async function RootLayout({
  children
  //, params: { locale }
}: {
  children: React.ReactNode
  // params: { locale: localeTypes }
}) {
  const messages = await getMessages()

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
