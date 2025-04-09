'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { cn } from '@/lib/utils'

interface CardHoverProps {
  title: string
  description?: string
  image?: string
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  badge?: string
  badgeColor?: string
}

export function CardHover({
  title,
  description,
  image,
  icon,
  onClick,
  className,
  children,
  badge,
  badgeColor = 'bg-primary'
}: CardHoverProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn('group relative overflow-hidden rounded-xl', className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      
      <Card className={cn(
        'h-full border-0 shadow-md transition-all duration-300',
        isHovered ? 'shadow-xl' : 'shadow-md',
        image ? 'absolute bottom-0 left-0 right-0 m-0 rounded-t-none' : ''
      )}>
        <div className="p-4">
          {badge && (
            <span className={cn(
              'inline-block px-2 py-1 text-xs font-medium rounded-full mb-2',
              badgeColor
            )}>
              {badge}
            </span>
          )}
          
          <div className="flex items-start gap-3">
            {icon && !image && (
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              {description && (
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {children && <div className="mt-4">{children}</div>}
        </div>
      </Card>
    </motion.div>
  )
} 