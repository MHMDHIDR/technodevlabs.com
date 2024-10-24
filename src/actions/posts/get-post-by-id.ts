'use server'

import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { posts as post } from '@/db/schema'
import type { Post } from '@/types'

export async function getPostByIdAction({ postId }: { postId: string }): Promise<Post | undefined> {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  const user = session.user
  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const fetchedPost = await database.query.posts.findFirst({
    where: eq(post.id, postId)
  })
  return fetchedPost
}
