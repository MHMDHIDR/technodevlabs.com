import { Block } from '@/components/custom/block'
import { getPosts } from '@/data/posts'
import { getProjects } from '@/data/projects'
import { IconBook, IconCode } from '@tabler/icons-react'

export default async function DashboardPage() {
  const { postsCount } = await getPosts()
  const { projectsCount } = await getProjects()

  return (
    <main className='container'>
      <div className='w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        <Block
          href={!postsCount ? '/dashboard/posts/add' : '/dashboard/posts'}
          blockLabel='Posts'
          blockDescription={`View ${postsCount} posts on our blog.`}
          blockIcon={<IconBook />}
        >
          <strong className='w-6 h-6 bg-primary/20 rounded-full inline-flex items-center justify-center mr-3 text-lg font-bold text-primary'>
            {postsCount}
          </strong>
          View Posts
        </Block>

        <Block
          href={!projectsCount ? '/dashboard/projects/add' : '/dashboard/projects'}
          blockLabel='Projects'
          blockDescription={`View ${projectsCount} from our latest projects.`}
          blockIcon={<IconCode />}
        >
          <strong className='w-6 h-6 bg-primary/20 rounded-full inline-flex items-center justify-center mr-3 text-lg font-bold text-primary'>
            {projectsCount}
          </strong>
          View Projects
        </Block>
      </div>
    </main>
  )
}
