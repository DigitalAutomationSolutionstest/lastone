'use client'

import { useState } from 'react'
import { ToolCard } from '@/components/ToolCard'
import { useSession } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation'
import { tools } from '@/lib/api-client'
import { motion } from 'framer-motion'
import { ArrowLeft, PenTool, Languages, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface ToolPageProps {
  params: {
    tool: string
  }
}

// Mappa dei tool con i loro dettagli
const toolDetails = {
  [tools.writer]: {
    title: 'Generatore di Contenuti',
    description: 'Crea contenuti professionali in italiano con l\'intelligenza artificiale',
    icon: <PenTool className="h-6 w-6" />,
    placeholder: 'Descrivi cosa vuoi scrivere...'
  },
  [tools.translator]: {
    title: 'Traduttore AI',
    description: 'Traduci testi dall\'italiano all\'inglese con precisione',
    icon: <Languages className="h-6 w-6" />,
    placeholder: 'Inserisci il testo da tradurre...'
  },
  [tools.chatbot]: {
    title: 'Chatbot AI',
    description: 'Interagisci con un assistente AI avanzato',
    icon: <MessageSquare className="h-6 w-6" />,
    placeholder: 'Scrivi il tuo messaggio...'
  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const session = useSession()
  const [toolType] = useState(params.tool)
  
  // Verifica se il tool richiesto esiste
  const toolExists = Object.values(tools).includes(toolType)
  const toolInfo = toolDetails[toolType as keyof typeof toolDetails]

  if (!session) {
    redirect('/login')
  }

  if (!toolExists) {
    return (
      <main className="max-w-3xl mx-auto py-20 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tool non trovato</h1>
          <p className="mb-6">Il tool richiesto non esiste o non è disponibile.</p>
          <Link href="/dashboard" className="text-primary hover:underline">
            Torna alla dashboard
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <Link href="/dashboard" className="mr-4 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{toolInfo.title}</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">{toolInfo.description}</p>
        
        <ToolCard
          tool={toolType}
          title={toolInfo.title}
          description={toolInfo.description}
          icon={toolInfo.icon}
          userId={session.user?.id || ''}
          placeholder={toolInfo.placeholder}
        />
      </motion.div>
    </main>
  )
} 