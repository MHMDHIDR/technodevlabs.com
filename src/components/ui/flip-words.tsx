'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Helper function to detect if a word contains Arabic characters
const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text)

export function FlipWords({
  className,
  duration = 3000,
  words
}: {
  words: Array<string>
  duration?: number
  className?: string
}) {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (!isAnimating) {
      setTimeout(() => {
        startAnimation()
      }, duration)
    }
  }, [isAnimating, duration, startAnimation])

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false)
      }}
    >
      <motion.div
        key={currentWord}
        animate={{
          opacity: 1,
          y: 0
        }}
        className={cn(
          'z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2',
          className,
          isArabic(currentWord) ? 'rtl' : '' // Add a class for RTL if Arabic
        )}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: 'blur(8px)',
          scale: 2,
          position: 'absolute'
        }}
        initial={{
          opacity: 0,
          y: 10
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10
        }}
      >
        {currentWord.split(' ').map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className={cn('inline-block whitespace-nowrap', isArabic(word) ? 'rtl' : '')}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3
            }}
          >
            {!isArabic(word) ? (
              // English word: animate each letter
              word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  className='inline-block text-transparent bg-gradient-to-br from-purple-900 to-purple-400 bg-clip-text'
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                  transition={{
                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                    duration: 0.2
                  }}
                >
                  {letter}
                </motion.span>
              ))
            ) : (
              // Arabic word: animate the whole word without splitting
              <motion.span
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                className='inline-block text-transparent bg-gradient-to-br from-purple-900 to-purple-400 bg-clip-text'
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                transition={{
                  delay: wordIndex * 0.3,
                  duration: 0.5
                }}
              >
                {word}
              </motion.span>
            )}
            <span className='inline-block'>&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
