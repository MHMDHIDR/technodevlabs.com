import { useChangeLocale, useCurrentLocale } from 'locales/client'

export default function LanguageSwitcher() {
  const currentLocale = useCurrentLocale()
  const changeLocale = useChangeLocale()

  return (
    <select
      value={currentLocale}
      onChange={e => {
        const locale = e.target.value as typeof currentLocale
        changeLocale(locale)
      }}
      aria-label={currentLocale === 'en' ? 'Change language' : 'تغيير اللغة'}
      title={currentLocale === 'en' ? 'Change language' : 'تغيير اللغة'}
      className='bg-transparent text-accent-foreground font-semibold'
    >
      <option value='en'>🇬🇧 English</option>
      <option value='ar'>🇸🇦 العربية</option>
    </select>
  )
}
