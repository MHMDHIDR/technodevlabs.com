import Link from 'next/link'
import { cn } from '@/lib/utils'
import Layout from '@/app/components/layout'
import { Cover } from '@/components/ui/cover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ADMIN_EMAIL, APP_TITLE } from '@/data/constants'
import email from '@/app/actions/email'

export default function ContactPage() {
  async function contactUsEmail(formData: FormData) {
    'use server'

    const emailData = {
      name: `${formData.get('firstname')} ${formData.get('lastname')}`,
      from: `${APP_TITLE} | <${formData.get('email')}>`,
      to: ADMIN_EMAIL,
      subject: formData.get('subject')?.toString() ?? 'Contact Us',
      msg: {
        title: `${formData.get('subject')} - ${formData.get('firstname')} ${formData.get(
          'lastname'
        )}`,
        msg: formData.get('message')?.toString() ?? ''
      }
    }

    console.log('emailData ==>', {
      name: `${formData.get('firstname')} ${formData.get('lastname')}`,
      from: `${APP_TITLE} | <${formData.get('email')}>`,
      to: ADMIN_EMAIL,
      subject: formData.get('subject')?.toString() ?? 'Contact Us',
      msg: formData.get('message')?.toString() ?? ''
    })

    // mutate data
    const data = await email(emailData)

    console.log(data)
  }

  return (
    <Layout className={`p-4`}>
      <h1 className='text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        Contact US
        <br /> <Cover>TechnoDevLabs</Cover>
      </h1>

      <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
        <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
          Your message is important to us
        </h2>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          We will get back to you as soon as possible.
        </p>

        <form className='my-8' action={contactUsEmail}>
          <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
            <LabelInputContainer>
              <Label htmlFor='firstname'>First name</Label>
              <Input
                id='firstname'
                placeholder='Mohammed'
                type='text'
                name='firstname'
                dir='auto'
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
            />
          </LabelInputContainer>
          <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
            <LabelInputContainer>
              <Label htmlFor='subject'>Subject</Label>
              <Input
                id='subject'
                placeholder='I have a question'
                type='text'
                name='subject'
                dir='auto'
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='message'>Message</Label>
            <textarea
              id='message'
              name='message'
              placeholder='Hi, I would like to know more about your services.'
              className='h-32 p-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none dark:bg-neutral-900 dark:text-neutral-100 min-h-56'
              dir='auto'
            />
          </LabelInputContainer>

          <button
            className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
          >
            Send &rarr;
            <BottomGradient />
          </button>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

          <div className='flex flex-col space-y-4'>
            Email us at{' '}
            <Link
              href='mailto:support@technodevlabs.com'
              className='text-neutral-800 dark:text-neutral-200 underline'
            >
              Support@TechnoDevLabs.com
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
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
