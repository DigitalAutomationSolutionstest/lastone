'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, projectType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Errore nell\'invio della richiesta')
      }

      toast.success('Richiesta inviata con successo! Ti contatteremo presto.')
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        description: ''
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Errore nell\'invio della richiesta')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Richiedi il tuo progetto personalizzato</h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Compila il form sottostante per richiedere un preventivo per il tuo progetto. Ti risponderemo entro 24 ore.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome completo *</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Il tuo nome"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email *</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="La tua email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">Azienda</label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nome azienda (opzionale)"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="projectType" className="text-sm font-medium">Tipo di progetto *</label>
              <Select value={formData.projectType} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona il tipo di progetto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Sito Web</SelectItem>
                  <SelectItem value="app">Applicazione Mobile</SelectItem>
                  <SelectItem value="ai">Mini AI App</SelectItem>
                  <SelectItem value="other">Altro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Descrizione del progetto *</label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Descrivi il tuo progetto in dettaglio..."
              className="min-h-[150px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Invio in corso...' : 'Invia richiesta'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
} 