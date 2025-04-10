'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ButtonModern } from '@/components/ui/button-modern'
import { CardHover } from '@/components/ui/card-hover'
import { ImageHover } from '@/components/ui/image-hover'
import { MasonryGrid } from '@/components/ui/masonry-grid'
import { Modal } from '@/components/ui/modal'
import { TabsContent } from '@/components/ui/tabs-content'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Shield,
  Star,
  Rocket,
  Code,
  Globe,
  Smartphone,
  Grid,
  Layout,
  MessageSquare
} from 'lucide-react'

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const { toast, toasts } = useToast()
  const [activeTab, setActiveTab] = useState('mini-apps')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const miniApps = [
    {
      title: 'AI Content Generator',
      description: 'Genera contenuti unici con l\'intelligenza artificiale',
      emoji: '✍️',
      badge: 'Popolare',
      badgeColor: 'bg-primary/20 text-primary'
    },
    {
      title: 'Image Generator',
      description: 'Crea immagini uniche con DALL-E e Stable Diffusion',
      emoji: '🎨',
      badge: 'Nuovo',
      badgeColor: 'bg-green-500/20 text-green-500'
    },
    {
      title: 'Code Assistant',
      description: 'Il tuo assistente personale per la programmazione',
      emoji: '👨‍💻'
    },
    {
      title: 'Chat AI',
      description: 'Chatbot intelligente per il tuo business',
      emoji: '💬'
    },
    {
      title: 'Voice Assistant',
      description: 'Assistente vocale con tecnologia Whisper',
      emoji: '🎤'
    }
  ]

  const tabs = [
    {
      id: 'mini-apps',
      label: 'Mini Apps',
      icon: <Grid className="h-4 w-4" />,
      content: (
        <MasonryGrid columns={3} gap={24} className="w-full">
          {miniApps.map((app, i) => (
            <CardHover
              key={i}
              title={app.title}
              description={app.description}
              icon={<span className="text-4xl">{app.emoji}</span>}
              badge={app.badge}
              badgeColor={app.badgeColor}
              onClick={() => toast({ title: 'Coming Soon', description: 'Questa funzionalità sarà disponibile presto!' })}
            />
          ))}
        </MasonryGrid>
      )
    },
    {
      id: 'siti-web',
      label: 'Siti Web',
      icon: <Layout className="h-4 w-4" />,
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Sito Base',
              description: 'Sito web semplice e responsive',
              features: ['Design responsive', 'Fino a 5 pagine', 'Form di contatto', 'SEO base'],
              price: 'da 800€',
              badge: 'Popolare',
              badgeColor: 'bg-primary/20 text-primary'
            },
            {
              title: 'E-commerce AI',
              description: 'Siti e-commerce con funzionalità AI integrate',
              features: ['Raccomandazioni prodotti', 'Chatbot assistenza', 'Analisi sentiment', 'SEO automatico'],
              price: 'da 3.500€',
              badge: 'Premium',
              badgeColor: 'bg-green-500/20 text-green-500'
            },
            {
              title: 'Portfolio Creativo',
              description: 'Siti portfolio con effetti e animazioni uniche',
              features: ['Design personalizzato', 'Animazioni fluide', 'CMS integrato', 'Mobile-first'],
              price: 'da 1.500€'
            },
            {
              title: 'Landing Page',
              description: 'Pagina di conversione ottimizzata',
              features: ['Design accattivante', 'A/B testing', 'Analytics integrato', 'Form di lead'],
              price: 'da 600€'
            },
            {
              title: 'Sito Aziendale',
              description: 'Sito completo per la tua azienda',
              features: ['Area clienti', 'Blog integrato', 'Multi-lingua', 'Dashboard admin'],
              price: 'da 2.000€'
            },
            {
              title: 'Marketplace',
              description: 'Piattaforma multi-venditore',
              features: ['Sistema di pagamento', 'Gestione ordini', 'Area venditori', 'Recensioni'],
              price: 'da 5.000€',
              badge: 'Enterprise',
              badgeColor: 'bg-purple-500/20 text-purple-500'
            }
          ].map((site, i) => (
            <CardHover
              key={i}
              title={site.title}
              description={site.description}
              icon={<Globe className="h-5 w-5" />}
              badge={site.badge}
              badgeColor={site.badgeColor}
            >
              <ul className="space-y-2">
                {site.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-sm text-muted-foreground">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold text-primary">{site.price}</p>
            </CardHover>
          ))}
        </div>
      )
    },
    {
      id: 'app',
      label: 'App',
      icon: <Smartphone className="h-4 w-4" />,
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'App Web Base',
              description: 'Web app responsive e funzionale',
              features: ['Design responsive', 'Funzionalità base', 'Database semplice', 'Hosting incluso'],
              price: 'da 2.500€'
            },
            {
              title: 'App Mobile Native',
              description: 'App native per iOS e Android con AI',
              features: ['Performance native', 'Push notifications', 'Offline mode', 'Analytics integrato'],
              price: 'da 8.000€',
              badge: 'Premium',
              badgeColor: 'bg-green-500/20 text-green-500'
            },
            {
              title: 'Web App Progressive',
              description: 'Web app moderne e responsive',
              features: ['Cross-platform', 'Installabile', 'Updates automatici', 'SEO friendly'],
              price: 'da 5.000€'
            },
            {
              title: 'App Utility',
              description: 'App per funzionalità specifiche',
              features: ['Interfaccia intuitiva', 'Integrazione API', 'Notifiche', 'Backup dati'],
              price: 'da 3.000€'
            },
            {
              title: 'App Social',
              description: 'App di social networking',
              features: ['Feed in tempo reale', 'Messaggistica', 'Profilo utente', 'Contenuti multimediali'],
              price: 'da 7.000€',
              badge: 'Popolare',
              badgeColor: 'bg-primary/20 text-primary'
            },
            {
              title: 'App Enterprise',
              description: 'Soluzione completa per grandi aziende',
              features: ['Scalabilità', 'Sicurezza avanzata', 'Integrazione legacy', 'Supporto dedicato'],
              price: 'da 15.000€',
              badge: 'Enterprise',
              badgeColor: 'bg-purple-500/20 text-purple-500'
            }
          ].map((app, i) => (
            <CardHover
              key={i}
              title={app.title}
              description={app.description}
              icon={<Smartphone className="h-5 w-5" />}
              badge={app.badge}
              badgeColor={app.badgeColor}
            >
              <ul className="space-y-2">
                {app.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-sm text-muted-foreground">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-semibold text-primary">{app.price}</p>
            </CardHover>
          ))}
        </div>
      )
    }
  ]

  useEffect(() => {
    toast({
      title: 'Benvenuto su Mini AI Apps!',
      description: 'Esplora le nostre soluzioni AI innovative',
      duration: 5000
    })
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      <main className="min-h-screen">
        {/* Header con effetto glassmorphism */}
        <header className="sticky top-0 backdrop-blur-md bg-white/70 dark:bg-black/70 z-40 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Mini AI Apps
            </div>
            <div className="flex items-center gap-4">
              <ButtonModern
                variant="ghost"
                size="sm"
                icon={theme === 'light' ? '🌙' : '☀️'}
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              />
              <ButtonModern
                variant="gradient"
                size="sm"
                icon={<ArrowRight className="h-4 w-4" />}
                onClick={() => toast({ title: 'Registrazione completata', description: 'Benvenuto su Mini Ai App!' })}
              >
                Prova Gratis
              </ButtonModern>
            </div>
          </div>
        </header>

        {/* Hero Section con animazioni */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[url('/grid.svg')] bg-center"
          />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Semplifica il tuo lavoro con
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  {' '}l'Intelligenza Artificiale
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Mini-app, siti web e applicazioni personalizzate con AI integrata. Tutto ciò che ti serve per il tuo business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ButtonModern
                  variant="gradient"
                  size="lg"
                  icon={<Sparkles className="h-5 w-5" />}
                  onClick={() => setActiveTab('mini-apps')}
                >
                  Esplora Mini Apps
                </ButtonModern>
                <ButtonModern
                  variant="outline"
                  size="lg"
                  icon={<MessageSquare className="h-5 w-5" />}
                  onClick={() => setActiveTab('siti-web')}
                >
                  Richiedi Preventivo
                </ButtonModern>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefici con animazioni */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: 'Veloce e Intuitivo',
                  description: 'Interfaccia semplice, zero codice necessario'
                },
                {
                  icon: <Sparkles className="h-6 w-6" />,
                  title: 'Potente con AI',
                  description: 'Modelli avanzati GPT e Whisper integrati'
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: 'Sicuro e Affidabile',
                  description: 'Dati protetti e backup automatici'
                }
              ].map((benefit, i) => (
                <CardHover
                  key={i}
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tabs con contenuto */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-muted rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-background shadow-sm'
                        : 'hover:bg-background/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8">
              {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
          </div>
        </section>

        {/* CTA finale */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Pronto a iniziare?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Scegli la soluzione perfetta per il tuo business e inizia a utilizzare l'intelligenza artificiale oggi stesso.
              </p>
              <ButtonModern
                variant="gradient"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                onClick={() => toast({ title: 'Contattaci', description: 'Ti risponderemo entro 24 ore!' })}
              >
                Contattaci Ora
              </ButtonModern>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer moderno */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Mini AI App
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                © 2024 Digital Automaton Solutions. All rights reserved.
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="mailto:info.digitalautomatonsolutions@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contatti
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </>
  )
}
 