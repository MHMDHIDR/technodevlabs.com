'use client'

import { useState, useEffect } from 'react'
import { updateProjectAction, getProjectByIdAction, uploadFiles } from '@/actions'
import { SubmitButton } from '@/app/[locale]/contact/submit-button'
import EmptyState from '@/components/custom/empty-state'
import { Error as ErrorIcon, Success } from '@/components/custom/icons'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { DEFAULT_PROJECT } from '@/data/constants'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/custom/file-upload'
import { UploadedFiles } from '@/components/custom/uploaded-files'
import { LoadingCard } from '@/components/custom/loading'
import { AddButton } from '@/components/custom/add-button'
import { optimizeImage, isImageFile } from '@/actions'
import { useTranslations } from 'next-intl'
import type { Project } from '@/types'

export default function DashboardProjectUpdate({
  params: { projectId }
}: {
  params: { projectId: string }
}) {
  const t = useTranslations('dashboard.project')

  const [project, setProject] = useState<Project | null>(DEFAULT_PROJECT)
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

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
    setIsSubmitting(true)

    try {
      if (!project) return

      let uploadedUrls: string[] = []

      if (files.length > 0) {
        const fileDataPromises = files.map(async file => {
          if (!isImageFile(file.type)) {
            throw new Error(`File ${file.name} is not a supported image type`)
          }

          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
          })

          const optimizedBase64 = await optimizeImage(base64, 80)

          return {
            name: file.name.replace(/\.[^.]+$/, '.webp'),
            type: 'image/webp',
            size: optimizedBase64.length,
            lastModified: file.lastModified,
            base64: optimizedBase64
          }
        })

        const fileData = await Promise.all(fileDataPromises)

        // Upload files to S3 using the server action
        uploadedUrls = await uploadFiles(fileData, projectId)
      }

      const updatedImages = [...project.images, ...uploadedUrls]

      const { success, message } = await updateProjectAction({
        projectId,
        title: project.title,
        description: project.description,
        url: project.url,
        images: updatedImages
      })

      if (!success) {
        throw new Error(message)
      }

      setProject(prevProject => ({
        ...prevProject!,
        images: updatedImages
      }))

      setFiles([])

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
    } catch (error) {
      toast(error instanceof Error ? error.message : 'An unexpected error occurred', {
        icon: <ErrorIcon className='inline-block' />,
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
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageDelete = (deletedImageUrl: string) => {
    setProject(prevProject => ({
      ...prevProject!,
      images: prevProject!.images.filter(url => url !== deletedImageUrl)
    }))
  }

  return (
    <section className='max-w-4xl p-6 mx-auto'>
      {project === DEFAULT_PROJECT ? (
        <LoadingCard renderedSkeletons={5} />
      ) : project === null ? (
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
              <Label htmlFor='title'>{t('projectTitle')}</Label>
              <Input
                type='text'
                id='title'
                value={project.title}
                onChange={e => setProject({ ...project, title: e.target.value })}
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='url'>{t('projectURL')}</Label>
              <Input
                type='text'
                id='url'
                value={project.url}
                onChange={e => setProject({ ...project, url: e.target.value })}
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='description'>{t('projectDescription')}</Label>
              <Textarea
                id='description'
                value={project.description}
                onChange={e => setProject({ ...project, description: e.target.value })}
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='images'>{t('projectAddImages')}</Label>
              <FileUpload onFilesSelected={handleFilesSelected} />
            </LabelInputContainer>

            <UploadedFiles
              projectId={project.id}
              projectImages={project.images}
              onImageDelete={handleImageDelete}
              type='projectImg'
            />

            <SubmitButton disabled={isSubmitting}>
              {isSubmitting ? t('isUpdating') : t('updateProject')}
            </SubmitButton>
          </form>
        </>
      )}
    </section>
  )
}
