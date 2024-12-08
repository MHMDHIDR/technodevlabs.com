import { getProjects } from '@/data/projects'
import DashboardProjectUpdateClient from './dashboard-project-update.client'

export async function generateStaticParams() {
  const { projects } = await getProjects()
  return projects.map(project => ({ projectId: project.id }))
}

export default async function DashboardProjectUpdate({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  return <DashboardProjectUpdateClient projectId={projectId} />
}
