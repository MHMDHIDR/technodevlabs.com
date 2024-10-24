import { cva } from 'class-variance-authority'
import { clsx, cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

export interface ButtonProps {
  className?: string
  withArrow?: boolean
  children: React.ReactNode
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ children, className, withArrow, ...props }: ButtonProps) {
  return (
    <button
      className={cn(`group bg-gradient-to-br relative h-10 font-medium`, className)}
      {...props}
    >
      {props.variant !== 'link' ? (
        <span
          className={cn(
            'px-4 py-1.5 h-full text-gray-800 dark:text-gray-100 relative rounded-md border backdrop-blur-sm bg-emerald-300/10 border-emerald-500/20 min-w-full inline-flex',
            className
          )}
        >
          {children}
          {withArrow ? (
            <span
              className={cn(
                'duration-300 ltr:translate-x-1 ltr:group-hover:translate-x-2 rtl:-translate-x-1 rtl:group-hover:-translate-x-2 rtl:rotate-180'
              )}
            >
              &rarr;
            </span>
          ) : null}
        </span>
      ) : (
        children
      )}
      <BottomGradient />
    </button>
  )
}

function BottomGradient() {
  return (
    <>
      <span className='absolute inset-x-0 block w-full h-px opacity-0 transition duration-500 group-hover:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='absolute block w-1/2 h-px mx-auto opacity-0 transition duration-500 group-hover:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-700 to-transparent' />
    </>
  )
}

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
