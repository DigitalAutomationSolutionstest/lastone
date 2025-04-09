import { createClient } from '@supabase/supabase-js'
import { UserCredits } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getUserCredits(userId: string): Promise<UserCredits | null> {
  const { data, error } = await supabase
    .from('user_credits')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching user credits:', error)
    return null
  }

  return data
}

export async function updateUserCredits(userId: string, credits: number): Promise<boolean> {
  const { error } = await supabase
    .from('user_credits')
    .upsert({
      user_id: userId,
      credits,
      updated_at: new Date().toISOString()
    })

  if (error) {
    console.error('Error updating user credits:', error)
    return false
  }

  return true
}

export async function deductCredits(userId: string, amount: number): Promise<boolean> {
  const currentCredits = await getUserCredits(userId)
  
  if (!currentCredits) {
    return false
  }

  if (currentCredits.credits < amount) {
    return false
  }

  return updateUserCredits(userId, currentCredits.credits - amount)
} 