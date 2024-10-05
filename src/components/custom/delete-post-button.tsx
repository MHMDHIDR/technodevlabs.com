'use client'

import { IconLoader3 } from '@tabler/icons-react'
import { useTransition } from 'react'
import { Error, Success } from '@/components/custom/icons'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useModal } from '../ui/animated-modal'
import { deletePostAndRevalidate } from '@/app/actions'

export function DeletePostButton({
  postId,
  redirectTo
}: {
  postId: string
  redirectTo?: string
}) {
  const [isPending, startTransition] = useTransition()
  const { replace } = useRouter()
  const { setOpen } = useModal()

  const handleDelete = () => {
    startTransition(async () => {
      const { success, message } = await deletePostAndRevalidate(postId)

      if (!success) {
        toast(message, {
          icon: <Error className='inline-block' />,
          position: 'bottom-center',
          className: 'text-center rtl select-none',
          style: {
            backgroundColor: '#FDE7E7',
            color: '#C53030',
            border: '1px solid #C53030',
            gap: '1.5rem',
            textAlign: 'justify'
          }
        })
        return
      }

      toast(message, {
        icon: <Success className='inline-block' />,
        position: 'bottom-center',
        className: 'text-center rtl select-none',
        style: {
          backgroundColor: '#F0FAF0',
          color: '#367E18',
          border: '1px solid #367E18',
          gap: '1.5rem',
          textAlign: 'justify'
        }
      })

      setOpen(false)
      replace(redirectTo ?? '/dashboard/posts')
    })
  }

  return (
    <button
      className='px-2 py-1 text-sm text-white bg-black border border-black dark:bg-white dark:text-black rounded-md w-28'
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? (
        <span className='flex gap-x-2'>
          <IconLoader3 className='w-5 h-5 animate-spin' />
          Deleting...
        </span>
      ) : (
        'Delete'
      )}
    </button>
  )
}
