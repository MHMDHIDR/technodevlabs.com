import DashboardPostUpdateClient from './dashboard-post-update.client'

export default async function DashboardPostUpdate({
  params
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  return <DashboardPostUpdateClient postId={postId} />
}
