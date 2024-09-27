'use server'

import { Resend } from 'resend'
import { ADMIN_EMAIL, APP_TITLE } from '@/data/constants'
import { EmailTemplate } from '@/app/components/email-template'
import type { CreateEmailResponse, emailMethodProps } from '@/types'

const { RESEND_API_KEY } = process.env

export default async function email({ name, subject, from, to, msg }: emailMethodProps) {
  const resend = new Resend(RESEND_API_KEY)

  const { data, error: cause }: CreateEmailResponse = await resend.emails.send({
    to,
    from: `${name ?? APP_TITLE} <${ADMIN_EMAIL}>`,
    subject: subject,
    replyTo: from,
    react: EmailTemplate({
      title: `Email from: ${from}` ?? msg.title ?? '',
      msg: msg.msg ?? '',
      buttonLink: msg.buttonLink ?? '',
      buttonLabel: msg.buttonLabel ?? ''
    }) as React.ReactElement
  })

  if (cause) {
    throw new Error('Error sending email to user', { cause })
  }

  return data
}
