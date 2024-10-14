import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/custom/button'
import { getProjects } from '@/data/projects'
import { Carousel, Card as ProjectCard } from '@/components/ui/cards-carousel'
import type { ProjectCardProps } from '@/types'

export async function ProjectsSection({ pathname }: { pathname?: string }) {
  const projectsTranslations = await getTranslations('projects')
  const projectsData = await getProjects()
  let projects = projectsData.projects
  const projectsCount = projectsData.projectsCount

  // Only get the first 5 projects for the '/' homepage
  projects = pathname === '/' && projectsCount > 5 ? projects.slice(0, 5) : projects

  const projectCards = projects.map((project, index) => {
    const projectCard: ProjectCardProps = {
      src: project.images[0],
      title: project.title,
      description: project.description,
      url: project.url,
      images: project.images
    }

    return <ProjectCard key={project.id} card={projectCard} index={index} layout={true} />
  })

  return projects && projectsCount !== 0 ? (
    <div className='container max-w-5xl rtl:ltr'>
      <Carousel items={projectCards} />

      {pathname === '/' ? (
        <Link className='flex justify-center mt-10' href='/projects'>
          <Button className='rounded-full' withArrow>
            {projectsTranslations('exploreMoreCTA')}
          </Button>
        </Link>
      ) : null}
    </div>
  ) : null
}
