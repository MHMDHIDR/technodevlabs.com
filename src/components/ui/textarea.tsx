'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const radius = 100 // adjust this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget
  }: {
    currentTarget: HTMLElement
    clientX: number
    clientY: number
  }) {
    const { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className='p-[2px] rounded-lg transition duration-300 group/input'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? `${radius}px` : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `
      }}
    >
      <textarea
        ref={ref}
        className={cn(
          `flex w-full min-h-[100px] border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm resize-none
          file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
          focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50
          dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
          group-hover/input:shadow-none transition duration-400`,
          className
        )}
        {...props}
      />
    </motion.div>
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }
