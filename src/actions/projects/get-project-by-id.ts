'use server'

import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { database } from '@/db/database'
import { projects as project } from '@/db/schema'
import type { Project } from '@/types'

export async function getProjectByIdAction({
  projectId
}: {
  projectId: string
}): Promise<Project | undefined> {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  const user = session.user
  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const fetchedProject = await database.query.projects.findFirst({
    where: eq(project.id, projectId)
  })
  return fetchedProject
}
