'use server'

import { auth } from '@/auth'
import { database } from '@/db/database'
import { projects } from '@/db/schema'
import type { Project } from '@/types'

// ProjectData is Project - updatedAt
type projectData = Omit<Project, 'updatedAt'>

export async function addNewProjectAction(projectData: projectData) {
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
    await database.insert(projects).values({
      ...projectData,
      updatedAt: new Date()
    })

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