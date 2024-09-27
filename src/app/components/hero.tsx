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
        className='flex flex-col items-center py-4 mt-10 tracking-tight select-none gap-y-10'
      >
        <h1 className='font-bold text-center text-transparent bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-4xl md:text-7xl leading-[3rem] md:leading-[6rem]'>
          Build
          <FlipWords words={words} />
          <br /> With TechnoDevLabs.
        </h1>

        <button className='relative p-1 w-fit'>
          <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500' />
          <div className='px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent'>
            Get Started
          </div>
        </button>
      </motion.div>
    </LampContainer>
  )
}
