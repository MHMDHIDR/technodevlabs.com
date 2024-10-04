import { Button } from '@/components/custom/button'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

export function AddPostButton() {
  return (
    <Link href='/dashboard/posts/add' aria-label='Add Post' title='Add Post'>
      <Button className='flex items-center gap-x-2 px-3'>
        <IconPlus className='w-4 h-4' />
        <span>Add Post</span>
      </Button>
    </Link>
  )
}
