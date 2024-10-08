import Layout from '@/components/custom/layout'
import { Hero } from '@/components/custom/hero'
import { AboutSection } from '@/app/[locale]/about/about-section'
import { ServicesSection } from '@/app/[locale]/services/services-section'
import { ContactForm } from '@/app/[locale]/contact/contact-form'
import { PostsSection } from '@/app/[locale]/posts/posts-section'
import { getSettings } from '@/data/settings'
import { clsx } from '@/lib/utils'

export default async function Home() {
  const settings = await getSettings()

  return (
    <Layout>
      <Hero />

      <section id='about'>
        <AboutSection />
      </section>

      <div
        className={`h-fit p-4 py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings?.layout === 'grid',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings?.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

        <section id='services' className='py-20'>
          <ServicesSection />
        </section>

        <section id='posts' className='py-20'>
          <PostsSection pathname='/' />
        </section>

        <section id='contact' className='py-20'>
          <ContactForm />
        </section>
      </div>
    </Layout>
  )
}
