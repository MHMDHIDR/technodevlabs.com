'use client'

import { useState } from 'react'
import { updateLayoutAction } from '@/actions'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useTranslations } from 'next-intl'
import { useToast } from '@/hooks/use-toast'
import type { Setting } from '@/types'

function LayoutSwitch({ initialLayout }: { initialLayout: Setting['layout'] }) {
  const [layout, setLayout] = useState(initialLayout)
  const [isUpdating, setIsUpdating] = useState(false)
  const settings = useTranslations('dashboard.settings')
  const toast = useToast()

  const handleLayoutChange = async (checked: boolean) => {
    const newLayout = checked ? 'grid' : 'dotted'
    setIsUpdating(true)
    setLayout(newLayout)

    const { message, success } = await updateLayoutAction({ layout: newLayout })

    if (!success) {
      console.error(message)
      setLayout(layout)
      return toast.error(message)
    }

    toast.success(message)
    setIsUpdating(false)
  }

  return (
    <div className='flex items-center gap-x-2'>
      <Switch
        checked={layout === 'grid'}
        disabled={isUpdating}
        id='layout-switch'
        onCheckedChange={handleLayoutChange}
      />
      <Label htmlFor='layout-switch'>
        {settings(layout === 'grid' ? 'gridLayout' : 'dottedLayout')}
      </Label>
    </div>
  )
}

export default LayoutSwitch
