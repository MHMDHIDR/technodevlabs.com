'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ImagesSlider } from '@/components/ui/images-slider'
import Divider from '@/components/custom/divider'
import { Button } from '@/components/custom/button'
import { useTranslations } from 'next-intl'

export function AboutSection() {
  const pathname = usePathname()
  const t = useTranslations('about')

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
        {pathname === '/' || pathname === '/ar' ? (
          <motion.p className='py-3 text-xl font-bold text-center text-transparent md:text-6xl bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400'>
            {t('homeTitle')}
          </motion.p>
        ) : (
          <motion.p className='container max-w-6xl py-3 text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400'>
            {t('aboutText')}
            <Divider className='my-10' />
            {t('aboutDividerText')}
            <Divider className='my-10' />
            {t('agencyText')}
          </motion.p>
        )}

        {/* Call To Action Button */}
        {pathname === '/' || pathname === '/ar' ? (
          <div className='my-10'>
            <Link href={`/about`}>
              <Button className={`text-gray-100 rounded-full`} withArrow>
                {t('knowMore')}
              </Button>
            </Link>
          </div>
        ) : (
          <div className='my-10'>
            <Link href={`/contact`}>
              <Button className={`text-gray-100 rounded-full`} withArrow>
                {t('ctaButton')}
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </ImagesSlider>
  )
}
