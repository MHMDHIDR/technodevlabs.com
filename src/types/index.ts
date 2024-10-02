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

export type CreateEmailResponse = {
  data: {
    id: string
  } | null
  error: {
    message: string
    name: string
  } | null
}

export type BlockProps = {
  href: string
  blockLabel: string
  blockDescription: string
  blockIcon: JSX.Element
  children?: string
}

export type Post = {
  id: string
  title: string
  userId: string
  content: string
  slug: string
  createdAt: Date
  updatedAt: Date
}
