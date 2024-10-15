import { getBlurPlaceholder } from '@/actions'
import { database } from '@/db/database'
import type { Project, ProjectWithBlur } from '@/types'

/**
 * Get all projects and their count
 * @returns {Promise<Project & { projectsCount: number }>} A promise that contains an array of projects and their count
 */
export async function getProjects(): Promise<{
  projects: Array<ProjectWithBlur>
  projectsCount: number
}> {
  const projects = await database.query.projects.findMany()

  if (!projects || projects.length === 0) {
    return { projects: [], projectsCount: 0 }
  }

  const projectsWithBlur = await Promise.all(
    projects.map(async project => {
      const imagesWithBlur = await Promise.all(
        project.images.map(async imageSrc => ({
          src: imageSrc,
          blurDataURL: await getBlurPlaceholder(imageSrc)
        }))
      )
      return { ...project, images: imagesWithBlur }
    })
  )

  return { projects: projectsWithBlur, projectsCount: projects.length }
}
