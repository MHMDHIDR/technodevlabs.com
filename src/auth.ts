import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { database } from '@/db/database'
import { accounts, sessions, users, verificationTokens } from '@/db/schema'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(database, {
    usersTable: users as any,
    accountsTable: accounts as any,
    sessionsTable: sessions as any,
    verificationTokensTable: verificationTokens as any
  }),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    }
  },
  providers: [Google]
})
