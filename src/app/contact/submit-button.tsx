'use client'

import { useFormStatus } from 'react-dom'
import { Loading } from '../components/icons'

export function SubmitButton({
  disabled,
  children
}: {
  disabled?: boolean
  children: React.ReactNode
}) {
  const { pending } = useFormStatus()

  return (
    <button
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
      <BottomGradient />
    </button>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className='absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover/btn:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover/btn:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  )
}
