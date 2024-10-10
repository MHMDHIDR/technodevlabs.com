'use client'

import { IconDashboard, IconLogout2 } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, getSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { deleteCookieAction } from '@/actions'
import LanguageSwitcher from '@/components/custom/language-switcher'
import { APP_LOGO, APP_TITLE } from '@/data/constants'
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
    pathname === href
      ? 'text-blue-500'
      : 'text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-500'

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center transition-all duration-600 ${
        hasScrolled
          ? 'py-2 backdrop-blur-sm bg-white/90 dark:bg-neutral-900/60 shadow-sm shadow-purple-900'
          : 'py-5 bg-white dark:bg-neutral-900'
      } px-4 sm:px-10`}
    >
      <nav className='container w-full px-0 mx-auto sm:flex sm:items-center sm:justify-between'>
        <div className='flex items-center justify-between'>
          <Link
            aria-label='Brand'
            className='flex items-center text-xl font-semibold gap-x-2 dark:text-white focus:outline-purple-900 focus:opacity-80'
            href='/'
          >
            <Image alt={APP_TITLE} height={40} src={APP_LOGO} width={40} />
            <span className='[font-family:Orbitron] text-gradient select-none hidden sm:inline-block text-sm md:text-xl'>
              TechnoDevLabs
            </span>
          </Link>
          <div className='sm:hidden'>
            <button
              aria-controls='navbar-items'
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              aria-label='Toggle navigation'
              className='relative flex items-center justify-center text-gray-800 shadow-sm gap-x-2 focus:outline-violet-500 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
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
          } sm:max-h-full sm:opacity-100 sm:block`}
          id='navbar-items'
        >
          <div className='flex flex-col mt-5 gap-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
            <Link
              aria-current='page'
              className={`font-medium focus:outline-purple-900 ${activeLinkClass('/#projects')}`}
              href={pathname === '/' || pathname === '/ar' ? '/#projects' : '/projects'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('projects')}
            </Link>
            <Link
              aria-current='page'
              className={`font-medium focus:outline-purple-900 ${activeLinkClass('/about')}`}
              href={pathname === '/' || pathname === '/ar' ? '/#about' : '/about'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('about')}
            </Link>
            <Link
              aria-current='page'
              className={`font-medium focus:outline-purple-900 ${activeLinkClass('/services')}`}
              href={pathname === '/' || pathname === '/ar' ? '/#services' : '/services'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('services')}
            </Link>
            <Link
              aria-current='page'
              className={`font-medium focus:outline-purple-900 ${activeLinkClass('/posts')}`}
              href={pathname === '/' || pathname === '/ar' ? '/#posts' : '/posts'}
              onClick={toggleMobileMenu}
            >
              {navTranslations('blog')}
            </Link>
            <Link
              aria-current='page'
              className={`font-medium focus:outline-purple-900 ${activeLinkClass('/contact')}`}
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
                  className='focus:outline-purple-900 flex gap-x-1'
                  href='/dashboard'
                  onClick={toggleMobileMenu}
                  title={navTranslations('dashboard')}
                >
                  <IconDashboard className='w-5 h-5 mr-2 stroke-blue-600' />
                  <span className='text-sm sm:hidden lg:inline-block'>
                    {navTranslations('dashboard')}
                  </span>
                </Link>

                <button
                  aria-label={authTranslations('signOut')}
                  className='flex items-center justify-start py-2 gap-x-1'
                  onClick={async () => {
                    await deleteCookieAction({ name: 'can-authenticate' })
                    await signOut({ redirectTo: '/auth' })
                  }}
                  title={authTranslations('signOut')}
                >
                  <IconLogout2 className='w-5 h-5 mr-2 stroke-red-600' />
                  <span className='text-neutral-700 dark:text-neutral-200 hover:underline hover:text-red-500 underline-offset-4 text-sm sm:hidden lg:inline-block transition-opacity duration-500'>
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
