'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'
import { SubmitButton } from './submit-button'
import { emailAction } from '@/actions'
import Divider from '@/components/custom/divider'
import { Error, Success } from '@/components/custom/icons'
import LabelInputContainer from '@/components/custom/label-input-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ADMIN_EMAIL, DEFAULT_DURATION } from '@/data/constants'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { replace } = useRouter()
  const t = useTranslations('contact')
  const currentLocale = useLocale()

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
        buttonLink: 'mailto:' + formData.get('email')?.toString() || ADMIN_EMAIL,
        buttonLabel: `Reply to ${formData.get('firstname')} ${formData.get('lastname')}`
      }
    }

    try {
      await emailAction(emailData)

      setStatus('success')

      // Reset the form inputs
      form.reset()

      toast(
        currentLocale === 'en'
          ? 'Email sent successfully! 🎉'
          : 'تم إرسال البريد الإلكتروني بنجاح! 🎉، وسيتم التواصل معك عما قريبب',
        {
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
        }
      )
    } catch (error) {
      setStatus('error')

      toast(
        currentLocale === 'en'
          ? 'Failed to send email. Please try again later! 😢'
          : 'فشل إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى في وقت لاحق! 😢',
        {
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
        }
      )
    } finally {
      setTimeout(() => replace(`/`), DEFAULT_DURATION)
    }
  }

  return (
    <div className='w-full max-w-4xl p-4 mx-auto bg-white rounded-none md:rounded-2xl md:p-8 shadow-input dark:bg-black'>
      <h2 className='text-xl font-bold text-center text-neutral-800 dark:text-neutral-200'>
        {t('title')}
      </h2>
      <p className='mt-2 text-sm text-center text-neutral-600 dark:text-neutral-300'>
        {t('description')}
      </p>

      <form className='my-8' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-8 gap-y-4 md:grid-cols-2'>
          <div>
            <div className='flex flex-col mb-4 gap-x-2 space-y-2 md:flex-row md:space-y-0'>
              <LabelInputContainer>
                <Label htmlFor='firstname'>{t('firstName')}</Label>
                <Input
                  className='rtl:text-right w-full'
                  dir='auto'
                  id='firstname'
                  min={5}
                  name='firstname'
                  placeholder={t('placeholderFirstName')}
                  required
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='lastname'>{t('lastName')}</Label>
                <Input
                  className='rtl:text-right w-full'
                  dir='auto'
                  id='lastname'
                  min={5}
                  name='lastname'
                  placeholder={t('placeholderLastName')}
                  required
                  type='text'
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className='mb-4'>
              <Label htmlFor='email'>{t('email')}</Label>
              <Input
                className='rtl:text-right'
                dir='auto'
                id='email'
                min={10}
                name='email'
                placeholder={t('placeholderEmail')}
                required
                type='email'
              />
            </LabelInputContainer>
            <div className='flex flex-col mb-4 space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
              <LabelInputContainer>
                <Label htmlFor='subject'>{t('subject')}</Label>
                <Input
                  className='rtl:text-right'
                  dir='auto'
                  id='subject'
                  min={5}
                  name='subject'
                  placeholder={t('placeholderSubject')}
                  required
                  type='text'
                />
              </LabelInputContainer>
            </div>
          </div>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='message'>{t('message')}</Label>
            <Textarea
              className='p-2 rtl:text-right border resize-y rounded-md border-neutral-300 dark:border-neutral-700 focus:outline-none dark:bg-neutral-900 dark:text-neutral-100 min-h-52 max-h-96'
              dir='auto'
              id='message'
              minLength={20}
              name='message'
              placeholder={t('placeholderMessage')}
              required
            />
          </LabelInputContainer>
        </div>

        <SubmitButton disabled={status === 'loading' || status === 'success'}>
          {status === 'loading' ? t('sendingButton') : t('sendButton')}
        </SubmitButton>

        <Divider className='my-10 mb-20' />

        <div className='flex flex-col space-y-4'>
          {t('contactEmail')}{' '}
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
