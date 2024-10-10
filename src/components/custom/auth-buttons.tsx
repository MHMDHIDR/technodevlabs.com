import { IconBrandGoogle, IconLogout2 } from '@tabler/icons-react'
import { cookies } from 'next/headers'
import { signIn, signOut } from '@/auth'
import { Button } from '@/components/custom/button'
import { useTranslations } from 'next-intl'

export function SignOut() {
  const authTranslations = useTranslations('auth')

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
        title={authTranslations('signOut')}
        type='submit'
      >
        <IconLogout2 className='w-6 h-6 mr-2 stroke-blue-600' />
        <span>{authTranslations('signOut')}</span>
      </Button>
    </form>
  )
}

export function SignIn() {
  const authTranslations = useTranslations('auth')

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
        <span>{authTranslations('signInWithGoogle')}</span>
      </Button>
    </form>
  )
}
