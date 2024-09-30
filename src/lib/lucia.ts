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

export const getUser = async (): Promise<User> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
  if (!sessionId) {
    return null
  }

  const { session, user } = await lucia.validateSession(sessionId)
  if (!user || !session) {
    return null
  }

  try {
    if (session && session.fresh) {
      // refreshing their session cookie
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch (error) {}
  const dbUser = await database.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      name: true,
      email: true,
      picture: true
    }
  })
  return dbUser
}
