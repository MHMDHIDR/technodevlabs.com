import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getProjectBySlugAction } from '@/actions/projects/get-project-by-slug'
import Layout from '@/components/custom/layout'
import { ProjectDetail } from '@/components/custom/project-detail'
import { SecondaryHeading } from '@/components/ui/cover'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { getProjects } from '@/data/projects'
import { createSlug } from '@/lib/create-slug'
import type { Locale } from '@/i18n/request'

type ProjectPageProps = {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const [project, projectsTranslations] = await Promise.all([
    getProjectBySlugAction(resolvedParams.slug),
    getTranslations('projects')
  ])

  if (!project) {
    return {
      title: `${projectsTranslations('noProjects')} | ${APP_TITLE}`,
      description: APP_DESCRIPTION
    }
  }

  const title = `${project.title} | ${APP_TITLE}`
  const description = project.description
  const image = project.images[0]?.src || APP_LOGO_opengraph

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  }
}

export async function generateStaticParams() {
  const { projects } = await getProjects()

  return projects.map(project => ({
    slug: project.slug || createSlug(project.title)
  }))
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  const project = await getProjectBySlugAction(resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return (
    <Layout>
      <div className='container max-w-5xl py-20'>
        <h1 className='relative z-20 py-6 mx-auto mt-6 text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          <SecondaryHeading>
            {resolvedParams.locale === 'ar' ? project.titleAr : project.title}
          </SecondaryHeading>
        </h1>

        <ProjectDetail project={project} locale={resolvedParams.locale} />
      </div>
    </Layout>
  )
}
