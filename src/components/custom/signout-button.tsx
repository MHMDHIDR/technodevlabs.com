'use client'

import { IconLogout2 } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { logOut } from '@/app/actions/auth'

export default function SignOutButton() {
  return (
    <Button
      type='button'
      className='flex items-center mx-auto font-bold my-20 text-white bg-purple-400 hover:bg-purple-500 rounded-md'
      onClick={logOut}
      withArrow
    >
      <IconLogout2 className='w-6 h-6 mr-2 stroke-blue-600' /> SignOut
    </Button>
  )
}
