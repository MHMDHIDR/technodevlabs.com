'use server'

import { eq } from 'drizzle-orm'
import { getTranslations } from 'next-intl/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { settings } from '@/db/schema'
import { Setting } from '@/types'

export type ItemsCountActionState = {
  success: boolean
  message: string
  id: Setting['id']
  itemsCount: Setting['itemsCount']
}

export async function updateItemsCountAction(
  prevState: ItemsCountActionState,
  formData: FormData
): Promise<ItemsCountActionState> {
  const actions = await getTranslations('actions')

  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return {
        id: prevState.id,
        success: false,
        message: actions('Unauthorized'),
        itemsCount: prevState.itemsCount
      }
    }

    const id = prevState.id
    const itemsCount = Number(formData.get('itemsCount'))

    if (!id || !itemsCount) {
      return {
        id: prevState.id,
        success: false,
        message: 'ID or Items Count is required',
        itemsCount: prevState.itemsCount
      }
    }

    const updatedSettings = await database
      .update(settings)
      .set({ itemsCount })
      .where(eq(settings.id, id))

    if (updatedSettings.count === 0) {
      return {
        id: prevState.id,
        success: false,
        message: actions('updatedFailed'),
        itemsCount: prevState.itemsCount
      }
    }

    revalidatePath('/dashboard/settings')
    return {
      id: prevState.id,
      success: true,
      message: actions('updatedSuccessfully'),
      itemsCount
    }
  } catch (error) {
    console.error('Error updating itemsCount:', error)
    return {
      id: prevState.id,
      success: false,
      message: actions('500error'),
      itemsCount: prevState.itemsCount
    }
  }
}
