'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { FlipWords } from '@/components/ui/flip-words'
import { LampContainer } from '@/components/ui/lamp'
import { Link } from '@/i18n/routing'

export function Hero() {
  // detect if the user is using a mobile device
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
  }, [])

  const heroTranslations = useTranslations('Hero')
  const words = heroTranslations('flipWords').split(',')

  return (
    <LampContainer className='pt-40'>
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

        <Link href='#projects' className='relative p-1 w-fit'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
          <span className='inline-block relative px-8 py-2 text-white bg-black rounded-md transition duration-200 hover:bg-transparent'>
            {heroTranslations('getStarted')}
          </span>
        </Link>
      </motion.div>
    </LampContainer>
  )
}
