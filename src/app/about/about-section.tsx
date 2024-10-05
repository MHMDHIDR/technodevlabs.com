'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ImagesSlider } from '@/components/ui/images-slider'
import Divider from '@/components/custom/divider'
import { Button } from '@/components/custom/button'

export function AboutSection() {
  const images = [
    'https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]

  return (
    <ImagesSlider className='h-[40rem]' images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}
        className='z-50 flex flex-col items-center justify-center'
      >
        {usePathname() === '/' ? (
          <motion.p className='py-3 text-xl font-bold text-center text-transparent md:text-6xl bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400'>
            Crafting Digital Solutions for the Future <br /> with Passion and Precision
          </motion.p>
        ) : (
          <motion.p className='container max-w-6xl py-3 text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400'>
            At TechnoDevLabs.com, we believe that software development is not just a profession—it's
            an art form. Our team combines technical expertise with creativity to deliver innovative
            digital solutions that empower businesses to thrive in a competitive landscape. We
            approach programming with a playful spirit, transforming complex challenges into
            engaging experiences that resonate with users.
            <Divider className='my-10' />
            Whether it’s building intuitive web applications or designing captivating user
            interfaces, our passion for technology drives us to push boundaries and explore new
            possibilities. Join us on this exciting journey as we shape the future of digital
            innovation, one line of code at a time!
            <Divider className='my-10' />
            TechnoDevLabs.com is a software development agency that provides software development
            services to clients mainly towards the middle-eastern.
          </motion.p>
        )}

        {/* Call To Action Button */}
        {usePathname() === '/' ? (
          <Link
            href={`/about`}
            className='relative px-4 py-2 mx-auto mt-4 text-center text-white border rounded-full backdrop-blur-sm bg-emerald-300/10 border-emerald-500/20'
          >
            <span>Know More! →</span>
            <div className='absolute inset-x-0 w-3/4 h-px mx-auto -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent' />
          </Link>
        ) : (
          <div className='my-10'>
            <Link href={`/contact`}>
              <Button className='text-gray-100 rounded-full' withArrow>
                Let's Bring Your Project to Life
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </ImagesSlider>
  )
}
