'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { SubmitButton } from '@/app/contact/submit-button'
import { Error, Success } from '@/components/custom/icons'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import LabelInputContainer from '@/components/custom/label-input-container'
import { addNewProjectAction } from '@/app/actions'
import { Textarea } from '@/components/ui/textarea'

export default function DashboardProjecttAdd() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  const { replace } = useRouter()

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault()

    const { success, message } = await addNewProjectAction({
      title,
      description,
      url,
      images: []
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

    // Reset form after submission
    setTitle('')
    replace('/dashboard/projects')
  }

  return (
    <section className='max-w-4xl p-6 mx-auto'>
      <h3 className='mb-6 text-2xl font-bold text-center'>Add New Project</h3>

      <form onSubmit={addProject} className='space-y-6'>
        <LabelInputContainer>
          <Label htmlFor='title'>Project Title</Label>
          <Input
            type='text'
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
            type='text'
            id='url'
            value={url}
            onChange={e => setUrl(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor='content'>Project Description</Label>
          <Textarea
            id='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            required
          />
        </LabelInputContainer>

        <SubmitButton>Add Project</SubmitButton>
      </form>
    </section>
  )
}
