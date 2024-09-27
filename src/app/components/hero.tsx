'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FlipWords } from '@/components/ui/flip-words'
import { LampContainer } from '@/components/ui/lamp'

export function Hero() {
  const words = ['WebApp', 'MobileApp', 'Desktop Apps', 'Landing Pages']

  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 35 }}
        transition={{
          delay: 0.25,
          duration: 0.85,
          ease: 'easeInOut'
        }}
        className='py-4 mt-10 select-none tracking-tight flex items-center flex-col gap-y-10'
      >
        <h1 className='text-4xl font-bold text-center text-transparent bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text md:text-7xl'>
          Build
          <FlipWords words={words} />
          <br /> With TechnoDevLabs.
        </h1>

        <button className='p-1 relative w-fit'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
          <div className='px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent'>
            Get Started
          </div>
        </button>
      </motion.div>
    </LampContainer>
  )
}
