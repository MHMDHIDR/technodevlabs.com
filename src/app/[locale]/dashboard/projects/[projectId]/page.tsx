import { setRequestLocale } from 'next-intl/server'
import DashboardProjectUpdateClient from './dashboard-project-update.client'

export default function DashboardProjectUpdate({
  params: { locale, projectId }
}: {
  params: { locale: string; projectId: string }
}) {
  setRequestLocale(locale)

  return <DashboardProjectUpdateClient projectId={projectId} />
}
