'use server'

import { getTranslations } from 'next-intl/server'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { posts } from '@/db/schema'
import { createSlug } from '@/lib/utils'
import type { Post } from '@/types'

type AddNewPostActionProps = Omit<Post, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'slug'>

export async function addNewPostAction({
  content,
  title,
  titleAr,
  contentAr
}: AddNewPostActionProps) {
  const t = await getTranslations('dashboard.post')
  const actions = await getTranslations('actions')

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
    const addedPost = await database.insert(posts).values({
      userId: user.id,
      title,
      titleAr,
      slug: createSlug(title),
      content,
      contentAr,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    if (addedPost.length > 0) {
      return { success: false, message: t('addErrorMessage') }
    }

    return { success: true, message: t('addSuccessMessage') }
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
            message: t('postExits')
          }
        }
      }
    }

    return { success: false, message: actions('500error') }
  }
}
