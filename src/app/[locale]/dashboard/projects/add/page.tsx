import { unstable_setRequestLocale } from 'next-intl/server'
import DashboardProjectAddClient from './dashboard-project-add.client'
import type { Locale } from '@/i18n/request'

export default function DashboardProjectAdd({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  unstable_setRequestLocale(locale)

  return <DashboardProjectAddClient />
}
