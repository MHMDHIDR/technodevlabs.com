'use client'

import {
  IconBook,
  IconBrandTabler,
  IconChartLine,
  IconCode,
  IconLogout2,
  IconSettings
} from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { deleteCookieAction } from '@/actions'
import Tooltip from '@/components/custom/tooltip'
import { SidebarBody, SidebarLink, useSidebar } from '@/components/ui/sidebar'
import { APP_TITLE } from '@/data/constants'
import type { User } from 'next-auth'

export function DashboardSidebar({ user }: { user: User }) {
  const dashboardSidebar = useTranslations('dashboard.sidebar')
  const { isOpen } = useSidebar()

  const links = [
    {
      label: dashboardSidebar('dashboard'),
      href: '/dashboard',
      icon: (
        <IconBrandTabler className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
      )
    },
    {
      label: dashboardSidebar('projects'),
      href: '/dashboard/projects',
      icon: <IconCode className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
    },
    {
      label: dashboardSidebar('blog'),
      href: '/dashboard/blog',
      icon: <IconBook className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
    },
    {
      label: dashboardSidebar('settings'),
      href: '/dashboard/settings',
      icon: (
        <IconSettings className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
      )
    },
    {
      label: dashboardSidebar('analytics'),
      href: '/dashboard/analytics',
      icon: (
        <IconChartLine className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
      )
    }
  ]

  return !user ? null : (
    <SidebarBody className='justify-between gap-10 flex flex-col'>
      <div className='flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
        <div className={`flex flex-col gap-2`}>
          {links.map(link => (
            <SidebarLink key={link.href} link={link} />
          ))}
        </div>
      </div>

      <div className='flex flex-col mt-8 gap-2'>
        <Tooltip description={dashboardSidebar('signOut')}>
          <button
            className='flex items-center justify-start py-2 gap-2 group/sidebar text-neutral-700 dark:text-neutral-200 text-sm transition-opacity'
            onClick={async () => {
              await deleteCookieAction({ name: 'can-authenticate' })
              await signOut()
            }}
          >
            <IconLogout2 className='w-5 h-5 stroke-red-600' />
            {isOpen && dashboardSidebar('signOut')}
          </button>
        </Tooltip>
        <SidebarLink
          link={{
            label: user.name ?? APP_TITLE,
            href: '/dashboard',
            icon: (
              <Image
                alt={user.name ?? APP_TITLE}
                className='flex-shrink-0 rounded-full h-7 w-7'
                height={50}
                src={user.image ?? '/images/logo.png'}
                width={50}
              />
            )
          }}
        />
      </div>
    </SidebarBody>
  )
}
