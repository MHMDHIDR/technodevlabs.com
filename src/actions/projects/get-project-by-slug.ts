'use server'

import { eq } from 'drizzle-orm'
import { getBlurPlaceholder } from '@/actions'
import { database } from '@/db/database'
import { projects as projectsTable } from '@/db/schema'
import type { ProjectWithBlur } from '@/types'

export async function getProjectBySlugAction(slug: string): Promise<ProjectWithBlur | null> {
  try {
    const project = await database.query.projects.findFirst({
      where: eq(projectsTable.slug, slug)
    })

    if (!project) {
      return null
    }

    // Generate blur placeholders for images
    const imagesWithBlur = await Promise.allSettled(
      project.images.map(async imageSrc => {
        try {
          const blurDataURL = await getBlurPlaceholder(imageSrc)
          return { src: imageSrc, blurDataURL }
        } catch (error) {
          console.warn(`Failed to generate blur for image ${imageSrc}:`, error)
          return { src: imageSrc, blurDataURL: '' }
        }
      })
    )

    return {
      ...project,
      images: imagesWithBlur.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value
        }
        return { src: project.images[index], blurDataURL: '' }
      })
    }
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
}
