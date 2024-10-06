'use server'

import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { posts } from '@/db/schema'
import type { Post } from '@/types'

export async function deletePostAction({ postId }: { postId: Post['id'] }) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { success: false, message: 'Unauthorized' }
    }

    if (!postId) {
      return { success: false, message: 'Post ID is required' }
    }

    const deletedPost = await database.delete(posts).where(eq(posts.id, postId))

    if (deletedPost.length !== 0) {
      return { success: false, message: 'Failed to delete post or post not found' }
    }

    return { success: true, message: 'Post deleted successfully' }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, message: 'An unexpected error occurred' }
  }
}
