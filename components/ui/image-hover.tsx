'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Eye, ExternalLink } from 'lucide-react'

interface ImageHoverProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  onClick?: () => void
  showOverlay?: boolean
  overlayContent?: React.ReactNode
  linkTo?: string
}

export function ImageHover({
  src,
  alt,
  width,
  height,
  className,
  onClick,
  showOverlay = true,
  overlayContent,
  linkTo
}: ImageHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (linkTo) {
      window.open(linkTo, '_blank')
    }
  }
  
  return (
    <motion.div
      className={cn('group relative overflow-hidden rounded-lg', className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ width, height }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {showOverlay && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {overlayContent || (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{alt}</span>
                <div className="flex space-x-2">
                  <Eye className="h-4 w-4" />
                  {linkTo && <ExternalLink className="h-4 w-4" />}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
} 