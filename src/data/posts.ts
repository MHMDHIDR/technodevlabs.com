import { database } from '@/db/database'
import type { Post } from '@/types'

/**
 * Get all posts
 * @returns {Promise<Post>} A promise that contains an array of posts
 */
export async function getPosts(): Promise<{ posts: Post[]; postsCount: number }> {
  const posts = await database.query.posts.findMany()

  return !posts ? { posts: [], postsCount: 0 } : { posts, postsCount: posts.length }
}
