import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { metadata } from '@/lib/get-metadata'
import { APP_DESCRIPTION, APP_TITLE } from '@/data/constants'
import { removeSlug } from '@/lib/utils'

export async function generateMetadata({
  params: { slug }
}: {
  params: { slug: string }
}) {
  // const post /*: Post */ = await getProject(projectId)

  return {
    title: removeSlug(decodeURI(slug)) + ' | ' + APP_TITLE,
    description: APP_DESCRIPTION
  }
}

metadata({
  pageName: `Blog | ${APP_TITLE}`,
  pageDescription: APP_DESCRIPTION
})

export default function BlogPostContentPage() {
  return (
    <Layout className={`p-4 py-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Post Content</Cover>
      </h1>
    </Layout>
  )
}
