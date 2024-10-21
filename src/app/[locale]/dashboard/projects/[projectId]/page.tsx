import DashboardProjectUpdateClient from './dashboard-project-update.client'
import DashboardProjectUpdateClient from './dashboard-project-update.client'

export default function DashboardProjectUpdate({
  params: { projectId }
}: {
  params: { projectId: string }
}) {
  return <DashboardProjectUpdateClient projectId={projectId} />
}
