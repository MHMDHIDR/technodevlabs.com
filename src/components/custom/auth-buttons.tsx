import { cookies } from 'next/headers'
import { IconBrandGoogle, IconLogout2 } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { signIn, signOut } from '@/auth'

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
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
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
