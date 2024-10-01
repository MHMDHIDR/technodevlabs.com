'use server'

import { auth } from '@/auth'
import { database } from '@/db/database'
import { posts } from '@/db/schema'
import { redirect } from 'next/navigation'

export async function addNewPostAction({
  title,
  content
}: {
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

  // Insert post with userId
  const newPost = await database.insert(posts).values({
    userId: user.id,
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  redirect('/dashboard/posts')
}
