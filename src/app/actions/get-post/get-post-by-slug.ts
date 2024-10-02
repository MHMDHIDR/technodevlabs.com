'use server'

import { database } from '@/db/database'
import { posts as post, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { PostWithAuthor } from '@/types'

/**
 * A function to get a post by slug, including the author (user) details.
 * @param slug
 * @returns Promise<Post & { author: { id: string; name: string | null; email: string; image: string | null } } | undefined>
 */
export async function getPostBySlugAction({
  slug
}: {
  slug: string
}): Promise<PostWithAuthor | undefined> {
  const fetchedPost = await database.query.posts.findFirst({
    where: eq(post.slug, slug),
    with: {
      user: true // Fetch the related user (author)
    }
  })

  // If no post is found, return undefined
  if (!fetchedPost) {
    return undefined
  }

  // Extracting post and author details
  const postWithAuthor = {
    ...fetchedPost,
    author: {
      id: fetchedPost.user.id,
      name: fetchedPost.user.name,
      email: fetchedPost.user.email,
      image: fetchedPost.user.image
    }
  }

  return postWithAuthor
}
