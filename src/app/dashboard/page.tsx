import { auth } from '@/auth'
import { notFound } from 'next/navigation'

export default async function DasboardPage() {
  const session = await auth()

  if (!session || !session.user) {
    notFound()
  }

  return (
    <main>
      <h3 className='text-center'>Dashboard Page</h3>
    </main>
  )
}
