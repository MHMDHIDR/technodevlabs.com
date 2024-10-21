'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { updateLayoutAction } from '@/actions'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import type { Setting } from '@/types'

function LayoutSwitch({ Layout }: { Layout: Setting }) {
  const [layout, setLayout] = useState<Setting['layout']>(Layout.layout)
  const [isUpdating, setIsUpdating] = useState(false)
  const settings = useTranslations('dashboard.settings')
  const toast = useToast()

  const handleLayoutChange = async () => {
    const layouts: Setting['layout'][] = ['dotted', 'grid', 'grid-small']
    const currentIndex = layouts.indexOf(layout)
    const newLayout = layouts[(currentIndex + 1) % layouts.length]

    setIsUpdating(true)

    const { message, success } = await updateLayoutAction({ id: Layout.id, layout: newLayout })

    if (success) {
      setLayout(newLayout)
      toast.success(message)
    } else {
      console.error(message)
      toast.error(message)
    }

    setIsUpdating(false)
  }

  return (
    <div className='flex items-center gap-x-2'>
      <Switch layout={layout} disabled={isUpdating} onCheckedChange={handleLayoutChange} />
      <Label>{settings(layout)}</Label>
    </div>
  )
}

export default LayoutSwitch
