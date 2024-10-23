import { eq, sql } from 'drizzle-orm'
import { database } from '@/db/database'
import { posts } from '@/db/schema'
import { pagination } from '@/lib/utils'
import type { PaginationResult } from '@/lib/utils'
import type { Post } from '@/types'
import type { SQL } from 'drizzle-orm'

export interface GetPostsResponse {
  posts: Array<Post>
  postsCount: number
  pagination?: PaginationResult
}

/**
 * Get posts with optional pagination and publication status filter.
 * Returns all posts if no parameters are provided.
 */
export async function getPosts(params?: {
  isPublished?: boolean
  searchParams?: URLSearchParams
}): Promise<GetPostsResponse> {
  let whereClause: SQL | undefined

  if (params?.isPublished !== undefined) {
    whereClause = eq(posts.isPublished, params.isPublished)
  }

  // Get total count
  const [{ count }] = await database
    .select({ count: sql`count(*)` })
    .from(posts)
    .where(whereClause)

  const totalItems = Number(count)

  // If no searchParams provided, return all results without pagination
  if (!params?.searchParams) {
    const allPosts = await database.select().from(posts).where(whereClause)

    return { posts: allPosts, postsCount: totalItems }
  }

  // Handle pagination when searchParams is provided
  const { page, limit } = pagination.parseSearchParams(params.searchParams)
  const paginationData = pagination.calculate({ page, limit, totalItems })

  const paginatedPosts = await database
    .select()
    .from(posts)
    .where(whereClause)
    .limit(paginationData.pageSize)
    .offset(paginationData.offset)

  return { posts: paginatedPosts, postsCount: totalItems, pagination: paginationData }
}
