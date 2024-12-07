import { cookies } from 'next/headers'
import { env } from '@/env'

export async function authenticate(formData: FormData) {
  'use server'

  const cookieStore = await cookies()

  if (formData.get('password') === env.CAN_AUTHENTICATE_PASSWORD) {
    cookieStore.set('can-authenticate', 'true', { httpOnly: true, secure: true })
  }
}
