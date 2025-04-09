// ✅ Gestione API & Limiti per Mini Ai App – TypeScript con Next.js + Stripe + Supabase

import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Credit limits per plan
const PLAN_LIMITS: Record<string, number> = {
  free: 3,
  pro: 100,
  enterprise: 1000 // Or unlimited, can be adjusted
}

// Get current user and credits
export async function getUserInfo(token: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, plan, credits')
    .eq('api_key', token)
    .single()

  if (error || !data) throw new Error('Utente non trovato o API key non valida')

  return data
}

// Update credits after a request
export async function decrementCredit(userId: string) {
  const { error } = await supabase
    .rpc('decrement_credits', { uid: userId })

  if (error) throw new Error('Errore durante il decremento crediti')
}

// Middleware/API wrapper
export async function handleMiniAppRequest(req: NextRequest, action: () => Promise<any>) {
  const headersList = headers()
  const token = headersList.get('Authorization')?.replace('Bearer ', '')

  if (!token) return new Response('API key mancante', { status: 401 })

  try {
    const user = await getUserInfo(token)
    const limit = PLAN_LIMITS[user.plan] ?? 0

    if (user.credits <= 0) {
      return new Response('Hai esaurito i crediti', { status: 403 })
    }

    const result = await action()
    await decrementCredit(user.id)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err: any) {
    return new Response(err.message, { status: 400 })
  }
} 