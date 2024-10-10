import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <NextTopLoader color='#69239E' showAtBottom={false} zIndex={1600} />
      {children}
      <Analytics />
      <Toaster />
    </ThemeProvider>
  )
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
