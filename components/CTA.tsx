'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pronto a iniziare?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-3xl mx-auto">
            Scegli il piano più adatto a te o contattaci per una soluzione personalizzata.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-md bg-background px-6 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-background/90"
            >
              Vedi i piani
            </Link>
            <Link
              href="/contact"
              className="rounded-md bg-primary-foreground/10 px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-foreground/20"
            >
              Contattaci
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 