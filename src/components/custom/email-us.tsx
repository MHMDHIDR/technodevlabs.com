import Link from 'next/link'

export function EmailUs() {
  return (
    <Link
      href='mailto:support@technodevlabs.com'
      className='hover:underline text-neutral-800 dark:text-neutral-200'
    >
      <strong>Support@TechnoDevLabs.com</strong>
    </Link>
  )
}
