import { IconArticle } from '@tabler/icons-react'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { Button } from '@/components/custom/button'
import { Meteors } from '@/components/ui/meteors'
import { POST_CONTENT_LENGTH, POST_TITLE_LENGTH } from '@/data/constants'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'
import type { Locale } from '@/i18n/request'

export async function PostCard({ post }: { post: Post }) {
  const t = await getTranslations('posts')
  const currentLocale = (await getLocale()) as Locale

  const modifiedContent = (currentLocale === 'ar' ? post.contentAr : post.content).replace(
    /<img/g,
    `<img class="m-2 max-h-56 rounded-lg max-w-72" loading="lazy" alt="${post.title}"`
  )

  const postTitle =
    (currentLocale === 'ar' ? post.titleAr : post.title).length > POST_TITLE_LENGTH
      ? `${(currentLocale === 'ar' ? post.titleAr : post.title).slice(0, POST_TITLE_LENGTH)}...`
      : currentLocale === 'ar'
        ? post.titleAr
        : post.title

  const postContent =
    modifiedContent.length > POST_CONTENT_LENGTH
      ? `${modifiedContent.slice(0, POST_CONTENT_LENGTH)}...`
      : modifiedContent

  return (
    <Link
      className='relative max-w-xs group-[-one-col]:col-span-3 min-h-[26rem] min-w-80'
      href={`/posts/${post.slug}`}
    >
      <div className='absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl' />
      <div className='flex overflow-hidden relative flex-col justify-end items-start px-4 py-8 h-full bg-gray-900 rounded-2xl border border-gray-800 shadow-xl'>
        <h1 className='flex relative z-50 gap-x-2 items-center mb-1 text-lg text-white uppercase truncate'>
          <IconArticle className='stroke-1' />
          {postTitle}
        </h1>

        <div
          className='text-sm leading-7 text-slate-200'
          dangerouslySetInnerHTML={{ __html: postContent }}
        />

        <div className='flex flex-row justify-between items-center mt-10 w-full'>
          <span className='text-sm text-gray-500'>
            {formatDate(new Date(post.updatedAt).toDateString(), currentLocale)}
          </span>

          <Button
            className='flex items-center px-3 text-xs text-gray-100 sm:text-sm md:text-xs lg:text-base'
            withArrow
          >
            {t('readMoreLink')}
          </Button>
        </div>

        <Meteors number={20} />
      </div>
    </Link>
  )
}
