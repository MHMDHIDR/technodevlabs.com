import { getPosts } from '@/data/posts'
import DashboardPostUpdateClient from './dashboard-post-update.client'

export async function generateStaticParams() {
  const { posts } = await getPosts()
  return posts.map(post => ({ postId: post.id }))
}

export default async function DashboardPostUpdate({
  params
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params
  return <DashboardPostUpdateClient postId={postId} />
}
