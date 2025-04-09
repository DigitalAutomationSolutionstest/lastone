'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApiClient, tools } from '@/lib/api-client'
import { ButtonModern } from '@/components/ui/button-modern'
import { CardHover } from '@/components/ui/card-hover'
import { useToast } from '@/hooks/use-toast'

interface ToolCardProps {
  tool: string
  title: string
  description: string
  icon: React.ReactNode
  userId: string
  placeholder?: string
}

export function ToolCard({
  tool,
  title,
  description,
  icon,
  userId,
  placeholder = 'Inserisci il tuo testo...'
}: ToolCardProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const { toast } = useToast()
  
  const { callTool, isLoading } = useApiClient({
    userId,
    onSuccess: (data) => {
      setOutput(data.output)
      toast({
        title: 'Operazione completata',
        description: 'Il risultato è stato generato con successo',
        duration: 3000,
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    try {
      await callTool(tool, input)
    } catch (error) {
      // L'errore è già gestito dal client API
    }
  }

  return (
    <CardHover
      title={title}
      description={description}
      icon={icon}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 border rounded-md bg-background resize-none min-h-[120px]"
            disabled={isLoading}
          />
        </div>
        
        <ButtonModern
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-full"
        >
          {isLoading ? 'Elaborazione...' : 'Genera'}
        </ButtonModern>
        
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-muted rounded-md"
          >
            <h4 className="font-medium mb-2">Risultato:</h4>
            <p className="whitespace-pre-wrap">{output}</p>
          </motion.div>
        )}
      </form>
    </CardHover>
  )
} 