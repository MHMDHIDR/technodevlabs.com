import { database } from '@/db/database'
import { posts } from '@/db/schema'
import { eq, SQL } from 'drizzle-orm'
import type { Post } from '@/types'

/**
 * Get posts, it returns all posts if isPublished is not provided,
 * otherwise it returns only published posts if isPublished is true,
 * or unpublished posts if isPublished is false.
 * @param {boolean} [isPublished] - Optional. If provided, filters posts by publication status
 * @returns {Promise<{ posts: Array<Post>; postsCount: number }>} A promise that contains an array of posts and the count
 */
export async function getPosts(
  isPublished?: boolean
): Promise<{ posts: Array<Post>; postsCount: number }> {
  let whereClause: SQL | undefined

  if (isPublished !== undefined) {
    whereClause = eq(posts.isPublished, isPublished)
  }

  const fetchedPosts = await database.select().from(posts).where(whereClause)

  return {
    posts: fetchedPosts,
    postsCount: fetchedPosts.length
  }
}
