'use client'

import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from '@/app/components/icons'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className='flex items-center p-1 mx-auto border rounded-full space-x-2 max-w-fit md:mx-0'>
      <button
        onClick={() => setTheme('light')}
        className={`${
          theme === 'light' ? 'bg-primary/30' : 'bg-transparent'
        } w-7 h-7 p-1 rounded-full`}
      >
        <Sun />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`${
          theme === 'system' ? 'bg-primary/30' : 'bg-transparent'
        } w-7 h-7 p-1 rounded-full`}
      >
        <Monitor />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`${
          theme === 'dark' ? 'bg-primary/30' : 'bg-transparent'
        } w-7 h-7 p-1 rounded-full`}
      >
        <Moon />
      </button>
    </div>
  )
}
