'use server'

import { auth } from '@/auth'
import { database } from '@/db/database'
import { posts as post } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { Post } from '@/types'

/**
 * A Function to Get a post by Slug
 * @param slug
 * @returns Promise<Post>
 */
export async function getPostBySlugAction({
  slug
}: {
  slug: string
}): Promise<Post | undefined> {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  const user = session.user
  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const fetchedPost = await database.query.posts.findFirst({
    where: eq(post.slug, slug)
  })
  return fetchedPost
}
