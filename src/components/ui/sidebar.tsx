'use client'

import { IconArrowLeft, IconArrowRight, IconMenu2, IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import Link, { LinkProps } from 'next/link'
import { useLocale } from 'next-intl'
import { useState, createContext, useContext } from 'react'
import Tooltip from '@/components/custom/tooltip'
import { clsx, cn } from '@/lib/utils'

interface Links {
  label: string
  href: string
  icon: React.JSX.Element | React.ReactNode
  type?: 'link' | 'button'
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
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
  children,
  open: openProp,
  setOpen: setOpenProp
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) {
  const [openState, setOpenState] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>{children}</SidebarContext.Provider>
  )
}

export function Sidebar({
  animate,
  children,
  open,
  setOpen
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) {
  return (
    <SidebarProvider animate={animate} open={open} setOpen={setOpen}>
      {children}
    </SidebarProvider>
  )
}

export function SidebarBody(props: React.ComponentProps<typeof motion.div>) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  )
}

export function DesktopSidebar({
  children,
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const { animate, open, setOpen } = useSidebar()
  const currentLocale = useLocale()

  const TOGGLER_CLASSES = `cursor-pointer hover:text-purple-500 dark:hover:text-purple-400 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-full w-8 h-8`

  return (
    <motion.div
      animate={{
        width: animate ? (open ? '270px' : '60px') : '270px'
      }}
      className={cn(
        'py-20 min-h-screen hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[270px] flex-shrink-0 relative',
        className
      )}
      {...props}
    >
      <>
        {children}
        <Tooltip
          description={
            open && currentLocale === 'en'
              ? 'Close Sidebar'
              : open && currentLocale === 'ar'
                ? 'اغلق القائمة'
                : !open && currentLocale === 'en'
                  ? 'Open Sidebar'
                  : !open && currentLocale === 'ar'
                    ? 'افتح القائمة'
                    : 'Toggle Sidebar'
          }
        >
          <button
            className={clsx('absolute flex bottom-48', {
              '-right-2': currentLocale === 'en',
              '-left-2': currentLocale === 'ar'
            })}
            onClick={() => setOpen(!open)}
          >
            {open && currentLocale === 'en' ? (
              <IconArrowLeft className={TOGGLER_CLASSES} />
            ) : open && currentLocale === 'ar' ? (
              <IconArrowRight className={TOGGLER_CLASSES} />
            ) : !open && currentLocale === 'en' ? (
              <IconArrowRight className={TOGGLER_CLASSES} />
            ) : !open && currentLocale === 'ar' ? (
              <IconArrowLeft className={TOGGLER_CLASSES} />
            ) : null}
          </button>
        </Tooltip>
      </>
    </motion.div>
  )
}

export function MobileSidebar({ children, className, ...props }: React.ComponentProps<'div'>) {
  const { open, setOpen } = useSidebar()
  return (
    <div
      className={cn(
        'mt-6 h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full'
      )}
      {...props}
    >
      <div className='z-20 flex justify-end w-full'>
        <IconMenu2
          className='cursor-pointer text-neutral-800 dark:text-neutral-200 hover:text-purple-500 dark:hover:text-purple-400'
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            className={cn(
              'fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between',
              className
            )}
            exit={{ x: '-100%', opacity: 0 }}
            initial={{ x: '-100%', opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
          >
            <div
              className='absolute z-50 cursor-pointer right-10 top-10 text-neutral-800 dark:text-neutral-200 hover:text-purple-500 dark:hover:text-purple-400'
              onClick={() => setOpen(!open)}
            >
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
  const { animate, open } = useSidebar()

  return (
    <Tooltip description={link.label}>
      <Link
        className={cn('flex items-center justify-start gap-2 group/sidebar py-2 px-4', className)}
        href={link.href}
        onClick={onClick}
        {...props}
      >
        {link.icon}

        <motion.span
          animate={{
            display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
            opacity: animate ? (open ? 1 : 0) : 1
          }}
          className='text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0'
        >
          {link.label}
        </motion.span>
      </Link>
    </Tooltip>
  )
}
