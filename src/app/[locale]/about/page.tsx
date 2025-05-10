import { getTranslations } from 'next-intl/server'
import Layout from '@/components/custom/layout'
import { SecondaryHeading } from '@/components/ui/cover'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { getSettings } from '@/data/settings'
import { clsx } from '@/lib/utils'
import { AboutSection } from './about-section'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const aboutTranslations = await getTranslations('about')
  const title = `${aboutTranslations('pageTitle')} | ${APP_TITLE}`
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

export const dynamic = 'force-static'
export const revalidate = 86400

export default async function AboutPage() {
  const settings = (await getSettings()) || { layout: 'dotted' }
  const aboutTranslations = await getTranslations('about')

  return (
    <Layout>
      <div
        className={`h-fit pt-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings.layout === 'grid',
          'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]':
            settings.layout === 'grid-small',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

        <h1 className='relative z-20 py-6 mx-auto mt-6 max-w-7xl text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          {aboutTranslations('pageTitle')}
          &nbsp;
          <SecondaryHeading>TechnoDevLabs</SecondaryHeading>
        </h1>

        <AboutSection />
      </div>
    </Layout>
  )
}
