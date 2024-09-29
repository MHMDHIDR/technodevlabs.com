import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { AboutSection } from './about-section'
import { APP_TITLE, APP_DESCRIPTION } from '@/data/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `About us | ${APP_TITLE}`,
  description: APP_DESCRIPTION,
  openGraph: {
    title: `About us | ${APP_TITLE}`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/images/technodevlabs-opengraph.png',
        width: 1200,
        height: 650,
        alt: APP_DESCRIPTION
      }
    ],
    type: 'website',
    locale: 'en_US'
  }
}

export default function AboutPage() {
  return (
    <Layout className={`p-4 py-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        We Are <br /> <Cover>TechnoDevLabs</Cover>
      </h1>

      <AboutSection />
    </Layout>
  )
}
