import type { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { ContactForm } from './contact-form'
import Layout from '@/components/custom/layout'
import { SecondaryHeading } from '@/components/ui/cover'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import { getSettings } from '@/data/settings'
import { clsx } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const contactTranslations = await getTranslations('contact')
  const title = `${contactTranslations('pageTitle')} | ${APP_TITLE}`
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

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const settings = await getSettings()
  const contactTranslations = await getTranslations('contact')

  return (
    <Layout>
      <div
        className={`h-fit p-4 py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings?.layout === 'grid',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings?.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

        <h1 className='relative z-20 py-6 mx-auto mt-6 max-w-2xl text-4xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          <SecondaryHeading>{contactTranslations('pageTitle')}</SecondaryHeading>
        </h1>

        <ContactForm />
      </div>
    </Layout>
  )
}
