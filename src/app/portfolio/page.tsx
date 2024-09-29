import Layout from '@/components/custom/layout'
import { metadata } from '@/lib/get-metadata'
import { APP_DESCRIPTION, APP_TITLE } from '@/data/constants'

metadata({
  pageName: `Portfolio | ${APP_TITLE}`,
  pageDescription: APP_DESCRIPTION
})

export default function Portfolio() {
  return <Layout>Portfolio Page</Layout>
}
