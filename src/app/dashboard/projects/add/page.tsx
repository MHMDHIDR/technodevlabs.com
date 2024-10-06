'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitButton } from '@/app/contact/submit-button'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Error as ErrorIcon, Success } from '@/components/custom/icons'
import LabelInputContainer from '@/components/custom/label-input-container'
import { addNewProjectAction } from '@/app/actions'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import FileUpload from '@/components/custom/file-upload'
import { uploadFiles } from '@/app/actions'
import { optimizeImage, isImageFile } from '@/app/actions'

export default function DashboardProjectAdd() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { replace } = useRouter()

  const handleFilesSelected = (selectedFiles: File[]) => {
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
      const { success, message } = await addNewProjectAction({
        id: projectId,
        title,
        description,
        url,
        images: uploadedUrls
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
    <section className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Add New Project</h1>
      <form onSubmit={addProject} className='space-y-6'>
        <LabelInputContainer>
          <Label htmlFor='title'>Project Title</Label>
          <Input
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='url'>Project View URL</Label>
          <Input
            id='url'
            value={url}
            onChange={e => setUrl(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='description'>Project Description</Label>
          <Textarea
            id='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='images'>Project Images (Max 5MB)</Label>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </LabelInputContainer>

        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Adding Project...' : 'Add Project'}
        </SubmitButton>
      </form>
    </section>
  )
}
