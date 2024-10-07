import React from 'react'
import Link from 'next/link'
import { DeleteButton } from '@/components/custom/delete-button'
import { Modal } from '@/components/custom/modal'
import { formatDate } from '@/lib/format-date'
import { IconTrash } from '@tabler/icons-react'
import type { Post, Project } from '@/types'

interface DashboardListItemProps {
  item: Post | Project
  type: 'post' | 'project'
}

export default function DashboardListItem({ item, type }: DashboardListItemProps) {
  const isPost = type === 'post'
  const abstract = isPost
    ? (item as Post).content.replace(/<[^>]*>/g, ' ').slice(0, 150)
    : (item as Project).description.slice(0, 150)

  const linkHref = `/dashboard/${type}s/${item.id}`

  return (
    <div className='relative'>
      <Link href={linkHref} className='block group'>
        <div className='p-5 border border-gray-200 rounded-lg shadow-lg bg-neutral-50 dark:bg-gray-900 dark:shadow-gray-800 hover:shadow-xl dark:border-gray-400 hover:border-blue-500 duration-300'>
          <div className='flex items-center justify-between'>
            <h4 className='text-sm md:text-lg font-semibold group-hover:text-blue-600 transition duration-300'>
              {item.title}
            </h4>
            <span className='text-xs md:text-sm text-gray-500'>
              {formatDate(new Date(item.updatedAt).toDateString(), true)}
            </span>
          </div>
          <div className='mt-2 text-sm text-gray-700 dark:text-gray-300 truncate'>
            {abstract}...
          </div>
        </div>
      </Link>
      <Modal
        title={`Delete ${type}`}
        description={`Are you sure you want to delete this ${type}?`}
        className='absolute bottom-0.5 right-0.5'
        trigger={<IconTrash className='w-10 h-4 text-red-500' />}
      >
        <DeleteButton entryId={item.id} redirectTo={`/dashboard/${type}s`} type={type} />
      </Modal>
    </div>
  )
}
