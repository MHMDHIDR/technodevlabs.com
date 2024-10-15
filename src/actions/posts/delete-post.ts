'use server'

import { eq } from 'drizzle-orm'
import { getTranslations } from 'next-intl/server'
import { database } from '@/db/database'
import { posts } from '@/db/schema'
import type { Post } from '@/types'

export async function deletePostAction({ postId }: { postId: Post['id'] }) {
  const actions = await getTranslations('actions')
  const post = await getTranslations('dashboard.post')

  try {
    if (!postId) {
      return { success: false, message: post('idRequired') }
    }

    const deletedPost = await database.delete(posts).where(eq(posts.id, postId))

    if (deletedPost.length > 0) {
      return { success: false, message: post('updateErrorMessage') }
    }

    return { success: true, message: post('deleteSuccessMessage') }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, message: actions('500error') }
  }
}
