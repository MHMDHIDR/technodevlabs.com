import { desc, sql } from 'drizzle-orm'
import { getBlurPlaceholder } from '@/actions'
import { database } from '@/db/database'
import { projects } from '@/db/schema'
import type { ProjectWithBlur } from '@/types'

/**
 * Get all projects and their count, ordered by updatedAt descending
 * @returns {Promise<{ projects: Array<ProjectWithBlur>; projectsCount: number }>} A promise that contains an array of projects and their count
 */
export async function getProjects(): Promise<{
  projects: Array<ProjectWithBlur>
  projectsCount: number
}> {
  const projectsList = await database.select().from(projects).orderBy(desc(projects.updatedAt))
  const [{ count }] = await database.select({ count: sql`count(*)` }).from(projects)
  const projectsCount = Number(count)

  if (!projectsList || projectsList.length === 0) {
    return { projects: [], projectsCount: 0 }
  }

  const projectsWithBlur = await Promise.all(
    projectsList.map(async project => {
      const imagesWithBlur = await Promise.all(
        project.images.map(async imageSrc => {
          const blurDataURL = await getBlurPlaceholder(imageSrc)
          return { src: imageSrc, blurDataURL: blurDataURL || '' }
        })
      )
      return { ...project, images: imagesWithBlur }
    })
  )

  return { projects: projectsWithBlur, projectsCount }
}
