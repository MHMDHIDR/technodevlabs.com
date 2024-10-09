import Image from 'next/image'
import Link from 'next/link'
import {
  IconBrandFacebook,
  IconBrandX,
  IconBrandTiktok,
  IconBrandInstagram
} from '@tabler/icons-react'
import {
  APP_FB_URL,
  APP_INSTAGRAM_URL,
  APP_LOGO,
  APP_TIKTOK_URL,
  APP_TITLE,
  APP_TWITTER_URL
} from '@/data/constants'
import ThemeToggler from '@/components/custom/theme-toggler'
import { getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('footer')

  return (
    <footer className='w-full mt-auto bg-gray-900 dark:bg-neutral-950'>
      <div className='mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto'>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5'>
          <div className='col-span-full sm:col-span-1 flex sm:flex-col gap-x-48 mx-auto md:mx-0'>
            <Link href='/' className='text-white flex-1' aria-label='Brand'>
              <Image
                src={APP_LOGO}
                alt={APP_TITLE}
                width={40}
                height={40}
                className='min-w-7 min-h-7'
              />
            </Link>

            <ThemeToggler />
          </div>

          <div className='col-span-1 mx-auto md:mx-0 mr-20 md:mr-0'>
            <h4 className='font-semibold text-gray-100'>{t('company')}</h4>

            <div className='mt-3 grid space-y-3'>
              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/about'
              >
                {t('aboutUs')}
              </Link>

              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/posts'
              >
                {t('blog')}
              </Link>

              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/contact'
              >
                {t('contact')}
              </Link>
            </div>
          </div>

          <div className='col-span-1 mx-auto md:mx-0'>
            <h4 className='font-semibold text-gray-100'>{t('legal')}</h4>

            <div className='mt-3 grid space-y-3'>
              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/terms'
              >
                {t('termsOfService')}
              </Link>

              <Link
                className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                href='/privacy'
              >
                {t('privacyPolicy')}
              </Link>
            </div>
          </div>

          <div className='col-span-2'>
            <h4 className='font-semibold text-gray-100'>{t('ourVision')}</h4>

            <form>
              <div className='flex flex-col items-center py-2 mt-4 text-gray-200 rounded-lg gap-2 sm:flex-row sm:gap-3'>
                <p className='text-justify'>{t('visionText')}</p>
              </div>
            </form>
          </div>
        </div>

        <div className='mt-5 grid sm:mt-12 gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-400 dark:text-neutral-400'>
              {t('allRightsReserved', { year: new Date().getFullYear() })}
            </p>
          </div>

          <div>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_FB_URL}
            >
              <IconBrandFacebook />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_TWITTER_URL}
            >
              <IconBrandX />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_TIKTOK_URL}
            >
              <IconBrandTiktok />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_INSTAGRAM_URL}
            >
              <IconBrandInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
