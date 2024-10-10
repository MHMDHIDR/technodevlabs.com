import { database } from '@/db/database'
import type { Project } from '@/types'

/**
 * Get all projects
 * @returns {Promise<Project>} A promise that contains an array of projects
 */
export async function getProjects(): Promise<{
  projects: Array<Project>
  projectsCount: number
}> {
  const projects = await database.query.projects.findMany()

  return !projects
    ? { projects: [], projectsCount: 0 }
    : { projects, projectsCount: projects.length }
}
