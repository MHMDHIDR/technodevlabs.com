'use client'

import {
  IconArrowLeft,
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconArrowRight,
  IconBrowserCheck,
  IconListDetails,
  IconX
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image, { ImageProps } from 'next/image'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/custom/button'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import type { CarouselControlsProps, ProjectCardProps } from '@/types'
import type { JSX } from 'react'

export const CarouselContext = createContext<{
  onCardOpen: (index: number) => void
  currentIndex: number
}>({
  onCardOpen: () => {},
  currentIndex: 0
})

export const Carousel = ({
  items,
  initialScroll = 0,
  showEditButton
}: {
  items: JSX.Element[]
  initialScroll?: number
  showEditButton: boolean
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
        />

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
                showEditButton={showEditButton}
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
      aria-label='Scroll left'
    >
      <IconArrowNarrowLeft className='w-6 h-6 text-gray-500' />
    </button>
    <button
      className='flex relative z-40 justify-center items-center w-10 h-10 bg-gray-100 rounded-full disabled:opacity-50'
      onClick={scrollRight}
      disabled={!canScrollRight}
      aria-label='Scroll right'
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
          className='text-white text-xl md:text-2xl font-bold rtl:text-right rtl:rtl mt-2'
        >
          {card.title}
        </motion.h1>
      </div>
      <BlurImage
        src={card.src}
        alt={card.description}
        blurDataURL={card.images[0].blurDataURL}
        className='object-cover absolute inset-0 z-10'
        sizes='(max-width: 768px) 224px, 384px'
        priority={index === 0}
        fill
      />
    </motion.button>
  )
}

const ZoomedImage = ({
  src,
  alt,
  onClose,
  images
}: {
  src: string
  alt: string
  onClose: () => void
  images: { src: string; alt: string }[]
}) => {
  // Find the index of the initially clicked image
  const initialIndex = images.findIndex(image => image.src === src)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const goToPrevious = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      e.stopPropagation()
      setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
    },
    [images.length]
  )

  const goToNext = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      e.stopPropagation()
      setCurrentIndex(prevIndex => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
    },
    [images.length]
  )

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious(event)
      } else if (event.key === 'ArrowRight') {
        goToNext(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, goToNext, goToPrevious])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-[60] flex items-center justify-center bg-black/90'
      onClick={handleClick}
    >
      <motion.img
        key={images[currentIndex].src}
        initial={{ scale: 0.8, x: 50, opacity: 0 }}
        animate={{ scale: 1, x: 0, opacity: 1 }}
        exit={{ scale: 0.8, x: -50, opacity: 0 }}
        // "spring" | "tween"
        transition={{ type: 'tween', duration: 0.3 }}
        src={images[currentIndex].src}
        alt={images[currentIndex].alt ?? alt}
        className='max-h-[80vh] max-w-[80vw] object-contain rounded-md'
        onClick={e => e.stopPropagation()}
      />
      <button onClick={goToPrevious} className='absolute left-4 z-50'>
        <IconArrowLeft className='w-8 h-8 text-white dark:text-neutral-100 border rounded-full border-gray-400' />
      </button>
      <button onClick={goToNext} className='absolute right-4 z-50'>
        <IconArrowRight className='w-8 h-8 text-white dark:text-neutral-100 border rounded-full border-gray-400' />
      </button>
    </motion.div>
  )
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  blurDataURL,
  priority = false,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <Image
      className={cn('transition duration-300', isLoading ? 'blur-sm' : 'blur-0', className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding='async'
      blurDataURL={blurDataURL}
      placeholder='blur'
      alt={alt ? alt : 'Background of a beautiful view'}
      priority={priority}
      {...rest}
    />
  )
}

