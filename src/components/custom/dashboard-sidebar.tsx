'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IconLogout2, IconBrandTabler, IconBook, IconCode } from '@tabler/icons-react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { logOut } from '@/app/actions/auth'
import { APP_LOGO, APP_TITLE } from '@/data/constants'
import type { User } from '@/types'

export function DashboardSidebar({ user }: { user: User }) {
  const links = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: (
        <IconBrandTabler className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Projects',
      href: '/dashboard/projects',
      icon: (
        <IconCode className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Posts',
      href: '/dashboard/posts',
      icon: (
        <IconBook className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    }
  ]
  const [open, setOpen] = useState(false)

  return !user ? null : (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className='justify-between gap-10'>
        <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
          {open ? (
            <div className='flex gap-x-2'>
              <Image src={APP_LOGO} alt={APP_TITLE} width={40} height={40} />
              <span
                className={`[font-family:Orbitron] text-gradient select-none hidden sm:inline-block text-sm md:text-xl`}
              >
                TechnoDevLabs
              </span>
            </div>
          ) : (
            <Image src={APP_LOGO} alt={APP_TITLE} width={40} height={40} />
          )}
          <div className='mt-8 flex flex-col gap-2'>
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: 'Sign Out',
              href: '',
              type: 'button',
              icon: <IconLogout2 className='w-6 h-6 mr-2 stroke-red-600' />
            }}
            onClick={async () => await logOut()}
          />
          <SidebarLink
            link={{
              label: user.name,
              href: '/dashboard',
              icon: (
                <Image
                  src={user.picture ?? '/images/logo.png'}
                  className='h-7 w-7 flex-shrink-0 rounded-full'
                  width={50}
                  height={50}
                  alt={user.name ?? 'Avatar'}
                />
              )
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
