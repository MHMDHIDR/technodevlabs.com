import Image from 'next/image'
import { redirect } from 'next/navigation'
import Layout from '@/components/custom/layout'
import SignOutButton from '@/components/custom/signout-button'
import { Cover } from '@/components/ui/cover'
import { getUser } from '@/lib/lucia'

export default async function DasboardPage() {
  // protected!!!
  const user = await getUser()

  if (!user) {
    redirect('/auth')
  }

  return (
    <Layout className={`p-4 py-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent md:text-4xl lg:text-6xl max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Dashboard</Cover>
      </h1>
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='flex items-center gap-2 border p-4 rounded-lg bg-gray-100 transition-all cursor-pointer hover:shadow-xl'>
          {user.picture && (
            <Image
              src={user.picture}
              alt={user.name}
              className='rounded-full size-16'
              height={40}
              width={40}
            />
          )}
          <div className='flex flex-col'>
            <span className='font-semibold text-xl'>{user.name}</span>
            <span className='text-gray-500'>{user.email}</span>
          </div>
        </div>
      </div>
      <div className='absolute right-4 top-4'>
        <SignOutButton />
      </div>
    </Layout>
  )
}
