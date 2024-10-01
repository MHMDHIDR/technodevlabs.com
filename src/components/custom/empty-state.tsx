import Image from 'next/image'

export default function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center justify-center gap-y-16'>
      <Image src='/images/empty-state.svg' alt='Empty State' width={200} height={200} />

      {children ? children : <h3 className='text-lg font-semibold'>No data available</h3>}
    </div>
  )
}
