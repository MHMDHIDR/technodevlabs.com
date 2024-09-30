import { notFound } from 'next/navigation'
import { auth } from '@/auth'

export default async function DashboardPosts() {
  const session = await auth()

  if (!session || !session.user) {
    notFound()
  }

  return (
    <section>
      <h3 className='text-center'>Our Posts</h3>

      <p>This is The Blog Post we have...</p>
    </section>
  )
}
