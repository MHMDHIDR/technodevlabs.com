import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { ContactForm } from './contact-form'

export default function ContactPage() {
  return (
    <Layout className={`px-4 pt-10 pb-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent md:text-4xl lg:text-6xl max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        Contact US
        <br /> <Cover>TechnoDevLabs</Cover>
      </h1>

      <ContactForm />
    </Layout>
  )
}
