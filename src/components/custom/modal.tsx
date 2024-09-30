'use client'
import React from 'react'
import {
  Modal as AnimatedModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from '@/components/ui/animated-modal'

export function Modal({
  modalTitle,
  modalContent,
  modalCta,
  children
}: {
  modalTitle: string
  modalContent: React.ReactNode
  modalCta: string
  children: React.ReactNode
}) {
  return (
    <div className='py-40  flex items-center justify-center'>
      <AnimatedModal>
        <ModalTrigger className='bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn'>
          {children}
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className='text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8'>
              {modalTitle}
            </h4>

            <div className='py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto'>
              {modalContent}
            </div>
          </ModalContent>
          <ModalFooter className='gap-4'>
            <button className='px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28'>
              Cancel
            </button>
            <button className='bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28'>
              {modalCta}
            </button>
          </ModalFooter>
        </ModalBody>
      </AnimatedModal>
    </div>
  )
}
