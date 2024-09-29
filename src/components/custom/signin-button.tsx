'use client'

import { toast } from 'sonner'
import { IconBrandGoogle } from '@tabler/icons-react'
import { getGoogleOauthConsentUrl } from '@/app/actions/auth'
import { Button } from '@/components/custom/button'
import { Error } from '@/components/custom/icons'

export default function SignIn() {
  return (
    <Button
      type='button'
      className='flex items-center mx-auto font-bold my-20 text-white bg-purple-400 hover:bg-purple-500 rounded-md'
      onClick={async () => {
        const res = await getGoogleOauthConsentUrl()
        if (res.url) {
          window.location.href = res.url
        } else {
          toast(res.error ?? 'Failed to Login. Please try again later! 😢', {
            icon: <Error className='inline-block' />,
            position: 'bottom-center',
            className: 'text-center rtl select-none',
            style: {
              backgroundColor: '#FDE7E7',
              color: '#C53030',
              border: '1px solid #C53030',
              gap: '1.5rem',
              textAlign: 'justify'
            }
          })
        }
      }}
      withArrow
    >
      <IconBrandGoogle className='w-6 h-6 mr-2' /> Continue with Google
    </Button>
  )
}
