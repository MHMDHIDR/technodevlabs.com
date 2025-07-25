import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { DashboardSidebar } from '@/components/custom/dashboard-sidebar'
import Layout from '@/components/custom/layout'
import { SecondaryHeading } from '@/components/ui/cover'
import { SidebarProvider } from '@/components/ui/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dashboard = await getTranslations('dashboard')
  const session = await auth()

  if (!session || !session.user) {
    notFound()
  }

  return (
    <Layout className='pt-10 flex overflow-x-clip'>
      <SidebarProvider>
        <DashboardSidebar user={session.user} />
      </SidebarProvider>

      <main className='flex-1 px-3 pt-3 transition-[margin] sidebar-expanded:-mr-16'>
        <h1 className='relative z-20 py-2 mx-auto mt-6 text-2xl font-semibold text-center bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          <SecondaryHeading>{dashboard('pageTitle')}</SecondaryHeading>
        </h1>

        {children}
      </main>
    </Layout>
  )
}
