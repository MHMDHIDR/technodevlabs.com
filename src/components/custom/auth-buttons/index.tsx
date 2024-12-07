import { IconBrandGoogle, IconLogout2 } from '@tabler/icons-react'
import { getTranslations } from 'next-intl/server'
import { signIn } from '@/auth'
import { Button } from '@/components/custom/button'
import { handleSignOut } from './actions'

export const SignOut = async () => {
  const authTranslations = await getTranslations('auth')

  return (
    <form action={handleSignOut}>
      <Button
        className='flex items-center rounded-md mx-auto text-gray-800 dark:text-gray-100'
        title={authTranslations('signOut')}
        type='submit'
      >
        <IconLogout2 className='w-6 h-6 mr-2 stroke-blue-600' />
        <span>{authTranslations('signOut')}</span>
      </Button>
    </form>
  )
}

export const SignIn = async () => {
  const authTranslations = await getTranslations('auth')

  return (
    <form
      action={async () => {
        'use server'
        await signIn('google', { redirectTo: '/dashboard' })
      }}
    >
      <Button
        className='flex items-center mx-auto font-bold my-20 text-white bg-purple-400 hover:bg-purple-500 rounded-md select-none'
        type='submit'
      >
        <IconBrandGoogle className='w-6 h-6 mx-2' />
        <span>{authTranslations('signInWithGoogle')}</span>
      </Button>
    </form>
  )
}
