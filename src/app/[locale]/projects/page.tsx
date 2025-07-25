import { getTranslations } from 'next-intl/server'
import { auth } from '@/auth'
import { AddButton } from '@/components/custom/add-button'
import EmptyState from '@/components/custom/empty-state'
import Layout from '@/components/custom/layout'
import { SecondaryHeading } from '@/components/ui/cover'
import { APP_DESCRIPTION, APP_LOGO_opengraph, APP_TITLE } from '@/data/constants'
import { getProjects } from '@/data/projects'
import { getSettings } from '@/data/settings'
import { clsx } from '@/lib/utils'
import { ProjectsSection } from './projects-section'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const image = APP_LOGO_opengraph
  const projectsTranslations = await getTranslations('projects')
  const title = `${projectsTranslations('pageTitle')} | ${APP_TITLE}`
  const description = APP_DESCRIPTION

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

async function fetchPageData() {
  const [settings, projectsTranslations, projectsData, session] = await Promise.all([
    getSettings(),
    getTranslations('projects'),
    getProjects(),
    auth()
  ])

  return {
    settings: settings || { layout: 'grid' },
    projectsTranslations,
    projectsCount: projectsData.projectsCount,
    user: session?.user || null
  }
}

export default async function ProjectsPage() {
  const { settings, projectsTranslations, projectsCount, user } = await fetchPageData()

  return (
    <Layout>
      <div
        className={`h-fit p-4 py-20 w-full dark:bg-black bg-white relative ${clsx({
          'dark:bg-grid-white/[0.2] bg-grid-black/[0.2]': settings.layout === 'grid',
          'dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2]':
            settings.layout === 'grid-small',
          'dark:bg-dot-white/[0.2] bg-dot-black/[0.2]': settings.layout === 'dotted'
        })}`}
      >
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]' />

        <h1 className='relative z-20 py-6 mx-auto mt-6 max-w-7xl text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          <SecondaryHeading>{projectsTranslations('pageTitle')}</SecondaryHeading>
        </h1>

        {user ? (
          <div className='mb-6 ml-auto w-fit rtl:ml-0'>
            <AddButton href='/dashboard/projects/add'>
              {projectsTranslations('addProject')}
            </AddButton>
          </div>
        ) : null}

        {projectsCount === 0 ? (
          <EmptyState>
            {user ? (
              <AddButton href='/dashboard/projects/add'>
                {projectsTranslations('addProject')}
              </AddButton>
            ) : null}
            <p className='mt-4 text-lg text-gray-500 dark:text-gray-400'>
              {projectsTranslations('noProjects')}
            </p>
          </EmptyState>
        ) : (
          <ProjectsSection />
        )}
      </div>
    </Layout>
  )
}
