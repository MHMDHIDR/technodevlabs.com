import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'
import type { ThemeProviderProps } from 'next-themes/dist/types'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl={`/auth`}>
      <ClerkLoaded>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}

          <Analytics />
          <Toaster />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
