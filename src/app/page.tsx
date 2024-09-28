import Layout from '@/components/custom/layout'
import { Hero } from '@/components/custom/hero'
import { AboutSection } from './about/about-section'
import { ServicesSection } from './services/services-section'
import { ContactForm } from './contact/contact-form'

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

        <section id='contact' className='py-20'>
          <ContactForm />
        </section>
      </Layout>
    </section>
  )
}
