'use server'

import { cookies } from 'next/headers'
import { generateCodeVerifier, generateState } from 'arctic'
import { googleOAuthClient } from '@/lib/google-oauth'
import { lucia } from '@/lib/lucia'
import { redirect } from 'next/navigation'

export const logOut = async () => {
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/auth')
}

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()

    cookies().set('codeVerifier', codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })
    cookies().set('state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })

    const authUrl = await googleOAuthClient.createAuthorizationURL(state, codeVerifier, {
      scopes: ['email', 'profile']
    })
    return { success: true, url: authUrl.toString() }
  } catch (error) {
    return { success: false, error: 'Something went wrong' }
  }
}
