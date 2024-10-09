import Link from 'next/link'
import { cn, clsx } from '@/lib/utils'
import type { BlockProps } from '@/types'

export const Block = ({
  href,
  blockLabel,
  blockDescription,
  blockIcon,
  className,
  children
}: BlockProps): JSX.Element => {
  return (
    <Link
      href={href}
      className={cn(
        `p-6 select-none rounded-lg bg-blue-50 dark:bg-gray-800 group${clsx({
          'pointer-events-none': !href,
          '': href
        })}`,
        className
      )}
      title={blockDescription}
    >
      <span className='text-gray-500 dark:text-gray-400'>{blockIcon}</span>

      <h3 className='mt-6 font-medium text-gray-700 dark:text-gray-200'>{blockLabel}</h3>

      <p className='mt-2 text-gray-500 dark:text-gray-400'>{blockDescription}</p>

      <span className='inline-flex items-center mt-4 text-sm text-blue-500 group-hover:cursor-pointer gap-x-2 dark:text-blue-400 group-hover:underline'>
        <span>{children ?? 'Start exploring'}</span>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5 rtl:rotate-180 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
          />
        </svg>
      </span>
    </Link>
  )
}
