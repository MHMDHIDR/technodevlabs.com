'use server'

import { revalidatePath } from 'next/cache'
import { deletePostAction } from '@/app/actions'

export async function deletePostAndRevalidate(postId: string) {
  const { success, message } = await deletePostAction({ postId })

  if (success) {
    revalidatePath('/dashboard/posts')
    revalidatePath('/posts')
  }

  return { success, message }
}
