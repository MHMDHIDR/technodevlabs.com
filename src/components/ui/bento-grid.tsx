'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/custom/button'

export const BentoGrid = ({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div className='flex flex-col gap-y-32'>
      <div
        className={cn(
          'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ',
          className
        )}
      >
        {children}
      </div>

      {usePathname() === '/' ? (
        <Link
          href={`/services`}
          className='relative px-4 py-2 mx-auto mt-4 text-center border rounded-full backdrop-blur-sm bg-emerald-300/10 border-emerald-500/20'
        >
          <span>Explore More Services →</span>
          <div className='absolute inset-x-0 w-3/4 h-px mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent' />
        </Link>
      ) : usePathname() === '/services' ? (
        <Link href={`/contact`} className='mx-auto'>
          <Button className='rounded-full' withArrow>
            Let's Bring Your Project to Life
          </Button>
        </Link>
      ) : null}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none relative dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col gap-y-2',
        className
      )}
    >
      {header}
      <div className='group-hover/bento:translate-x-2 transition duration-200 absolute bottom-0 bg-black'>
        {icon}
        <div className='font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2'>
          {title}
        </div>
        <div className='text-neutral-600 text-xs dark:text-neutral-300'>
          {description}
        </div>
      </div>
    </div>
  )
}