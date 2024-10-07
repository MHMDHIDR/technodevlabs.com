'use client'

import { updateLayoutAction } from '@/app/actions'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Error } from '@/components/custom/icons'
import { toast } from 'sonner'
import type { Setting } from '@/types'

const LayoutSwitch = ({ initialLayout }: { initialLayout: Setting['layout'] }) => {
  const [layout, setLayout] = useState(initialLayout)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleLayoutChange = async (checked: boolean) => {
    const newLayout = checked ? 'grid' : 'dotted'
    setIsUpdating(true)
    setLayout(newLayout)

    const { success, message } = await updateLayoutAction({ layout: newLayout })

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
    <div className='flex items-center space-x-2'>
      <Switch
        id='layout-switch'
        checked={layout === 'grid'}
        onCheckedChange={handleLayoutChange}
        disabled={isUpdating}
      />
      <Label htmlFor='layout-switch'>{layout === 'grid' ? 'Grid Layout' : 'Dotted Layout'}</Label>
    </div>
  )
}

export default LayoutSwitch
