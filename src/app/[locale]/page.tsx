import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AboutSection } from '@/app/[locale]/about/about-section'
import { PostsSection } from '@/app/[locale]/blog/posts-section'
import { ContactForm } from '@/app/[locale]/contact/contact-form'
import { ProjectsSection } from '@/app/[locale]/projects/projects-section'
import { ServicesSection } from '@/app/[locale]/services/services-section'
import { Hero } from '@/components/custom/hero'
import Layout from '@/components/custom/layout'
import { PrimaryHeading } from '@/components/ui/text-hover-effect'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { getSettings } from '@/data/settings'
import { clsx } from '@/lib/utils'
import type { Locale } from '@/i18n/request'

export async function generateMetadata() {
  return {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    openGraph: {
      images: [APP_LOGO_opengraph]
    }
  }
}

export const dynamic = 'force-static'

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const settings = (await getSettings()) || { layout: 'grid' }
  const projectsTranslations = await getTranslations('projects')
  const servicesTranslations = await getTranslations('services')
  const postsTranslations = await getTranslations('posts')
  const contactTranslations = await getTranslations('contact')

  return (
    <Layout className='overflow-x-clip'>
      <Hero settingsLayout={settings.layout} />

      <section className='py-10' id='projects'>
        <PrimaryHeading className='w-full h-20'>{projectsTranslations('pageTitle')}</PrimaryHeading>
        <ProjectsSection pathname='/' />
      </section>

      <section id='about'>
        <AboutSection />
      </section>

      <div
        className={`h-fit px-4 py-10 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings.layout === 'grid',
          'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]':
            settings.layout === 'grid-small',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

        <section className='py-10' id='services'>
          <PrimaryHeading>{servicesTranslations('pageTitle')}</PrimaryHeading>
          <ServicesSection />
        </section>

        <section className='py-10' id='blog'>
          <PrimaryHeading className='w-full h-20'>{postsTranslations('pageTitle')}</PrimaryHeading>
          <PostsSection pathname='/' />
        </section>

        <section className='py-10' id='contact'>
          <PrimaryHeading className='w-full h-20'>
            {contactTranslations('pageTitle')}
          </PrimaryHeading>
          <ContactForm />
        </section>
      </div>
    </Layout>
  )
}
