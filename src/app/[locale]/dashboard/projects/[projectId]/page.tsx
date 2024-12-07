import DashboardProjectUpdateClient from './dashboard-project-update.client'

export default async function DashboardProjectUpdate({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  return <DashboardProjectUpdateClient projectId={projectId} />
}
