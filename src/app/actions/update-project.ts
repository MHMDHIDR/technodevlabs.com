'use server'

import { database } from '@/db/database'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { projects } from '@/db/schema'
import type { Project, updateProjectData } from '@/types'

/**
 * A server action to update a project
 * @param projectId - The ID of the project to update
 * @param title     - The new title of the project
 * @param description - The new description of the project
 * @param url       - The new URL of the project
 * @returns        - A success message if the project was updated successfully
 */
export async function updateProjectAction({
  projectId,
  title,
  description,
  url,
  images
}: updateProjectData) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      throw new Error('Unauthorized')
    }

    if (!projectId) {
      throw new Error('Project ID is required')
    }

    // Fetch current project data
    const [currentProject] = await database
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))

    if (!currentProject) {
      return { success: false, message: 'Project not found' }
    }

    // Prepare update object
    const updateData: Partial<Project> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (url !== undefined) updateData.url = url

    if (images) {
      if ('removeImage' in images) {
        // Remove the specified image
        updateData.images = currentProject.images.filter(img => img !== images.removeImage)
      } else {
        // Set new images array
        updateData.images = images
      }
    }

    updateData.updatedAt = new Date()

    const updatedProject = await database
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, projectId))

    if (updatedProject.length !== 0) {
      return { success: false, message: 'Failed to update project or project not found' }
    }

    return { success: true, message: 'Project updated successfully' }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, message: 'An unexpected error occurred' }
  }
}
