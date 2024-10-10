'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function LampContainer({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-0 pt-20',
        className
      )}
    >
      <div className='relative z-0 flex items-center justify-center flex-1 w-full mt-24 scale-y-125 isolate'>
        <motion.div
          className='absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-purple-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]'
          initial={{ opacity: 0.5, width: '15rem' }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ opacity: 1, width: '30rem' }}
        >
          <div className='absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]' />
          <div className='absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]' />
        </motion.div>
        <motion.div
          className='absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-purple-400 text-white [--conic-position:from_290deg_at_center_top]'
          initial={{ opacity: 0.5, width: '15rem' }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ opacity: 1, width: '30rem' }}
        >
          <div className='absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]' />
          <div className='absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]' />
        </motion.div>
        <div className='absolute w-full h-48 top-1/2 translate-y-12 scale-x-150 bg-slate-950 blur-2xl' />
        <div className='absolute z-50 w-full h-48 bg-transparent top-1/2 opacity-10 backdrop-blur-md' />
        <div className='absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-purple-200 opacity-50 blur-3xl' />
        <motion.div
          className='absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-purple-400 blur-2xl'
          initial={{ width: '8rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ width: '16rem' }}
        />
        <motion.div
          className='absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-purple-400'
          initial={{ width: '15rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ width: '30rem' }}
        />

        <div className='absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 ' />
      </div>

      <div className='relative z-50 flex flex-col items-center px-5 -translate-y-80'>
        {children}
      </div>
    </div>
  )
}
