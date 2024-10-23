import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/custom/button'
import { PostCard } from '@/components/custom/post-card'
import { ITEMS_COUNT } from '@/data/constants'
import { getPosts } from '@/data/posts'
import { Link } from '@/i18n/routing'

export async function PostsSection({
  pathname,
  searchParams
}: {
  pathname?: string
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const isPostsPage = pathname === '/posts'
  const postsTranslations = await getTranslations('posts')
  let postsData

  // Only create URLSearchParams for the posts page
  if (isPostsPage) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.set('page', String(searchParams?.page ?? '1'))
    urlSearchParams.set('limit', String(searchParams?.limit ?? '2'))

    postsData = await getPosts({ isPublished: true, searchParams: urlSearchParams })
  } else {
    // For homepage, don't pass searchParams to get all posts
    postsData = await getPosts({ isPublished: true })
  }

  let posts = postsData.posts
  const postsCount = postsData.postsCount
  const paginationInfo = postsData.pagination

  // Only get the first 3 posts for the '/' homepage
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

      {/* Debug information to verify pagination */}
      {isPostsPage && paginationInfo && (
        <div className='mt-8 p-4 bg-gray-100 rounded'>
          <h3 className='font-bold'>Pagination Debug Info:</h3>
          <pre className='text-sm'>
            {JSON.stringify(
              {
                currentPage: paginationInfo.currentPage,
                totalPages: paginationInfo.totalPages,
                pageSize: paginationInfo.pageSize,
                totalItems: paginationInfo.totalItems,
                hasNextPage: paginationInfo.hasNextPage,
                hasPreviousPage: paginationInfo.hasPreviousPage,
                itemsRange: `${paginationInfo.items.start}-${paginationInfo.items.end}`
              },
              null,
              2
            )}
          </pre>
        </div>
      )}

      {pathname === '/' ? (
        <Link className='flex justify-center mt-10' href='/posts'>
          <Button className='rounded-full' withArrow>
            {postsTranslations('readMoreCTA')}
          </Button>
        </Link>
      ) : (
        // Add pagination controls for the posts page
        paginationInfo && (
          <div className='flex justify-center gap-4 mt-10'>
            {paginationInfo.hasPreviousPage && (
              <Link
                href={`/posts?page=${paginationInfo.previousPage}&limit=${paginationInfo.pageSize}`}
              >
                <Button className='rounded-full'>Previous</Button>
              </Link>
            )}
            {paginationInfo.hasNextPage && (
              <Link
                href={`/posts?page=${paginationInfo.nextPage}&limit=${paginationInfo.pageSize}`}
              >
                <Button className='rounded-full'>Next</Button>
              </Link>
            )}
          </div>
        )
      )}
    </div>
  ) : null
}
