import { IconArticle } from '@tabler/icons-react'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { Button } from '@/components/custom/button'
import { Meteors } from '@/components/ui/meteors'
import { POST_CONTENT_LENGTH, POST_TITLE_LENGTH } from '@/data/constants'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'

export async function PostCard({ post }: { post: Post }) {
  const t = await getTranslations('posts')
  const currentLocale = await getLocale()

  const modifiedContent = post.content.replace(
    /<img/g,
    '<img class="rounded-lg max-w-72 max-h-56 m-2"'
  )

  return (
    <Link
      className='relative max-w-xs group-[-one-col]:col-span-3 min-h-[26rem] min-w-80'
      href={`/posts/${post.slug}`}
    >
      <div className='absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl' />
      <div className='relative flex flex-col items-start justify-end h-full px-4 py-8 overflow-hidden bg-gray-900 border border-gray-800 shadow-xl rounded-2xl'>
        <h1 className='relative z-50 flex items-center mb-1 text-lg text-white uppercase truncate gap-x-2'>
          <IconArticle className='stroke-1' />
          {post.title.length > POST_TITLE_LENGTH
            ? `${post.title.slice(0, POST_TITLE_LENGTH)}...`
            : post.title}
        </h1>

        <div
          className='text-sm leading-7 text-slate-200'
          dangerouslySetInnerHTML={{
            __html:
              modifiedContent.length > POST_CONTENT_LENGTH
                ? `${modifiedContent.slice(0, POST_CONTENT_LENGTH)}...`
                : modifiedContent
          }}
        />

        <div className='flex flex-row items-center justify-between w-full mt-10'>
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
