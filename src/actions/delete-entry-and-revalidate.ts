'use server'

import { auth } from '@/auth'
import { revalidatePath, revalidateTag } from 'next/cache'
import { deletePostAction, deleteProjectAction, deleteSingleObject } from '@/actions'
import type { itemsTypes } from '@/types'
import { getTranslations } from 'next-intl/server'

export async function deleteEntryAndRevalidateAction({
  entryId,
  type,
  projectId
}: {
  entryId: string
  type: itemsTypes
  /**
   * Only needed for projectImg type
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

  switch (type) {
    case 'post':
      result = await deletePostAction({ postId: entryId })
      break
    case 'project':
      result = await deleteProjectAction({ projectId: entryId })
      break
    case 'projectImg':
      if (!projectId) {
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

  return result
}
