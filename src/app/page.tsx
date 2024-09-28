import Layout from '@/app/components/layout'
import { Hero } from '@/app/components/hero'
import { AboutSection } from './about/about-section'
import ContactForm from './contact/contact-form'

export default function Home() {
  return (
    <section>
      <Layout>
        <Hero />

        <section id='about'>
          <AboutSection />
        </section>

        <section id='contact' className='py-20'>
          <ContactForm />
        </section>
      </Layout>
    </section>
  )
}
