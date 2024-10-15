'use server'

import { Resend } from 'resend'
import { EmailTemplate } from '@/components/custom/email-template'
import { ADMIN_EMAIL, APP_TITLE } from '@/data/constants'
import type { CreateEmailResponse, emailMethodProps } from '@/types'

const { RESEND_API_KEY } = process.env

export async function emailAction({ from, msg, name, subject, to }: emailMethodProps) {
  const resend = new Resend(RESEND_API_KEY)

  const { data, error: cause }: CreateEmailResponse = await resend.emails.send({
    to,
    cc: ['Mr.hamood277@gmail.com', 'info@mohammedhaydar.com', 'mhmedabdelrahim685@gmail.com'],
    from: `${name ?? APP_TITLE} <${ADMIN_EMAIL}>`,
    subject,
    replyTo: from,
    react: EmailTemplate({
      title: msg.title ?? `Email from: ${from}` ?? '',
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
