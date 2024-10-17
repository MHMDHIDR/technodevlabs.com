'use server'

import { eq, lt, gt } from 'drizzle-orm'
import { database } from '@/db/database'
import { posts as post } from '@/db/schema'
import { APP_LOGO_opengraph } from '@/data/constants'
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
  if (!fetchedPost) {
    return undefined
  }

  // Get the previous post
  let previousPost = await database.query.posts.findFirst({
    where: lt(post.createdAt, fetchedPost.createdAt),
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    columns: { slug: true, title: true, titleAr: true, content: true }
  })

  // Get the next post, based on the fetchedPost createdAt field
  let nextPost = await database.query.posts.findFirst({
    where: gt(post.createdAt, fetchedPost.createdAt),
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

/**
 * A function to get the image from the content of a post
 * @param content
 * @returns Promise<string>
 */
export async function getImageFromContent({
  content
}: {
  content: PostWithAuthor['content']
}): Promise<string> {
  const imgSrcMatch = content.match(/<img.*?src="(.*?)"/)
  const image = imgSrcMatch ? imgSrcMatch[1] : APP_LOGO_opengraph

  return image
}
