'use server'

import { cookies } from 'next/headers'

export async function deleteCookieAction({ name }: { name: string }) {
  const cookieStore = await cookies()
  try {
    cookieStore.delete(name)
  } catch (error) {
    throw new Error(`Failed to delete cookie: ${name}`)
  }
}
