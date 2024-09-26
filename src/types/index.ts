import { NextApiRequest } from 'next'
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import type { ButtonProps } from '@/components/ui/button'
import type { Projects, Users } from '@prisma/client'

// User Email
export type emailMethodProps = {
  name?: string
  subject: string
  from: string
  to: string
  msg: customEmailProps
  pdfToSend?: Buffer
}

export type customEmailProps = {
  title?: string
  msg?: string | HTMLElement
  buttonLink?: string
  buttonLabel?: string
}

export type emailProps = {
  emailOrPhone: string
  address: string
  message: string
  mailSent?: number
}

export interface CreateEmailResponse {
  data: {
    id: string
  } | null
  error: {
    message: string
    name: any
  } | null
}
