import { getPostBySlugAction } from '@/actions/get-post'
import { auth } from '@/auth'
import { Button } from '@/components/custom/button'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { calculateReadTime, clsx, formatDate, removeSlug } from '@/lib/utils'
import { IconEdit } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { DeleteButton } from '@/components/custom/delete-button'
import { Modal } from '@/components/custom/modal'
import { IconTrash } from '@tabler/icons-react'
import { notFound } from 'next/navigation'
import { getSettings } from '@/data/settings'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlugAction({ slug: params.slug })
  if (!post) return {}

  const firstImage = post.content.match(/<img[^>]+src="([^">]+)"/)
  const image: string = firstImage ? firstImage[1] : APP_LOGO_opengraph

  const postTitle = post.title
  const postContent = post.content

  const title = (postTitle ? postTitle : removeSlug(decodeURI(params.slug))) + ' | ' + APP_TITLE
  const description = postContent
    ? postContent.slice(0, 200).replace(/<[^>]*>/g, '') + '...'
    : APP_DESCRIPTION

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name ?? 'Unknown']
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  }
}

export default async function BlogPostContentPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const settings = await getSettings()
  const post = await getPostBySlugAction({ slug })
  if (!post) return notFound()

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
    <Layout>
      <div
        className={`h-fit p-4 py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings?.layout === 'grid',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings?.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

        <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-bold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-600 dark:from-white dark:via-gray-300 dark:to-gray-400'>
          <Cover>{post.title}</Cover>
        </h1>

        <div className='flex items-center justify-between md:container max-w-7xl'>
          <div className='flex flex-col items-center gap-3 select-none md:flex-row'>
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
              {formatDate(new Date(post.updatedAt).toDateString(), true)}
            </span>
            {user ? (
              <>
                <Link href={`/dashboard/posts/${post.id}`} className='self-start md:self-center'>
                  <Button className='flex items-center px-2 -ml-1 gap-x-2' title='Edit Post'>
                    <IconEdit className='w-4 h-4' />
                    <span>Edit Post</span>
                  </Button>
                </Link>
                <Modal
                  title='Delete Post'
                  description='Are you sure you want to delete this post?'
                  trigger={<IconTrash className='w-10 h-4 text-red-500' />}
                >
                  <DeleteButton entryId={post.id ?? ''} redirectTo='/posts' type='post' />
                </Modal>
              </>
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
      </div>
    </Layout>
  )
}