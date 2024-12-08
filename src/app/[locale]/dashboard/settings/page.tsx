import { getTranslations } from 'next-intl/server'
import { getSettings } from '@/data/settings'
import ItemsCountForm from './items-count-form'
import LayoutSwitch from './layout-switch'

export default async function DashboardSettingsPage() {
  const settings = await getSettings()
  const settingsTranslations = await getTranslations('dashboard.settings')

  return (
    <main className='container pb-10'>
      {settings ? (
        <div className='p-4 shadow rounded-lg'>
          <h2 className='text-xl font-bold mb-4'>{settingsTranslations('layout')}</h2>
          <LayoutSwitch Layout={settings} />

          <ItemsCountForm settings={settings} />
        </div>
      ) : (
        <p>{settingsTranslations('noSettingsFound')}</p>
      )}
    </main>
  )
}
