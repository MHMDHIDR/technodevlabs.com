'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export const PrimaryHeading = ({
  duration = 0,
  className,
  children
}: {
  duration?: number
  className?: string
  children: string
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' })

  useEffect(() => {
    const updateMaskPosition = () => {
      if (svgRef.current && cursor.x !== null && cursor.y !== null) {
        const svgRect = svgRef.current.getBoundingClientRect()
        const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
        const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
        setMaskPosition({
          cx: `${cxPercentage}%`,
          cy: `${cyPercentage}%`
        })
      }
    }

    updateMaskPosition()
  }, [cursor])

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }

  return (
    <svg
      ref={svgRef}
      viewBox='0 0 500 50'
      xmlns='http://www.w3.org/2000/svg'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setMaskPosition({ cx: '50%', cy: '50%' })
      }}
      onMouseMove={handleMouseMove}
      className={cn('select-none', className)}
    >
      <defs>
        <linearGradient
          id='textGradient'
          gradientUnits='userSpaceOnUse'
          x1='0%'
          y1='0%'
          x2='100%'
          y2='0%'
        >
          {hovered && (
            <>
              <stop offset='0%' stopColor={'var(--yellow-500)'} />
              <stop offset='25%' stopColor={'var(--red-500)'} />
              <stop offset='50%' stopColor={'var(--blue-500)'} />
              <stop offset='75%' stopColor={'var(--cyan-500)'} />
              <stop offset='100%' stopColor={'var(--violet-500)'} />
            </>
          )}
        </linearGradient>

        <radialGradient
          id='revealMask'
          gradientUnits='userSpaceOnUse'
          cx={maskPosition.cx}
          cy={maskPosition.cy}
          r='20%'
        >
          <stop offset='0%' stopColor='white' />
          <stop offset='100%' stopColor='black' />
        </radialGradient>
        <mask id='textMask'>
          <rect x='0' y='0' width='100%' height='100%' fill='url(#revealMask)' />
        </mask>
      </defs>
      <text
        x='50%'
        y='50%'
        textAnchor='middle'
        dominantBaseline='middle'
        strokeWidth='0.3'
        className='font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-3xl'
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {children}
      </text>
      <motion.text
        x='50%'
        y='50%'
        textAnchor='middle'
        dominantBaseline='middle'
        strokeWidth='0.3'
        className='font-[helvetica] font-bold fill-transparent text-3xl stroke-neutral-400'
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.text>
      <text
        x='50%'
        y='50%'
        textAnchor='middle'
        dominantBaseline='middle'
        stroke='url(#textGradient)'
        strokeWidth='0.3'
        mask='url(#textMask)'
        className='font-[helvetica] font-bold fill-transparent text-3xl'
      >
        {children}
      </text>
    </svg>
  )
}
