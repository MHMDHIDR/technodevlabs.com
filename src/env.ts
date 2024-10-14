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
    VERCEL_API_TOKEN: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_VERCEL_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_VERCEL_TEAM_ID: z.string().min(1)
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
    AWS_SECRET: process.env.AWS_SECRET,
    NEXT_PUBLIC_VERCEL_PROJECT_ID: process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID,
    NEXT_PUBLIC_VERCEL_TEAM_ID: process.env.NEXT_PUBLIC_VERCEL_TEAM_ID,
    VERCEL_API_TOKEN: process.env.VERCEL_API_TOKEN
  }
})
