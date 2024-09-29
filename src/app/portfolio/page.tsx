import Layout from '@/components/custom/layout'
import { APP_TITLE, APP_DESCRIPTION } from '@/data/constants'
import type { Metadata } from 'next'

export const metadata:Metadata = {
  title: `Portfolio | ${APP_TITLE}`,
  description: APP_DESCRIPTION,
  openGraph: {
    title: `Portfolio | ${APP_TITLE}`,
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

export default function Portfolio() {
  return <Layout>Portfolio Page</Layout>
}
