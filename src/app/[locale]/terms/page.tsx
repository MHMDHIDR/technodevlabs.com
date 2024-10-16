import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import Divider from '@/components/custom/divider'
import Layout from '@/components/custom/layout'
import { SecondaryHeading } from '@/components/ui/cover'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const termsTranslations = await getTranslations('terms')
  const title = `${termsTranslations('termsTitle')} | ${APP_TITLE}`
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
  const termsTranslations = await getTranslations('terms')

  return (
    <Layout className='p-4 py-20'>
      <h1 className='relative z-20 py-6 mx-auto mt-6 max-w-7xl text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <SecondaryHeading>{termsTranslations('termsTitle')}</SecondaryHeading>
      </h1>

      <Divider className='my-10' />

      <section className='py-20 leading-[2rem] text-justify container'>
        <p>{termsTranslations('lastUpdated', { date: '2024-10-01' })}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          1. {termsTranslations('introduction.header')}
        </h2>
        <p>{termsTranslations('introduction.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          2. {termsTranslations('useOfService.header')}
        </h2>
        <p>{termsTranslations('useOfService.content')}</p>
        <ul className='pl-8 mt-2 list-disc'>
          <li>{termsTranslations('useOfService.prohibitedUses1')}</li>
          <li>{termsTranslations('useOfService.prohibitedUses2')}</li>
          <li>{termsTranslations('useOfService.prohibitedUses3')}</li>
          <li>{termsTranslations('useOfService.prohibitedUses4')}</li>
          <li>{termsTranslations('useOfService.prohibitedUses5')}</li>
          <li>{termsTranslations('useOfService.prohibitedUses6')}</li>
        </ul>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          3. {termsTranslations('intellectualProperty.header')}
        </h2>
        <p>{termsTranslations('intellectualProperty.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          4. {termsTranslations('userContent.header')}
        </h2>
        <p>{termsTranslations('userContent.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          5. {termsTranslations('termination.header')}
        </h2>
        <p>{termsTranslations('termination.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          6. {termsTranslations('limitationOfLiability.header')}
        </h2>
        <p>{termsTranslations('limitationOfLiability.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          7. {termsTranslations('changesToTerms.header')}
        </h2>
        <p>{termsTranslations('changesToTerms.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          8. {termsTranslations('contactUs.header')}
        </h2>
        <p>
          {termsTranslations('contactUs.content')}
          <Link
            className='hover:underline text-neutral-800 dark:text-neutral-200'
            href='mailto:support@technodevlabs.com'
          >
            <strong>{termsTranslations('contactUs.email')}</strong>
          </Link>
        </p>
      </section>
    </Layout>
  )
}
