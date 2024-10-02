'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FlipWords } from '@/components/ui/flip-words'
import { LampContainer } from '@/components/ui/lamp'
import Link from 'next/link'

export function Hero() {
  // detect if the user is using a mobile device
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
  }, [])

  const words = ['WebApp', 'MobileApp', 'Desktop Apps', 'Landing Pages']

  return (
    <LampContainer className='pt-40'>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: isMobile ? 50 : 100 }}
        transition={{
          delay: 0.25,
          duration: 0.85,
          ease: 'easeInOut'
        }}
        className='flex flex-col items-center py-4 mt-10 tracking-tight select-none gap-y-10'
      >
        <h1 className='font-bold text-center text-transparent bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-4xl md:text-7xl leading-[3rem] md:leading-[6rem]'>
          Build
          <FlipWords words={words} />
          <br /> With TechnoDevLabs.
        </h1>

        <button className='relative p-1 w-fit'>
          <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500' />
          <Link
            href={'/#contact'}
            className='relative inline-block px-8 py-2 text-white transition duration-200 bg-black rounded-md hover:bg-transparent'
          >
            Get Started
          </Link>
        </button>
      </motion.div>
    </LampContainer>
  )
}
