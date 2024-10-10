import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const nav = useTranslations('Nav.LanguageSwitcher')
  const locale = useLocale()
  const otherLocale = locale === 'en' ? 'ar' : 'en'
  const pathname = usePathname()

  return (
    <Link aria-label={nav('ariaLabel')} href={pathname} locale={otherLocale} title={nav('title')}>
      {locale === 'en' ? '🇸🇦 العربية' : '🇬🇧 English'}
    </Link>
  )
}
