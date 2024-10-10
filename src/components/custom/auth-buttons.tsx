import { IconBrandGoogle, IconLogout2 } from '@tabler/icons-react'
import { cookies } from 'next/headers'
import { signIn, signOut } from '@/auth'
import { Button } from '@/components/custom/button'

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        cookies().delete('can-authenticate')
        await signOut({ redirectTo: '/auth' })
      }}
    >
      <Button
        className='flex items-center rounded-md mx-auto text-gray-800 dark:text-gray-100'
        title='Sign Out'
        type='submit'
      >
        <IconLogout2 className='w-6 h-6 mr-2 stroke-blue-600' />
        <span>Sign Out</span>
      </Button>
    </form>
  )
}

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google', {
          redirectTo: '/dashboard'
        })
      }}
    >
      <Button
        className='flex items-center mx-auto font-bold my-20 text-white bg-purple-400 hover:bg-purple-500 rounded-md'
        type='submit'
      >
        <IconBrandGoogle className='w-6 h-6 mr-2' />
        <span>Continue with Google</span>
      </Button>
    </form>
  )
}
