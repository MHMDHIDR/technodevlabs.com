'use server'

import { eq } from 'drizzle-orm'
import { getTranslations } from 'next-intl/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { settings } from '@/db/schema'
import type { Setting } from '@/types'

export async function updateLayoutAction({
  id,
  layout
}: {
  id: string
  layout: Setting['layout']
}) {
  const actions = await getTranslations('actions')

  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { success: false, message: actions('Unauthorized') }
    }

    if (!id || !layout) {
      return { success: false, message: 'ID or Layout is required' }
    }

    const updatedSettings = await database
      .update(settings)
      .set({ layout })
      .where(eq(settings.id, id))

    if (updatedSettings.count === 0) {
      return { success: false, message: actions('updatedFailed') }
    }

    revalidatePath('/dashboard/settings')
    return { success: true, message: actions('updatedSuccessfully') }
  } catch (error) {
    console.error('Error updating layout:', error)
    return { success: false, message: actions('500error') }
  }
}
