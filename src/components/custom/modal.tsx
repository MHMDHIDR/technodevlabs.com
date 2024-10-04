import {
  Modal as AnimatedModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from '@/components/ui/animated-modal'
import { cn } from '@/lib/utils'
import type { ModalProps } from '@/types'

export function Modal({ title, description, className, trigger, children }: ModalProps) {
  return (
    <div
      className={cn(
        `flex items-center justify-center border hover:border-red-500 rounded-md`,
        className
      )}
      title={title}
    >
      <AnimatedModal>
        <ModalTrigger className='flex justify-center text-white bg-black dark:bg-white dark:text-black group/modal-btn'>
          {trigger}
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className='mb-8 text-lg font-bold text-center md:text-2xl text-neutral-600 dark:text-neutral-100'>
              {title}
            </h4>

            <div className='flex flex-wrap items-start justify-start max-w-sm py-1.5 mx-auto gap-x-4 gap-y-6'>
              {description}
            </div>
          </ModalContent>
          <ModalFooter className='gap-4'>{children}</ModalFooter>
        </ModalBody>
      </AnimatedModal>
    </div>
  )
}
