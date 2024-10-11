'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useOutsideClick } from '@/hooks/use-outside-click'

interface ModalContextType {
  open: boolean
  setOpen(_open: boolean): void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}

export function ModalTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { setOpen } = useModal()
  return (
    <button
      className={cn(
        'overflow-hidden relative px-4 py-2 text-center text-black rounded-md dark:text-white',
        className
      )}
      onClick={() => setOpen(true)}
      type='button'
    >
      {children}
    </button>
  )
}

export function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
  const { open, setOpen } = useModal()

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscKey)
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [open, setOpen])

  const modalRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick(modalRef, () => setOpen(false))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          className='fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50'
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          initial={{ opacity: 0 }}
        >
          <Overlay />
          <motion.div
            ref={modalRef}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            className={cn(
              'min-h-[10%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden',
              className
            )}
            exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            initial={{ opacity: 0, scale: 0.5, rotateX: 40, y: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ModalContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-col flex-1 p-3.5', className)}>{children}</div>
}

export function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  const { setOpen } = useModal()
  const currentLocale = useLocale()

  return (
    <div className={cn('flex justify-end p-3 bg-gray-100 dark:bg-neutral-900', className)}>
      <button
        className='px-2 py-1 w-28 text-sm text-black bg-gray-200 rounded-md border border-gray-300 dark:bg-black dark:border-black dark:text-white'
        onClick={() => setOpen(false)}
        type='button'
      >
        {currentLocale === 'en' ? 'Cancel' : 'إلغاء'}
      </button>
      {children}
    </div>
  )
}

function Overlay({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        opacity: 1,
        backdropFilter: 'blur(10px)'
      }}
      className={`fixed inset-0 z-50 w-full h-full bg-black bg-opacity-50 ${className}`}
      exit={{
        opacity: 0,
        backdropFilter: 'blur(0px)'
      }}
      initial={{
        opacity: 0
      }}
    />
  )
}

function CloseIcon() {
  const { setOpen } = useModal()
  return (
    <button className='absolute top-4 right-4 group' onClick={() => setOpen(false)}>
      <svg
        className='w-4 h-4 text-black transition duration-200 dark:text-white group-hover:scale-125 group-hover:rotate-3'
        fill='none'
        height='24'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        viewBox='0 0 24 24'
        width='24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0 0h24v24H0z' fill='none' stroke='none' />
        <path d='M18 6l-12 12' />
        <path d='M6 6l12 12' />
      </svg>
    </button>
  )
}
