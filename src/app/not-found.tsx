import Link from 'next/link'
import Layout from '@/components/custom/layout'
import { Paper, Book, Chat, NotFoundIcon } from '@/components/custom/icons'
import { Button } from '@/components/custom/button'
import { Block } from '@/components/custom/block'

export default function NotFound() {
  return (
    <Layout className={`p-4 py-20`}>
      <div className='container flex items-center justify-center min-h-screen px-6 py-12 mx-auto'>
        <div className='w-full '>
          <div className='flex flex-col items-center max-w-lg mx-auto text-center'>
            <NotFoundIcon />

            <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
              We lost this page
            </h1>
            <p className='mt-4 text-gray-500 dark:text-gray-400'>
              We searched high and low, but couldn&apos;t find what you&apos;re looking
              for. Let&apos;s find a better place for you to go.
            </p>

            <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
              <Link href={`/`}>
                <Button withArrow type='button'>
                  Home
                </Button>
              </Link>
            </div>
          </div>

          <div className='grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 lg:grid-cols-3'>
            <Block
              href='/portfolio'
              blockLabel='Portfolio'
              blockDescription='Dive into our portfolio to see our latest projects.'
              blockIcon={<Paper />}
            ></Block>

            <Block
              href='/posts'
              blockLabel='Our Blog'
              blockDescription='Read the latest posts on our blog.'
              blockIcon={<Book />}
            >
              Read the latest posts
            </Block>

            <Block
              href='/contact'
              blockLabel='Chat to Us'
              blockDescription='Can’t find what you’re looking for? Chat to our team.'
              blockIcon={<Chat />}
            >
              Chat to our team
            </Block>
          </div>
        </div>
      </div>
    </Layout>
  )
}