import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { database } from './prisma'
import { cookies } from 'next/headers'
import type { User } from '@/types'

const adapter = new PrismaAdapter(database.session, database.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'technodevlabs-cookie',
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
})

const retryPrismaQuery = async <T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T | null> => {
  try {
    return await fn()
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying Prisma query, attempts left: ${retries}`)
      return retryPrismaQuery(fn, retries - 1)
    } else {
      console.error('Prisma query failed after retries:', error)
      return null
    }
  }
}

export const getUser = async (): Promise<User | null> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
  if (!sessionId) return null

  try {
    const { session, user } = await lucia.validateSession(sessionId)
    if (!user || !session) return null

    if (session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }

    return await retryPrismaQuery(() =>
      database.user.findUnique({
        where: { id: user.id },
        select: { name: true, email: true, picture: true }
      })
    )
  } catch (error) {
    console.error('Error in getUser:', error)
    return null
  }
}
