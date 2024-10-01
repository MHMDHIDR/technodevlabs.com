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
    <div className='flex items-center justify-center py-40 '>
      <AnimatedModal>
        <ModalTrigger className='flex justify-center text-white bg-black dark:bg-white dark:text-black group/modal-btn'>
          {children}
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className='mb-8 text-lg font-bold text-center md:text-2xl text-neutral-600 dark:text-neutral-100'>
              {modalTitle}
            </h4>

            <div className='flex flex-wrap items-start justify-start max-w-sm py-10 mx-auto gap-x-4 gap-y-6'>
              {modalContent}
            </div>
          </ModalContent>
          <ModalFooter className='gap-4'>
            <button className='px-2 py-1 text-sm text-black bg-gray-200 border border-gray-300 dark:bg-black dark:border-black dark:text-white rounded-md w-28'>
              Cancel
            </button>
            <button className='px-2 py-1 text-sm text-white bg-black border border-black dark:bg-white dark:text-black rounded-md w-28'>
              {modalCta}
            </button>
          </ModalFooter>
        </ModalBody>
      </AnimatedModal>
    </div>
  )
}
