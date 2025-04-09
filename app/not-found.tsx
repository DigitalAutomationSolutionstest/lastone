'use client'

import Link from 'next/link'
import { ButtonModern } from '@/components/ui/button-modern'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Pagina non trovata</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link href="/">
          <ButtonModern>
            <span className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Torna alla home
            </span>
          </ButtonModern>
        </Link>
      </div>
    </div>
  )
} 