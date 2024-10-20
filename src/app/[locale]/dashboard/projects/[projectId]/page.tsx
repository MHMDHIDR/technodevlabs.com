import { unstable_setRequestLocale } from 'next-intl/server'
import DashboardProjectUpdateClient from './dashboard-project-update.client'

export default function DashboardProjectUpdate({
  params: { locale, projectId }
}: {
  params: { locale: string; projectId: string }
}) {
  unstable_setRequestLocale(locale)

  return <DashboardProjectUpdateClient projectId={projectId} />
}
