import { notFound } from 'next/navigation'
import { getUser } from '@/lib/lucia'

export default async function DashboardPosts() {
  const user = await getUser()

  if (!user) {
    notFound()
  }

  return (
    <section>
      <h3 className='text-center'>Our Posts</h3>

      <p>This is The Blog Post we have...</p>
    </section>
  )
}
