'use server'

import { eq } from 'drizzle-orm'
import { getTranslations } from 'next-intl/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { posts } from '@/db/schema'
import { createSlug } from '@/lib/utils'
import { Post } from '@/types'

type UpdatePostActionProps = Omit<Post, 'userId' | 'createdAt' | 'updatedAt' | 'slug'>

export async function updatePostAction({
  id: postId,
  title,
  titleAr,
  content,
  contentAr,
  isPublished
}: UpdatePostActionProps) {
  const postTranslations = await getTranslations('dashboard.post')
  const actions = await getTranslations('actions')

  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      throw new Error('Unauthorized')
    }

    if (!postId) {
      throw new Error(postTranslations('idRequired'))
    }

    const updatedPost = await database
      .update(posts)
      .set({
        title,
        titleAr,
        slug: createSlug(title),
        content,
        contentAr,
        isPublished,
        updatedAt: new Date()
      })
      .where(eq(posts.id, postId))

    if (updatedPost.length > 0) {
      return { success: false, message: postTranslations('updateErrorMessage') }
    }

    revalidatePath('/dashboard/posts')
    return { success: true, message: postTranslations('updateSuccessMessage') }
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
            message: postTranslations('postExits')
          }
        }
      }
    }
    return { success: false, message: actions('500error') }
  }
}
