'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { updateLayoutAction } from '@/actions'
import { Error } from '@/components/custom/icons'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useTranslations } from 'next-intl'
import type { Setting } from '@/types'

function LayoutSwitch({ initialLayout }: { initialLayout: Setting['layout'] }) {
  const [layout, setLayout] = useState(initialLayout)
  const [isUpdating, setIsUpdating] = useState(false)
  const settings = useTranslations('dashboard.settings')

  const handleLayoutChange = async (checked: boolean) => {
    const newLayout = checked ? 'grid' : 'dotted'
    setIsUpdating(true)
    setLayout(newLayout)

    const { message, success } = await updateLayoutAction({ layout: newLayout })

    if (!success) {
      console.error(message)
      setLayout(layout)
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
