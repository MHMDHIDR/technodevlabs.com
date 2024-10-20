import NextTopLoader from 'nextjs-toploader'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import type { ThemeProviderProps } from 'next-themes/dist/types'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <NextTopLoader color='#69239E' showAtBottom={false} zIndex={1600} />
      {children}
      <Toaster />
    </ThemeProvider>
  )
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
