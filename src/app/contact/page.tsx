import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { ContactForm } from './contact-form'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Contact Support | ${APP_TITLE}`,
  description: APP_DESCRIPTION,
  openGraph: {
    title: `Contact Support | ${APP_TITLE}`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: APP_LOGO_opengraph,
        width: 1200,
        height: 650,
        alt: APP_DESCRIPTION
      }
    ],
    type: 'website',
    locale: 'en_US'
  }
}

export default function ContactPage() {
  return (
    <Layout className={`px-4 pt-10 pb-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Contact US</Cover>
      </h1>

      <ContactForm />
    </Layout>
  )
}
