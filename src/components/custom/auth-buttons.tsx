import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { IconBrandGoogle } from '@tabler/icons-react'
import { IconLogout2 } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { getGoogleOauthConsentUrl, logOut } from '@/app/actions/auth'
import type { GoogleOauthConsentUrlResponse } from '@/types'
import { toast } from 'sonner'

async function handleSignOut() {
  'use server'

  cookies().delete('can-authenticate')
  await logOut()
}

async function handleSignIn(): Promise<void> {
  'use server'

  let responseUrl: GoogleOauthConsentUrlResponse['url'] = ''
  let responseMessage: GoogleOauthConsentUrlResponse['message'] = ''

  try {
    const googleOAuthResponse = await getGoogleOauthConsentUrl()

    // If the response is not successful
    if (!googleOAuthResponse.success) {
      responseMessage = googleOAuthResponse.message
      throw new Error(responseMessage)
    }

    responseUrl = googleOAuthResponse.url
  } catch (error) {
    responseMessage = `Opps! Something went wrong`
    toast.error(responseMessage)
    console.error(`AuthResponseErrro`, error)
  } finally {
    if (responseUrl) {
      return redirect(responseUrl)
    } else {
      toast.error(responseMessage)
    }
  }
}

export function SignOut() {
  return (
    <form action={handleSignOut}>
      <Button
        className={'flex items-center rounded-md mx-auto'}
        type='submit'
        title='Sign Out'
      >
        <IconLogout2 className='w-6 h-6 mr-2 stroke-blue-600' />
        <span>Sign Out</span>
      </Button>
    </form>
  )
}

export function SignIn() {
  return (
    <form action={handleSignIn}>
      <Button
        type='submit'
        className={`flex items-center mx-auto font-bold my-20 text-white bg-purple-400 hover:bg-purple-500 rounded-md`}
      >
        <IconBrandGoogle className='w-6 h-6 mr-2' />
        <span>Continue with Google</span>
      </Button>
    </form>
  )
}
