import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'
import type { ThemeProviderProps } from 'next-themes/dist/types'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
      <Analytics />
      <Toaster />
    </ThemeProvider>
  )
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
