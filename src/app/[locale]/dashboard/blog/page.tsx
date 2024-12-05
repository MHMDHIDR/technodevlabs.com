import { getTranslations } from 'next-intl/server'
import { AddButton } from '@/components/custom/add-button'
import DashboardListItem from '@/components/custom/dashboard-list-item'
import EmptyState from '@/components/custom/empty-state'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/custom/pagination'
import { ITEMS_COUNT } from '@/data/constants'
import { getPosts } from '@/data/posts'
import { generatePaginationItems } from '@/lib/generate-pagination-items'

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function DashboardPosts({ searchParams }: PageProps) {
  const urlSearchParams = new URLSearchParams()
  urlSearchParams.set('page', String(searchParams?.page ?? 1))
  urlSearchParams.set('limit', String(searchParams?.limit ?? ITEMS_COUNT))

  const { posts, postsCount, pagination } = await getPosts({ searchParams: urlSearchParams })
  const postsTranslations = await getTranslations('posts')

  return (
    <section className='flex flex-col mx-auto md:container py-10'>
      <div className='self-end mb-6'>
        <AddButton href='/dashboard/blog/add'>{postsTranslations('addPost')}</AddButton>
      </div>

      {postsCount === 0 ? (
        <EmptyState>
          <AddButton href='/dashboard/blog/add'>{postsTranslations('addPost')}</AddButton>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400 select-none'>
            {postsTranslations('noPosts')}
          </p>
        </EmptyState>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          <h3 className='mb-6 text-2xl font-bold text-center'>{postsTranslations('pageTitle')}</h3>

          {posts.map(post => (
            <DashboardListItem key={post.id} item={post} type='post' />
          ))}

          {pagination && pagination.totalPages > 1 && (
            <div className='mt-10'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={
                        pagination.hasPreviousPage
                          ? `/dashboard/blog?page=${pagination.previousPage}&limit=${pagination.pageSize}`
                          : undefined
                      }
                      aria-disabled={!pagination.hasPreviousPage}
                      disabled={!pagination.hasPreviousPage}
                      label={postsTranslations('previousPost')}
                    />
                  </PaginationItem>

                  {generatePaginationItems(pagination.currentPage, pagination.totalPages).map(
                    (item, index) => (
                      <PaginationItem key={`${item}-${index}`}>
                        {item === 'ellipsis-start' || item === 'ellipsis-end' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href={`/dashboard/blog?page=${item}&limit=${pagination.pageSize}`}
                            isActive={item === pagination.currentPage}
                            aria-disabled={item === pagination.currentPage}
                            disabled={item === pagination.currentPage}
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href={
                        pagination.hasNextPage
                          ? `/dashboard/blog?page=${pagination.nextPage}&limit=${pagination.pageSize}`
                          : undefined
                      }
                      aria-disabled={!pagination.hasNextPage}
                      disabled={!pagination.hasNextPage}
                      label={postsTranslations('nextPost')}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
