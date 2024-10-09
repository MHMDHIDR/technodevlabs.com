'use server'

import { revalidatePath } from 'next/cache'
import { database } from '@/db/database'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { posts } from '@/db/schema'
import { createSlug } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export async function updatePostAction({
  postId,
  title,
  content
}: {
  postId: string
  title: string
  content: string
}) {
  const t = await getTranslations('dashboard.post')
  const actions = await getTranslations('actions')

  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      throw new Error('Unauthorized')
    }

    if (!postId) {
      throw new Error('Post ID is required')
    }

    const updatedPost = await database
      .update(posts)
      .set({ title, slug: createSlug(title), content, updatedAt: new Date() })
      .where(eq(posts.id, postId))

    if (updatedPost.length !== 0) {
      return { success: false, message: t('updateErrorMessage') }
    }

    revalidatePath('/dashboard/posts')
    return { success: true, message: t('updateSuccessMessage') }
  } catch (error) {
    console.error('Error updating post:', error)

    if (typeof error === 'object' && error !== null) {
      if ('code' in error && error.code === '23505') {
        if (
          'constraint_name' in error &&
          typeof error.constraint_name === 'string' &&
          error.constraint_name.includes('slug')
        ) {
          return {
            success: false,
            message: t('postExits')
          }
        }
      }
    }
    return { success: false, message: actions('500error') }
  }
}
