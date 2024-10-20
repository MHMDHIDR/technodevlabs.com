import { unstable_setRequestLocale } from 'next-intl/server'
import DashboardProjectAddClient from './dashboard-project-add.client'

export default function DashboardProjectAdd({
  params: { locale }
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return <DashboardProjectAddClient />
}
