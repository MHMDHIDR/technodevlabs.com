'use server'

import { eq } from 'drizzle-orm'
import { database } from '@/db/database'
import { projects } from '@/db/schema'
import { deleteMultipleObjects } from '@/actions'
import type { Project } from '@/types'
import { getTranslations } from 'next-intl/server'

export async function deleteProjectAction({ projectId }: { projectId: Project['id'] }) {
  const project = await getTranslations('dashboard.project')
  const projectImgs = await getTranslations('dashboard.project.images')
  const actions = await getTranslations('actions')

  try {
    if (!projectId) {
      return { success: false, message: project('idRequired') }
    }

    // Delete files from S3
    const s3DeleteResult = await deleteMultipleObjects({ projectId })
    if (!s3DeleteResult.success) {
      return { success: false, message: projectImgs('imgsFailedDelete') }
    }

    // Delete project from database
    const deletedProject = await database.delete(projects).where(eq(projects.id, projectId))

    // First we return if Failed to delete project, then we return the success status
    if (deletedProject.length !== 0) {
      return { success: false, message: projectImgs('FailedProjectDeleted') }
    }

    return { success: true, message: projectImgs('successProjectDeleted') }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, message: actions('500error') }
  }
}
