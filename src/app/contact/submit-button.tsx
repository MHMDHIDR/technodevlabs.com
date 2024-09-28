'use client'

import { useFormStatus } from 'react-dom'
import { Loading } from '@/components/custom/icons'
import { Button } from '@/components/custom/button'

export function SubmitButton({
  disabled,
  children
}: {
  disabled?: boolean
  children: React.ReactNode
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      aria-disabled={disabled ?? pending}
      disabled={disabled ?? pending}
      className={`bg-gradient-to-br group relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${
        disabled ?? pending ? 'cursor-progress opacity-50' : ''
      }`}
    >
      <span className='flex items-center justify-center'>
        {children}
        {disabled ?? pending ? (
          <Loading className='w-6 h-6 mx-3' />
        ) : (
          <span className='ml-1 transition-transform duration-300 group-hover:translate-x-2'>
            &rarr;
          </span>
        )}
      </span>
    </Button>
  )
}
