'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { APP_LOGO, APP_TITLE } from '@/data/constants'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Get the link class based on the current path
   * @param href
   * @returns String - The classNames
   */
  const getLinkClass = (href: string) => {
    return pathname === href
      ? 'text-blue-500'
      : 'text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-500'
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-600 ${
        hasScrolled
          ? 'py-2 backdrop-blur-sm bg-white/60 dark:bg-neutral-900/40 shadow-sm shadow-purple-900'
          : 'py-5 bg-white dark:bg-neutral-900'
      } px-8 sm:px-20`}
    >
      <nav className='container w-full px-4 mx-auto sm:flex sm:items-center sm:justify-between'>
        <div className='flex items-center justify-between'>
          <Link
            className='flex text-xl font-semibold gap-x-2 dark:text-white focus:outline-none focus:opacity-80'
            href='/'
            aria-label='Brand'
          >
            <Image src={APP_LOGO} alt={APP_TITLE} width={40} height={40} />
            <span className={`[font-family:Orbitron] text-gradient select-none`}>
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
          <div className='flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
            <Link
              className={`font-medium focus:outline-none ${getLinkClass('/#portfolio')}`}
              href={pathname === '/' ? '/#portfolio' : '/portfolio'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              Portfolio
            </Link>
            <Link
              className={`font-medium focus:outline-none ${getLinkClass('/about')}`}
              href={pathname === '/' ? '/#about' : '/about'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              className={`font-medium focus:outline-none ${getLinkClass('/services')}`}
              href={pathname === '/' ? '/#services' : '/services'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
            <Link
              className={`font-medium focus:outline-none ${getLinkClass('/posts')}`}
              href={pathname === '/' ? '/#posts' : '/posts'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              Blog
            </Link>
            <Link
              className={`font-medium focus:outline-none ${getLinkClass('/contact')}`}
              href={pathname === '/' ? '/#contact' : '/contact'}
              aria-current='page'
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
