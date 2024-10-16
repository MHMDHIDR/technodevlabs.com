'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { getTranslations } from 'next-intl/server'
import { deletePostAction, deleteProjectAction, deleteSingleObject } from '@/actions'
import { auth } from '@/auth'
import type { itemsTypes } from '@/types'

export async function deleteEntryAndRevalidateAction({
  entryId,
  projectId,
  type
}: {
  entryId: string
  type: itemsTypes
  /**
   * projectId is only needed for projectImg type
   */
  projectId?: string
}): Promise<{ success: boolean; message: string }> {
  const actions = await getTranslations('actions')
  const project = await getTranslations('dashboard.project')

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: actions('Unauthorized') }
  }

  let result: { success: boolean; message: string }

  try {
    switch (type) {
      case 'post':
        result = await deletePostAction({ postId: entryId })
        break
      case 'project':
        result = await deleteProjectAction({ projectId: entryId })
        break
      case 'projectImg':
        if (!projectId || !entryId) {
          return { success: false, message: project('idRequired') }
        }

        result = await deleteSingleObject({ imageUrl: entryId })
        break
      default:
        return { success: false, message: actions('500error') }
    }

    if (result.success) {
      revalidatePath('/')

      if (type === 'projectImg') {
        revalidatePath(`/dashboard/projects/${projectId}`, 'page')
        revalidateTag(`/dashboard/projects/${projectId}`)
      } else {
        revalidatePath(`/dashboard/${type}s`)
      }
    }
  } catch (error) {
    console.error('Error during deletion process:', error)
    result = { success: false, message: actions('500error') }
  }

  return result
}
