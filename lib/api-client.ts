'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface ApiClientOptions {
  userId: string
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

export function useApiClient(options: ApiClientOptions) {
  const { userId, onSuccess, onError } = options
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const callTool = async (tool: string, input: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/tools/${tool}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input,
          user_id: userId,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Si è verificato un errore')
      }
      
      onSuccess?.(data)
      return data
    } catch (error: any) {
      const errorMessage = error.message || 'Si è verificato un errore'
      toast({
        title: 'Errore',
        description: errorMessage,
        duration: 5000,
      })
      onError?.(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    callTool,
    isLoading,
  }
}

// Esempi di utilizzo:
export const tools = {
  writer: 'writer',
  translator: 'translator',
  chatbot: 'chatbot',
} 