const ExpandedCard = ({
  card,
  onClose,
  layout,
  showEditButton
}: {
  card: ProjectCardProps
  onClose: () => void
  layout: boolean
  showEditButton: boolean
}) => {
  const projectsTranslations = useTranslations('projects')
  const containerRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !zoomedImage) {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, zoomedImage])

  useOutsideClick(containerRef, onClose)

  return (
    <div className='overflow-auto fixed inset-0 z-50 h-screen'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 w-full h-full backdrop-blur-lg bg-black/80 -z-[1]'
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        ref={containerRef}
        layoutId={layout ? `card-${card.title}` : undefined}
        className='z-50 p-2 mx-auto mt-20 max-w-5xl font-sans bg-white rounded-3xl dark:bg-neutral-900 h-fit md:p-6 pb-0'
      >
        <button
          className='flex sticky right-0 top-4 justify-center items-center ml-auto w-8 h-8 bg-black rounded-full dark:bg-white'
          onClick={onClose}
        >
          <IconX className='w-6 h-6 text-neutral-100 dark:text-neutral-900' />
        </button>
        <motion.div
          layoutId={layout ? `title-${card.title}` : undefined}
          className='flex gap-2 flex-col mt-2.5 text-lg font-semibold md:text-3xl'
        >
          <h1 className='text-sm md:text-3xl'>{card.title}</h1>
          <div className='flex gap-x-2'>
            <Link
              href={card.url}
              target='_blank'
              className='inline-flex gap-x-2 items-center px-4 py-1.5 text-sm bg-purple-50 rounded-full transition-colors w-fit dark:bg-purple-950 dark:hover:bg-purple-900 hover:bg-purple-200'
            >
              <IconBrowserCheck className='w-5 h-5 stroke-1 text-neutral-700 dark:text-white' />
              <span className='text-xxs md:text-xs whitespace-nowrap'>
                {projectsTranslations('viewProject')}
              </span>
            </Link>
            {/* <Link
              href={`/projects/${card.slug}`}
              className='inline-flex gap-x-2 items-center px-4 py-1.5 text-sm bg-purple-50 rounded-full transition-colors w-fit dark:bg-purple-950 dark:hover:bg-purple-900 hover:bg-purple-200'
            >
              <IconListDetails className='w-5 h-5 stroke-1 text-neutral-700 dark:text-white' />
              <span className='text-xxs md:text-xs whitespace-nowrap'>
                {projectsTranslations('moreDetails')}
              </span>
            </Link> */}
            {showEditButton && (
              <Link
                href={`/dashboard/projects/${card.id}`}
                className='inline-flex gap-x-2 items-center px-4 py-1.5 text-sm bg-purple-50 rounded-full transition-colors w-fit dark:bg-purple-950 dark:hover:bg-purple-900 hover:bg-purple-200'
              >
                <IconBrowserCheck className='w-5 h-5 stroke-1 text-neutral-700 dark:text-white' />
                <span className='text-xxs md:text-xs whitespace-nowrap'>
                  {projectsTranslations('editProject')}
                </span>
              </Link>
            )}
          </div>
        </motion.div>
        <div className='py-10 leading-loose text-justify'>{card.description}</div>
        <div className='grid grid-cols-1 gap-3 gap-y-6 md:grid-cols-3 xl:grid-cols-4'>
          {/* Slice out the first one beacuse it's the main image on the carousel card */}
          {card.images.slice(1).map((image, index) => (
            <Image
              key={`${card.title}-image-${index}`}
              className='object-cover rounded-3xl shadow-md aspect-square dark:shadow-neutral-200 cursor-zoom-in'
              src={image.src}
              alt={card.description}
              width={400}
              height={400}
              placeholder='blur'
              blurDataURL={image.blurDataURL}
              loading='lazy'
              onClick={() => setZoomedImage({ src: image.src, alt: card.description })}
            />
          ))}
        </div>

        <AnimatePresence>
          {zoomedImage && (
            <ZoomedImage
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              onClose={() => setZoomedImage(null)}
              images={card.images
                .slice(1)
                .map(image => ({ src: image.src, alt: card.description }))}
            />
          )}
        </AnimatePresence>

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
