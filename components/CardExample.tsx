'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

export default function CardExample() {
  const handleClick = () => {
    console.log('Card clicked!')
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Esempio di Card</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          onClick={handleClick}
          className="cursor-pointer hover:shadow-md transition-shadow"
        >
          <CardContent>
            <h3 className="text-lg font-semibold">Card con onClick</h3>
            <p className="text-muted-foreground mt-2">
              Clicca su questa card per vedere l'evento onClick in azione.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold">Card standard</h3>
            <p className="text-muted-foreground mt-2">
              Questa è una card standard senza onClick.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 