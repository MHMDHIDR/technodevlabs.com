import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const database = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = database

export { database }

// import { PrismaClient } from '@prisma/client'

// const client = new PrismaClient({
//   log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
// })

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// export const database = globalForPrisma.prisma ?? client

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client
