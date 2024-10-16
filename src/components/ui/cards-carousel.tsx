'use client'

import { Button } from '@/components/custom/button'
import { ITEMS_COUNT } from '@/data/constants'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { CarouselControlsProps, ProjectCardProps } from '@/types'
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconBrowserCheck,
  IconX
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image, { ImageProps } from 'next/image'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const CarouselContext = createContext<{
  onCardOpen: (index: number) => void
  currentIndex: number
}>({
  onCardOpen: () => {},
  currentIndex: 0
})

export const Carousel = ({
  items,
  initialScroll = 0
}: {
  items: JSX.Element[]
  initialScroll?: number
}) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, _setCurrentIndex] = useState(0)
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll
      checkScrollability()
    }
  }, [initialScroll])

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      const width = scrollWidth - clientWidth
      setCanScrollLeft(scrollLeft > 0)

      setCanScrollRight(scrollLeft < width - 1)
    }
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const handleCardOpen = (index: number) => {
    setOpenCardIndex(index)
  }

  /**
   * @description The following code is used to scroll to the next card when the current card is closed
   * @author  Mohmmaed Haydar Comment
   */
  const handleCardClose = () => {
    setOpenCardIndex(null)
  }

  const PROJECT_CARDS_COUNT = 2

  return (
    <CarouselContext.Provider value={{ onCardOpen: handleCardOpen, currentIndex }}>
      {items.length > PROJECT_CARDS_COUNT && (
        <CarouselControls
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
        />
      )}

      <div
        className='flex w-full overflow-x-scroll overscroll-x-auto py-3.5 scroll-smooth [scrollbar-width:none] rtl:ltr'
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn('absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l')}
        ></div>

        <div className={cn('flex flex-row gap-4 justify-start pl-4', 'mx-auto max-w-7xl')}>
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 * index, ease: 'easeOut', once: true }
              }}
              key={`card-${index}`}
              className='last:pr-[5%] md:last:pr-[33%] rounded-3xl'
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      {items.length > PROJECT_CARDS_COUNT && (
        <CarouselControls
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
        />
      )}

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {openCardIndex !== null && (
              <ExpandedCard
                card={(items[openCardIndex].props as any).card}
                onClose={handleCardClose}
                layout={true}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </CarouselContext.Provider>
  )
}

const CarouselControls = ({
  canScrollLeft,
  canScrollRight,
  scrollLeft,
  scrollRight
}: CarouselControlsProps) => (
  <div className='flex gap-x-3' dir='ltr'>
    <button
      className='flex relative z-40 justify-center items-center w-10 h-10 bg-gray-100 rounded-full disabled:opacity-50'
      onClick={scrollLeft}
      disabled={!canScrollLeft}
    >
      <IconArrowNarrowLeft className='w-6 h-6 text-gray-500' />
    </button>
    <button
      className='flex relative z-40 justify-center items-center w-10 h-10 bg-gray-100 rounded-full disabled:opacity-50'
      onClick={scrollRight}
      disabled={!canScrollRight}
    >
      <IconArrowNarrowRight className='w-6 h-6 text-gray-500' />
    </button>
  </div>
)

export const Card = ({
  card,
  index,
  layout = false
}: {
  card: ProjectCardProps
  index: number
  layout?: boolean
}) => {
  const { onCardOpen } = useContext(CarouselContext)

  const handleOpen = () => {
    onCardOpen(index)
  }

  return (
    <motion.button
      layoutId={layout ? `card-${card.title}` : undefined}
      onClick={handleOpen}
      className='rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 border border-gray-300 dark:border-neutral-700'
    >
      <div className='absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b via-transparent to-transparent pointer-events-none from-black/50' />
      <div className='relative z-40 p-4 px-6 w-full'>
        <motion.h1
          layoutId={layout ? `title-${card.title}` : undefined}
          className='text-white text-xl md:text-2xl font-bold rtl:text-right mt-2'
        >
          {card.title}
        </motion.h1>
      </div>
      <BlurImage
        src={card.src}
        alt={card.title}
        fill
        className='object-cover absolute inset-0 z-10'
      />
    </motion.button>
  )
}

const ExpandedCard = ({
  card,
  onClose,
  layout
}: {
  card: ProjectCardProps
  onClose: () => void
  layout: boolean
}) => {
  const projectsTranslations = useTranslations('projects')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  useOutsideClick(containerRef, onClose)

  return (
    <div className='overflow-auto fixed inset-0 z-50 h-screen'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 w-full h-full backdrop-blur-lg bg-black/80'
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={containerRef}
        layoutId={layout ? `card-${card.title}` : undefined}
        className='z-50 p-4 mx-auto mt-20 max-w-5xl font-sans bg-white rounded-3xl dark:bg-neutral-900 h-fit md:p-10'
      >
        <button
          className='flex sticky right-0 top-4 justify-center items-center ml-auto w-8 h-8 bg-black rounded-full dark:bg-white'
          onClick={onClose}
        >
          <IconX className='w-6 h-6 text-neutral-100 dark:text-neutral-900' />
        </button>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className='inline-flex gap-x-2 items-center mt-4 text-lg font-semibold md:text-3xl'
        >
          <h1 className='text-sm md:text-3xl'>{card.title}</h1>
          {/* View Project Button */}
          <Link
            href={card.url}
            target='_blank'
            className='inline-flex gap-x-2 items-center px-4 py-1.5 text-sm bg-purple-50 rounded-full transition-colors w-fit dark:bg-purple-950 dark:hover:bg-purple-900 hover:bg-purple-200'
          >
            <IconBrowserCheck className='w-6 h-6 stroke-1 text-neutral-700 dark:text-white' />
            <span className='text-xxs md:text-sm'>{projectsTranslations('viewProject')}</span>
          </Link>
        </motion.p>
        <div className='py-10 leading-loose text-justify'>{card.description}</div>
        <div className='grid grid-cols-1 gap-2 gap-y-6 md:grid-cols-2'>
          {/* Slice out the first one beacuse it's the main image on the carousel card */}
          {card.images.slice(1).map((image, index) => (
            <Image
              key={`${card.title}-image-${index}`}
              className='object-cover rounded-3xl shadow-md aspect-square dark:shadow-neutral-200'
              src={image.src}
              alt={card.description}
              width={400}
              height={400}
              placeholder='blur'
              blurDataURL={image.blurDataURL}
              loading='lazy'
            />
          ))}
        </div>
        {/* CTA Contact Us  */}
        <div className='flex flex-col gap-4 justify-center items-center my-10'>
          <p className='text-lg font-bold text-center select-none'>
            {projectsTranslations('CATParagraph', { projectName: card.title })}
          </p>

          <Link className='flex justify-center mt-2' href='/contact'>
            <Button className='rounded-full' withArrow>
              {projectsTranslations('contactUsCTA')}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <Image
      className={cn('transition duration-300', isLoading ? 'blur-sm' : 'blur-0', className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading='lazy'
      decoding='async'
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt ? alt : 'Background of a beautiful view'}
      {...rest}
    />
  )
}
