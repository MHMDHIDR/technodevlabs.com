import Layout from '@/components/custom/layout'
import { Hero } from '@/components/custom/hero'
import { AboutSection } from '@/app/about/about-section'
import { ServicesSection } from '@/app/services/services-section'
import { ContactForm } from '@/app/contact/contact-form'
import { PostsSection } from '@/app/posts/posts-section'

export default function Home() {
  return (
    <section>
      <Layout>
        <Hero />

        <section id='about'>
          <AboutSection />
        </section>

        <section id='services' className='py-20'>
          <ServicesSection />
        </section>

        <section id='posts' className='py-20'>
          <PostsSection pathname='/' />
        </section>

        <section id='contact' className='py-20'>
          <ContactForm />
        </section>
      </Layout>
    </section>
  )
}
