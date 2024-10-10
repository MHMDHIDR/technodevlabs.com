import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/custom/button'
import { APP_TITLE } from '@/data/constants'
import { cn } from '@/lib/utils'

export function BentoGrid({
  children,
  className
}: {
  className?: string
  children?: React.ReactNode
}) {
  const pathname = usePathname()
  const t = useTranslations('services')

  return (
    <div className='flex flex-col gap-y-10'>
      <div
        className={cn(
          'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ',
          className
        )}
      >
        {children}
      </div>

      {pathname === '/' || pathname === '/ar' ? (
        <Link className='mx-auto' href='/services'>
          <Button className='rounded-full' withArrow>
            {t('exploreButton')}
          </Button>
        </Link>
      ) : pathname === '/services' || pathname === '/ar/services' ? (
        <Link className='mx-auto' href='/contact'>
          <Button className='rounded-full' withArrow>
            {t('ctaButton')}
          </Button>
        </Link>
      ) : null}
    </div>
  )
}

export function BentoGridItem({
  className,
  description,
  icon,
  src,
  title
}: {
  className?: string
  title?: string
  description?: string | React.ReactNode
  src?: string
  icon?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'row-span-1 rounded-xl overflow-hidden group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none relative dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col gap-y-2',
        className
      )}
    >
      <Image
        alt={title ?? APP_TITLE}
        className='object-cover w-full h-full rounded-xl group-hover/bento:scale-150 group-hover/bento:rotate-12 transition duration-500'
        height={150}
        src={`/images/services${src}`}
        width={255}
      />
      <div className='absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent'>
        <div className='transition duration-200 group-hover/bento:-translate-y-1.5'>
          {icon}
          <h3 className='my-2 font-bold text-neutral-100'>{title}</h3>
          <p className='text-xs text-neutral-100'>{description}</p>
        </div>
      </div>
    </div>
  )
}
