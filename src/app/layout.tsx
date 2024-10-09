// export const dynamic = 'force-dynamic'

import { unstable_setRequestLocale } from 'next-intl/server'

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  return children
}
