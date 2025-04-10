'use client'

import { useState, useCallback } from 'react'

// Definisci esplicitamente l'interfaccia Toast
export interface Toast {
  id: string
  title?: string
  description?: string
  duration?: number
  onClose: () => void
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, duration = 3000 }: Omit<Toast, 'id' | 'onClose'>) => {
    const id = Date.now().toString()
    
    const newToast: Toast = {
      id,
      title,
      description,
      duration,
      onClose: () => {
        setToasts(current => current.filter(t => t.id !== id))
      }
    }

    setToasts(current => [...current, newToast])
  }, [])

  return {
    toast,
    toasts
  }
} 