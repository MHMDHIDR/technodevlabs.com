import Layout from '@/app/components/layout'
import { Hero } from '@/app/components/hero'
import { AboutSection } from './about/about-section'

export default function Home() {
  return (
    <section>
      <Layout>
        <Hero />

        <section id='about'>
          <AboutSection />
        </section>
      </Layout>
    </section>
  )
}
