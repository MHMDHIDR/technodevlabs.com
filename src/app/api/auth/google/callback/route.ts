import { googleOAuthClient } from '@/lib/google-oauth'
import { lucia } from '@/lib/lucia'
import { database } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

// http://localhost:3000/api/auth/google/callback
export async function GET(req: NextRequest, res: Response) {
  try {
    const url = req.nextUrl
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (!code || !state) {
      return new Response('Invalid Request: Missing code or state', { status: 400 })
    }

    const codeVerifier = cookies().get('codeVerifier')?.value
    const savedState = cookies().get('state')?.value

    if (!codeVerifier || !savedState || state !== savedState) {
      return new Response('Invalid Request: Verification failed', { status: 400 })
    }

    // Validate the authorization code with Google OAuth
    const { accessToken } = await googleOAuthClient.validateAuthorizationCode(
      code,
      codeVerifier
    )

    // Fetch user data from Google API
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (!googleResponse.ok) {
      return new Response('Failed to fetch user info from Google', { status: 500 })
    }

    const googleData = (await googleResponse.json()) as {
      id: string
      email: string
      name: string
      picture: string
    }

    // Check if user exists and create session
    const user = await database.user.upsert({
      where: { email: googleData.email },
      create: {
        name: googleData.name,
        email: googleData.email,
        picture: googleData.picture
      },
      update: {}
    })

    // Create session and set session cookie
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return redirect('/dashboard')
  } catch (error) {
    console.error('Error in Google OAuth callback:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
