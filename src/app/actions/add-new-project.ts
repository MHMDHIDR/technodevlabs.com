'use server'

import { auth } from '@/auth'
import { database } from '@/db/database'
import { projects } from '@/db/schema'
import type { Project } from '@/types'

/**
 * A server action to add a new project
 * @param projectData - The project data to add
 * @returns     - A success message if the project was added successfully
 */
export async function addNewProjectAction(
  projectData: Project
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await auth()
    if (!session) {
      throw new Error('Unauthorized')
    }

    const user = session.user
    if (!user || !user.id) {
      throw new Error('Unauthorized')
    }

    // Insert post with userId
    await database.insert(projects).values({ ...projectData })

    return { success: true, message: 'Project added successfully' }
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
            message: 'A project with this title already exists. Please choose a different title.'
          }
        }
      }
    }

    return { success: false, message: 'An unexpected error occurred' }
  }
}
