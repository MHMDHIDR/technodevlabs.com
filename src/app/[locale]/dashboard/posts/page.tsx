import { AddButton } from '@/components/custom/add-button'
import DashboardListItem from '@/components/custom/dashboard-list-item'
import EmptyState from '@/components/custom/empty-state'
import { getPosts } from '@/data/posts'

export default async function DashboardPosts() {
  const { posts, postsCount } = await getPosts()

  return (
    <section className='flex flex-col container py-10'>
      <div className='self-end mb-6'>
        <AddButton href='/dashboard/posts/add'>Add Post</AddButton>
      </div>

      {postsCount === 0 ? (
        <EmptyState>
          <AddButton href='/dashboard/posts/add'>Add Post</AddButton>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400 select-none'>
            Sorry, there are no posts available.
          </p>
        </EmptyState>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          <h3 className='mb-6 text-2xl font-bold text-center'>Our Blog Posts</h3>

          {posts.map(post => (
            <DashboardListItem key={post.id} item={post} type='post' />
          ))}
        </div>
      )}
    </section>
  )
}
