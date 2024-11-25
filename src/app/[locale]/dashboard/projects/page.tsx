import { getTranslations } from 'next-intl/server'
import { AddButton } from '@/components/custom/add-button'
import DashboardListItem from '@/components/custom/dashboard-list-item'
import EmptyState from '@/components/custom/empty-state'
import { getProjects } from '@/data/projects'

export default async function DashboardProjects() {
  const { projects, projectsCount } = await getProjects()
  const projectsTranslations = await getTranslations('projects')

  return (
    <section className='flex flex-col mx-auto md:container py-10'>
      <div className='self-end mb-6'>
        <AddButton href='/dashboard/projects/add'>{projectsTranslations('addProject')}</AddButton>
      </div>

      {projectsCount === 0 ? (
        <EmptyState>
          <AddButton href='/dashboard/projects/add'>{projectsTranslations('addProject')}</AddButton>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400 select-none'>
            {projectsTranslations('noProjects')}
          </p>
        </EmptyState>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          <h3 className='mb-6 text-2xl font-bold text-center'>
            {projectsTranslations('pageTitle')}
          </h3>

          {projects.map(project => (
            <DashboardListItem key={project.id} item={project} type='project' />
          ))}
        </div>
      )}
    </section>
  )
}
