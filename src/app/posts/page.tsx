import Layout from '@/app/components/layout'
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
    <Layout className={`p-10`}>
      <h1 className='text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
        <Cover>Blog Posts</Cover>
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
