import { PostsSection } from '@/app/[locale]/posts/posts-section'
import { auth } from '@/auth'
import { AddButton } from '@/components/custom/add-button'
import EmptyState from '@/components/custom/empty-state'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { getPosts } from '@/data/posts'
import { getSettings } from '@/data/settings'
import { clsx } from '@/lib/utils'
import type { Metadata } from 'next'
import type { User } from 'next-auth'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const title = `Blog | ${APP_TITLE}`
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

export default async function PostsPage() {
  const settings = await getSettings()
  const { postsCount } = await getPosts()
  const session = await auth()
  let user: User | null = null

  if (session && session.user) {
    user = session.user
  }

  return (
    <Layout>
      <div
        className={`h-fit p-4 py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings?.layout === 'grid',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings?.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

        <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          <Cover>Posts</Cover>
        </h1>

        {user ? (
          <div className='w-fit mb-6 ml-auto'>
            <AddButton href='/dashboard/posts/add'>Add Post</AddButton>
          </div>
        ) : null}

        {postsCount === 0 ? (
          <EmptyState>
            {user ? <AddButton href='/dashboard/posts/add'>Add Post</AddButton> : null}
            <p className='mt-4 text-lg text-gray-500 dark:text-gray-400'>
              There are no posts available.
            </p>
          </EmptyState>
        ) : (
          <PostsSection />
        )}
      </div>
    </Layout>
  )
}
