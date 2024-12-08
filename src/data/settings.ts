import { database } from '@/db/database'
import { ITEMS_COUNT } from './constants'
import type { Setting } from '@/types'

/**
 * Get all settings, for now it only returns the layout settings
 * @returns {Promise<Setting>} A promise that contains an array of settings
 */
export async function getSettings(): Promise<Setting> {
  return (
    (await database.query.settings.findFirst()) || {
      id: '',
      layout: 'dotted',
      itemsCount: ITEMS_COUNT
    }
  )
}
