import { APP_TITLE, APP_DESCRIPTION } from '@/data/constants'
import type { Metadata } from 'next'

export const metadata = ({
  pageName,
  pageDescription
}: {
  pageName?: string
  pageDescription?: string
}): Metadata => {
  return {
    title: `${pageName} | ${APP_TITLE}` || APP_TITLE,
    description: `${pageDescription} | ${APP_DESCRIPTION}` || APP_DESCRIPTION,
    openGraph: {
      title: `${pageName} | ${APP_TITLE}` || APP_TITLE,
      description: `${pageDescription} | ${APP_DESCRIPTION}` || APP_DESCRIPTION,
      images: [
        {
          url: '/images/technodevlabs-opengraph.png',
          width: 1200,
          height: 650,
          alt: `${pageName} | ${APP_DESCRIPTION}`
        }
      ],
      type: 'website',
      locale: 'en_US'
    }
  }
}
