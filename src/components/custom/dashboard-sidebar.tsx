'use client'

import { deleteCookieAction } from '@/actions'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { APP_TITLE } from '@/data/constants'
import { IconBook, IconBrandTabler, IconCode, IconLogout2, IconSettings } from '@tabler/icons-react'
import type { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

export function DashboardSidebar({ user }: { user: User }) {
  const links = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: (
        <IconBrandTabler className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
      )
    },
    {
      label: 'Projects',
      href: '/dashboard/projects',
      icon: <IconCode className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
    },
    {
      label: 'Posts',
      href: '/dashboard/posts',
      icon: <IconBook className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: (
        <IconSettings className='flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200' />
      )
    }
  ]
  const [open, setOpen] = useState(false)

  return !user ? null : (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className='justify-between gap-10'>
        <div className='flex flex-col flex-1 overflow-x-hidden overflow-y-auto'>
          <div className='flex flex-col gap-2'>
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} onClick={() => setOpen(!open)} />
            ))}
          </div>
        </div>

        <div className='flex flex-col mt-8 gap-2'>
          <button
            className='flex items-center justify-start py-2 gap-2 group/sidebar'
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
              Sign Out
            </span>
          </button>

          <SidebarLink
            link={{
              label: user.name ?? APP_TITLE,
              href: '/dashboard',
              icon: (
                <Image
                  src={user.image ?? '/images/logo.png'}
                  className='flex-shrink-0 rounded-full h-7 w-7'
                  width={50}
                  height={50}
                  alt={user.name ?? APP_TITLE}
                />
              )
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
