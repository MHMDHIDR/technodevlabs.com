import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import Divider from '@/components/custom/divider'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const title = `Terms And Conditions | ${APP_TITLE}`
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

export default async function TermsAndConditionsPage() {
  const t = await getTranslations('terms')

  return (
    <Layout className='p-4 py-20'>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>{t('termsTitle')}</Cover>
      </h1>

      <Divider className='my-10' />

      <section className='py-20 leading-[2rem] text-justify container'>
        <p>{t('lastUpdated', { date: '2024-10-01' })}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>1. {t('introduction.header')}</h2>
        <p>{t('introduction.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>2. {t('useOfService.header')}</h2>
        <p>{t('useOfService.content')}</p>
        <ul className='list-disc pl-8 mt-2'>
          <li>{t('useOfService.prohibitedUses1')}</li>
          <li>{t('useOfService.prohibitedUses2')}</li>
          <li>{t('useOfService.prohibitedUses3')}</li>
          <li>{t('useOfService.prohibitedUses4')}</li>
          <li>{t('useOfService.prohibitedUses5')}</li>
          <li>{t('useOfService.prohibitedUses6')}</li>
        </ul>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>3. {t('intellectualProperty.header')}</h2>
        <p>{t('intellectualProperty.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>4. {t('userContent.header')}</h2>
        <p>{t('userContent.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>5. {t('termination.header')}</h2>
        <p>{t('termination.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>6. {t('limitationOfLiability.header')}</h2>
        <p>{t('limitationOfLiability.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>7. {t('changesToTerms.header')}</h2>
        <p>{t('changesToTerms.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>8. {t('contactUs.header')}</h2>
        <p>
          {t('contactUs.content')}
          <Link
            className='hover:underline text-neutral-800 dark:text-neutral-200'
            href='mailto:support@technodevlabs.com'
          >
            <strong>{t('contactUs.email')}</strong>
          </Link>
        </p>
      </section>
    </Layout>
  )
}
