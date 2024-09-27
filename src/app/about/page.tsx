import Layout from '@/app/components/layout'
import Divider from '@/app/components/divider'
import { Cover } from '@/components/ui/cover'
import { AboutSection } from './about-section'

export default function AboutPage() {
  return (
    <Layout className={`p-4`}>
      <h1 className='text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        We Are <br /> at <Cover>TechnoDevLabs</Cover>
      </h1>

      <AboutSection />

      <Divider className='my-10' />
    </Layout>
  )
}
