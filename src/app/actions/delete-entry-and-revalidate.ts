'use server'

import { revalidatePath } from 'next/cache'
import { deletePostAction, deleteProjectAction } from '@/app/actions'
import type { DeleteType } from '@/types'

/**
 * A Server Action to Delete an entry and revalidate the cache
 * @param entryId  The ID of the entry to delete
 * @param type  The type of entry to delete
 * @returns  The success status and message
 */
export async function deleteEntryAndRevalidateAction({
  entryId,
  type
}: {
  entryId: string
  type: DeleteType
}): Promise<{ success: boolean; message: string }> {
  const { success, message } =
    type === 'post'
      ? await deletePostAction({ postId: entryId })
      : await deleteProjectAction({ projectId: entryId })

  if (success) {
    revalidatePath('/')
    revalidatePath(type === 'post' ? '/posts' : '/projects')
    revalidatePath(type === 'post' ? '/dashboard/posts' : '/dashboard/projects')
  }

  return { success, message }
}
