'use client'

import { useSession } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation'
import { tools } from '@/lib/api-client'
import { motion } from 'framer-motion'
import { PenTool, Languages, MessageSquare, CreditCard, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ButtonModern } from '@/components/ui/button-modern'
import { useEffect, useState } from 'react'
import { getUserCredits } from '@/lib/supabase-client'
import { UserCredits } from '@/lib/types'

// Mappa dei tool con i loro dettagli
const toolDetails = {
  [tools.writer]: {
    title: 'Generatore di Contenuti',
    description: 'Crea contenuti professionali in italiano con l\'intelligenza artificiale',
    icon: <PenTool className="h-6 w-6" />,
    color: 'from-blue-500 to-blue-600',
    gradient: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10'
  },
  [tools.translator]: {
    title: 'Traduttore AI',
    description: 'Traduci testi dall\'italiano all\'inglese con precisione',
    icon: <Languages className="h-6 w-6" />,
    color: 'from-green-500 to-green-600',
    gradient: 'bg-gradient-to-r from-green-500/10 to-green-600/10'
  },
  [tools.chatbot]: {
    title: 'Chatbot AI',
    description: 'Interagisci con un assistente AI avanzato',
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'from-purple-500 to-purple-600',
    gradient: 'bg-gradient-to-r from-purple-500/10 to-purple-600/10'
  }
}

export default function DashboardPage() {
  const session = useSession()
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  useEffect(() => {
    async function loadCredits() {
      if (session?.user?.id) {
        const credits = await getUserCredits(session.user.id)
        setUserCredits(credits)
      }
      setIsLoading(false)
    }

    loadCredits()
  }, [session?.user?.id])

  if (!session) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-5xl mx-auto py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <motion.h1 
                className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Dashboard
              </motion.h1>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Benvenuto, {session.user?.email}
              </motion.p>
            </div>
            
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 p-3 rounded-lg border border-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {isLoading ? (
                    <span className="inline-block w-8 h-4 bg-primary/20 rounded animate-pulse" />
                  ) : (
                    `${userCredits?.credits || 0} Crediti`
                  )}
                </span>
              </div>
              
              <ButtonModern asChild variant="gradient">
                <Link href="/pricing" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Acquista Crediti
                </Link>
              </ButtonModern>
            </motion.div>
          </div>
          
          <motion.h2 
            className="text-xl font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            I tuoi strumenti AI
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(toolDetails).map(([toolId, details], index) => (
              <motion.div
                key={toolId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredTool(toolId)}
                onHoverEnd={() => setHoveredTool(null)}
                className="relative group"
              >
                <div className={`absolute inset-0 ${details.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-xl`} />
                <Link href={`/dashboard/${toolId}`}>
                  <div className="relative border rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-lg bg-background/50 backdrop-blur-sm h-full">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r ${details.color} text-white`}>
                      {details.icon}
                    </div>
                    
                    <h3 className="text-lg font-medium mb-2">{details.title}</h3>
                    <p className="text-muted-foreground text-sm">{details.description}</p>
                    
                    {hoveredTool === toolId && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 right-4"
                      >
                        <span className="text-sm text-primary">Inizia →</span>
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
} 