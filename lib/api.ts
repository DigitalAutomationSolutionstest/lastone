export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.miniaiapps.tech'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.miniaiapps.tech'
export const API_KEY = process.env.API_KEY || ''

export const WEBHOOK_URL = process.env.WEBHOOK_URL || ''
export const NEXT_PUBLIC_WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || ''

export const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || ''

// Funzione per le chiamate API
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    ...options.headers,
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  })
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }
  
  return response.json()
} 