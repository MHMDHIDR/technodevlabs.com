import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/custom/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/custom/pagination'
import { PostCard } from '@/components/custom/post-card'
import { getPosts, GetPostsResponse } from '@/data/posts'
import { getSettings } from '@/data/settings'
import { Link } from '@/i18n/routing'
import { generatePaginationItems } from '@/lib/generate-pagination-items'

export async function PostsSection({
  pathname,
  searchParams
}: {
  pathname?: string
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const settings = await getSettings()
  const isPostsPage = pathname === '/blog'
  const postsTranslations = await getTranslations('posts')
  let postsData: GetPostsResponse

  // Only create URLSearchParams for the posts page
  if (isPostsPage) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.set('page', String(searchParams?.page ?? 1))
    urlSearchParams.set('limit', String(searchParams?.limit ?? settings.itemsCount))

    postsData = await getPosts({ isPublished: true, searchParams: urlSearchParams })
  } else {
    // For homepage, don't pass searchParams to get all posts
    postsData = await getPosts({ isPublished: true })
  }

  let posts = postsData.posts
  const postsCount = postsData.postsCount
  const paginationInfo = postsData.pagination

  // Only show the first 3 posts for the '/' homepage, otherwise show (settings.itemsCount ?? ITEMS_COUNT) per page
  posts = pathname === '/' && postsCount > 3 ? posts.slice(0, 3) : posts

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
        <Link className='flex justify-center mt-10' href='/blog'>
          <Button className='rounded-full' withArrow>
            {postsTranslations('readMoreCTA')}
          </Button>
        </Link>
      ) : (
        paginationInfo &&
        paginationInfo.totalPages > 1 && (
          <div className='mt-10'>
            <Pagination>
              <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                  <PaginationPrevious
                    href={
                      paginationInfo.hasPreviousPage
                        ? `/blog?page=${paginationInfo.previousPage}&limit=${paginationInfo.pageSize}`
                        : undefined
                    }
                    aria-disabled={!paginationInfo.hasPreviousPage}
                    disabled={!paginationInfo.hasPreviousPage}
                    label={postsTranslations('previousPost')}
                  ></PaginationPrevious>
                </PaginationItem>

                {/* Page numbers */}
                {generatePaginationItems(paginationInfo.currentPage, paginationInfo.totalPages).map(
                  (item, index) => (
                    <PaginationItem key={`${item}-${index}`}>
                      {item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href={`/blog?page=${item}&limit=${paginationInfo.pageSize}`}
                          isActive={item === paginationInfo.currentPage}
                          aria-disabled={item === paginationInfo.currentPage}
                          disabled={item === paginationInfo.currentPage}
                        >
                          {item}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  )
                )}

                {/* Next button */}
                <PaginationItem>
                  <PaginationNext
                    href={
                      paginationInfo.hasNextPage
                        ? `/blog?page=${paginationInfo.nextPage}&limit=${paginationInfo.pageSize}`
                        : undefined
                    }
                    aria-disabled={!paginationInfo.hasNextPage}
                    disabled={!paginationInfo.hasNextPage}
                    label={postsTranslations('nextPost')}
                  ></PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )
      )}
    </div>
  ) : null
}
