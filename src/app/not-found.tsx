import { IconBook, IconCode, IconMessage } from '@tabler/icons-react'
import { NextIntlClientProvider } from 'next-intl'
import { cookies } from 'next/headers'
import NotFoundTranslationsAr from '@/../messages/ar.json'
import NotFoundTranslationsEn from '@/../messages/en.json'
import { Block } from '@/components/custom/block'
import { Button } from '@/components/custom/button'
import Footer from '@/components/custom/footer'
import { NotFoundIcon } from '@/components/custom/icons'
import MinifiedNav from '@/components/custom/minified-nav'
import { Link } from '@/i18n/routing'

export default async function RootNotFoundPage() {
  const cookieStore = cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en'
  const theme = cookieStore.get('theme')?.value || 'system'
  const messages = (await import(`@/../messages/${locale}.json`)).default

  const notFoundTranslations =
    locale === 'ar' ? NotFoundTranslationsAr.notFound : NotFoundTranslationsEn.notFound

  const getActualTheme = () => {
    if (theme === 'system') {
      return 'dark'
    }
    return theme
  }

  const actualTheme = getActualTheme()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${actualTheme}`}
      style={{ colorScheme: actualTheme }}
    >
      <body className={'min-h-screen font-sans antialiased overflow-x-clip dark:border-gray-950'}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MinifiedNav />
          <section className={`p-4 py-20`}>
            <div className='container flex flex-col items-center justify-center min-h-screen px-6 py-20 mx-auto w-full'>
              <div className='flex flex-col items-center max-w-lg mx-auto text-center'>
                <NotFoundIcon />

                <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
                  {notFoundTranslations.title}
                </h1>
                <p className='mt-4 text-gray-500 dark:text-gray-400'>
                  {notFoundTranslations.description}
                </p>

                <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
                  <Link href='/' className='w-full'>
                    <Button type='button' withArrow>
                      {notFoundTranslations.home}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className='w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                <Block
                  href='/projects'
                  blockLabel={notFoundTranslations.projectsLabel}
                  blockDescription={notFoundTranslations.exploreProjectsDescription}
                  blockIcon={<IconCode />}
                >
                  {notFoundTranslations.exploreProjects}
                </Block>

                <Block
                  href='/blog'
                  blockLabel={notFoundTranslations.blogLabel}
                  blockDescription={notFoundTranslations.readPostsDescription}
                  blockIcon={<IconBook />}
                >
                  {notFoundTranslations.readPosts}
                </Block>

                <Block
                  href='/contact'
                  blockLabel={notFoundTranslations.contactLabel}
                  blockDescription={notFoundTranslations.chatWithUsDescription}
                  blockIcon={<IconMessage />}
                >
                  {notFoundTranslations.chatWithUs}
                </Block>
              </div>
            </div>
          </section>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
