export function Button({
  withArrow,
  children
}: {
  withArrow?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      className={`group bg-gradient-to-br relative group/btn h-10 font-medium`}
      type='button'
    >
      <span className='px-10 py-1.5 h-full relative text-white rounded-md border backdrop-blur-sm bg-emerald-300/10 border-emerald-500/20 min-w-full inline-block'>
        {children}
        {withArrow ? (
          <span className='ml-1 transition-transform duration-300 group-hover:translate-x-2'>
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
      <span className='absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover/btn:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover/btn:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-700 to-transparent' />
    </>
  )
}
