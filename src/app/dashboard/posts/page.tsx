import { Button } from '@/components/custom/button'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

export default async function DashboardPosts() {
  return (
    <section className='flex flex-col'>
      <h3 className='text-center'>Our Posts</h3>

      {/* Add <Button> on the left side of the page with tailwindcss */}
      <Link href='/dashboard/posts/add' className='self-end'>
        <Button className='flex items-center px-1.5'>
          <IconPlus /> <span>New</span>
        </Button>
      </Link>
    </section>
  )
}
