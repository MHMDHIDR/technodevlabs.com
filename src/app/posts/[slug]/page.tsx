import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { getPostBySlugAction } from '@/app/actions/get-post'
import { APP_DESCRIPTION, APP_TITLE } from '@/data/constants'
import { removeSlug } from '@/lib/utils'

export async function generateMetadata({
  params: { slug }
}: {
  params: { slug: string }
}) {
  return {
    title: removeSlug(decodeURI(slug)) + ' | ' + APP_TITLE,
    description: APP_DESCRIPTION
  }
}

export default async function BlogPostContentPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlugAction({ slug })
  if (!post) return null

  const modifiedContent = post.content.replace(
    /<img/g,
    '<img class="rounded-xl shadow-lg dark:shadow-slate-500"'
  )

  return (
    <Layout className='p-4 py-20'>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-bold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-600 dark:from-white dark:via-gray-300 dark:to-gray-400'>
        <Cover>{post.title}</Cover>
      </h1>

      <div className='mt-8 container max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-600 rounded-lg'>
        <article className='p-4 rounded-lg'>
          <div
            className='leading-10 mb-20'
            dangerouslySetInnerHTML={{ __html: modifiedContent }}
          />
        </article>
      </div>
    </Layout>
  )
}
