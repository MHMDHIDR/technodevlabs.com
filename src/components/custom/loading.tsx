import { Skeleton } from './skeleton'
import { cn } from '@/lib/utils'

export function LoadingCard({
  className,
  renderedSkeletons = 4
}: {
  className?: string
  /**
   *  Number of loading skeletons to render
   */
  renderedSkeletons?: number
}) {
  return (
    <div className='space-y-4'>
      {renderedSkeletons ? (
        Array.from({ length: renderedSkeletons }).map((_, index) => (
          <Skeleton key={index} className={cn(`w-full h-12`, className)} />
        ))
      ) : (
        <Skeleton className={cn(`w-full h-12`, className)} />
      )}
    </div>
  )
}
