'use client'

import { IconLoader3 } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { deleteEntryAndRevalidateAction } from '@/actions'
import { useModal } from '@/components/ui/animated-modal'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'
import type { itemsTypes } from '@/types'

export function DeleteButton({
  entryId,
  onSuccess,
  projectId,
  redirectTo,
  type
}: {
  entryId: string
  type: itemsTypes
  redirectTo?: string
  projectId?: string
  onSuccess?(): void
}) {
  const [isPending, startTransition] = useTransition()
  const { replace } = useRouter()
  const { setOpen } = useModal()
  const currentLocale = useLocale()
  const toast = useToast()
  const handleDelete = () => {
    startTransition(async () => {
      const { message, success } = await deleteEntryAndRevalidateAction({
        entryId,
        type,
        projectId
      })

      if (!success) {
        return toast.error(message)
      }

      toast.success(message)

      if (type === 'projectImg') {
        onSuccess?.()
      } else {
        replace(redirectTo ?? `/dashboard/${type}s`)
      }
    })

    setOpen(false)
  }

  return (
    <button
      className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50'
      disabled={isPending}
      onClick={handleDelete}
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
