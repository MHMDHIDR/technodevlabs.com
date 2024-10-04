'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { APP_LOGO, APP_TITLE } from '@/data/constants'
import { signOut, getSession } from 'next-auth/react'
import { IconDashboard, IconLogout2 } from '@tabler/icons-react'
import { deleteCookieAction } from '@/app/actions'
import { auth } from '@/auth'
import type { User } from 'next-auth'

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

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
        setUser(session.user)
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
  const activeLinkClass = (href: string) => {
    return pathname === href
      ? 'text-blue-500'
      : 'text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-500'
  }

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
            className='flex items-center text-xl font-semibold gap-x-2 dark:text-white focus:outline-purple-900 focus:opacity-80'
            href='/'
            aria-label='Brand'
          >
            <Image src={APP_LOGO} alt={APP_TITLE} width={40} height={40} />
            <span
              className={`[font-family:Orbitron] text-gradient select-none hidden sm:inline-block text-sm md:text-xl`}
            >
              TechnoDevLabs
            </span>
          </Link>
          <div className='sm:hidden'>
            <button
              type='button'
              className='relative flex items-center justify-center text-gray-800 shadow-sm gap-x-2 focus:outline-violet-500 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              aria-controls='navbar-items'
              aria-label='Toggle navigation'
            >
              {isMobileMenuOpen ? (
                <svg
                  className='w-6 h-6 shrink-0'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M18 6L6 18' />
                  <path d='M6 6l12 12' />
                </svg>
              ) : (
                <svg
                  className='w-6 h-6 shrink-0'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <line x1='3' y1='12' x2='21' y2='12' />
                  <line x1='3' y1='18' x2='21' y2='18' />
                </svg>
              )}
              <span className='sr-only'>Toggle navigation</span>
            </button>
          </div>
        </div>
        <div
          id='navbar-items'
          className={`transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } sm:max-h-full sm:opacity-100 sm:block`}
        >
          <div className='flex flex-col mt-5 gap-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
            <Link
              className={`font-medium focus:outline-purple-900 ${activeLinkClass(
                '/#projects'
              )}`}
              href={pathname === '/' ? '/#projects' : '/projects'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              Projects
            </Link>
            <Link
              className={`font-medium focus:outline-purple-900 ${activeLinkClass(
                '/about'
              )}`}
              href={pathname === '/' ? '/#about' : '/about'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              className={`font-medium focus:outline-purple-900 ${activeLinkClass(
                '/services'
              )}`}
              href={pathname === '/' ? '/#services' : '/services'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
            <Link
              className={`font-medium focus:outline-purple-900 ${activeLinkClass(
                '/posts'
              )}`}
              href={pathname === '/' ? '/#posts' : '/posts'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              Blog
            </Link>
            <Link
              className={`font-medium focus:outline-purple-900 ${activeLinkClass(
                '/contact'
              )}`}
              href={pathname === '/' ? '/#contact' : '/contact'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  className={`focus:outline-purple-900 flex`}
                  href={'/dashboard'}
                  aria-current='page'
                  title='Dashboard'
                  aria-label='Dashboard'
                  onClick={toggleMobileMenu}
                >
                  <IconDashboard className='w-5 h-5 mr-2 stroke-blue-600' />
                  <span className='text-sm sm:hidden lg:inline-block'>Dashboard</span>
                </Link>

                <button
                  className='flex items-center justify-start py-2 gap-2'
                  onClick={async () => {
                    await deleteCookieAction({ name: 'can-authenticate' })
                    await signOut()
                  }}
                  title='Sign Out'
                  aria-label='Sign Out'
                >
                  <IconLogout2 className='w-5 h-5 mr-2 stroke-red-600' />
                  <span
                    className={`text-neutral-700 dark:text-neutral-200 hover:underline underline-offset-4 text-sm sm:hidden lg:inline-block transition-opacity duration-500`}
                  >
                    Sign Out
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
