import NextAuth, { DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

// Extend the NextAuth session to include the user ID
declare module 'next-auth' {
  interface Session {
    user: {
      id: string // Add the user's ID to the session
    } & DefaultSession['user'] // Keep the default session user properties
  }
}

// Initialize NextAuth with the Prisma adapter and Google provider
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    }
  }
})
