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
import { useState } from 'react'
import { deleteCookieAction } from '@/actions'
import Tooltip from '@/components/custom/tooltip'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { APP_TITLE } from '@/data/constants'
import type { User } from 'next-auth'

export function DashboardSidebar({ user }: { user: User }) {
  const dashboardSidebar = useTranslations('dashboard.sidebar')

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
      label: dashboardSidebar('posts'),
      href: '/dashboard/posts',
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
  const [open, setOpen] = useState(false)

  return !user ? null : (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className='justify-between gap-10'>
        <div className='flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
          <div className='flex flex-col gap-2'>
            {links.map(link => (
              <SidebarLink
                key={link.href}
                link={link}
                onClick={() => (open ? setOpen(false) : null)}
              />
            ))}
          </div>
        </div>

        <div className='flex flex-col mt-8 gap-2'>
          <Tooltip description={dashboardSidebar('signOut')}>
            <button
              className='flex items-center justify-start py-2 gap-2 group/sidebar px-4'
              onClick={async () => {
                await deleteCookieAction({ name: 'can-authenticate' })
                await signOut()
              }}
            >
              <IconLogout2 className='w-5 h-5 mr-2 stroke-red-600' />
              <span
                className={`text-neutral-700 dark:text-neutral-200 text-sm transition-opacity duration-500 ${
                  open ? 'opacity-100 left-0' : 'opacity-0 absolute -left-40'
                }`}
              >
                {dashboardSidebar('signOut')}
              </span>
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
    </Sidebar>
  )
}
