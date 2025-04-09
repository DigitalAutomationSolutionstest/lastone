'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ButtonModern } from '@/components/ui/button-modern'
import { useSession } from '@supabase/auth-helpers-react'
import { redirect } from 'next/navigation'
import { Check, Sparkles, Zap, Rocket } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    credits: 100,
    price: 9.99,
    icon: <Sparkles className="h-6 w-6" />,
    color: 'from-blue-500 to-blue-600',
    features: [
      '100 crediti',
      'Accesso a tutti i tool',
      'Supporto email',
      'Validità 30 giorni'
    ]
  },
  {
    name: 'Pro',
    credits: 500,
    price: 39.99,
    icon: <Zap className="h-6 w-6" />,
    color: 'from-purple-500 to-purple-600',
    features: [
      '500 crediti',
      'Accesso prioritario',
      'Supporto prioritario',
      'Validità 90 giorni'
    ]
  },
  {
    name: 'Enterprise',
    credits: 2000,
    price: 149.99,
    icon: <Rocket className="h-6 w-6" />,
    color: 'from-orange-500 to-orange-600',
    features: [
      '2000 crediti',
      'Accesso VIP',
      'Supporto dedicato',
      'Validità 1 anno'
    ]
  }
]

export default function PricingPage() {
  const session = useSession()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  if (!session) {
    redirect('/login')
  }

  const handlePurchase = async (plan: typeof plans[0]) => {
    setIsLoading(plan.name)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits: plan.credits,
          price: plan.price,
          planName: plan.name
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Errore durante la creazione della sessione:', error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Scegli il tuo piano
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Acquista crediti per utilizzare i nostri tool AI e inizia a creare contenuti straordinari
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredPlan(plan.name)}
              onHoverEnd={() => setHoveredPlan(null)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg blur-xl"
                style={{ backgroundImage: `linear-gradient(to right, ${plan.color})` }}
              />
              <div className="relative border rounded-lg p-8 hover:border-primary transition-all duration-300 hover:shadow-lg bg-background/50 backdrop-blur-sm">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r ${plan.color} text-white`}>
                  {plan.icon}
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="mb-4">
                  <span className="text-3xl font-bold">€{plan.price}</span>
                  <span className="text-muted-foreground">/una tantum</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <ButtonModern
                  onClick={() => handlePurchase(plan)}
                  isLoading={isLoading === plan.name}
                  fullWidth
                  variant="gradient"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {hoveredPlan === plan.name ? 'Inizia Ora' : 'Acquista Ora'}
                </ButtonModern>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
} 