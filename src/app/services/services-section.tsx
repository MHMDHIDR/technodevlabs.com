'use client'

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
  const pathname = usePathname()

  // Conditionally display first 3 items if on homepage
  const displayedItems =
    pathname === '/services' ? servicesItems : servicesItems.slice(0, 3)

  return (
    <BentoGrid className='max-w-4xl mx-auto gap-4'>
      {displayedItems.map((item, index) => (
        <BentoGridItem
          key={index}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={index === 3 || index === 6 ? 'md:col-span-2' : ''}
        />
      ))}
    </BentoGrid>
  )
}

const servicesItems = [
  {
    title: 'Custom Software Development',
    description: 'Tailored software solutions to meet your unique business needs.',
    header: (
      <Image
        src='/images/services/custom-software-development.webp'
        alt='Custom Software Development'
        className='object-cover w-full h-full rounded-xl'
        height={150}
        width={255}
      />
    ),
    icon: <IconCode className='w-4 h-4 text-neutral-100' />
  },
  {
    title: 'Cloud Solutions',
    description: 'Leverage the power of the cloud to scale and optimize your business.',
    header: (
      <Image
        src='/images/services/cloud-solutions.webp'
        alt='Cloud Solutions'
        className='object-cover w-full h-full rounded-xl'
        height={150}
        width={255}
      />
    ),
    icon: <IconCloudUpload className='w-4 h-4 text-neutral-100' />
  },
  {
    title: 'Mobile App Development',
    description:
      'iOS and Android apps designed to enhance user experience and functionality.',
    header: (
      <Image
        src='/images/services/mobile-app-development.webp'
        alt='Mobile App Development'
        className='object-cover w-full h-full rounded-xl'
        height={150}
        width={255}
      />
    ),
    icon: <IconDeviceMobile className='w-4 h-4 text-neutral-100' />
  },
  {
    title: 'Data Analytics & BI',
    description:
      'Transform data into actionable insights to drive your business forward.',
    header: (
      <Image
        src='/images/services/data-analytics.webp'
        alt='Data Analytics & BI'
        className='object-cover w-full h-full rounded-xl'
        height={150}
        width={255}
      />
    ),
    icon: <IconChartBar className='w-4 h-4 text-neutral-100' />
  },
  {
    title: 'Database Management',
    description:
      'Efficient and secure database solutions for high-performance applications.',
    header: (
      <Image
        src='/images/services/database-management.webp'
        alt='Database Management'
        className='object-cover w-full h-full rounded-xl'
        height={150}
        width={255}
      />
    ),
    icon: <IconDatabase className='w-4 h-4 text-neutral-100' />
  },
  {
    title: 'Cybersecurity Services',
    description: 'Protect your digital assets with cutting-edge security solutions.',
    header: (
      <Image
        src='/images/services/cybersecurity.webp'
        alt='Cybersecurity Services'
        className='object-cover w-full h-full rounded-xl'
        height={150}
        width={255}
      />
    ),
    icon: <IconShieldLock className='w-4 h-4 text-neutral-100' />
  },
  {
    title: 'API & Integration Services',
    description: 'Seamlessly connect different platforms with robust API solutions.',
    header: (
      <Image
        src='/images/services/api-integration.webp'
        alt='API & Integration Services'
        className='object-cover w-full h-full rounded-xl'
        height={150}
        width={255}
      />
    ),
    icon: <IconLayersLinked className='w-4 h-4 text-neutral-100' />
  }
]
