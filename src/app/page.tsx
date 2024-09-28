import Layout from "@/app/components/layout";
import { Hero } from "@/app/components/hero";
import { AboutSection } from "./about/about-section";
import ContactForm from "./contact/contact-form";
import { ServicesSection } from "./services/services-section";

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

        <section id='services'>
          <ServicesSection />
        </section>
      </Layout>
    </section>
  );
}
