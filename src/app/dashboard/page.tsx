import { notFound } from 'next/navigation'
import { getUser } from '@/lib/lucia'

export default async function DasboardPage() {
  const user = await getUser()

  if (!user) {
    notFound()
  }

  return (
    <main>
      <h3 className='text-center'>Dashboard Page</h3>
    </main>
  )
}
