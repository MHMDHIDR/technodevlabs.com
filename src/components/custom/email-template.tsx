import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text
} from '@react-email/components'
import { Facebook, Instagram, TikTok, Twitter } from '@/components/custom/icons'
import {
  APP_FB_URL,
  APP_INSTAGRAM_URL,
  APP_LOGO,
  APP_TIKTOK_URL,
  APP_TITLE,
  APP_TWITTER_URL
} from '@/data/constants'
import type { customEmailProps } from '@/types'

export function EmailTemplate({ buttonLabel, buttonLink, msg, title }: customEmailProps) {
  const formattedMsg = msg ? (typeof msg === 'string' ? msg.replace(/\n/g, '<br>') : msg) : ''

  return (
    <Html>
      <Head>
        <meta charSet='UTF-8' />
      </Head>
      <Body>
        <Container
          style={{
            maxWidth: '42rem',
            padding: '1.5rem',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            direction: 'rtl',
            fontFamily: 'Cairo, sans-serif'
          }}
        >
          <Section key='section1' style={{ textAlign: 'center' }}>
            <Img
              src={`https://www.technodevlabs.com${APP_LOGO}`}
              style={{
                width: 'auto',
                height: '5rem',
                margin: '0 auto',
                marginTop: '1rem'
              }}
              width={150}
            />
          </Section>

          <Section key='section2' style={{ marginTop: '2rem' }}>
            <div
              style={{
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9fafb',
                direction: 'rtl'
              }}
            >
              <Heading key='h2' as='h2' style={{ textAlign: 'center', userSelect: 'none' }}>
                {title ?? 'طلب استعادة كلمة المرور'}
              </Heading>

              <br />

              <Text
                key='msg'
                style={{
                  marginTop: '1rem',
                  lineHeight: '1.5',
                  color: '#374151'
                }}
              >
                {/* Use the formatted message with HTML line breaks */}
                {msg ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: formattedMsg }}
                    style={{ lineHeight: '2' }}
                  />
                ) : (
                  `لا يمكننا ببساطة أن نرسل لك كلمة المرور القديمة.
                  رابط فريد تم إنشاؤه لك. لإعادة تعيين كلمة المرور الخاصة بك، انقر على
                  الرابط التالي واتبع التعليمات.`
                )}
              </Text>

              {buttonLink && (
                <div key='buttonDiv' style={{ textAlign: 'center', marginTop: '1.75rem' }}>
                  <Link
                    href={buttonLink}
                    style={{
                      padding: '0.5rem 1.5rem',
                      borderRadius: '0.375rem',
                      backgroundColor: '#3b82f6',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      letterSpacing: '0.025rem',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s ease-in-out',
                      outline: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    target='_blank'
                  >
                    {buttonLabel ?? 'إعادة تعيين كلمة المرور'}
                  </Link>
                </div>
              )}

              {buttonLink && (
                <>
                  {/* <Text
                    key='buttonLink'
                    style={{ marginTop: '1rem', textAlign: 'right', color: '#9ca3af' }}
                  >
                    يمكنك أيضًا نسخ ولصق عنوان URL أدناه:
                    <br /> <br />
                    <strong>{buttonLink}</strong>
                  </Text> */}

                  <small
                    style={{
                      display: 'block',
                      marginTop: '2.5rem',
                      textAlign: 'center',
                      color: '#9ca3af',
                      fontSize: '0.625rem'
                    }}
                  >
                    إذا كنت تعتقد أن هذا البريد الالكتروني وصلك بالخطأ، أو أن هنالك مشكلة ما، يرجى
                    تجاهل هذا البريد من فضلك!
                  </small>
                </>
              )}
            </div>
          </Section>

          <Section key='section3' style={{ marginTop: '2rem' }}>
            <Text key='section3rights' style={{ textAlign: 'center', color: '#9ca3af' }}>
              {APP_TITLE}
              <br />
              جميع الحقوق محفوظة © {new Date().getFullYear()}
            </Text>

            <section className='flex items-center justify-center w-full h-12 rtl gap-x-20'>
              <Link
                aria-label='صفحتنا على الفيسبوك'
                className='transition opacity-60 hover:opacity-90 hover:-translate-y-1'
                href={APP_FB_URL}
                target='_blank'
              >
                <Facebook />
              </Link>
              <Link
                aria-label='حسابنا على التكتوك'
                className='transition opacity-60 hover:opacity-90 hover:-translate-y-1'
                href={APP_TIKTOK_URL}
                target='_blank'
              >
                <TikTok />
              </Link>
              <Link
                aria-label='صفحتنا على الانستغرام'
                className='transition opacity-60 hover:opacity-90 hover:-translate-y-1'
                href={APP_INSTAGRAM_URL}
                target='_blank'
              >
                <Instagram />
              </Link>
              <Link
                aria-label='حسابنا على تويتر'
                className='transition opacity-60 hover:opacity-90 hover:-translate-y-1'
                href={APP_TWITTER_URL}
                target='_blank'
              >
                <Twitter />
              </Link>
            </section>

            {buttonLink &&
              (buttonLink.includes('reset-password') || buttonLink.includes('activate')) && (
                <Text
                  key='note'
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    color: '#9ca3af'
                  }}
                >
                  <br />
                  <small>ملاحظة: هذا الرابط سيتنهي خلال ساعة واحدة</small>
                </Text>
              )}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
