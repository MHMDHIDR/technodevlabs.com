'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { settings } from '@/db/schema'
import { getTranslations } from 'next-intl/server'
import type { Setting } from '@/types'

export async function updateLayoutAction({ layout }: Setting) {
  const actions = await getTranslations('actions')

  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { success: false, message: actions('Unauthorized') }
    }

    if (!layout) {
      throw new Error('Layout is required')
    }

    const updatedSettings = await database
      .update(settings)
      .set({ layout })
      .where(eq(settings.layout, layout === 'grid' ? 'dotted' : 'grid'))

    if (updatedSettings.length > 0) {
      return {
        success: false,
        message: actions('updatedFailed')
      }
    }

    revalidatePath('/dashboard/settings')
    return { success: true, message: actions('updatedSuccessfully') }
  } catch (error) {
    console.error('Error updating layout:', error)
    return { success: false, message: actions('500error') }
  }
}
