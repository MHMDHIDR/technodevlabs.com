import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    DATABASE_URL: z.string().url(),
    AWS_BUCKET_NAME: z.string().min(1),
    AWS_REGION: z.string().min(1),
    AWS_ACCESS_ID: z.string().min(1),
    AWS_SECRET: z.string().min(1),
    CAN_AUTHENTICATE_PASSWORD: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_URL: z.string().url()
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
    AWS_SECRET: process.env.AWS_SECRET,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    CAN_AUTHENTICATE_PASSWORD: process.env.CAN_AUTHENTICATE_PASSWORD
  }
})
