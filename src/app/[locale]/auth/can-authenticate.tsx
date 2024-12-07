import { getTranslations } from 'next-intl/server'
import { cookies } from 'next/headers'
import { SubmitButton } from '@/app/[locale]/contact/submit-button'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { env } from '@/env'

async function authenticate(formData: FormData) {
  'use server'

  const cookieStore = await cookies()

  if (formData.get('password') === env.CAN_AUTHENTICATE_PASSWORD) {
    cookieStore.set('can-authenticate', 'true', { httpOnly: true, secure: true })
  }
}

export default async function CanAuthenticate({
  children
}: {
  children: Promise<React.ReactNode>
}) {
  const cookieStore = await cookies()
  const authTranslations = await getTranslations('auth')
  const canAuthenticate = cookieStore.get('can-authenticate')?.value === 'true'

  return canAuthenticate ? (
    children
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
  )
}
