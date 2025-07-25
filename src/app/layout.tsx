import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { env } from '@/env'
import './globals.css'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    openGraph: {
      title: APP_TITLE,
      description: APP_DESCRIPTION,
      url: env.NEXT_PUBLIC_URL,
      siteName: APP_TITLE,
      images: [{ url: APP_LOGO_opengraph, width: 1200, height: 630, alt: APP_TITLE }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: APP_TITLE,
      description: APP_DESCRIPTION,
      images: [APP_LOGO_opengraph]
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
