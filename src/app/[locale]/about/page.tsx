import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { AboutSection } from './about-section'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import type { Metadata } from 'next'
import { getSettings } from '@/data/settings'
import { clsx } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

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

export default async function AboutPage() {
  const settings = await getSettings()
  const t = await getTranslations('about')

  return (
    <Layout>
      <div
        className={`h-fit py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings?.layout === 'grid',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings?.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

        <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          {t('pageTitle')} <br /> <Cover>TechnoDevLabs</Cover>
        </h1>

        <AboutSection />
      </div>
    </Layout>
  )
}
