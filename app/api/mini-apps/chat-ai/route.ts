import { NextRequest } from 'next/server'
import { handleMiniAppRequest } from '@/lib/api-limits'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_PROJECT_KEY,
})

export async function POST(req: NextRequest) {
  return handleMiniAppRequest(req, async () => {
    const { messages, model = "gpt-4o", temperature = 0.7 } = await req.json()
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('I messaggi sono obbligatori e devono essere un array non vuoto')
    }
    
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      temperature: temperature,
    })
    
    return {
      content: completion.choices[0].message.content,
      usage: completion.usage
    }
  })
} 