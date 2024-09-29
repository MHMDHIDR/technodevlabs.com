import Divider from '@/components/custom/divider'
import GoogleOAuthButton from '@/components/custom/signin-button'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'

export default function AuthPage() {
  return (
    <Layout className={`p-4 py-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent md:text-4xl lg:text-6xl max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        Authenticate <br /> on <Cover>TechnoDevLabs</Cover>
      </h1>

      <Divider className='my-10' />

      <GoogleOAuthButton />
    </Layout>
  )
}
