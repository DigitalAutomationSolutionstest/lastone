'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

export default function LiveDemo() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    // Simulazione chiamata API
    setTimeout(() => {
      setOutput(`Parole chiave: ${input.split(' ').slice(0, 5).join(', ')}`)
      setLoading(false)
    }, 1200)
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Prova una Mini AI App 🔥
        </motion.h2>
        <p className="text-muted-foreground">
          Inserisci un testo qualsiasi. La nostra demo AI estrarrà le parole chiave principali.
        </p>

        <Card className="p-6 space-y-4 text-left">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Scrivi un paragrafo..."
            rows={4}
          />
          <div className="flex justify-between items-center">
            <Button onClick={handleGenerate} disabled={loading || !input}>
              {loading ? 'Generazione...' : 'Estrai parole chiave'}
            </Button>
            {output && (
              <p className="text-sm text-muted-foreground">
                {output}
              </p>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
} 