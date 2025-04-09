'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="py-24 bg-background text-center">
      <motion.h2 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Cosa dicono i nostri clienti
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {[
          {
            quote: "Con Mini Ai App ho creato una landing AI-ready in poche ore. Pazzesco!",
            name: "Luca B., Founder di Startix"
          },
          {
            quote: "L'integrazione del nostro chatbot è stata veloce e super efficiente.",
            name: "Francesca P., Marketing @ FinMind"
          },
          {
            quote: "Non pensavo di poter automatizzare così tanto. Ho risparmiato settimane!",
            name: "Andrea C., Sviluppatore Freelance"
          }
        ].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 text-left shadow-sm hover:shadow-md transition">
              <p className="italic text-muted-foreground">"{t.quote}"</p>
              <p className="mt-4 font-semibold">{t.name}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 