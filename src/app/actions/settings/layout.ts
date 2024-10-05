'use server'

import { revalidatePath } from 'next/cache'
import { database } from '@/db/database'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { settings } from '@/db/schema'
import { Setting } from '@/types'

export async function updateLayoutAction({ layout }: Setting) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      throw new Error('Unauthorized')
    }

    if (!layout) {
      throw new Error('Layout is required')
    }

    const updatedSettings = await database
      .update(settings)
      .set({ layout })
      .where(eq(settings.layout, layout === 'grid' ? 'dotted' : 'grid'))

    if (updatedSettings.length !== 0) {
      return {
        success: false,
        message: 'Failed to update layout or no changes were made'
      }
    }

    revalidatePath('/dashboard/settings')
    return { success: true, message: 'Layout updated successfully' }
  } catch (error) {
    console.error('Error updating layout:', error)
    return { success: false, message: 'An unexpected error occurred' }
  }
}
