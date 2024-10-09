import Link from 'next/link'
import Divider from '@/components/custom/divider'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const title = `Privacy Policy | ${APP_TITLE}`
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

export default async function PrivacyPage() {
  const t = await getTranslations('privacy')

  return (
    <Layout className={`p-4 py-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>{t('privacyPolicyTitle')}</Cover>
      </h1>

      <Divider className='my-10' />

      <section className='py-20 leading-relaxed text-justify container'>
        <p className='mb-4'>{t('lastUpdated')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>{t('introduction.header')}</h2>
        <p className='mb-4'>{t('introduction.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>{t('informationWeCollect.header')}</h2>
        <p className='mb-4'>{t('informationWeCollect.content')}</p>
        <ul className='list-disc pl-8 mb-4'>
          <li>
            <strong>{t('informationWeCollect.personalData')}</strong>
          </li>
          <li>
            <strong>{t('informationWeCollect.usageData')}</strong>
          </li>
        </ul>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>{t('howWeUseYourInformation.header')}</h2>
        <p className='mb-4'>{t('howWeUseYourInformation.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>{t('dataSharingAndDisclosure.header')}</h2>
        <p className='mb-4'>{t('dataSharingAndDisclosure.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>{t('yourRightsAndChoices.header')}</h2>
        <p className='mb-4'>{t('yourRightsAndChoices.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>{t('security.header')}</h2>
        <p className='mb-4'>{t('security.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>{t('changesToThisPolicy.header')}</h2>
        <p className='mb-4'>{t('changesToThisPolicy.content')}</p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>{t('contactUs.header')}</h2>
        <p className='mb-4'>
          {t('contactUs.content')}{' '}
          <Link
            href='mailto:support@technodevlabs.com'
            className='hover:underline text-neutral-800 dark:text-neutral-200'
          >
            <strong>{t('contactUs.email')}</strong>
          </Link>
          .
        </p>
      </section>
    </Layout>
  )
}
