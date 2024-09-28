import Layout from '@/components/custom/layout'
import { Cover } from '@/components/ui/cover'

export default function PostsPage() {
  // return a list of posts
  const posts = [
    {
      title: 'Post 1',
      content: 'This is the content of post 1.'
    },
    {
      title: 'Post 2',
      content: 'This is the content of post 2.'
    },
    {
      title: 'Post 3',
      content: 'This is the content of post 3.'
    }
  ]

  return (
    <Layout className={`p-4 py-20`}>
      <h1 className='relative z-20 py-6 mx-auto mt-6 text-4xl font-semibold text-center text-transparent max-w-7xl bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Posts</Cover>
      </h1>

      {posts.map(post => (
        <div key={post.title}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </Layout>
  )
}
