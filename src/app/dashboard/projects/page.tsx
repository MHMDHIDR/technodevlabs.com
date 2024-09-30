import { notFound } from 'next/navigation'
import { getUser } from '@/lib/lucia'

export default async function DashboardProjects() {
  const user = await getUser()

  if (!user) {
    notFound()
  }

  return (
    <section>
      <h3 className='text-center'>Our Projects</h3>

      <p className='text-center'>Here are the projects we are currently working on.</p>
    </section>
  )
}
