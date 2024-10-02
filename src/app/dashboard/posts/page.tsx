import Link from 'next/link'
import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import EmptyState from '@/components/custom/empty-state'
import { getPosts } from '@/data/posts'

export default async function DashboardPosts() {
  const posts = await getPosts()

  return (
    <section className='flex flex-col'>
      <h3 className='text-center text-2xl font-bold mb-6'>Our Posts</h3>

      <div className='mb-6 self-end'>
        <Link href='/dashboard/posts/add'>
          <Button className='flex items-center space-x-2 px-4 py-2'>
            <IconPlus className='h-5 w-5' />
            <span>Add Post</span>
          </Button>
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <EmptyState>
          <Link href='/dashboard/posts/add'>
            <Button className='flex items-center'>
              <IconPlus className='h-4 w-4' />
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
              className='group block'
            >
              <div className='bg-neutral-50 dark:bg-gray-900 shadow-lg dark:shadow-gray-800 rounded-lg p-5 hover:shadow-xl border border-gray-200 dark:border-gray-400 hover:border-blue-500 duration-300'>
                <h4 className='text-lg font-semibold group-hover:text-blue-600 transition duration-300'>
                  {post.title}
                </h4>
                <div
                  className='text-sm text-gray-700 dark:text-gray-300 mt-2'
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
