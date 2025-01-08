'use client'

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { createContext, useContext, useEffect } from 'react'
import Tooltip from '@/components/custom/tooltip'
import useLocalStorage from '@/hooks/use-localstorage'
import { useIsMobile } from '@/hooks/use-mobile'
import { Link } from '@/i18n/routing'
import { clsx, cn } from '@/lib/utils'
import type { LinkProps } from 'next/link'

type Links = {
  label: string
  href: string
  icon: React.JSX.Element | React.ReactNode
  type?: 'link' | 'button'
}

type SidebarContextProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  isMobile: boolean
  toggle: () => void
  animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export function SidebarProvider({
  animate = true,
  children
}: {
  children: React.ReactNode
  animate?: boolean
}) {
  const isMobile = useIsMobile()
  const open = typeof window !== undefined && localStorage.getItem('sidebar:state')
  const [isOpen, setIsOpen, toggle] = useLocalStorage('sidebar:state', open === 'true')

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('sidebar-expanded')
      document.documentElement.classList.remove('sidebar-collapsed')
    } else {
      document.documentElement.classList.add('sidebar-collapsed')
      document.documentElement.classList.remove('sidebar-expanded')
    }
  }, [isOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile, toggle, animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function SidebarToggle() {
  const { toggle, isOpen } = useSidebar()
  const currentLocale = useLocale()
  const TOGGLER_CLASSES = `cursor-pointer hover:text-purple-500 dark:hover:text-purple-400 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-full w-8 h-8`

  return (
    <Tooltip
      description={
        isOpen && currentLocale === 'en'
          ? 'Close Sidebar'
          : isOpen && currentLocale === 'ar'
            ? 'اغلق القائمة'
            : !isOpen && currentLocale === 'en'
              ? 'Open Sidebar'
              : !isOpen && currentLocale === 'ar'
                ? 'فتح القائمة'
                : 'Toggle Sidebar'
      }
    >
      <button
        className={clsx('absolute flex bottom-48', {
          '-right-2': currentLocale === 'en',
          '-left-2': currentLocale === 'ar'
        })}
        onClick={toggle}
      >
        {isOpen && currentLocale === 'en' ? (
          <IconArrowLeft className={TOGGLER_CLASSES} />
        ) : isOpen && currentLocale === 'ar' ? (
          <IconArrowRight className={TOGGLER_CLASSES} />
        ) : !isOpen && currentLocale === 'en' ? (
          <IconArrowRight className={TOGGLER_CLASSES} />
        ) : !isOpen && currentLocale === 'ar' ? (
          <IconArrowLeft className={TOGGLER_CLASSES} />
        ) : null}
      </button>
    </Tooltip>
  )
}

export function SidebarBody(
  props: React.ComponentProps<typeof motion.div> & { children?: React.ReactNode }
) {
  return <SidebarComponent {...props} />
}

export function SidebarComponent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof motion.div> & { children?: React.ReactNode }) {
  const { animate, isOpen } = useSidebar()

  return (
    <motion.div
      initial={{ width: isOpen ? '270px' : '60px' }}
      animate={{
        width: animate ? (isOpen ? '270px' : '60px') : '270px'
      }}
      className={cn(
        'flex-shrink-0 py-20 px-4 min-h-screen relative flex-row md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[270px]',
        className
      )}
      {...props}
    >
      <>
        {children}
        <SidebarToggle />
      </>
    </motion.div>
  )
}

export function SidebarLink({
  className,
  link,
  onClick,
  ...props
}: {
  link: Links
  className?: string
  onClick?(): void
  props?: LinkProps | React.ComponentProps<'button'>
}) {
  const { animate, isOpen } = useSidebar()

  return (
    <Tooltip description={link.label}>
      <Link
        className={cn('flex gap-2 items-center py-2 group/sidebar', className)}
        href={link.href}
        onClick={onClick}
        {...props}
      >
        {link.icon}

        <motion.span
          initial={{ display: 'none', opacity: 0 }}
          animate={{
            display: animate ? (isOpen ? 'inline-block' : 'none') : 'inline-block',
            opacity: animate ? (isOpen ? 1 : 0) : 1
          }}
          className='text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0'
        >
          {link.label}
        </motion.span>
      </Link>
    </Tooltip>
  )
}
