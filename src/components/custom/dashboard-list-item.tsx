import { IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'
import { DeleteButton } from '@/components/custom/delete-button'
import { Modal } from '@/components/custom/modal'
import { formatDate } from '@/lib/format-date'
import { Locale } from '@/i18n/request'
import type { DashboardListItemProps, Post, Project } from '@/types'

export default async function DashboardListItem({ item, type }: DashboardListItemProps) {
  const actions = await getTranslations('actions')
  const currentLocale = (await getLocale()) as Locale

  const isPost = type === 'post'
  const abstract = isPost
    ? (item as Post).content.replace(/<[^>]*>/g, ' ').slice(0, 150)
    : (item as Project).description.slice(0, 150)

  const linkHref = `/dashboard/${type}s/${item.id}`

  return (
    <div className='relative'>
      <Link className='block group' href={linkHref}>
        <div className='p-5 rounded-lg border border-gray-200 shadow-lg duration-300 bg-neutral-50 dark:bg-gray-900 dark:shadow-gray-800 hover:shadow-xl dark:border-gray-400 hover:border-blue-500'>
          <div className='flex justify-between items-center'>
            <h4 className='text-sm font-semibold transition duration-300 md:text-lg group-hover:text-blue-600'>
              {item.title}
            </h4>
            <span className='text-xs text-gray-500 md:text-sm'>
              {formatDate(new Date(item.updatedAt).toDateString(), currentLocale, true)}
            </span>
          </div>
          <div className='mt-2 text-sm text-gray-700 truncate dark:text-gray-300'>
            {abstract}...
          </div>
        </div>
      </Link>
      <Modal
        className={`absolute bottom-0.5 ${currentLocale === 'en' ? 'right-0.5' : 'left-0.5'}`}
        description={actions('deleteConfirmation', { type })}
        title={actions('deleteButton', { type })}
        trigger={<IconTrash className='w-10 h-4 text-red-500' />}
      >
        <DeleteButton entryId={item.id} redirectTo={`/dashboard/${type}s`} type={type} />
      </Modal>
    </div>
  )
}
