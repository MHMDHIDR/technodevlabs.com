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
import { ITEMS_COUNT } from '@/data/constants'
import { getPosts, GetPostsResponse } from '@/data/posts'
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
  let postsData: GetPostsResponse

  // Only create URLSearchParams for the posts page
  if (isPostsPage) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.set('page', String(searchParams?.page ?? 1))
    urlSearchParams.set('limit', String(searchParams?.limit ?? ITEMS_COUNT))

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

  // Generate page numbers for pagination
  const generatePaginationItems = (currentPage: number, totalPages: number) => {
    const items = []

    if (totalPages <= ITEMS_COUNT) {
      // Show all pages if total pages is less than or equal to ITEMS_COUNT
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      // Always show first page
      items.push(1)

      if (currentPage > 3) {
        items.push('ellipsis-start')
      }

      // Show pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        items.push(i)
      }

      if (currentPage < totalPages - 2) {
        items.push('ellipsis-end')
      }

      // Always show last page
      items.push(totalPages)
    }

    return items
  }

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
                        ? `/posts?page=${paginationInfo.previousPage}&limit=${paginationInfo.pageSize}`
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
                          href={`/posts?page=${item}&limit=${paginationInfo.pageSize}`}
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
                        ? `/posts?page=${paginationInfo.nextPage}&limit=${paginationInfo.pageSize}`
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
