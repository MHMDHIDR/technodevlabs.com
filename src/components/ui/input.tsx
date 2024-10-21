// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    const radius = 100 // change this to increase the rdaius of the hover effect
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
        className='p-0.5 rounded-lg transition duration-300 group/input'
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onMouseMove={handleMouseMove}
        style={{
          background: useMotionTemplate`radial-gradient(${visible ? `${radius}px` : '0px'} circle at ${mouseX}px ${mouseY}px, var(--blue-500), transparent 80%)`
        }}
      >
        <input
          ref={ref}
          className={cn(
            `flex px-3 py-2 w-full h-10 text-sm text-black bg-gray-50 rounded-md border-none transition dark:bg-zinc-800 dark:text-white shadow-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none duration-400`,
            className
          )}
          type={type}
          {...props}
        />
      </motion.div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
