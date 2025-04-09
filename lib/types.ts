export interface UserCredits {
  id: string
  user_id: string
  credits: number
  created_at: string
  updated_at: string
}

export interface ToolResponse {
  success: boolean
  data?: any
  error?: string
  credits_used?: number
  credits_remaining?: number
} 