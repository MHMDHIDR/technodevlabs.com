import { AddButton } from '@/components/custom/add-button'
import DashboardListItem from '@/components/custom/dashboard-list-item'
import EmptyState from '@/components/custom/empty-state'
import { getProjects } from '@/data/projects'

export default async function DashboardProjects() {
  const { projects, projectsCount } = await getProjects()

  return (
    <section className='flex flex-col container py-10'>
      <div className='self-end mb-6'>
        <AddButton href='/dashboard/projects/add'>Add Project</AddButton>
      </div>

      {projectsCount === 0 ? (
        <EmptyState>
          <AddButton href='/dashboard/projects/add'>Add Project</AddButton>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400 select-none'>
            Sorry, there are no projects available.
          </p>
        </EmptyState>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          <h3 className='mb-6 text-2xl font-bold text-center'>Published Projects</h3>

          {projects.map(project => (
            <DashboardListItem key={project.id} item={project} type='project' />
          ))}
        </div>
      )}
    </section>
  )
}
