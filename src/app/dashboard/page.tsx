import Image from 'next/image'
import { notFound } from 'next/navigation'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { getUser } from '@/lib/lucia'
import { DashboardSidebar } from '@/components/custom/dashboard-sidebar'
import { cn } from '@/lib/utils'

export default async function DasboardPage() {
  const user = await getUser()

  if (!user) {
    notFound()
  }

  return (
    <Layout
      className={cn(
        'rounded-md py-20 flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-screen'
      )}
    >
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent md:text-4xl lg:text-6xl max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Dashboard</Cover>
      </h1>

      <DashboardSidebar user={user} />
    </Layout>
  )
}
