import Link from 'next/link'
import { PostCard } from '@/components/custom/post-card'
import { Button } from '@/components/custom/button'
import { getPosts } from '@/data/posts'

export async function PostsSection({ pathname }: { pathname?: any }) {
  let posts = await getPosts()
  // cut the posts array to 3, so it can be displayed in a grid
  posts = posts.slice(0, 3)

  return posts && posts.length !== 0 ? (
    <div className='container max-w-5xl'>
      <div
        className={`grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center${
          posts.length === 1 ? ' group-one-col' : ''
        }`}
      >
        {posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>

      {pathname === '/' ? (
        <Link href={`/posts`} className='flex justify-center mt-10'>
          <Button className='rounded-full' withArrow>
            You Can Read More Here
          </Button>
        </Link>
      ) : null}
    </div>
  ) : null
}
