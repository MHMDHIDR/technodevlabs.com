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
    '/images/about/about-1.webp',
    '/images/about/about-2.webp',
    '/images/about/about-3.webp'
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
