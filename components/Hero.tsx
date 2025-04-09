'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Intelligenza Artificiale
            <span className="text-primary"> su misura</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            Crea il tuo sito o la tua app AI personalizzata. O usa le nostre mini-app già pronte!
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Inizia ora
            </Link>
            <Link
              href="/custom-project"
              className="rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/90"
            >
              Progetto personalizzato
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 