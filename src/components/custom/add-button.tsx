import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/custom/button'
import { Link } from '@/i18n/routing'

export function AddButton({ children, href }: { children: string; href: string }) {
  return (
    <Link aria-label={children} href={href} title={children}>
      <Button className='inline-flex items-center gap-x-2'>
        <IconPlus className='w-4 h-4' />
        <span>{children}</span>
      </Button>
    </Link>
  )
}
