import { getLocale, getTranslations } from 'next-intl/server'
import { Button } from '@/components/custom/button'
import { Carousel, Card as ProjectCard } from '@/components/ui/cards-carousel'
import { APP_LOGO_opengraph } from '@/data/constants'
import { getProjects } from '@/data/projects'
import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import type { ProjectCardProps } from '@/types'
import type { User } from 'next-auth'

export async function ProjectsSection({
  pathname,
  user
}: {
  pathname?: string
  user?: User | null
}) {
  const projectsTranslations = await getTranslations('projects')
  const currentLocale = (await getLocale()) as Locale
  const projectsData = await getProjects()
  let projects = projectsData.projects
  const projectsCount = projectsData.projectsCount

  // Only get the first 5 projects for the '/' homepage
  projects = pathname === '/' && projectsCount > 5 ? projects.slice(0, 5) : projects

  const projectCards = projects.map((project, index) => {
    const projectImage = project.images[0] ? project.images[0].src : APP_LOGO_opengraph
    const projectCard: ProjectCardProps = {
      id: project.id,
      src: projectImage,
      title: currentLocale === 'ar' ? project.titleAr : project.title,
      description: currentLocale === 'ar' ? project.descriptionAr : project.description,
      url: project.url,
      images: project.images
    }

    return <ProjectCard key={project.id} card={projectCard} index={index} layout={true} />
  })

  return projects && projectsCount !== 0 ? (
    <div className='container max-w-5xl'>
      <Carousel items={projectCards} showEditButton={!!user} />

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
