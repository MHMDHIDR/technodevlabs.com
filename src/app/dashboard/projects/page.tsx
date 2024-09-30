import { notFound } from 'next/navigation'
import { auth } from '@/auth'

export default async function DashboardProjects() {
  const session = await auth()

  if (!session || !session.user) {
    notFound()
  }

  return (
    <section>
      <h3 className='text-center'>Our Projects</h3>

      <p className='text-center'>Here are the projects we are currently working on.</p>
    </section>
  )
}
