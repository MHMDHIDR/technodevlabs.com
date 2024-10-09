import {
  Tooltip as TooltipParent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip-provider'
import clsx from 'clsx'
import { useLocale } from 'next-intl'

export default function Tooltip({
  children,
  description
}: {
  children: React.ReactNode
  description: React.ReactNode
}) {
  const currentLocale = useLocale()

  return (
    <TooltipProvider>
      <TooltipParent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={clsx('absolute top-1', {
            'left-2': currentLocale === 'en',
            'right-2': currentLocale === 'ar'
          })}
        >
          {description}
        </TooltipContent>
      </TooltipParent>
    </TooltipProvider>
  )
}
