import { cn } from '@/lib/utils'

type ButtonProps = {
  className?: string
  withArrow?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, className, withArrow, ...props }: ButtonProps) {
  return (
    <button
      className={cn(`group bg-gradient-to-br relative h-10 font-medium`, className)}
      {...props}
    >
      <span
        className={cn(
          `px-4 py-1.5 h-full text-gray-800 dark:text-gray-100 relative rounded-md border backdrop-blur-sm bg-emerald-300/10 border-emerald-500/20 min-w-full inline-flex`,
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
