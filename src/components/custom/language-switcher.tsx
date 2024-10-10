import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const nav = useTranslations('Nav.LanguageSwitcher')
  const locale = useLocale()
  const otherLocale = locale === 'en' ? 'ar' : 'en'
  const pathname = usePathname()

  return (
    <Link href={pathname} locale={otherLocale} aria-label={nav('ariaLabel')} title={nav('title')}>
      {locale === 'en' ? '🇸🇦 العربية' : '🇬🇧 English'}
    </Link>
  )
}
