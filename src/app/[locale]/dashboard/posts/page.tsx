import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { AddButton } from '@/components/custom/add-button'
import DashboardListItem from '@/components/custom/dashboard-list-item'
import EmptyState from '@/components/custom/empty-state'
import { getPosts } from '@/data/posts'
import type { Locale } from '@/i18n/request'

export default async function DashboardPosts({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  unstable_setRequestLocale(locale)
  const { posts, postsCount } = await getPosts()
  const postsTranslations = await getTranslations('posts')

  return (
    <section className='flex flex-col container py-10'>
      <div className='self-end mb-6'>
        <AddButton href='/dashboard/posts/add'>{postsTranslations('addPost')}</AddButton>
      </div>

      {postsCount === 0 ? (
        <EmptyState>
          <AddButton href='/dashboard/posts/add'>{postsTranslations('addPost')}</AddButton>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400 select-none'>
            {postsTranslations('noPosts')}
          </p>
        </EmptyState>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          <h3 className='mb-6 text-2xl font-bold text-center'>{postsTranslations('pageTitle')}</h3>

          {posts.map(post => (
            <DashboardListItem key={post.id} item={post} type='post' />
          ))}
        </div>
      )}
    </section>
  )
}
