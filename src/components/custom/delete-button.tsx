'use client'

import { IconLoader3 } from '@tabler/icons-react'
import { useTransition } from 'react'
import { Error, Success } from '@/components/custom/icons'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useModal } from '../ui/animated-modal'
import { deleteEntryAndRevalidateAction } from '@/actions'
import { useLocale } from 'next-intl'
import type { itemsTypes } from '@/types'

export function DeleteButton({
  entryId,
  type,
  redirectTo,
  projectId,
  onSuccess
}: {
  entryId: string
  type: itemsTypes
  redirectTo?: string
  projectId?: string
  onSuccess?: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const { replace } = useRouter()
  const { open, setOpen } = useModal()
  const currentLocale = useLocale()

  const handleDelete = () => {
    startTransition(async () => {
      const { success, message } = await deleteEntryAndRevalidateAction({
        entryId,
        type,
        projectId
      })

      if (!success) {
        toast(message, {
          icon: <Error />,
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
        icon: <Success />,
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

      if (type === 'projectImg') {
        onSuccess?.()

        console.log('open :>> ', open)
      } else {
        replace(redirectTo ?? `/dashboard/${type}s`)
      }
    })

    setOpen(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50'
    >
      {isPending ? (
        <span className='flex items-center'>
          <IconLoader3 className='animate-spin mr-2' />
          {currentLocale ? 'Deleting...' : 'جار الحذف...'}
        </span>
      ) : currentLocale === 'en' ? (
        'Delete'
      ) : (
        'حذف'
      )}
    </button>
  )
}
