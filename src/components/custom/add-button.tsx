import { Button } from '@/components/custom/button'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

export function AddButton({ children, href }: { children: string; href: string }) {
  return (
    <Link href={href} aria-label={children} title={children}>
      <Button className='inline-flex items-center gap-x-2'>
        <IconPlus className='w-4 h-4' />
        <span>{children}</span>
      </Button>
    </Link>
  )
}
