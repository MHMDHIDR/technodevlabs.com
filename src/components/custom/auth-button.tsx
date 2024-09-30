import { SignInButton, SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs'
import { IconBrandGoogle, IconLogout2 } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'

export default async function AuthButton() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button
            type='submit'
            className={`flex items-center mx-auto font-bold my-20 text-white bg-purple-400 hover:bg-purple-500 rounded-md`}
          >
            <IconBrandGoogle className='w-6 h-6 mr-2' />
            <span>Continue with Google</span>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <Button
            type='submit'
            className={`flex items-center mx-auto font-bold my-20 text-white bg-purple-400 hover:bg-purple-500 rounded-md`}
          >
            <IconLogout2 className='w-6 h-6 mr-2 stroke-red-600' />
            <span>Sign Out</span>
          </Button>
        </SignOutButton>
      </SignedIn>
    </>
  )
}
