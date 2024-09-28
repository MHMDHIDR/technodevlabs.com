'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Divider from '@/app/components/divider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Success } from '@/app/components/icons'
import { SubmitButton } from './submit-button'
import { ADMIN_EMAIL, DEFAULT_DURATION } from '@/data/constants'
import { email } from '@/app/actions'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { replace } = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    const formData = new FormData(event.currentTarget)

    const emailData = {
      name: `${formData.get('firstname')} ${formData.get('lastname')}`,
      from: formData.get('email')?.toString() || ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: formData.get('subject')?.toString() || 'Contact Us',
      msg: {
        title: `${formData.get('subject')} - ${formData.get('firstname')} ${formData.get(
          'lastname'
        )}`,
        msg: formData.get('message')?.toString() || '',
        buttonLink: 'mailto:' + formData.get('email')?.toString() || ADMIN_EMAIL,
        buttonLabel: `Reply to ${formData.get('firstname')} ${formData.get('lastname')}`
      }
    }

    try {
      await email(emailData)

      setStatus('success')

      toast('Email sent successfully! 🎉', {
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
      setStatus('error')

      toast('Failed to send email. Please try again later! 😢', {
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
      setTimeout(() => replace(`/`), DEFAULT_DURATION)
    }
  }

  return (
    <div className='w-full max-w-4xl p-4 mx-auto bg-white rounded-none md:rounded-2xl md:p-8 shadow-input dark:bg-black'>
      <h2 className='text-xl text-center font-bold text-neutral-800 dark:text-neutral-200'>
        Your message is important to us
      </h2>
      <p className='text-center mt-2 text-sm text-neutral-600 dark:text-neutral-300'>
        We will get back to you as soon as possible.
      </p>

      <form className='my-8' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-8 gap-y-4 md:grid-cols-2'>
          <div>
            <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
              <LabelInputContainer>
                <Label htmlFor='firstname'>First name</Label>
                <Input
                  id='firstname'
                  placeholder='Mohammed'
                  type='text'
                  name='firstname'
                  dir='auto'
                  min={5}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='lastname'>Last name</Label>
                <Input
                  id='lastname'
                  placeholder='Ahmed'
                  type='text'
                  name='lastname'
                  dir='auto'
                  min={5}
                  required
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                id='email'
                placeholder='example@example.com'
                type='email'
                name='email'
                dir='auto'
                min={10}
                required
              />
            </LabelInputContainer>
            <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
              <LabelInputContainer>
                <Label htmlFor='subject'>Subject</Label>
                <Input
                  id='subject'
                  placeholder='I have a question'
                  type='text'
                  name='subject'
                  dir='auto'
                  min={5}
                  required
                />
              </LabelInputContainer>
            </div>
          </div>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='message'>Message</Label>
            <textarea
              id='message'
              name='message'
              placeholder='Hi, I would like to know more about your services.'
              className='h-32 p-2 border rounded-md border-neutral-300 dark:border-neutral-700 focus:outline-none dark:bg-neutral-900 dark:text-neutral-100 min-h-56'
              dir='auto'
              minLength={20}
              required
            />
          </LabelInputContainer>
        </div>

        <SubmitButton disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send'}
        </SubmitButton>

        <Divider className='my-10' />

        <div className='flex flex-col space-y-4'>
          Email us at{' '}
          <Link
            href='mailto:support@technodevlabs.com'
            className='underline text-neutral-800 dark:text-neutral-200'
          >
            Support@TechnoDevLabs.com
          </Link>
        </div>
      </form>
    </div>
  )
}

const LabelInputContainer = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>
}
