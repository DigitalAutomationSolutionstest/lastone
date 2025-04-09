'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function MiniAppsOverview() {
  return (
    <section className="py-20 bg-muted/30 text-center">
      <motion.h2 
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Le nostre Mini AI App
      </motion.h2>
      <motion.p 
        className="text-muted-foreground mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Ogni app è progettata per un compito specifico: velocità, semplicità e risultati concreti.
      </motion.p>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {[
          ['📝 Generatore Testi', 'Scrivi post, descrizioni, contenuti in 1 click'],
          ['🎤 Trascrizione Audio', 'Converti audio o video in testo automaticamente'],
          ['📊 Riassunto Documenti', 'Rendi i testi lunghi più leggibili in un attimo'],
          ['📌 Parole Chiave', 'Estrai i concetti principali da qualsiasi testo'],
          ['🧠 Chatbot AI', 'Crea un assistente AI addestrato su tuoi dati']
        ].map(([title, desc], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 text-left hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 