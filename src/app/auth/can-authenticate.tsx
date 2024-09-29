'use client'

import { useEffect, useState } from 'react'
import { SubmitButton } from '@/app/contact/submit-button'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Suspense } from 'react'
import { Skeleton } from '@/components/custom/skeleton'

export default function CanAuthenticate({ children }: { children: React.ReactNode }) {
  const [canAuthenticate, setCanAuthenticate] = useState<boolean | null>(null)

  useEffect(() => {
    // Only run this on the client, after the component has mounted
    const cookie = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith('canAuthenticate='))
    if (cookie) {
      setCanAuthenticate(true)
    } else {
      setCanAuthenticate(false)
    }
  }, [])

  if (canAuthenticate === null) {
    // Return a loading state or skeleton while checking the authentication status
    return (
      <div className='flex flex-col gap-y-1.5'>
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-4' />
      </div>
    )
  }

  return !canAuthenticate ? (
    <Suspense
      fallback={
        <div className='flex flex-col gap-y-1.5'>
          <Skeleton className='w-full h-4' />
          <Skeleton className='w-full h-4' />
        </div>
      }
    >
      <form
        onSubmit={e => {
          e.preventDefault()
          if (e.currentTarget.password.value === 'technodevlabs') {
            document.cookie = 'canAuthenticate=true'
            window.location.reload()
          }
        }}
        className='container mx-auto max-w-3xl'
      >
        <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
          <LabelInputContainer>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              name='password'
              placeholder='Enter the password'
              min={5}
              required
            />
          </LabelInputContainer>
        </div>
        <SubmitButton>Submit</SubmitButton>
      </form>
    </Suspense>
  ) : (
    children
  )
}
