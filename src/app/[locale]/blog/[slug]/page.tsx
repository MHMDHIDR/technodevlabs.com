import { IconArrowLeft, IconEdit, IconTrash } from '@tabler/icons-react'
import { getLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlugAction } from '@/actions'
import { auth } from '@/auth'
import { Button } from '@/components/custom/button'
import { DeleteButton } from '@/components/custom/delete-button'
import Divider from '@/components/custom/divider'
import Layout from '@/components/custom/layout'
import { Modal } from '@/components/custom/modal'
import { ShareButtons } from '@/components/custom/share-buttons'
import { SecondaryHeading } from '@/components/ui/cover'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { getPosts } from '@/data/posts'
import { getSettings } from '@/data/settings'
import { env } from '@/env'
import { Link } from '@/i18n/routing'
import { calculateReadTime, clsx, formatDate, removeSlug } from '@/lib/utils'
import type { Locale } from '@/i18n/request'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const { posts } = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: Locale }>
}): Promise<Metadata> {
  const { slug, locale } = await params
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
      url: `${env.NEXT_PUBLIC_URL}/blog/${slug}`,
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

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function BlogPostContentPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const postTranslations = await getTranslations('posts')
  const currentLocale = (await getLocale()) as Locale

  const settings = (await getSettings()) || { layout: 'grid' }
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
    `<img class="my-3 mb-12 rounded-xl shadow-lg dark:shadow-slate-800 md:max-w-screen mx-auto min-w-[100%] object-cover max-h-80 object-center" loading="lazy" alt="${postTitle}" title="${postTitle}"`
  )

  const readTime = await calculateReadTime(currentLocale === 'ar' ? post.contentAr : post.content)
  const shareUrl = encodeURIComponent(`${env.NEXT_PUBLIC_URL}/blog/${slug}`)

  return (
    <Layout>
      <div
        className={`h-fit px-3.5 md:px-4 py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings.layout === 'grid',
          'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]':
            settings.layout === 'grid-small',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black/30 bg-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

        <Link
          href='/blog'
          className='flex gap-x-2.5 md:pl-10 group hover:text-blue-600 select-none'
        >
          <IconArrowLeft className='w-6 h-6 group-hover:-translate-x-2 transition rtl:order-1' />
          {postTranslations('backToBlog')}
        </Link>

        <h1 className='relative z-20 py-6 mx-auto md:mt-6 max-w-7xl text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-600 dark:from-white dark:via-gray-300 dark:to-gray-400'>
          <SecondaryHeading>{postTitle}</SecondaryHeading>
        </h1>

        <div className='flex justify-between items-center max-w-7xl md:container'>
          <div className='flex flex-col gap-3 items-center select-none md:flex-row'>
            <figure className='flex gap-x-2 items-center min-w-fit'>
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
              className='self-start text-sm text-neutral-500 dark:text-neutral-400 md:self-center min-w-fit'
              title={`${postTranslations('publishedOn')}: ${new Date(post.createdAt).toDateString()}`}
            >
              {formatDate(new Date(post.updatedAt).toDateString(), currentLocale, true)}
            </span>
            {user ? (
              <div className='flex w-full'>
                <Link className='self-start md:self-center' href={`/dashboard/blog/${post.id}`}>
                  <Button
                    className='flex gap-x-2 items-center px-2 -ml-1'
                    title={postTranslations('editPost')}
                  >
                    <IconEdit className='w-6 h-6' />
                    <span className='sr-only'>{postTranslations('editPost')}</span>
                  </Button>
                </Link>
                <Modal
                  description={postTranslations('deletePostConfirmation')}
                  title={postTranslations('deletePost')}
                  trigger={<IconTrash className='w-6 h-6 text-red-500' />}
                >
                  <DeleteButton entryId={post.id ?? ''} redirectTo='/blog' type='post' />
                </Modal>
              </div>
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

        {/* Also Read Blog Posts */}
        <div className='flex flex-col justify-between gap-y-2'>
          {post.previousPost ? (
            <Link
              href={`/blog/${post.previousPost.slug}`}
              className='flex gap-x-2 items-center border hover:border-purple-200 dark:hover:border-purple-900 transition-colors rounded-lg p-2 bg-white/70 hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-900'
            >
              <Image
                alt={`${postTranslations('previousPost')}: ${post.previousPost.title}`}
                width={48}
                height={48}
                src={post.previousPost.image ?? '/images/logo.svg'}
                className='w-10 h-10 rounded-lg shadow-lg'
              />
              <div className='flex flex-col'>
                <span className='text-xs'>{postTranslations('previousPost')}</span>
                <strong className='text-xxs md:text-base'>
                  {currentLocale === 'ar' ? post.previousPost.titleAr : post.previousPost.title}
                </strong>
              </div>
            </Link>
          ) : null}
          {post.nextPost ? (
            <Link
              href={`/blog/${post.nextPost.slug}`}
              className='flex gap-x-2 items-center border hover:border-purple-200 dark:hover:border-purple-900 transition-colors rounded-lg p-2 bg-white/70 hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-900'
            >
              <Image
                alt={`${postTranslations('nextPost')}: ${post.nextPost.title}`}
                width={48}
                height={48}
                src={post.nextPost.image ?? '/images/logo.svg'}
                className='w-10 h-10 rounded-lg shadow-lg'
              />
              <div className='flex flex-col'>
                <span className='text-xs'>{postTranslations('nextPost')}</span>
                <strong className='text-xxs md:text-base'>
                  {currentLocale === 'ar' ? post.nextPost.titleAr : post.nextPost.title}
                </strong>
              </div>
            </Link>
          ) : null}
        </div>

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
