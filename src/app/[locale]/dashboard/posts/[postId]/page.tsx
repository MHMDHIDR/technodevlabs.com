import DashboardPostUpdateClient from './dashboard-post-update.client'

export default function DashboardPostUpdate({
  params: { postId }
}: {
  params: { postId: string }
}) {
  return <DashboardPostUpdateClient postId={postId} />
}
