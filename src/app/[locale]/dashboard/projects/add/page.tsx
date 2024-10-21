import { setRequestLocale } from 'next-intl/server'
import DashboardProjectAddClient from './dashboard-project-add.client'
import type { Locale } from '@/i18n/request'

export default function DashboardProjectAdd({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  setRequestLocale(locale)

  return <DashboardProjectAddClient />
}
