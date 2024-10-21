import { Link } from '@/i18n/routing'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import Divider from '@/components/custom/divider'
import Layout from '@/components/custom/layout'
import { SecondaryHeading } from '@/components/ui/cover'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/request'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const privacyTranslations = await getTranslations('privacy')
  const title = `${privacyTranslations('privacyPolicyTitle')} | ${APP_TITLE}`
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

export default async function PrivacyPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale)
  const privacyTranslations = await getTranslations('privacy')

  return (
    <Layout className='p-4 py-20'>
      <h1 className='relative z-20 py-6 mx-auto mt-6 max-w-7xl text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <SecondaryHeading>{privacyTranslations('privacyPolicyTitle')}</SecondaryHeading>
      </h1>

      <Divider className='my-10' />

      <section className='container py-20 leading-relaxed text-justify'>
        <p className='mb-4'>{privacyTranslations('lastUpdated')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          {privacyTranslations('introduction.header')}
        </h2>
        <p className='mb-4'>{privacyTranslations('introduction.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          {privacyTranslations('informationWeCollect.header')}
        </h2>
        <p className='mb-4'>{privacyTranslations('informationWeCollect.content')}</p>
        <ul className='pl-8 mb-4 list-disc'>
          <li>
            <strong>{privacyTranslations('informationWeCollect.personalData')}</strong>
          </li>
          <li>
            <strong>{privacyTranslations('informationWeCollect.usageData')}</strong>
          </li>
        </ul>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          {privacyTranslations('howWeUseYourInformation.header')}
        </h2>
        <p className='mb-4'>{privacyTranslations('howWeUseYourInformation.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          {privacyTranslations('dataSharingAndDisclosure.header')}
        </h2>
        <p className='mb-4'>{privacyTranslations('dataSharingAndDisclosure.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          {privacyTranslations('yourRightsAndChoices.header')}
        </h2>
        <p className='mb-4'>{privacyTranslations('yourRightsAndChoices.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          {privacyTranslations('security.header')}
        </h2>
        <p className='mb-4'>{privacyTranslations('security.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          {privacyTranslations('changesToThisPolicy.header')}
        </h2>
        <p className='mb-4'>{privacyTranslations('changesToThisPolicy.content')}</p>

        <h2 className='mt-8 mb-4 text-2xl font-semibold'>
          {privacyTranslations('contactUs.header')}
        </h2>
        <p className='mb-4'>
          {privacyTranslations('contactUs.content')}{' '}
          <Link
            className='hover:underline text-neutral-800 dark:text-neutral-200'
            href='mailto:support@technodevlabs.com'
          >
            <strong>{privacyTranslations('contactUs.email')}</strong>
          </Link>
          .
        </p>
      </section>
    </Layout>
  )
}
