import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { prisma } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET, // Used to sign the session cookie so AuthJS can verify the session
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days in seconds (this value is also the default)
  },
  pages: {
    signIn: '/auth'
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account && account.provider === 'google') {
        return profile?.email_verified === true ? true : false
      }
      return true
    }
  },
  ...authConfig
})
