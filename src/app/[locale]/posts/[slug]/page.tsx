import { IconEdit, IconTrash } from '@tabler/icons-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { env } from '@/env'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { getPostBySlugAction } from '@/actions'
import { auth } from '@/auth'
import { Button } from '@/components/custom/button'
import { DeleteButton } from '@/components/custom/delete-button'
import Divider from '@/components/custom/divider'
import { ShareButtons } from '@/components/custom/share-buttons'
import Layout from '@/components/custom/layout'
import { Modal } from '@/components/custom/modal'
import { SecondaryHeading } from '@/components/ui/cover'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { getSettings } from '@/data/settings'
import { calculateReadTime, clsx, formatDate, removeSlug } from '@/lib/utils'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/request'

export async function generateMetadata({
  params
}: {
  params: { slug: string; locale: Locale }
}): Promise<Metadata> {
  const { slug, locale } = params
  const currentLocale = locale ?? (await getLocale())
  const post = await getPostBySlugAction({ slug })
  if (!post) return {}

  // Extract the src from the first <img> tag
  const imgSrcMatch = (currentLocale === 'ar' ? post.contentAr : post.content).match(
    /<img.*?src="(.*?)"/
  )
  const image = imgSrcMatch ? imgSrcMatch[1] : APP_LOGO_opengraph

  const postTitle = currentLocale === 'ar' ? post.titleAr : post.title
  const postContent = currentLocale === 'ar' ? post.contentAr : post.content

  const title = `${postTitle ? postTitle : removeSlug(decodeURI(slug))} | ${APP_TITLE}`
  const description = postContent
    ? `${postContent.slice(0, 200).replace(/<[^>]*>/g, '')}...`
    : APP_DESCRIPTION

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${env.NEXT_PUBLIC_URL}/posts/${slug}`,
      siteName: APP_TITLE,
      images: [
        { url: image, secureUrl: image, width: 1200, height: 630, alt: title },
        {
          url: image,
          secureUrl: image,
          width: 400,
          height: 400,
          alt: title
        }
      ],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name ?? APP_TITLE]
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
  const postTranslations = await getTranslations('posts')
  const currentLocale = (await getLocale()) as Locale

  const settings = await getSettings()
  const post = await getPostBySlugAction({ slug })
  if (!post) return notFound()

  const session = await auth()
  let user = null

  if (session && session.user) {
    user = session.user
  }

  const postTitle = currentLocale === 'ar' ? post.titleAr : post.title
  const modifiedContent = (currentLocale === 'ar' ? post.contentAr : post.content).replace(
    /<img/g,
    `<img class="my-3 mb-12 rounded-xl shadow-lg dark:shadow-slate-800 md:max-w-screen mx-auto" loading="lazy" alt="${postTitle}" title="${postTitle}"`
  )

  const readTime = await calculateReadTime(currentLocale === 'ar' ? post.contentAr : post.content)
  const shareUrl = encodeURIComponent(`${env.NEXT_PUBLIC_URL}/posts/${slug}`)

  return (
    <Layout>
      <div
        className={`h-fit px-3.5 md:px-4 py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings?.layout === 'grid',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings?.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black/30 bg-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

        <h1 className='relative z-20 py-6 mx-auto mt-6 max-w-7xl text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-600 dark:from-white dark:via-gray-300 dark:to-gray-400'>
          <SecondaryHeading>{postTitle}</SecondaryHeading>
        </h1>

        <div className='flex justify-between items-center max-w-7xl md:container'>
          <div className='flex flex-col gap-3 items-center select-none md:flex-row'>
            <figure className='flex gap-x-2 items-center'>
              <Image
                alt={post.author.name ?? APP_TITLE}
                className='w-7 h-7 rounded-full md:w-10 md:h-10'
                height={48}
                src={post.author.image ?? '/images/logo.svg'}
                width={48}
              />
              <figcaption className='flex gap-x-2 items-center'>
                <span className='text-sm font-semibold md:text-lg'>{post.author.name}</span>
              </figcaption>
            </figure>
            <span
              className='self-start text-sm text-neutral-500 dark:text-neutral-400 md:self-center'
              title={`${postTranslations('publishedOn')}: ${new Date(post.createdAt).toDateString()}`}
            >
              {formatDate(new Date(post.updatedAt).toDateString(), currentLocale, true)}
            </span>
            {user ? (
              <>
                <Link className='self-start md:self-center' href={`/dashboard/posts/${post.id}`}>
                  <Button
                    className='flex gap-x-2 items-center px-2 -ml-1'
                    title={postTranslations('editPost')}
                  >
                    <IconEdit className='w-4 h-4' />
                    <span>{postTranslations('editPost')}</span>
                  </Button>
                </Link>
                <Modal
                  description={postTranslations('deletePostConfirmation')}
                  title={postTranslations('deletePost')}
                  trigger={<IconTrash className='w-10 h-4 text-red-500' />}
                >
                  <DeleteButton entryId={post.id ?? ''} redirectTo='/posts' type='post' />
                </Modal>
              </>
            ) : null}
          </div>

          <span
            aria-label={postTranslations('readTime')}
            className='text-sm select-none text-neutral-500 dark:text-neutral-400'
            title={`${postTranslations('readTime')}: ${readTime}`}
          >
            {readTime}
          </span>
        </div>

        <div className='md:px-7 mx-auto mt-8 sm:max-w-7xl rounded-lg bg-slate-50 dark:bg-slate-950/50'>
          <article className='md:p-4 rounded-lg'>
            <div
              className='mb-20 leading-8 md:leading-10 text-justify'
              dangerouslySetInnerHTML={{ __html: modifiedContent }}
            />
          </article>
        </div>

        <Divider className='my-10' />

        <div className='mt-8 text-center'>
          <h3 className='mb-4 text-lg font-semibold select-none'>
            {`${postTranslations('share')} "${postTitle}"`}
          </h3>
          <ShareButtons url={shareUrl} title={postTitle} />
        </div>
      </div>
    </Layout>
  )
}
