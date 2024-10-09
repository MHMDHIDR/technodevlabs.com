import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export default function LanguageSwitcher() {
  const nav = useTranslations('Nav.LanguageSwitcher')
  const locale = useLocale()
  const pathname = usePathname()

  const otherLocale = locale === 'en' ? 'ar' : 'en'
  const otherLocaleLabel = locale === 'en' ? '🇸🇦 العربية' : '🇬🇧 English'

  // Generate the new path for the language switch
  const newPathname = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, `/${otherLocale}`)
    : `/${otherLocale}${pathname}`

  return (
    <Link
      href={newPathname}
      locale={otherLocale}
      aria-label={nav('ariaLabel')}
      title={nav('title')}
      className='bg-transparent text-accent-foreground font-semibold'
    >
      {otherLocaleLabel}
    </Link>
  )
}
