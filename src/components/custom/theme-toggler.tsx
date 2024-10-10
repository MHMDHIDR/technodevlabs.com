'use client'

import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from '@/components/custom/icons'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className='flex items-center p-1 border rounded-full space-x-2 max-w-fit rtl:[direction:ltr]'>
      <button
        className={`${
          theme === 'light' ? 'bg-slate-100/30' : 'bg-transparent'
        } w-7 h-7 p-1 rounded-full`}
        onClick={() => setTheme('light')}
      >
        <Sun />
      </button>
      <button
        className={`${
          theme === 'system' ? 'bg-slate-100/30' : 'bg-transparent'
        } w-7 h-7 p-1 rounded-full`}
        onClick={() => setTheme('system')}
      >
        <Monitor />
      </button>

      <button
        className={`${
          theme === 'dark' ? 'bg-slate-100/30' : 'bg-transparent'
        } w-7 h-7 p-1 rounded-full`}
        onClick={() => setTheme('dark')}
      >
        <Moon />
      </button>
    </div>
  )
}
