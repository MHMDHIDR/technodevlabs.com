import { IconArticle } from '@tabler/icons-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Button } from '@/components/custom/button'
import { Meteors } from '@/components/ui/meteors'
import { POST_CONTENT_LENGTH, POST_TITLE_LENGTH } from '@/data/constants'
import { Link } from '@/i18n/routing'
import { clsx, formatDate } from '@/lib/utils'
import type { Locale } from '@/i18n/request'
import type { Post } from '@/types'

export async function PostCard({ post }: { post: Post }) {
  const postsTranslations = await getTranslations('posts')
  const currentLocale = (await getLocale()) as Locale

  const postTitle =
    (currentLocale === 'ar' ? post.titleAr : post.title).length > POST_TITLE_LENGTH
      ? `${(currentLocale === 'ar' ? post.titleAr : post.title).slice(0, POST_TITLE_LENGTH)}...`
      : currentLocale === 'ar'
        ? post.titleAr
        : post.title

  const content = currentLocale === 'ar' ? post.contentAr : post.content

  // Get the text after the first <img> tag
  const modifiedContent = content.split(/<img.*?>/)[1] || ''

  const postContent =
    modifiedContent.length > POST_CONTENT_LENGTH
      ? `${modifiedContent.slice(0, POST_CONTENT_LENGTH)}...`
      : modifiedContent

  // Extract the src from the first <img> tag
  const imgSrcMatch = content.match(/<img.*?src="(.*?)"/)
  const postImg = imgSrcMatch ? imgSrcMatch[1] : ''
  const postImgClass = {
    'bg-center bg-cover': postImg,
    'bg-gray-900': !postImg
  }

  return (
    <Link
      className='relative max-w-xs group-[-one-col]:col-span-3 min-h-[26rem] min-w-80'
      href={`/blog/${post.slug}`}
    >
      <div className='absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl' />
      <div
        className={`flex overflow-hidden relative flex-col justify-end items-start px-4 py-8 h-full rounded-2xl border border-gray-800 shadow-xl ${clsx(
          postImgClass
        )}`}
        style={{ backgroundImage: postImg ? `url("${postImg}")` : 'none' }}
      >
        <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/85 to-transparent'>
          <h1 className='flex font-bold relative z-50 gap-x-2 items-center mb-1 text-sm text-white uppercase pr-2'>
            <IconArticle className='stroke-1' />
            {postTitle}
          </h1>

          <div
            className='text-sm leading-7 text-slate-200'
            dangerouslySetInnerHTML={{ __html: postContent }}
          />

          <div className='flex flex-row justify-between items-center mt-6 w-full'>
            {/* <span className='text-sm text-gray-500' title={new Date(post.updatedAt).toDateString()}>
              {formatDate(new Date(post.updatedAt).toDateString(), currentLocale)}
            </span> */}

            <Button
              className='flex items-center ltr:pr-3 rtl:pl-3 text-xs text-gray-100 sm:text-sm md:text-xs lg:text-base'
              withArrow
            >
              {postsTranslations('readMoreLink')}
            </Button>
          </div>
        </div>

        <Meteors number={20} />
      </div>
    </Link>
  )
}
