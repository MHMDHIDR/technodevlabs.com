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

export default function Footer() {
  return (
    <footer className='w-full mt-auto bg-gray-900 dark:bg-neutral-950'>
      <div className='mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto'>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5'>
          <div className='col-span-full lg:col-span-1'>
            <Link
              className='flex-none mx-auto text-xl font-semibold text-white focus:outline-none'
              href='/'
              aria-label='Brand'
            >
              <Image src={APP_LOGO} alt={APP_TITLE} width={40} height={40} />
            </Link>
          </div>

          <div className='col-span-1'>
            <h4 className='font-semibold text-gray-100'>Company</h4>

            <div className='mt-3 grid space-y-3'>
              <div>
                <Link
                  className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                  href='/about'
                >
                  About us
                </Link>
              </div>
              <div>
                <Link
                  className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                  href='/posts'
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                  href='/contact'
                >
                  Contact
                </Link>
              </div>
              <ThemeToggler />
            </div>
          </div>

          <div className='col-span-1'>
            <h4 className='font-semibold text-gray-100'>Legal</h4>

            <div className='mt-3 grid space-y-3'>
              <div>
                <Link
                  className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                  href='/terms'
                >
                  Terms of Service
                </Link>
              </div>
              <div>
                <Link
                  className='inline-flex text-gray-400 gap-x-2 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                  href='/privacy'
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <h4 className='font-semibold text-gray-100'>Our Vision</h4>

            <form>
              <div className='flex flex-col items-center py-2 mt-4 text-gray-200 rounded-lg gap-2 sm:flex-row sm:gap-3'>
                <p className='text-justify'>
                  At TechnoDevLabs, we strive to be a trusted partner for businesses in
                  the Middle East, delivering innovative and tailored software solutions
                  that meet the unique needs of our clients. Our goal is to empower
                  organizations by providing high-quality, reliable, and scalable
                  technology that drives growth and fosters success in a rapidly evolving
                  digital landscape.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className='mt-5 grid sm:mt-12 gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-400 dark:text-neutral-400'>
              &copy; {new Date().getFullYear()} TechnoDevLabs. All rights reserved.
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
