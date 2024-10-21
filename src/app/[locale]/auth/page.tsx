import CanAuthenticate from './can-authenticate'
import AuthButton from '@/components/custom/auth-button'
import Divider from '@/components/custom/divider'
import Layout from '@/components/custom/layout'
import { SecondaryHeading } from '@/components/ui/cover'
import { unstable_setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/request'

export default function AuthPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale)
  return (
    <Layout className='p-4 py-20 container max-w-screen-md'>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-2xl font-semibold text-center text-transparent md:text-4xl lg:text-6xl max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        Authenticate <br /> on <SecondaryHeading>TechnoDevLabs</SecondaryHeading>
      </h1>

      <Divider className='my-10' />

      <CanAuthenticate>
        <AuthButton />
      </CanAuthenticate>
    </Layout>
  )
}
