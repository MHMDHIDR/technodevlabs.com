import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX
} from '@tabler/icons-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import ThemeToggler from '@/components/custom/theme-toggler'
import {
  APP_FB_URL,
  APP_INSTAGRAM_URL,
  APP_LOGO,
  APP_TIKTOK_URL,
  APP_TITLE,
  APP_TWITTER_URL
} from '@/data/constants'
import { Link } from '@/i18n/routing'

export default async function Footer({ withThemeToggler = false }: { withThemeToggler?: boolean }) {
  const footerTranslations = await getTranslations('footer')

  return (
    <footer className='w-full mt-auto bg-gray-900 dark:bg-neutral-950'>
      <div className='mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto'>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5'>
          <div className='col-span-full sm:col-span-1 flex sm:flex-col gap-x-48 mx-auto md:mx-0'>
            <Link aria-label='Brand' className='text-white flex-1' href='/'>
              <Image alt={APP_TITLE} src={APP_LOGO} height={40} width={40} />
            </Link>

            {withThemeToggler && <ThemeToggler />}
          </div>

          <div className='col-span-1 mx-auto md:mx-0 mr-20 md:mr-0'>
            <h3 className='font-semibold text-gray-100'>{footerTranslations('company')}</h3>

            <div className='mt-3 grid space-y-3'>
              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/about'
              >
                {footerTranslations('aboutUs')}
              </Link>

              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/blog'
              >
                {footerTranslations('blog')}
              </Link>

              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/contact'
              >
                {footerTranslations('contact')}
              </Link>
            </div>
          </div>

          <div className='col-span-1 mx-auto md:mx-0'>
            <h3 className='font-semibold text-gray-100'>{footerTranslations('legal')}</h3>

            <div className='mt-3 grid space-y-3'>
              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/terms'
              >
                {footerTranslations('termsOfService')}
              </Link>

              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/privacy'
              >
                {footerTranslations('privacyPolicy')}
              </Link>
            </div>
          </div>

          <div className='col-span-2'>
            <h3 className='font-semibold text-gray-100'>{footerTranslations('ourVision')}</h3>

            <form>
              <div className='flex flex-col items-center py-2 mt-4 text-gray-200 rounded-lg gap-2 sm:flex-row sm:gap-3'>
                <p className='text-justify'>{footerTranslations('visionText')}</p>
              </div>
            </form>
          </div>
        </div>

        <div className='mt-5 grid sm:mt-12 gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-400 dark:text-neutral-400'>
              {footerTranslations('allRightsReserved', { year: new Date().getFullYear() })}
            </p>
          </div>

          <div>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_FB_URL}
              aria-label='Follow us on Facebook'
            >
              <IconBrandFacebook />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_TWITTER_URL}
              aria-label='Follow us on Twitter'
            >
              <IconBrandX />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_TIKTOK_URL}
              aria-label='Follow us on TikTok'
            >
              <IconBrandTiktok />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_INSTAGRAM_URL}
              aria-label='Follow us on Instagram'
            >
              <IconBrandInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
