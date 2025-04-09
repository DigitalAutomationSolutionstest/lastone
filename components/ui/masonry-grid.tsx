'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MasonryGridProps {
  children: React.ReactNode
  columns?: number
  gap?: number
  className?: string
}

export function MasonryGrid({
  children,
  columns = 3,
  gap = 16,
  className = ''
}: MasonryGridProps) {
  const [columnHeights, setColumnHeights] = useState<number[]>([])
  const [items, setItems] = useState<React.ReactNode[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (Array.isArray(children)) {
      setItems(children)
    } else {
      setItems([children])
    }
  }, [children])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const columnWidth = (containerWidth - (gap * (columns - 1))) / columns
        
        // Calculate heights for each column
        const heights = Array(columns).fill(0)
        setColumnHeights(heights)
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [columns, gap, mounted])

  // For mobile, use a simple grid
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 gap-${gap} ${className}`}
        ref={containerRef}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    )
  }

  // For desktop, use masonry layout
  return (
    <div 
      className={`flex gap-${gap} ${className}`}
      ref={containerRef}
      style={{ 
        display: 'flex',
        gap: `${gap}px`
      }}
    >
      {Array.from({ length: columns }).map((_, columnIndex) => (
        <div 
          key={columnIndex}
          className="flex flex-col gap-4"
          style={{ 
            width: `calc(${100 / columns}% - ${(gap * (columns - 1)) / columns}px)`,
            gap: `${gap}px`
          }}
        >
          {items
            .filter((_, itemIndex) => itemIndex % columns === columnIndex)
            .map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index * columns + columnIndex) * 0.05, duration: 0.3 }}
              >
                {item}
              </motion.div>
            ))}
        </div>
      ))}
    </div>
  )
} 