import { NextRequest } from 'next/server'
import { handleMiniAppRequest } from '@/lib/api-limits'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_PROJECT_KEY,
})

export async function POST(req: NextRequest) {
  return handleMiniAppRequest(req, async () => {
    const { prompt, maxTokens = 500, temperature = 0.7 } = await req.json()
    
    if (!prompt) {
      throw new Error('Il prompt è obbligatorio')
    }
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Sei un assistente esperto nella creazione di contenuti." },
        { role: "user", content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: temperature,
    })
    
    return {
      content: completion.choices[0].message.content,
      usage: completion.usage
    }
  })
} 