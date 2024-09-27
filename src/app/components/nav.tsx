'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { APP_LOGO, APP_TITLE } from '@/data/constants'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false) // Track when the user scrolls past 200px

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    /**
      <header className='relative flex flex-wrap w-full py-3 text-sm bg-white sm:justify-start sm:flex-nowrap dark:bg-neutral-900'>
     */
    <header
      className={`fixed top-0 left-0 right-0 z-50 p-3 transition-transform duration-500 ease-in-out ${
        hasScrolled ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className='max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between'>
        <div className='flex items-center justify-between'>
          <a
            className='flex text-xl font-semibold gap-x-2 dark:text-white focus:outline-none focus:opacity-80'
            href='/'
            aria-label='Brand'
          >
            <Image src={APP_LOGO} alt={APP_TITLE} width={40} height={40} />
            <span className={`[font-family:Orbitron] text-gradient select-none`}>
              TechnoDevLabs
            </span>
          </a>
          <div className='sm:hidden'>
            <button
              type='button'
              className='relative flex items-center justify-center text-gray-800 bg-white shadow-sm gap-x-2 hover:bg-gray-50 focus:outline-violet-500 dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              aria-controls='hs-navbar-example'
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
          id='hs-navbar-example'
          className={`transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } sm:max-h-full sm:opacity-100 sm:block`}
        >
          <div className='flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
            <Link
              className='font-medium text-blue-500 focus:outline-none'
              href={usePathname() === '/' ? '/#portfolio' : '/portfolio'}
            >
              Portfolio
            </Link>
            <Link
              className='font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
              href={usePathname() === '/' ? '/#about' : '/about'}
              aria-current='page'
            >
              About
            </Link>
            <Link
              className='font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
              href={usePathname() === '/' ? '/#services' : '/services'}
            >
              Services
            </Link>
            <Link
              className='font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
              href={usePathname() === '/' ? '/#posts' : '/posts'}
            >
              Blog
            </Link>
            <Link
              className='font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500'
              href={usePathname() === '/' ? '/#contact' : '/contact'}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
