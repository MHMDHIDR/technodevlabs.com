'use server'

import { revalidatePath } from 'next/cache'
import { database } from '@/db/database'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { projects } from '@/db/schema'
import { createSlug } from '@/lib/utils'
import type { Project } from '@/types'

export async function updateProjectAction({
  projectId,
  title,
  description,
  url,
  images
}: {
  projectId: Project['id']
  title: Project['title']
  description: Project['description']
  url: Project['url']
  images?: Project['images']
}) {
  try {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
      throw new Error('Unauthorized')
    }

    if (!projectId) {
      throw new Error('Project ID is required')
    }

    const updatedProject = await database
      .update(projects)
      .set({ title, description, url, images: images ?? [], updatedAt: new Date() })
      .where(eq(projects.id, projectId))

    if (updatedProject.length !== 0) {
      return { success: false, message: 'Failed to update project or project not found' }
    }

    revalidatePath('/dashboard/projects')
    return { success: true, message: 'Project updated successfully' }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, message: 'An unexpected error occurred' }
  }
}
