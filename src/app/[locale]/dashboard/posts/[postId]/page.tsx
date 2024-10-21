import { setRequestLocale } from 'next-intl/server'
import DashboardPostUpdateClient from './dashboard-post-update.client'

export default function DashboardPostUpdate({
  params: { locale, postId }
}: {
  params: { locale: string; postId: string }
}) {
  setRequestLocale(locale)

  return <DashboardPostUpdateClient postId={postId} />
}
