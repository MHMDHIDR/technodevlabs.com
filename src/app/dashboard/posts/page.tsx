import Link from 'next/link'
import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import EmptyState from '@/components/custom/empty-state'
import { getPosts } from '@/data/posts'

export default async function DashboardPosts() {
  const posts = await getPosts()

  return (
    <section className='flex flex-col'>
      <h3 className='mb-6 text-2xl font-bold text-center'>Our Posts</h3>

      <div className='self-end mb-6'>
        <Link href='/dashboard/posts/add'>
          <Button className='flex items-center px-4 py-2 space-x-2'>
            <IconPlus className='w-5 h-5' />
            <span>Add Post</span>
          </Button>
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <EmptyState>
          <Link href='/dashboard/posts/add'>
            <Button className='flex items-center'>
              <IconPlus className='w-4 h-4' />
              <span>Add Post</span>
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          {posts.map(post => (
            <Link
              key={post.id}
              href={`/dashboard/posts/${post.id}`}
              className='block group'
            >
              <div className='p-5 border border-gray-200 rounded-lg shadow-lg bg-neutral-50 dark:bg-gray-900 dark:shadow-gray-800 hover:shadow-xl dark:border-gray-400 hover:border-blue-500 duration-300'>
                <h4 className='text-lg font-semibold group-hover:text-blue-600 transition duration-300'>
                  {post.title}
                </h4>
                <div
                  className='mt-2 text-sm text-gray-700 dark:text-gray-300'
                  dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) + '...' }}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
