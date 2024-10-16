'use server'

import { auth } from '@/auth'
import { POST_TITLE_LENGTH } from '@/data/constants'
import { database } from '@/db/database'
import { projects } from '@/db/schema'
import { getTranslations } from 'next-intl/server'
import type { Project } from '@/types'

/**
 * A server action to add a new project
 * @param projectData - The project data to add
 * @returns     - A success message if the project was added successfully
 */
export async function addNewProjectAction(
  projectData: Project
): Promise<{ success: boolean; message: string }> {
  const project = await getTranslations('dashboard.project')
  const actions = await getTranslations('actions')

  try {
    const session = await auth()
    if (!session) {
      throw new Error(actions('Unauthorized'))
    }

    const user = session.user
    if (!user || !user.id) {
      throw new Error(actions('Unauthorized'))
    }

    if (projectData.title.length > POST_TITLE_LENGTH * 1.5) {
      return {
        success: false,
        message: project('titleTooLong')
      }
    }

    // Insert post with userId
    await database.insert(projects).values({ ...projectData })

    return { success: true, message: project('addSuccessMessage') }
  } catch (error: unknown) {
    console.error('Error adding new project:', error)

    if (typeof error === 'object' && error !== null) {
      if ('code' in error && error.code === '23505') {
        if (
          'constraint_name' in error &&
          typeof error.constraint_name === 'string' &&
          error.constraint_name.includes('slug')
        ) {
          return {
            success: false,
            message: project('projectExits')
          }
        }
      }
    }

    return { success: false, message: actions('500error') }
  }
}
