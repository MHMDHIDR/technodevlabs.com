import { PostsSection } from '@/app/posts/posts-section'
import { auth } from '@/auth'
import { AddPostButton } from '@/components/custom/add-post-button'
import EmptyState from '@/components/custom/empty-state'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { getPosts } from '@/data/posts'
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
  const { postsCount } = await getPosts()
  const session = await auth()
  let user: User | null = null

  if (session && session.user) {
    user = session.user
  }

  return (
    <Layout className={`p-4 py-20 container`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Posts</Cover>
      </h1>

      {user ? (
        <div className='w-fit mb-6 ml-auto'>
          <AddPostButton />
        </div>
      ) : null}

      {postsCount === 0 ? (
        <EmptyState>
          {user ? <AddPostButton /> : null}
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
