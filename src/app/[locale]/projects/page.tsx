import Layout from '@/components/custom/layout'
import { CardsCarouselDemo } from '@/components/ui/AppleCardsCarouse'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const title = `Projects | ${APP_TITLE}`
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

export default function Projects() {
  return (
    <Layout className='py-20 mx-auto'>
      <CardsCarouselDemo />
    </Layout>
  )
}
