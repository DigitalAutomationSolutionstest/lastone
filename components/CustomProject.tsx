'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CustomProject() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Costruiamo il tuo progetto
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Hai un'idea specifica? Creiamo insieme la tua soluzione AI personalizzata.
            Dal concept alla realizzazione, ti guidiamo passo dopo passo.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Parlaci del tuo progetto
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 