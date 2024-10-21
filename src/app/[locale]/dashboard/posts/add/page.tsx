import { setRequestLocale } from 'next-intl/server'
import DashboardPostAddClient from './dashboard-post-add.client'

export default function DashboardPostAdd({
  params: { locale, postId }
}: {
  params: { locale: string; postId: string }
}) {
  setRequestLocale(locale)

  return <DashboardPostAddClient />
}
