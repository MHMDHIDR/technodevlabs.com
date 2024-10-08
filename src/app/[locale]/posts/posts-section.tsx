import { Button } from '@/components/custom/button'
import { PostCard } from '@/components/custom/post-card'
import { getPosts } from '@/data/posts'
import Link from 'next/link'

export async function PostsSection({ pathname }: { pathname?: string }) {
  let { posts, postsCount } = await getPosts()
  // Only get the first 3 posts for the '/' homepage, so it can be displayed in a grid
  posts = pathname === '/' && postsCount > 3 ? posts.slice(0, 3) : posts

  return posts && postsCount !== 0 ? (
    <div className='container max-w-5xl'>
      <div
        className={`grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center${
          postsCount === 1 ? ' group-one-col' : ''
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
