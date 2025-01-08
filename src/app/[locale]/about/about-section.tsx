'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/custom/button'
import Divider from '@/components/custom/divider'
import { ImagesSlider } from '@/components/ui/images-slider'
import { Link, usePathname } from '@/i18n/routing'

export function AboutSection() {
  const pathname = usePathname()
  const aboutTranslations = useTranslations('about')

  const images = [
    'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1613068687893-5e85b4638b56?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]

  return (
    <ImagesSlider className={clsx({ 'md:h-[30rem]': pathname === '/' })} images={images}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -80 }}
        transition={{ duration: 0.6 }}
        className='flex z-50 flex-col justify-center items-center select-none'
      >
        {pathname === '/' ? (
          <motion.p className='py-3 text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b md:text-6xl from-neutral-50 to-neutral-400'>
            {aboutTranslations('homeTitle')}
          </motion.p>
        ) : (
          <motion.p className='container py-5 max-w-6xl text-sm md:text-lg leading-[3rem!important] rtl:text-right font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400'>
            {aboutTranslations('aboutText')}
            <Divider className='my-10' />
            {aboutTranslations('aboutDividerText')}
            <Divider className='my-10' />
            {aboutTranslations('agencyText')}
          </motion.p>
        )}

        {/* Call To Action Button */}
        {pathname === '/' || pathname === '/ar' ? (
          <div className='my-10'>
            <Link href='/about'>
              <Button className='text-gray-100 rounded-full' withArrow>
                {aboutTranslations('knowMore')}
              </Button>
            </Link>
          </div>
        ) : (
          <div className='my-10'>
            <Link href='/contact'>
              <Button className='text-gray-100 rounded-full' withArrow>
                {aboutTranslations('ctaButton')}
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </ImagesSlider>
  )
}
