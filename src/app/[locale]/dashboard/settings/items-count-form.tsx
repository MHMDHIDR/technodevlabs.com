'use client'

import { useTranslations } from 'next-intl'
import { useActionState, useEffect } from 'react'
import { ItemsCountActionState, updateItemsCountAction } from '@/actions/settings/items-count'
import { Button } from '@/components/custom/button'
import { Loading } from '@/components/custom/icons'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import type { Setting } from '@/types'

export default function ItemsCountForm({ settings }: { settings: Setting }) {
  const settingsTranslations = useTranslations('dashboard.settings')
  const toast = useToast()

  const [state, action, isPending] = useActionState<ItemsCountActionState, FormData>(
    updateItemsCountAction,
    {
      id: settings.id,
      success: true,
      message: '',
      itemsCount: settings.itemsCount
    }
  )

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message)
      } else {
        toast.error(state.message)
      }
    }
  }, [state.message, state.success, toast])

  return (
    <form action={action} className='mt-4 space-y-2'>
      <label className='block text-sm font-medium'>{settingsTranslations('itemsCount')}</label>
      <Input
        type='number'
        name='itemsCount'
        defaultValue={state.itemsCount}
        className='max-w-xs'
        min={1}
        max={50}
        required
      />

      <Button disabled={isPending} className={isPending ? 'opacity-50 cursor-not-allowed' : ''}>
        {isPending ? (
          <>
            <Loading className='w-5 h-5 mx-1.5 animate-spin' />
            {settingsTranslations('updatingSettings')}
          </>
        ) : (
          settingsTranslations('updateSettings')
        )}
      </Button>
    </form>
  )
}
