'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/custom/button'
import { Link } from '@/i18n/routing'
import type { Locale } from '@/i18n/request'
import type { ProjectWithBlur } from '@/types'

type ProjectDetailProps = {
  project: ProjectWithBlur
  locale: Locale
}

export function ProjectDetail({ project, locale }: ProjectDetailProps) {
  return (
    <div className='space-y-8'>
      {/* Project Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='prose dark:prose-invert max-w-none'
      >
        <p className='text-lg leading-relaxed text-justify'>
          {locale === 'ar' ? project.descriptionAr : project.description}
        </p>
      </motion.div>

      {/* Project Images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
      >
        {project.images.map((image, index) => (
          <div
            key={`${project.id}-image-${index}`}
            className='relative aspect-square overflow-hidden rounded-lg'
          >
            <Image
              src={image.src}
              alt={locale === 'ar' ? project.titleAr : project.title}
              className='object-cover transition-transform hover:scale-105'
              placeholder='blur'
              blurDataURL={image.blurDataURL}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        ))}
      </motion.div>

      {/* Project Link */}
      {project.url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex justify-center'
        >
          <Link href={project.url} target='_blank' rel='noopener noreferrer'>
            <Button className='rounded-full' withArrow>
              {locale === 'ar' ? 'عرض المشروع' : 'View Project'}
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
