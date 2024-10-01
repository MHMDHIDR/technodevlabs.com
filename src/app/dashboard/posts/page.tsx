import { Button } from '@/components/custom/button'
import EmptyState from '@/components/custom/empty-state'
import { getPosts } from '@/data/posts'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

export default async function DashboardPosts() {
  const posts = await getPosts()

  return (
    <section className='flex flex-col'>
      <h3 className='text-center'>Our Posts</h3>

      {/* Add <Button> on the left side of the page with tailwindcss */}
      <Link href='/dashboard/posts/add' className='self-end'>
        <Button className='flex items-center px-1.5'>
          <IconPlus /> <span>Add</span>
        </Button>
      </Link>

      {!posts ? (
        <EmptyState>
          <Link href='/dashboard/posts/add'>
            <Button className='flex items-center'>
              <IconPlus className='h-4 w-4' />
              <span>Add Post</span>
            </Button>
          </Link>
        </EmptyState>
      ) : (
        posts.map(post => (
          <div
            key={post.id}
            className='flex items-center justify-between p-2 border-b gap-x-3'
          >
            <Link href={`/dashboard/posts/${post.id}`} className=''>
              <h4 className='text-lg font-semibold'>{post.title}</h4>
              <p
                className='text-sm'
                dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }}
              />
            </Link>
          </div>
        ))
      )}
    </section>
  )
}
