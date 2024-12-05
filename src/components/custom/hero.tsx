'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { FlipWords } from '@/components/ui/flip-words'
import ShimmerButton from '@/components/ui/shimmer-button'
import { Link } from '@/i18n/routing'
import { Setting } from '@/types'

export function Hero({ settingsLayout }: { settingsLayout: Setting['layout'] }) {
  // detect if the user is using a mobile device
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
  }, [])

  const heroTranslations = useTranslations('Hero')
  const words = heroTranslations('flipWords').split(',')

  return (
    <section
      className={`h-fit pt-10 pb-44 w-full dark:bg-black bg-white relative ${clsx({
        'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settingsLayout === 'grid',
        'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]': settingsLayout === 'grid-small',
        'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settingsLayout === 'dotted'
      })}`}
    >
      <motion.div
        className='flex flex-col gap-y-10 items-center py-4 mt-10 tracking-tight select-none'
        initial={{ opacity: 0, y: 200 }}
        transition={{ delay: 0.25, duration: 0.85, ease: 'easeInOut' }}
        whileInView={{ opacity: 1, y: isMobile ? 50 : 100 }}
      >
        <h1 className='font-bold text-center text-transparent bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-4xl md:text-7xl leading-[3rem] md:leading-[6rem]'>
          {heroTranslations('build')}
          <FlipWords words={words} />
          <br /> {heroTranslations('with')}
        </h1>

        <Link href='/#projects' className='relative p-1 w-fit'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full' />
          <ShimmerButton className='shadow-2xl'>
            <span className='whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg'>
              {heroTranslations('getStarted')}
            </span>
          </ShimmerButton>
        </Link>
      </motion.div>
    </section>
  )
}
