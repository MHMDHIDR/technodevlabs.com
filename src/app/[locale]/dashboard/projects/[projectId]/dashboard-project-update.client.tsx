'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import {
  getProjectByIdAction,
  isImageFile,
  optimizeImage,
  updateProjectAction,
  uploadFiles
} from '@/actions'
import { SubmitButton } from '@/app/[locale]/contact/submit-button'
import { AddButton } from '@/components/custom/add-button'
import EmptyState from '@/components/custom/empty-state'
import { FileUpload } from '@/components/custom/file-upload'
import LabelInputContainer from '@/components/custom/label-input-container'
import { LoadingCard } from '@/components/custom/loading'
import { UploadedFiles } from '@/components/custom/uploaded-files'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DEFAULT_PROJECT } from '@/data/constants'
import { useToast } from '@/hooks/use-toast'
import type { Project } from '@/types'

export default function DashboardProjectUpdateClient({ projectId }: { projectId: string }) {
  const projectTranslations = useTranslations('dashboard.project')

  const [project, setProject] = useState<Project | null>(DEFAULT_PROJECT)
  const [files, setFiles] = useState<Array<File>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetFileInput, setResetFileInput] = useState(false)
  const toast = useToast()

  const handleFilesSelected = (selectedFiles: Array<File>) => {
    setFiles(prevFiles => [...prevFiles, ...selectedFiles])
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

      let uploadedUrls: Array<string> = []

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

      const { message, success } = await updateProjectAction({
        projectId,
        title: project.title,
        titleAr: project.titleAr,
        description: project.description,
        descriptionAr: project.descriptionAr,
        url: project.url,
        images: updatedImages
      })

      if (!success) {
        throw new Error(message)
      }

      if (success) {
        setProject(prevProject => ({
          ...prevProject!,
          images: updatedImages
        }))

        setResetFileInput(true)
        setFiles([])

        // Reset the state after a short delay to allow file input reset
        setTimeout(() => setResetFileInput(false), 100)
      }

      toast.success(message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
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
    <section className='p-6 mx-auto max-w-4xl'>
      {project === DEFAULT_PROJECT ? (
        <LoadingCard renderedSkeletons={7} />
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

          <form className='space-y-6' onSubmit={editProject}>
            <LabelInputContainer>
              <Label htmlFor='title'>{projectTranslations('projectTitle')}</Label>
              <Input
                className='block ltr mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='title'
                onChange={e => setProject({ ...project, title: e.target.value })}
                required
                type='text'
                value={project.title}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='titleAr'>{projectTranslations('projectTitleAr')}</Label>
              <Input
                className='block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='titleAr'
                onChange={e => setProject({ ...project, titleAr: e.target.value })}
                required
                type='text'
                value={project.titleAr}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='url'>{projectTranslations('projectURL')}</Label>
              <Input
                className='block ltr mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='url'
                onChange={e => setProject({ ...project, url: e.target.value })}
                required
                type='text'
                value={project.url}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='description'>{projectTranslations('projectDescription')}</Label>
              <Textarea
                className='block ltr leading-loose mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='description'
                onChange={e => setProject({ ...project, description: e.target.value })}
                required
                value={project.description}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='descriptionAr'>{projectTranslations('projectDescriptionAr')}</Label>
              <Textarea
                className='block rtl leading-loose mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='descriptionAr'
                onChange={e => setProject({ ...project, descriptionAr: e.target.value })}
                required
                value={project.descriptionAr}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor='images' className='text-red-600 dark:text-red-400 font-bold'>
                {projectTranslations('projectAddImages')}
              </Label>
              <FileUpload onFilesSelected={handleFilesSelected} resetFiles={resetFileInput} />
            </LabelInputContainer>

            <UploadedFiles
              onImageDelete={handleImageDelete}
              projectId={project.id}
              projectImages={project.images}
              type='projectImg'
            />

            <SubmitButton disabled={isSubmitting}>
              {isSubmitting
                ? projectTranslations('isUpdating')
                : projectTranslations('updateProject')}
            </SubmitButton>
          </form>
        </>
      )}
    </section>
  )
}
