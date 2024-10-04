import Link from 'next/link'
import { AddPostButton } from '@/components/custom/add-post-button'
import { DeletePostButton } from '@/components/custom/delete-post-button'
import EmptyState from '@/components/custom/empty-state'
import { Modal } from '@/components/custom/modal'
import { getPosts } from '@/data/posts'
import { formatDate } from '@/lib/format-date'
import { IconTrash } from '@tabler/icons-react'

export default async function DashboardPosts() {
  const { posts, postsCount } = await getPosts()

  return (
    <section className='flex flex-col'>
      <h3 className='mb-6 text-2xl font-bold text-center'>Our Blog Posts</h3>

      <div className='self-end mb-6'>
        <AddPostButton />
      </div>

      {postsCount === 0 ? (
        <EmptyState>
          <AddPostButton />
        </EmptyState>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          {posts.map(post => {
            const abstract = post.content.replace(/<[^>]*>/g, ' ').slice(0, 150)

            return (
              <div className='relative' key={post.id}>
                <Link href={`/dashboard/posts/${post.id}`} className='block group'>
                  <div className='p-5 border border-gray-200 rounded-lg shadow-lg bg-neutral-50 dark:bg-gray-900 dark:shadow-gray-800 hover:shadow-xl dark:border-gray-400 hover:border-blue-500 duration-300'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-lg font-semibold group-hover:text-blue-600 transition duration-300'>
                        {post.title}
                      </h4>
                      <span className='text-sm text-gray-500'>
                        {formatDate(new Date(post.updatedAt).toDateString())}
                      </span>
                    </div>
                    <div
                      className='mt-2 text-sm text-gray-700 dark:text-gray-300'
                      dangerouslySetInnerHTML={{ __html: abstract + '...' }}
                    />
                  </div>
                </Link>
                <Modal
                  title='Delete Post'
                  description='Are you sure you want to delete this post?'
                  className='absolute bottom-0.5 right-0.5'
                  trigger={<IconTrash className='w-10 h-4 text-red-500' />}
                >
                  <DeletePostButton postId={post.id ?? ''} />
                </Modal>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
