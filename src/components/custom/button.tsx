import { cn } from '@/lib/utils'

type ButtonProps = {
  className?: string
  withArrow?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className, withArrow, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(`group bg-gradient-to-br relative h-10 font-medium`, className)}
      {...props}
    >
      <span
        className={cn(
          `px-10 py-1.5 h-full relative rounded-md border backdrop-blur-sm bg-emerald-300/10 border-emerald-500/20 min-w-full inline-block`,
          className
        )}
      >
        {children}
        {withArrow ? (
          <span className='translate-x-1 inline-flex duration-300 group-hover:translate-x-2'>
            &rarr;
          </span>
        ) : null}
      </span>
      <BottomGradient />
    </button>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className='absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-700 to-transparent' />
    </>
  )
}