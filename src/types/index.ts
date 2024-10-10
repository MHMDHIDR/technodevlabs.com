import React from 'react'
import {
  users,
  accounts,
  sessions,
  verificationTokens,
  posts,
  projects,
  settings
} from '@/db/schema'
import type { Formats, TranslationValues } from 'next-intl'

// Inferred types from Drizzle ORM
export type User = typeof users.$inferSelect
export type Account = typeof accounts.$inferSelect
export type Session = typeof sessions.$inferSelect
export type VerificationToken = typeof verificationTokens.$inferSelect
export type Post = typeof posts.$inferSelect
export type Project = typeof projects.$inferSelect
export type Setting = typeof settings.$inferSelect

export type updateProjectData = {
  projectId: Project['id']
  title?: Project['title']
  description?: Project['description']
  url?: Project['url']
  images?: Project['images'] | { removeImage: string }
}

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
  blockIcon: React.ReactNode
  className?: string
  children?: React.ReactNode | string
}

// Note: We're using the inferred Post type here instead of redefining it
export type PostWithAuthor = Post & {
  author: {
    id: string
    email: string
    name: string | null
    image: string | null
  }
}

export type ModalProps = {
  title: string
  description: React.ReactNode
  className?: string
  isSmallButton?: boolean
  trigger: React.ReactNode
  children: React.ReactNode
}

export type itemsTypes = 'post' | 'project' | 'projectImg'

export type DashboardListItemProps = {
  item: Post | Project
  type: itemsTypes
}

export type ProjectImagesGridProps = {
  projectId: Project['id']
  projectImages: Project['images']
  onImageDelete(_imageUrl: string): void
  type: itemsTypes
}

// export type useTranslationsProps = (
//   key: string,
//   values?: TranslationValues,
//   formats?: Formats
// ) => string
