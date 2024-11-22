'use client'

import { IconDashboard, IconLogout2 } from '@tabler/icons-react'
import { getSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { deleteCookieAction } from '@/actions'
import LanguageSwitcher from '@/components/custom/language-switcher'
import { APP_DESCRIPTION, APP_LOGO } from '@/data/constants'
import { Link, usePathname } from '@/i18n/routing'
import type { User } from 'next-auth'

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()
  const navTranslations = useTranslations('Nav')
  const authTranslations = useTranslations('auth')

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    const getUser = async () => {
      const session = await getSession()
      if (session) {
        setUser(session.user as User)
      }
    }
    getUser()

    window.addEventListener('scroll', handleScroll)

    return () => {
      setUser(null)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /**
   * A function to Highlight the [ACTIVE LINK] based on the current path
   * @param href
   * @returns String - The classNames
   */
  const activeLinkClass = (href: string) =>
    `font-medium focus:outline-purple-900 ${
      pathname === href
        ? 'text-blue-500'
        : 'text-gray-600 hover:text-gray-800 dark:text-neutral-50 dark:hover:text-neutral-300'
    }`

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center transition-all duration-600 ${
        hasScrolled
          ? 'py-2 shadow-sm backdrop-blur-sm bg-white/90 dark:bg-neutral-900/60 shadow-purple-900'
          : 'py-5 bg-white dark:bg-neutral-900'
      } px-4 sm:px-10`}
    >
      <nav className='container px-0 mx-auto w-full md:flex md:items-center md:justify-between'>
        <div className='flex justify-between items-center'>
          <Link
            aria-label='Brand'
            className='flex gap-x-2 items-center text-xl font-semibold dark:text-white focus:outline-purple-900 focus:opacity-80'
            href='/'
          >
            <Image alt={APP_DESCRIPTION} src={APP_LOGO} width={40} height={40} />
            <span className='font-orbitron text-gradient select-none hidden sm:inline-block text-sm md:text-xl'>
              TechnoDevLabs
            </span>
          </Link>
          <div className='md:hidden'>
            <button
              aria-controls='navbar-items'
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              aria-label='Toggle navigation'
              className='flex relative gap-x-2 justify-center items-center text-gray-800 shadow-sm focus:outline-violet-500 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
              onClick={toggleMobileMenu}
              type='button'
            >
              {isMobileMenuOpen ? (
                <svg
                  className='w-6 h-6 shrink-0'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18 6L6 18' />
                  <path d='M6 6l12 12' />
                </svg>
              ) : (
                <svg
                  className='w-6 h-6 shrink-0'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <line x1='3' x2='21' y1='6' y2='6' />
                  <line x1='3' x2='21' y1='12' y2='12' />
                  <line x1='3' x2='21' y1='18' y2='18' />
                </svg>
              )}
              <span className='sr-only'>Toggle navigation</span>
            </button>
          </div>
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } md:max-h-full md:opacity-100 md:block`}
          id='navbar-items'
        >
          <div className='flex flex-col gap-5 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:ps-5'>
            <Link
              aria-current='page'
              className={activeLinkClass('/#projects')}
              href={pathname === '/' || pathname === '/ar' ? '/#projects' : '/projects'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('projects')}
            </Link>
            <Link
              aria-current='page'
              className={activeLinkClass('/about')}
              href={pathname === '/' || pathname === '/ar' ? '/#about' : '/about'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('about')}
            </Link>
            <Link
              aria-current='page'
              className={activeLinkClass('/services')}
              href={pathname === '/' || pathname === '/ar' ? '/#services' : '/services'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('services')}
            </Link>
            <Link
              aria-current='page'
              className={activeLinkClass('/blog')}
              href={pathname === '/' || pathname === '/ar' ? '/#blog' : '/blog'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('blog')}
            </Link>
            <Link
              aria-current='page'
              className={activeLinkClass('/contact')}
              href={pathname === '/' || pathname === '/ar' ? '/#contact' : '/contact'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('contact')}
            </Link>

            <LanguageSwitcher />

            {user ? (
              <>
                <Link
                  aria-current='page'
                  aria-label={navTranslations('dashboard')}
                  className='flex gap-x-1 focus:outline-purple-900'
                  href='/dashboard'
                  onClick={toggleMobileMenu}
                  title={navTranslations('dashboard')}
                >
                  <IconDashboard className='mr-2 w-5 h-5 stroke-blue-600' />
                  <span className='text-sm sm:hidden lg:inline-block'>
                    {navTranslations('dashboard')}
                  </span>
                </Link>

                <button
                  aria-label={authTranslations('signOut')}
                  className='flex gap-x-1 justify-start items-center py-2'
                  onClick={async () => {
                    await deleteCookieAction({ name: 'can-authenticate' })
                    await signOut({ redirectTo: '/auth' })
                  }}
                  title={authTranslations('signOut')}
                >
                  <IconLogout2 className='mr-2 w-5 h-5 stroke-red-600' />
                  <span className='text-sm transition-opacity duration-500 text-neutral-700 dark:text-neutral-200 hover:underline hover:text-red-500 underline-offset-4 sm:hidden lg:inline-block'>
                    {authTranslations('signOut')}
                  </span>
                </button>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  )
}
