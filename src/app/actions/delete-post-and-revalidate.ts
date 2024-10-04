'use server'

import { revalidatePath } from 'next/cache'
import { deletePostAction } from '@/app/actions'

export async function deletePostAndRevalidate(postId: string) {
  const { success, message } = await deletePostAction({ postId })

  if (success) {
    revalidatePath('/')
    revalidatePath('/posts')
    revalidatePath('/dashboard/posts')
  }

  return { success, message }
}
