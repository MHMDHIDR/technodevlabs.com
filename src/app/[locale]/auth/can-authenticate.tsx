import { cookies } from 'next/headers'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/app/[locale]/contact/submit-button'

async function authenticate(formData: FormData) {
  'use server'

  if (formData.get('password') === 'technodevlabs') {
    cookies().set('can-authenticate', 'true', { httpOnly: true, secure: true })
  }
}

export default function CanAuthenticate({ children }: { children: React.ReactNode }) {
  const canAuthenticate = cookies().get('can-authenticate')?.value === 'true'

  if (canAuthenticate) {
    return children
  }

  return (
    <form action={authenticate}>
      <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
        <LabelInputContainer>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            name='password'
            placeholder='Enter the password'
            min={5}
            autoFocus
            required
          />
        </LabelInputContainer>
      </div>
      <SubmitButton>Submit</SubmitButton>
    </form>
  )
}
