'use server'

import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { projects } from '@/db/schema'
import { deleteMultipleObjects } from '@/actions'
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

    // Delete files from S3
    const s3DeleteResult = await deleteMultipleObjects({ projectId })
    if (!s3DeleteResult.success) {
      return { success: false, message: 'Failed to delete project files from S3' }
    }

    // Delete project from database
    const deletedProject = await database.delete(projects).where(eq(projects.id, projectId))

    // First we return if Failed to delete project, then we return the success status
    if (deletedProject.length !== 0) {
      return { success: false, message: 'Failed to delete project or project not found' }
    }

    return { success: true, message: 'Project and associated files deleted successfully' }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, message: 'An unexpected error occurred' }
  }
}
