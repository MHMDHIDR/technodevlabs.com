import { database } from '@/db/database'
import type { Setting } from '@/types'

/**
 * Get all settings
 * @returns {Promise<Setting>} A promise that contains an array of settings
 */
export async function getSettings(): Promise<Setting | undefined> {
  return await database.query.settings.findFirst()
}
