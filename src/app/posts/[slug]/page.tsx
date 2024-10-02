import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { IconEdit } from '@tabler/icons-react'
import { auth } from '@/auth'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { Button } from '@/components/custom/button'
import { getPostBySlugAction } from '@/app/actions/get-post'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { calculateReadTime, formatDate, removeSlug } from '@/lib/utils'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlugAction({ slug: params.slug })
  if (!post) return {}

  // extract the first image from the post content, when there is <img> get src="" value
  const firstImage = post.content.match(/<img[^>]+src="([^">]+)"/)
  const image: string = firstImage ? firstImage[1] : APP_LOGO_opengraph

  return {
    title: (post.title ?? removeSlug(decodeURI(params.slug))) + ' | ' + APP_TITLE,
    description:
      (post.title ?? removeSlug(decodeURI(params.slug))) + ' | ' + APP_DESCRIPTION,
    openGraph: {
      images: [image, APP_LOGO_opengraph]
    }
  }
}

export default async function BlogPostContentPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlugAction({ slug })
  if (!post) return null

  const session = await auth()
  let user = null

  if (session && session.user) {
    user = session.user
  }

  const modifiedContent = post.content.replace(
    /<img/g,
    `<img class="my-3 shadow-lg rounded-xl dark:shadow-slate-500 md:max-w-lg" loading="lazy" alt="${post.title}"`
  )

  return (
    <Layout className='p-4 py-20'>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-bold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-600 dark:from-white dark:via-gray-300 dark:to-gray-400'>
        <Cover>{post.title}</Cover>
      </h1>

      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-center select-none md:flex-row gap-3'>
          <figure className='flex items-center gap-x-2'>
            <Image
              src={post.author.image ?? '/images/logo.svg'}
              alt={post.author.name ?? APP_TITLE}
              className='rounded-full w-7 md:w-10 h-7 md:h-10'
              width={48}
              height={48}
            />
            <figcaption className='flex items-center gap-x-2'>
              <span className='text-sm font-semibold md:text-lg'>{post.author.name}</span>
            </figcaption>
          </figure>
          <span
            className='self-start text-sm text-neutral-500 dark:text-neutral-400 md:self-center'
            title={`Published On: ${new Date(post.createdAt).toDateString()}`}
          >
            {formatDate(new Date(post.updatedAt).toDateString())}
          </span>
          {user ? (
            <Link
              href={`/dashboard/posts/${post.id}`}
              className='self-start md:self-center'
            >
              <Button className='flex items-center px-2 -ml-1 gap-x-2'>
                <IconEdit className='w-4 h-4' />
                <span>Edit Post</span>
              </Button>
            </Link>
          ) : null}
        </div>

        <span
          className='text-sm select-none text-neutral-500 dark:text-neutral-400'
          aria-label='Read Time'
          title={`Read Time: ${calculateReadTime(post.content)}`}
        >
          {calculateReadTime(post.content)}
        </span>
      </div>

      <div className='container mx-auto mt-8 border rounded-lg max-w-7xl bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-600'>
        <article className='p-4 rounded-lg'>
          <div
            className='mb-20 leading-10'
            dangerouslySetInnerHTML={{ __html: modifiedContent }}
          />
        </article>
      </div>
    </Layout>
  )
}
