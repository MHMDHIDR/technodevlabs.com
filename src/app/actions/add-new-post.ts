'use server'

import { auth } from '@/auth'
import { database } from '@/db/database'
import { posts } from '@/db/schema'
import { createSlug } from '@/lib/utils'

export async function addNewPostAction({
  title,
  content
}: {
  title: string
  content: string
}) {
  try {
    const session = await auth()
    if (!session) {
      throw new Error('Unauthorized')
    }

    const user = session.user
    if (!user || !user.id) {
      throw new Error('Unauthorized')
    }

    // Insert post with userId
    await database.insert(posts).values({
      userId: user.id,
      title,
      slug: createSlug(title),
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return { success: true, message: 'Post added successfully' }
  } catch (error: unknown) {
    console.error('Error adding new post:', error)

    if (typeof error === 'object' && error !== null) {
      if ('code' in error && error.code === '23505') {
        if (
          'constraint_name' in error &&
          typeof error.constraint_name === 'string' &&
          error.constraint_name.includes('slug')
        ) {
          return {
            success: false,
            message:
              'A post with this title already exists. Please choose a different title.'
          }
        }
      }
    }

    return { success: false, message: 'An unexpected error occurred' }
  }
}
