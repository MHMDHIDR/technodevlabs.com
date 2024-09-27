import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, TikTok, Instagram } from '@/app/components/icons'
import {
  APP_FB_URL,
  APP_INSTAGRAM_URL,
  APP_LOGO,
  APP_TIKTOK_URL,
  APP_TITLE,
  APP_TWITTER_URL
} from '@/data/constants'
import ThemeToggler from '@/app/components/theme-toggler'

export default function Footer() {
  return (
    <footer className='w-full mt-auto bg-gray-900 dark:bg-neutral-950'>
      <div className='mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto'>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5'>
          <div className='col-span-full lg:col-span-1'>
            <Link
              className='flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80'
              href='/'
              aria-label='Brand'
            >
              <Image src={APP_LOGO} alt={APP_TITLE} width={40} height={40} />
            </Link>
          </div>

          <div className='col-span-2'>
            <h4 className='font-semibold text-gray-100'>Company</h4>

            <div className='grid mt-3 space-y-3'>
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

          <div className='col-span-2'>
            <h4 className='font-semibold text-gray-100'>Our Vision</h4>

            <form>
              <div className='flex flex-col items-center gap-2 py-2 mt-4 text-gray-200 rounded-lg sm:flex-row sm:gap-3 dark:bg-neutral-900'>
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

        <div className='grid mt-5 sm:mt-12 gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center'>
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
              <Facebook />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_TWITTER_URL}
            >
              <Twitter />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_TIKTOK_URL}
            >
              <TikTok />
            </Link>
            <Link
              className='inline-flex items-center justify-center text-sm font-semibold text-white border border-transparent rounded-lg size-10 gap-x-2 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none'
              href={APP_INSTAGRAM_URL}
            >
              <Instagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
