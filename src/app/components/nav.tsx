'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { APP_LOGO, APP_TITLE } from '@/data/constants'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className='relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-900'>
      <nav className='max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between'>
        <div className='flex items-center justify-between'>
          <a
            className='flex gap-x-2 text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80'
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
              className='relative flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              aria-controls='hs-navbar-example'
              aria-label='Toggle navigation'
            >
              {isMobileMenuOpen ? (
                <svg
                  className='shrink-0 w-6 h-6'
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
                  className='shrink-0 w-6 h-6'
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
