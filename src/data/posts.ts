import { database } from '@/db/database'

/**
 * Get all posts
 * @returns {Promise<typeof posts>} A promise that contains an array of posts
 */
export async function getPosts(): Promise<typeof posts> {
  const posts = await database.query.posts.findMany()

  return posts
}
