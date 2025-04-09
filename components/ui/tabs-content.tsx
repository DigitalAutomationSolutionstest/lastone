'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TabsModern } from './tabs-modern'

interface TabContent {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface TabsContentProps {
  tabs: TabContent[]
  defaultTab?: string
  className?: string
}

export function TabsContent({
  tabs,
  defaultTab,
  className
}: TabsContentProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)
  
  return (
    <div className={className}>
      <TabsModern
        tabs={tabs.map(tab => ({ id: tab.id, label: tab.label, icon: tab.icon }))}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tabs.find(tab => tab.id === activeTab)?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 