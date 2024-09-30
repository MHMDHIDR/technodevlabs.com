'use server'

import { cookies } from 'next/headers'

export async function deleteCookieAction({ name }: { name: string }) {
  try {
    cookies().delete(name)
  } catch (error) {
    throw new Error('Failed to delete cookie')
  }
}
