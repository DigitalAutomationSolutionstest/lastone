import { NextRequest } from 'next/server'
import { handleMiniAppRequest } from '@/lib/api-limits'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_PROJECT_KEY,
})

export async function POST(req: NextRequest) {
  return handleMiniAppRequest(req, async () => {
    const { prompt, language, maxTokens = 1000, temperature = 0.2 } = await req.json()
    
    if (!prompt) {
      throw new Error('Il prompt è obbligatorio')
    }
    
    const systemPrompt = language 
      ? `Sei un esperto programmatore in ${language}. Fornisci codice pulito, efficiente e ben commentato.`
      : "Sei un esperto programmatore. Fornisci codice pulito, efficiente e ben commentato."
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
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