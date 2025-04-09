'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'AI Writer',
    description: 'Genera contenuti di alta qualità per il tuo business',
    icon: '✍️',
  },
  {
    title: 'Image Generator',
    description: 'Crea immagini uniche con l\'intelligenza artificiale',
    icon: '🎨',
  },
  {
    title: 'Audio Synthesis',
    description: 'Trasforma il testo in audio naturale',
    icon: '🎵',
  },
  {
    title: 'Code Assistant',
    description: 'Ottieni aiuto nella programmazione',
    icon: '💻',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Le nostre Mini AI Apps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluzioni pronte all'uso per le tue esigenze
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 bg-background rounded-lg shadow-sm"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 