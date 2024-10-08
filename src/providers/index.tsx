import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'
import { I18nProviderClient } from 'locales/client'
// import type { ThemeProviderProps } from 'next-themes/dist/types'

export function Providers({ locale, children }: { locale: string; children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem /*{...props}*/>
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
      <Analytics />
      <Toaster />
    </NextThemesProvider>
  )
}

// function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }
