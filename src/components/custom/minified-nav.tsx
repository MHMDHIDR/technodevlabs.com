import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { APP_DESCRIPTION, APP_LOGO } from '@/data/constants'
import { Link } from '@/i18n/routing'

export default async function MinifiedNav() {
  const navTranslations = await getTranslations('Nav')

  return (
    <header className='fixed top-0 left-0 w-full z-[100] bg-white dark:bg-neutral-900 py-2 px-4 sm:px-10 shadow-sm shadow-purple-900'>
      <nav className='container mx-auto flex items-center justify-between px-0'>
        <Link
          href='/'
          className='flex items-center text-xl font-semibold gap-x-2 dark:text-white focus:outline-purple-900 focus:opacity-80'
          aria-label='Brand'
        >
          <Image alt={APP_DESCRIPTION} src={APP_LOGO} width={40} height={40} />
          <span className='font-orbitron text-gradient select-none hidden sm:inline-block text-xxs md:text-sm'>
            TechnoDevLabs
          </span>
        </Link>

        <div className='relative'>
          <input
            type='checkbox'
            id='menu-toggle'
            className='absolute top-0 right-0 w-6 h-6 opacity-0 cursor-pointer peer'
          />
          <label htmlFor='menu-toggle' className='block md:hidden cursor-pointer z-50'>
            <svg
              className='w-6 h-6'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3 12H21M3 6H21M3 18H21'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </label>

          <div
            className='absolute top-full ltr:right-0 rtl:left-0 mt-2 bg-white dark:bg-neutral-900 transition-all duration-300 ease-in-out opacity-0 -translate-y-2 invisible md:relative md:opacity-100 md:translate-y-0 md:visible md:bg-transparent md:mt-0 peer-checked:opacity-100 peer-checked:translate-y-0 peer-checked:visible w-48 md:w-auto'
            id='menu'
          >
            <div className='flex flex-col md:flex-row md:items-center gap-4 md:p-0 border shadow-md md:shadow-none md:border-none'>
              <NavLink href='/projects' label={navTranslations('projects')} />
              <NavLink href='/about' label={navTranslations('about')} />
              <NavLink href='/services' label={navTranslations('services')} />
              <NavLink href='/blog' label={navTranslations('blog')} />
              <NavLink href='/contact' label={navTranslations('contact')} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className='font-medium text-xs md:text-base text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-500 focus:outline-purple-900 p-4 hover:bg-purple-900/10 transition-colors'
    >
      {label}
    </Link>
  )
}
