import { AboutSection } from '@/app/[locale]/about/about-section'
import { ContactForm } from '@/app/[locale]/contact/contact-form'
import { PostsSection } from '@/app/[locale]/posts/posts-section'
import { ServicesSection } from '@/app/[locale]/services/services-section'
import { ProjectsSection } from '@/app/[locale]//projects/projects-section'
import { Hero } from '@/components/custom/hero'
import Layout from '@/components/custom/layout'
import { PrimaryHeading } from '@/components/ui/text-hover-effect'
import { getSettings } from '@/data/settings'
import { clsx } from '@/lib/utils'
import type { Locale } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'

export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
  const settings = await getSettings()
  const projectsTranslations = await getTranslations('projects')

  return (
    <Layout>
      <Hero />

      <section className='py-20' id='projects'>
        <PrimaryHeading className='-my-32'>{projectsTranslations('pageTitle')}</PrimaryHeading>
        <ProjectsSection />
      </section>

      <section id='about'>
        <AboutSection />
      </section>

      <div
        className={`h-fit p-4 py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings?.layout === 'grid',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings?.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

        <section className='py-20' id='services'>
          <ServicesSection />
        </section>

        <section className='py-20' id='posts'>
          <PostsSection pathname='/' />
        </section>

        <section className='py-20' id='contact'>
          <ContactForm />
        </section>
      </div>
    </Layout>
  )
}
