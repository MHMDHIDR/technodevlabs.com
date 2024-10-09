'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  IconCode,
  IconCloudUpload,
  IconDeviceMobile,
  IconDatabase,
  IconChartBar,
  IconShieldLock,
  IconLayersLinked
} from '@tabler/icons-react'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'

export function ServicesSection() {
  const t = useTranslations('services')
  const pathname = usePathname()

  const servicesItems = [
    {
      title: t('customSoftwareDevelopment.title'),
      description: t('customSoftwareDevelopment.description'),
      src: '/custom-software-development.webp',
      icon: <IconCode className='w-4 h-4 text-neutral-100' />
    },
    {
      title: t('cloudSolutions.title'),
      description: t('cloudSolutions.description'),
      src: '/cloud-solutions.webp',
      icon: <IconCloudUpload className='w-4 h-4 text-neutral-100' />
    },
    {
      title: t('mobileAppDevelopment.title'),
      description: t('mobileAppDevelopment.description'),
      src: '/mobile-app-development.webp',
      icon: <IconDeviceMobile className='w-4 h-4 text-neutral-100' />
    },
    {
      title: t('dataAnalyticsBI.title'),
      description: t('dataAnalyticsBI.description'),
      src: '/data-analytics.webp',
      icon: <IconChartBar className='w-4 h-4 text-neutral-100' />
    },
    {
      title: t('databaseManagement.title'),
      description: t('databaseManagement.description'),
      src: '/database-management.webp',
      icon: <IconDatabase className='w-4 h-4 text-neutral-100' />
    },
    {
      title: t('cybersecurityServices.title'),
      description: t('cybersecurityServices.description'),
      src: '/cybersecurity.webp',
      icon: <IconShieldLock className='w-4 h-4 text-neutral-100' />
    },
    {
      title: t('apiIntegrationServices.title'),
      description: t('apiIntegrationServices.description'),
      src: '/api-integration.webp',
      icon: <IconLayersLinked className='w-4 h-4 text-neutral-100' />
    }
  ]

  // Conditionally display first 3 items if on homepage
  const displayedItems =
    pathname === '/services' || pathname === '/ar/services'
      ? servicesItems
      : servicesItems.slice(0, 3)

  return (
    <BentoGrid className='max-w-4xl mx-auto gap-4'>
      {displayedItems.map((item, index) => (
        <BentoGridItem
          key={index}
          className={index === 3 || index === 6 ? 'md:col-span-2' : ''}
          title={item.title}
          description={item.description}
          src={item.src}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  )
}
