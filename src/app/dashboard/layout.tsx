import { notFound } from 'next/navigation'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { auth, currentUser } from '@clerk/nextjs/server'
import { DashboardSidebar } from '@/components/custom/dashboard-sidebar'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth()

  if (!currentUser || !userId) {
    notFound()
  }

  return (
    <Layout className={'pt-10 flex flex-col md:flex-row'}>
      <DashboardSidebar />

      <main className='pt-10 flex-1 px-3'>
        <h1 className='relative z-20 py-2 mx-auto mt-6 text-3xl font-semibold text-center bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          <Cover>Dashboard</Cover>
        </h1>

        {children}
      </main>
    </Layout>
  )
}
