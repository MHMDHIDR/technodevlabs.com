import {
  Modal as AnimatedModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger
} from '@/components/ui/animated-modal'
import { cn } from '@/lib/utils'
import type { ModalProps } from '@/types'

export function Modal({
  title,
  description,
  className,
  isSmallButton,
  trigger,
  children
}: ModalProps) {
  return (
    <div
      className={cn(
        `flex items-center justify-center border hover:border-red-500 rounded-md z-10`,
        className
      )}
      title={title}
    >
      <AnimatedModal>
        <ModalTrigger
          className={
            isSmallButton
              ? 'absolute z-10 top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition peer group-hover:scale-125'
              : 'flex justify-center text-white bg-black dark:bg-white dark:text-black group/modal-btn'
          }
        >
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
