'use server'

import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { projects } from '@/db/schema'
import type { Project } from '@/types'

export async function deleteProjectAction({ projectId }: { projectId: Project['id'] }) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      return { success: false, message: 'Unauthorized' }
    }

    if (!projectId) {
      return { success: false, message: 'Project ID is required' }
    }

    const deletedProject = await database.delete(projects).where(eq(projects.id, projectId))

    if (deletedProject.length !== 0) {
      return { success: false, message: 'Failed to delete project or project not found' }
    }

    return { success: true, message: 'Project deleted successfully' }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, message: 'An unexpected error occurred' }
  }
}
