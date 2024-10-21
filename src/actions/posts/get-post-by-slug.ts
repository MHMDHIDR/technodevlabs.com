'use server'

import { and, eq, gt, lt } from 'drizzle-orm'
import { database } from '@/db/database'
import { posts as post } from '@/db/schema'
import { getImageFromContent } from '@/lib/utils'
import type { PostWithAuthor } from '@/types'

/**
 * A function to get a post by slug, including the author (user) details, and previous/next post slugs.
 * @param slug
 * @returns Promise<PostWithAuthor | undefined>
 */
export async function getPostBySlugAction({
  slug
}: {
  slug: string
}): Promise<PostWithAuthor | undefined> {
  const fetchedPost = await database.query.posts.findFirst({
    where: eq(post.slug, slug),
    with: { user: true }
  })

  // If no post is found, return undefined
  if (!fetchedPost || !fetchedPost.isPublished) {
    return undefined
  }

  // Get the previous post
  const previousPost = await database.query.posts.findFirst({
    where: and(lt(post.createdAt, fetchedPost.createdAt), eq(post.isPublished, true)),
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    columns: { slug: true, title: true, titleAr: true, content: true }
  })

  // Get the next post, based on the fetchedPost createdAt field
  const nextPost = await database.query.posts.findFirst({
    where: and(gt(post.createdAt, fetchedPost.createdAt), eq(post.isPublished, true)),
    orderBy: (posts, { asc }) => [asc(posts.createdAt)],
    columns: { slug: true, title: true, titleAr: true, content: true }
  })

  const prevImage = previousPost
    ? await getImageFromContent({ content: previousPost.content })
    : undefined
  const nextImage = nextPost ? await getImageFromContent({ content: nextPost.content }) : undefined

  // Extracting post and author details
  const postWithAuthor: PostWithAuthor = {
    ...fetchedPost,
    author: {
      id: fetchedPost.user.id,
      name: fetchedPost.user.name,
      email: fetchedPost.user.email,
      image: fetchedPost.user.image
    },
    previousPost: previousPost ? { ...previousPost, image: prevImage } : null,
    nextPost: nextPost ? { ...nextPost, image: nextImage } : null
  }

  return postWithAuthor
}
