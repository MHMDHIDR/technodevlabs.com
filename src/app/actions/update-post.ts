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
  if (!session) {
    throw new Error('Unauthorized')
  }

  const user = session.user
  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  //const updatedPost =
  await database
    .update(posts)
    .set({
      title,
      content,
      updatedAt: new Date()
    })
    .where(eq(posts.id, postId))

  revalidatePath('/dashboard/posts')
  redirect('/dashboard/posts')
}
