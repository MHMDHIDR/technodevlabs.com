'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { emailAction } from '@/actions'
import Divider from '@/components/custom/divider'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ADMIN_EMAIL, DEFAULT_DURATION } from '@/data/constants'
import { useToast } from '@/hooks/use-toast'
import { Link } from '@/i18n/routing'
import { SubmitButton } from './submit-button'

export function ContactForm() {
  const { replace } = useRouter()
  const contactTranslations = useTranslations('contact')
  const currentLocale = useLocale()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const toast = useToast()
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    const form = event.currentTarget // Capture the form element
    const formData = new FormData(form)

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
        buttonLink: `mailto:${formData.get('email')?.toString()}` || ADMIN_EMAIL,
        buttonLabel: `Reply to ${formData.get('firstname')} ${formData.get('lastname')}`
      }
    }

    try {
      await emailAction(emailData)

      setStatus('success')

      // Reset the form inputs
      form.reset()

      toast.success(
        currentLocale === 'en'
          ? 'Email sent successfully! 🎉'
          : 'تم إرسال البريد الإلكتروني بنجاح! 🎉، وسيتم التواصل معك عما قريبب'
      )
    } catch (error) {
      setStatus('error')

      toast.error(
        currentLocale === 'en'
          ? 'Failed to send email. Please try again later! 😢'
          : 'فشل إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى في وقت لاحق! 😢'
      )
    } finally {
      setTimeout(() => replace(`/`), DEFAULT_DURATION)
    }
  }

  return (
    <div className='p-4 mx-auto w-full max-w-4xl bg-white rounded-none md:rounded-2xl md:p-8 shadow-input dark:bg-black'>
      <h2 className='text-xl font-bold text-center text-neutral-800 dark:text-neutral-200'>
        {contactTranslations('title')}
      </h2>
      <p className='mt-2 text-sm text-center text-neutral-600 dark:text-neutral-300'>
        {contactTranslations('description')}
      </p>

      <form className='my-8' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-y-4 gap-8 md:grid-cols-2'>
          <div>
            <div className='flex flex-col gap-x-2 mb-4 space-y-2 md:flex-row md:space-y-0'>
              <LabelInputContainer>
                <Label htmlFor='firstname'>{contactTranslations('firstName')}</Label>
                <Input
                  className='w-full rtl:text-right'
                  dir='auto'
                  id='firstname'
                  min={5}
                  name='firstname'
                  placeholder={contactTranslations('placeholderFirstName')}
                  required
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='lastname'>{contactTranslations('lastName')}</Label>
                <Input
                  className='w-full rtl:text-right'
                  dir='auto'
                  id='lastname'
                  min={5}
                  name='lastname'
                  placeholder={contactTranslations('placeholderLastName')}
                  required
                  type='text'
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='email'>{contactTranslations('email')}</Label>
              <Input
                className='rtl:text-right'
                dir='auto'
                id='email'
                min={10}
                name='email'
                placeholder={contactTranslations('placeholderEmail')}
                required
                type='email'
              />
            </LabelInputContainer>
            <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
              <LabelInputContainer>
                <Label htmlFor='subject'>{contactTranslations('subject')}</Label>
                <Input
                  className='rtl:text-right'
                  dir='auto'
                  id='subject'
                  min={5}
                  name='subject'
                  placeholder={contactTranslations('placeholderSubject')}
                  required
                  type='text'
                />
              </LabelInputContainer>
            </div>
          </div>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='message'>{contactTranslations('message')}</Label>
            <Textarea
              className='p-2 max-h-96 rounded-md border resize-y rtl:text-right border-neutral-300 dark:border-neutral-700 focus:outline-none dark:bg-neutral-900 dark:text-neutral-100 min-h-52'
              dir='auto'
              id='message'
              minLength={20}
              name='message'
              placeholder={contactTranslations('placeholderMessage')}
              required
            />
          </LabelInputContainer>
        </div>

        <SubmitButton disabled={status === 'loading' || status === 'success'}>
          {status === 'loading'
            ? contactTranslations('sendingButton')
            : contactTranslations('sendButton')}
        </SubmitButton>

        <Divider className='my-10 mb-20' />

        <div className='flex flex-col space-y-4'>
          {contactTranslations('contactEmail')}{' '}
          <Link
            className='underline text-neutral-800 dark:text-neutral-200'
            href='mailto:support@technodevlabs.com'
          >
            Support@TechnoDevLabs.com
          </Link>
        </div>
      </form>
    </div>
  )
}
