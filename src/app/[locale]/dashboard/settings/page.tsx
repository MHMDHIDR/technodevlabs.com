import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import LayoutSwitch from './layout-switch'
import { getSettings } from '@/data/settings'

export default async function DashboardSettingsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const settings = await getSettings()
  const settingsTranslations = await getTranslations('dashboard.settings')

  return (
    <main className='container pb-10'>
      <div className='w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {settings ? (
          <div className='p-4 shadow rounded-lg'>
            <h2 className='text-xl font-bold mb-4'>{settingsTranslations('layout')}</h2>
            <LayoutSwitch initialLayout={settings.layout} />
          </div>
        ) : (
          <p>{settingsTranslations('noSettingsFound')}</p>
        )}
      </div>
    </main>
  )
}
