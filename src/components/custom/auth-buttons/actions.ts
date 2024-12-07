'use server'

import { cookies } from 'next/headers'
import { signOut } from '@/auth'

export async function handleSignOut() {
  const cookieStore = await cookies()

  cookieStore.delete('can-authenticate')
  await signOut({ redirectTo: '/auth' })
}
