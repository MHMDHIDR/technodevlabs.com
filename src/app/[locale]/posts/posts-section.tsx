import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/custom/button'
import { PostCard } from '@/components/custom/post-card'
import { ITEMS_COUNT } from '@/data/constants'
import { getPosts } from '@/data/posts'
import { Link } from '@/i18n/routing'

export async function PostsSection({ pathname }: { pathname?: string }) {
  const postsData = await getPosts({ isPublished: true })
  let posts = postsData.posts
  const postsCount = postsData.postsCount

  const postsTranslations = await getTranslations('posts')
  // Only get the first 3 posts for the '/' homepage, so it can be displayed in a grid
  posts = pathname === '/' && postsCount > ITEMS_COUNT - 2 ? posts.slice(0, ITEMS_COUNT - 2) : posts

  return posts && postsCount !== 0 ? (
    <div className='container max-w-5xl'>
      <div
        className={`grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center${
          postsCount === 1 ? ' group-one-col' : ''
        }`}
      >
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {pathname === '/' ? (
        <Link className='flex justify-center mt-10' href='/posts'>
          <Button className='rounded-full' withArrow>
            {postsTranslations('readMoreCTA')}
          </Button>
        </Link>
      ) : null}
    </div>
  ) : null
}
