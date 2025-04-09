'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TabsModernProps {
  tabs: {
    id: string
    label: string
    icon?: React.ReactNode
  }[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export function TabsModern({
  tabs,
  activeTab,
  onChange,
  className
}: TabsModernProps) {
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab)
  
  return (
    <div className={cn('relative', className)}>
      <div className="flex space-x-1 rounded-lg bg-muted p-1">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative z-10 flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      
      <motion.div
        className="absolute top-1 left-1 h-[calc(100%-8px)] rounded-md bg-primary"
        initial={false}
        animate={{
          width: `calc(${100 / tabs.length}% - 8px)`,
          x: `calc(${activeTabIndex * 100}% + ${activeTabIndex * 8}px)`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  )
} 