import { notFound } from 'next/navigation'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { auth } from '@/auth'
import { DashboardSidebar } from '@/components/custom/dashboard-sidebar'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || !session.user) {
    notFound()
  }

  return (
    <Layout className={'pt-10 flex flex-col md:flex-row'}>
      <DashboardSidebar user={session.user} />

      <main className='flex-1 px-3 pt-3'>
        <h1 className='relative z-20 py-2 mx-auto mt-6 text-3xl font-semibold text-center bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          <Cover>Dashboard</Cover>
        </h1>

        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
      </main>
    </Layout>
  )
}
