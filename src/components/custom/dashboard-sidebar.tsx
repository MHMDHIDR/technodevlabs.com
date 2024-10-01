'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IconBrandTabler, IconBook, IconCode, IconLogout2 } from '@tabler/icons-react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { APP_TITLE } from '@/data/constants'
import { deleteCookieAction } from '@/app/actions/delete-cookie'
// import { signOut } from '@/auth'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'

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
          <div className='flex flex-col gap-2'>
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>

        <div className='mt-8 flex flex-col gap-2'>
          <button
            className='flex items-center justify-start gap-2 group/sidebar py-2'
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
                  className='h-7 w-7 flex-shrink-0 rounded-full'
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
