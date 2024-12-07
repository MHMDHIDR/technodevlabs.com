import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import { SubmitButton } from '@/app/[locale]/contact/submit-button'
import { auth } from '@/auth'
import { SignIn, SignOut } from '@/components/custom/auth-buttons'
import Divider from '@/components/custom/divider'
import LabelInputContainer from '@/components/custom/label-input-container'
import Layout from '@/components/custom/layout'
import { SecondaryHeading } from '@/components/ui/cover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authenticate } from './actions'

export default async function AuthPage() {
  const session = await auth()
  const user = session?.user
  const cookieStore = await cookies()
  const authTranslations = await getTranslations('auth')
  const canAuthenticate = cookieStore.get('can-authenticate')?.value === 'true'

  return (
    <Layout className='p-4 py-20 container max-w-screen-md'>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-2xl font-semibold text-center text-transparent md:text-4xl lg:text-6xl max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        Authenticate <br /> on <SecondaryHeading>TechnoDevLabs</SecondaryHeading>
      </h1>

      <Divider className='my-10' />

      {canAuthenticate ? (
        user ? (
          <SignOut />
        ) : (
          <SignIn />
        )
      ) : (
        <form action={authenticate}>
          <div className='flex flex-col mb-4 gap-y-2 md:flex-row md:gap-y-0 md:gap-x-2'>
            <LabelInputContainer>
              <Label htmlFor='password'>{authTranslations('password')}</Label>
              <Input
                autoFocus
                min={5}
                name='password'
                placeholder={authTranslations('enterPassword')}
                required
                type='password'
              />
            </LabelInputContainer>
          </div>
          <SubmitButton>{authTranslations('signIn')}</SubmitButton>
        </form>
      )}
    </Layout>
  )
}
