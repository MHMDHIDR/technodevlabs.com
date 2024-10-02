import Link from 'next/link'
import { EmailUs } from '@/components/custom/email-us'
import Divider from '@/components/custom/divider'
import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'
import { APP_TITLE, APP_DESCRIPTION, APP_LOGO_opengraph } from '@/data/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Privacy Policy | ${APP_TITLE}`,
  description: APP_DESCRIPTION,
  openGraph: {
    title: `Privacy Policy | ${APP_TITLE}`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: APP_LOGO_opengraph,
        width: 1200,
        height: 650,
        alt: APP_DESCRIPTION
      }
    ],
    type: 'website',
    locale: 'en_US'
  }
}

export default function PrivacyPage() {
  return (
    <Layout className={`p-4 py-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Privacy Policy</Cover>
      </h1>

      <Divider className='my-10' />

      <section className='py-20 leading-[3rem] text-justify container'>
        <p>Last updated: 2024-10-01</p>
        <p>
          1. <strong>Introduction</strong>
        </p>
        <p>
          Welcome to{' '}
          <Link href='/'>
            <strong>TechnoDevLabs</strong>
          </Link>{' '}
          (“Company”, “we”, “our”, “us”)! We are committed to protecting your privacy and
          ensuring that your personal information is handled securely and responsibly.
        </p>
        <p>
          This Privacy Policy outlines how we collect, use, and disclose your personal
          information when you visit our website located at{' '}
          <strong>https://www.technodevlabs.com</strong> (collectively referred to as
          “Service”).
        </p>
        <p>
          By accessing or using our Service, you agree to this Privacy Policy. If you do
          not agree, please discontinue using our Service. This Privacy Policy applies to
          all visitors, users, and others who access or use the Service.
        </p>

        <p>
          2. <strong>Information Collection</strong>
        </p>
        <p>
          We collect several types of information to provide and improve our Service to
          you:
        </p>
        <p>
          - <strong>Personal Data</strong>: While using our Service, we may ask you to
          provide us with certain personally identifiable information, such as your name,
          email address, and payment information.
        </p>
        <p>
          - <strong>Usage Data</strong>: We may also collect information on how the
          Service is accessed and used, such as your IP address, browser type, and
          browsing behavior.
        </p>

        <p>
          3. <strong>Use of Data</strong>
        </p>
        <p>
          <Link href='/'>
            <strong>TechnoDevLabs</strong>
          </Link>{' '}
          uses the collected data for various purposes:
        </p>
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>
            To allow you to participate in interactive features of our Service when you
            choose to do so
          </li>
          <li>To provide customer support</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
          <li>
            To provide you with news, special offers, and general information unless you
            have opted not to receive such information
          </li>
        </ul>

        <p>
          4. <strong>Data Retention</strong>
        </p>
        <p>
          We will retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy. We will also retain usage
          data for internal analysis purposes.
        </p>

        <p>
          5. <strong>Data Sharing</strong>
        </p>
        <p>We do not share your personal information with third parties except:</p>
        <ul>
          <li>When required to comply with a legal obligation</li>
          <li>
            To protect and defend the rights or property of{' '}
            <Link href='/'>
              <strong>TechnoDevLabs</strong>
            </Link>
          </li>
          <li>
            To prevent or investigate possible wrongdoing in connection with the Service
          </li>
          <li>To protect the personal safety of users of the Service or the public</li>
        </ul>

        <p>
          6. <strong>Cookies and Tracking Technologies</strong>
        </p>
        <p>
          We use cookies and similar tracking technologies to track the activity on our
          Service. Cookies are files with a small amount of data that may include an
          anonymous unique identifier.
        </p>
        <p>
          You can instruct your browser to refuse all cookies or indicate when a cookie is
          being sent. However, if you do not accept cookies, you may not be able to use
          some parts of our Service.
        </p>

        <p>
          7. <strong>Security</strong>
        </p>
        <p>
          We strive to use commercially acceptable means to protect your personal
          information. However, no method of transmission over the internet or method of
          electronic storage is 100% secure, and we cannot guarantee its absolute
          security.
        </p>

        <p>
          8. <strong>Your Rights</strong>
        </p>
        <p>
          You have the right to access, update, or delete the information we have on you.
          If you wish to be informed about what personal information we hold about you or
          if you want it to be removed from our systems, please contact us.
        </p>

        <p>
          9. <strong>Children’s Privacy</strong>
        </p>
        <p>
          Our Service is not intended for anyone under the age of 18. We do not knowingly
          collect personally identifiable information from children under 18. If you are a
          parent or guardian and believe your child has provided us with personal
          information, please contact us, and we will take steps to remove that
          information.
        </p>

        <p>
          10. <strong>Changes to this Privacy Policy</strong>
        </p>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any
          changes by posting the new Privacy Policy on this page. You are advised to
          review this Privacy Policy periodically for any changes.
        </p>

        <p>
          11. <strong>Contact Us</strong>
        </p>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <EmailUs />.
        </p>
      </section>
    </Layout>
  )
}
