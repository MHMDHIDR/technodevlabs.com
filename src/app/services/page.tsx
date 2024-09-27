import Layout from '@/app/components/layout'
import { Cover } from '@/components/ui/cover'

export default function ServicesPage() {
  return (
    <Layout className={`p-4`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent md:text-4xl lg:text-6xl max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        Our Services <br /> at <Cover>TechnoDevLabs</Cover>
      </h1>

      <p className='text-center bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        TechnoDevLabs is a software development company that specializes in building web
        and mobile applications. We are a team of experienced software developers who are
        passionate about creating high-quality software products. Our goal is to help our
        clients achieve their business objectives by providing them with innovative and
        cost-effective software
      </p>

      <p>
        We offer a wide range of services including web development, mobile app
        development, and custom software development. Our team has experience working with
        a variety of technologies including React, React Native, Node.js, and MongoDB. We
        are committed to delivering high-quality software products that meet the needs of
        our clients.
      </p>
    </Layout>
  )
}
