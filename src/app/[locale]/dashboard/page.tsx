import { IconBook, IconCode } from '@tabler/icons-react'
import { getLocale, unstable_setRequestLocale } from 'next-intl/server'
import { Block } from '@/components/custom/block'
import { getPosts } from '@/data/posts'
import { getProjects } from '@/data/projects'

export default async function DashboardPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const { postsCount } = await getPosts()
  const { projectsCount } = await getProjects()
  const currentLocale = await getLocale()

  return (
    <main className='container pb-10'>
      <div className='w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        <Block
          blockDescription={
            currentLocale === 'en'
              ? `View ${postsCount} posts on our blog.`
              : `عرض ${postsCount} منشورات على مدونتنا.`
          }
          blockIcon={<IconBook />}
          blockLabel={currentLocale === 'en' ? 'Posts' : 'منشورات المدونة'}
          href={!postsCount ? '/dashboard/posts/add' : '/dashboard/posts'}
        >
          <strong className='w-6 h-6 bg-primary/20 rounded-full inline-flex items-center justify-center mx-3 text-lg font-bold text-primary'>
            {postsCount}
          </strong>
          {currentLocale === 'en' ? 'View Posts' : 'عرض المنشورات'}
        </Block>

        <Block
          blockDescription={
            currentLocale === 'en'
              ? `View ${projectsCount} from our latest projects.`
              : `عرض ${projectsCount} مشاريع في محفظتنا.`
          }
          blockIcon={<IconCode />}
          blockLabel={currentLocale === 'en' ? 'Projects' : 'المشاريع'}
          href={!projectsCount ? '/dashboard/projects/add' : '/dashboard/projects'}
        >
          <strong className='w-6 h-6 bg-primary/20 rounded-full inline-flex items-center justify-center mx-3 text-lg font-bold text-primary'>
            {projectsCount}
          </strong>
          {currentLocale === 'en' ? 'View Projects' : 'عرض المشاريع'}
        </Block>
      </div>
    </main>
  )
}
