'use client'

import { updateProjectAction } from '@/app/actions'
import { getProjectByIdAction } from '@/app/actions/get-project'
import { SubmitButton } from '@/app/contact/submit-button'
import { AddButton } from '@/components/custom/add-button'
import EmptyState from '@/components/custom/empty-state'
import { Error, Success } from '@/components/custom/icons'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DEFAULT_PROJECT } from '@/data/constants'
import type { Project } from '@/types'
import { Textarea } from '@/components/ui/textarea'

export default function DashboardProjectUpdate({
  params: { projectId }
}: {
  params: { projectId: string }
}) {
  const [project, setProject] = useState<Project | null>(DEFAULT_PROJECT)

  const { replace } = useRouter()

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectByIdAction({ projectId })
      if (!project) {
        setProject(null)
        return
      }

      setProject({ ...project })
    }
    fetchProject()
  }, [projectId])

  const editProject = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!project) return

      const { success, message } = await updateProjectAction({
        projectId,
        title: project.title,
        description: project.description,
        url: project.url,
        images: project.images
      })

      if (!success) {
        toast(message, {
          icon: <Error className='inline-block' />,
          position: 'bottom-center',
          className: 'text-center rtl select-none',
          style: {
            backgroundColor: '#FDE7E7',
            color: '#C53030',
            border: '1px solid #C53030',
            gap: '1.5rem',
            textAlign: 'justify'
          }
        })
        return
      }

      toast(message, {
        icon: <Success className='inline-block' />,
        position: 'bottom-center',
        className: 'text-center rtl select-none',
        style: {
          backgroundColor: '#F0FAF0',
          color: '#367E18',
          border: '1px solid #367E18',
          gap: '1.5rem',
          textAlign: 'justify'
        }
      })

      setProject(DEFAULT_PROJECT)
    } catch (error) {}

    replace('/dashboard/projects')
  }

  return (
    <section className='max-w-4xl p-6 mx-auto'>
      {project === null ? (
        <EmptyState>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400'>
            Sorry the project you are looking for does not exist.
          </p>
          <AddButton href='/dashboard/projects/add'>Add Project</AddButton>
        </EmptyState>
      ) : (
        <>
          <h3 className='mb-6 text-2xl font-bold text-center select-none'>{project.title}</h3>

          <form onSubmit={editProject} className='space-y-6'>
            <LabelInputContainer>
              <Label htmlFor='title'>Project Title</Label>
              <Input
                type='text'
                id='title'
                defaultValue={project.title}
                onChange={e => setProject({ ...project, title: e.target.value })}
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='url'>Project View URL</Label>
              <Input
                type='text'
                id='url'
                defaultValue={project.url}
                onChange={e => setProject({ ...project, url: e.target.value })}
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='description'>Project Description</Label>
              <Textarea
                id='description'
                defaultValue={project.description}
                onChange={e => setProject({ ...project, description: e.target.value })}
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                required
              />
            </LabelInputContainer>

            <SubmitButton>Edit Project</SubmitButton>
          </form>
        </>
      )}
    </section>
  )
}
