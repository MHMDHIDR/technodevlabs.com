import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ClerkProvider } from '@clerk/nextjs'
import type { ThemeProviderProps } from 'next-themes/dist/types'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <ClerkProvider afterSignOutUrl={`/auth`}>{children}</ClerkProvider>
    </ThemeProvider>
  )
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
