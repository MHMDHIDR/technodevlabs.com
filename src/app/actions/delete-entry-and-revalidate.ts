'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { deletePostAction, deleteProjectAction, deleteSingleObject } from '@/app/actions'
import type { DeleteTypes } from '@/types'

export async function deleteEntryAndRevalidateAction({
  entryId,
  type,
  projectId
}: {
  entryId: string
  type: DeleteTypes
  /**
   * Only needed for projectImg type
   */
  projectId?: string
}): Promise<{ success: boolean; message: string }> {
  let result: { success: boolean; message: string }

  switch (type) {
    case 'post':
      result = await deletePostAction({ postId: entryId })
      break
    case 'project':
      result = await deleteProjectAction({ projectId: entryId })
      break
    case 'projectImg':
      if (!projectId) {
        return { success: false, message: 'Project ID is required for image deletion' }
      }
      result = await deleteSingleObject({ imageUrl: entryId })
      break
    default:
      return { success: false, message: 'Invalid type' }
  }

  if (result.success) {
    revalidatePath('/')
    console.log('Revalidated path:', '/')

    if (type === 'projectImg') {
      revalidatePath(`/dashboard/projects/${projectId}`, 'page')
      revalidateTag(`/dashboard/projects/${projectId}`)

      console.log('Revalidated path:', `/dashboard/projects/${projectId}`)
    } else {
      revalidatePath(`/dashboard/${type}s`)
      console.log('Revalidated path:', `/dashboard/${type}s`)
    }
  }

  return result
}
