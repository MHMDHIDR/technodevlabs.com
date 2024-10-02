import Link from 'next/link'
import { IconPlus } from '@tabler/icons-react'
import { auth } from '@/auth'
import { Cover } from '@/components/ui/cover'
import { Button } from '@/components/custom/button'
import Layout from '@/components/custom/layout'
import EmptyState from '@/components/custom/empty-state'
import { PostsSection } from '@/app/posts/posts-section'
import { APP_TITLE, APP_DESCRIPTION } from '@/data/constants'
import { getPosts } from '@/data/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Blog | ${APP_TITLE}`,
  description: APP_DESCRIPTION,
  openGraph: {
    title: `Blog | ${APP_TITLE}`,
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

export default async function PostsPage() {
  const posts = await getPosts()
  const session = await auth()
  let user = null

  if (session && session.user) {
    user = session.user
  }

  return (
    <Layout className={`p-4 py-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Posts</Cover>
      </h1>

      {!posts || posts.length === 0 ? (
        <EmptyState>
          {user ? (
            <Link href='/dashboard/posts/add'>
              <Button className='flex items-center'>
                <IconPlus className='w-4 h-4' />
                <span>Add Post</span>
              </Button>
            </Link>
          ) : null}
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400'>
            There are no posts available.
          </p>
        </EmptyState>
      ) : (
        <PostsSection />
      )}
    </Layout>
  )
}
