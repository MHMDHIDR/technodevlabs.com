'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { database } from '@/db/database'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { posts } from '@/db/schema'

export async function updatePostAction({
  postId,
  title,
  content
}: {
  postId: string
  title: string
  content: string
}) {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    throw new Error('Unauthorized')
  }

  if (!postId) {
    throw new Error('Post ID is required')
  }

  //const updatedPost =
  await database
    .update(posts)
    .set({ title, content, updatedAt: new Date() })
    .where(eq(posts.id, postId))

  revalidatePath('/dashboard/posts')
  redirect('/dashboard/posts')
}
