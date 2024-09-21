'use client'

import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set the target start date and time (22-09-2024 00:00:00)
    const startDate = new Date('2024-09-22T00:00:00')

    // Add 21 days to the start date to get the countdown target date
    const targetDate = new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000)

    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className='flex items-center justify-center min-h-screen bg-center bg-cover'
      style={{ backgroundImage: "url('/images/logo.png')" }}
    >
      <div className='max-w-4xl p-6 mx-auto text-center bg-black rounded-lg bg-opacity-70'>
        <h1 className='mb-4 text-4xl font-bold text-white md:text-6xl'>Coming Soon</h1>
        <p className='mb-8 text-xl text-gray-300'>
          <strong>
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </strong>
          <br />
          <strong className='inline-block mt-3 text-2xl'>
            !نعمل على قدم وساق لتقديم شيء مذهل لك. ترقبوا
          </strong>
        </p>

        <div className='flex justify-center mb-8 select-none space-x-4'>
          <div className='text-center'>
            <span className='text-4xl font-bold text-white'>
              {timeLeft.days !== 0 ? (
                timeLeft.days
              ) : (
                <Skeleton className='w-10 h-10 dark:bg-gray-100' />
              )}
            </span>
            <p className='text-sm text-gray-400'>Days</p>
          </div>
          <div className='text-center'>
            <span className='text-4xl font-bold text-white'>
              {timeLeft.hours !== 0 ? (
                timeLeft.hours
              ) : (
                <Skeleton className='w-10 h-10 dark:bg-gray-100' />
              )}
            </span>
            <p className='text-sm text-gray-400'>Hours</p>
          </div>
          <div className='text-center'>
            <span className='text-4xl font-bold text-white'>
              {timeLeft.minutes !== 0 ? (
                timeLeft.minutes
              ) : (
                <Skeleton className='w-10 h-10 dark:bg-gray-100' />
              )}
            </span>
            <p className='text-sm text-gray-400'>Minutes</p>
          </div>
          <div className='text-center'>
            <span className='text-4xl font-bold text-white'>
              {timeLeft.seconds !== 0 ? (
                timeLeft.seconds
              ) : (
                <Skeleton className='w-10 h-10 dark:bg-gray-100' />
              )}
            </span>
            <p className='text-sm text-gray-400'>Seconds</p>
          </div>
        </div>
      </div>
    </div>
  )
}
