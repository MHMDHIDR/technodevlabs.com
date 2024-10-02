import Link from 'next/link'
import { Button } from '@/components/custom/button'
import { Meteors } from '@/components/ui/meteors'
import { IconArticle } from '@tabler/icons-react'
import { POST_CONTENT_LENGTH, POST_TITLE_LENGTH } from '@/data/constants'
import type { Post } from '@/types'
import { formatDate } from '@/lib/utils'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className='w-full relative max-w-xs group'>
      <div className='absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl' />
      <div className='relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start'>
        <h1 className='flex items-center gap-x-2 text-lg text-white mb-1 relative z-50 uppercase truncate'>
          <IconArticle className='stroke-1' />
          {post.title.length > POST_TITLE_LENGTH
            ? post.title.slice(0, POST_TITLE_LENGTH) + '...'
            : post.title}
        </h1>

        <div
          className='text-sm leading-7 text-slate-200'
          dangerouslySetInnerHTML={{
            __html:
              post.content.length > POST_CONTENT_LENGTH
                ? post.content.slice(0, POST_CONTENT_LENGTH) + '...'
                : post.content
          }}
        />

        <div className='flex flex-row justify-between items-center mt-10 w-full'>
          <span className='text-sm text-gray-500'>
            {formatDate(new Date(post.updatedAt).toDateString())}
          </span>

          <Button className='flex px-3' withArrow>
            Read More
          </Button>
        </div>

        <Meteors number={20} />
      </div>
    </Link>
  )
}
