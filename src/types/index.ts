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

// export type GoogleOauthConsentUrlResponse = {
//   success: boolean
//   url: string
//   message: string
// }

export type User = {
  name: string
  email: string
  picture: string
} | null
