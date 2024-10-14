'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { addNewProjectAction, uploadFiles, optimizeImage, isImageFile } from '@/actions'
import { SubmitButton } from '@/app/[locale]/contact/submit-button'
import { FileUpload } from '@/components/custom/file-upload'
import { Error as ErrorIcon } from '@/components/custom/icons'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'

export default function DashboardProjectAdd() {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [titleAr, setTitleAr] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionAr, setDescriptionAr] = useState('')
  const [files, setFiles] = useState<Array<File>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const projectTranslations = useTranslations('dashboard.project')

  const { replace } = useRouter()

  const handleFilesSelected = (selectedFiles: Array<File>) => {
    setFiles(selectedFiles)
  }

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (files.length === 0) {
      toast('Please select at least one image', {
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

      setIsSubmitting(false)
      return
    }

    try {
      const projectId = crypto.randomUUID()

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
      const uploadedUrls = await uploadFiles(fileData, projectId)

      // Add project with uploaded image URLs
      const { message, success } = await addNewProjectAction({
        id: projectId,
        title,
        titleAr,
        description,
        descriptionAr,
        url,
        images: uploadedUrls,
        updatedAt: new Date()
      })

      if (!success) {
        throw new Error(message)
      }

      toast(message, {
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

      setTitle('')
      setUrl('')
      setDescription('')
      setFiles([])
      replace('/dashboard/projects')
    } catch (error) {
      toast(error instanceof Error ? error.message : 'An unexpected error occurred', {
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

  return (
    <section className='container p-6 mx-auto'>
      <h1 className='mb-6 text-3xl font-bold'>{projectTranslations('addProject')}</h1>
      <form className='space-y-6' onSubmit={addProject}>
        <LabelInputContainer>
          <Label htmlFor='title'>{projectTranslations('projectTitle')}</Label>
          <Input
            className='block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='title'
            onChange={e => setTitle(e.target.value)}
            required
            value={title}
            dir='auto'
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='titleAr'>{projectTranslations('projectTitleAr')}</Label>
          <Input
            className='block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='titleAr'
            onChange={e => setTitleAr(e.target.value)}
            required
            value={titleAr}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='url'>{projectTranslations('projectURL')}</Label>
          <Input
            className='block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='url'
            onChange={e => setUrl(e.target.value)}
            required
            value={url}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='description'>{projectTranslations('projectDescription')}</Label>
          <Textarea
            className='block mt-1 w-full leading-loose rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='description'
            onChange={e => setDescription(e.target.value)}
            required
            value={description}
            dir='auto'
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='descriptionAr'>{projectTranslations('projectDescriptionAr')}</Label>
          <Textarea
            className='block mt-1 w-full leading-loose rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='descriptionAr'
            onChange={e => setDescriptionAr(e.target.value)}
            required
            value={descriptionAr}
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='images'>{projectTranslations('projectAddImages')}</Label>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </LabelInputContainer>

        <SubmitButton disabled={files.length === 0} pending={isSubmitting}>
          {isSubmitting ? projectTranslations('isUpdating') : projectTranslations('addProject')}
        </SubmitButton>
      </form>
    </section>
  )
}
