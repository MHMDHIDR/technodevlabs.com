import Link from 'next/link'
import { AddButton } from '@/components/custom/add-button'
import { DeletePostButton } from '@/components/custom/delete-post-button'
import EmptyState from '@/components/custom/empty-state'
import { Modal } from '@/components/custom/modal'
import { getProjects } from '@/data/projects'
import { formatDate } from '@/lib/format-date'
import { IconTrash } from '@tabler/icons-react'

export default async function DashboardProjects() {
  const { projects, projectsCount } = await getProjects()

  return (
    <section className='container'>
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

          {projects.map(project => {
            return (
              <div className='relative' key={project.id}>
                <Link href={`/dashboard/projects/${project.id}`} className='block group'>
                  <div className='p-5 border border-gray-200 rounded-lg shadow-lg bg-neutral-50 dark:bg-gray-900 dark:shadow-gray-800 hover:shadow-xl dark:border-gray-400 hover:border-blue-500 duration-300'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-sm md:text-lg font-semibold group-hover:text-blue-600 transition duration-300'>
                        {project.title}
                      </h4>
                      <span className='text-xs md:text-sm text-gray-500'>
                        {formatDate(new Date(project.updatedAt).toDateString())}
                      </span>
                    </div>
                  </div>
                </Link>
                <Modal
                  title='Delete Project'
                  description='Are you sure you want to delete this project?'
                  className='absolute bottom-0.5 right-0.5'
                  trigger={<IconTrash className='w-10 h-4 text-red-500' />}
                >
                  <DeletePostButton postId={project.id ?? ''} />
                </Modal>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
