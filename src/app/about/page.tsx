import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { AboutSection } from './about-section'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const title = `About US | ${APP_TITLE}`
  const description = APP_DESCRIPTION

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  }
}

export default function AboutPage() {
  return (
    <Layout>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        We Are <br /> <Cover>TechnoDevLabs</Cover>
      </h1>

      <AboutSection />
    </Layout>
  )
}
