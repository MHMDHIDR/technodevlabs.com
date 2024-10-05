import Layout from '@/components/custom/layout'
import { Hero } from '@/components/custom/hero'
import { AboutSection } from '@/app/about/about-section'
import { ServicesSection } from '@/app/services/services-section'
import { ContactForm } from '@/app/contact/contact-form'
import { PostsSection } from '@/app/posts/posts-section'

export default function Home() {
  return (
    <Layout>
      <Hero />

      <section id='about'>
        <AboutSection />
      </section>

      {/* Background Dotted / Grid */}
      <div className='h-fit p-4 py-20 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative'>
        {/* <div className='h-fit p-4 py-20 w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative'> */}
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
