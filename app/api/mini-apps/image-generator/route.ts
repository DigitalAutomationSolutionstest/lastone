import { NextRequest } from 'next/server'
import { handleMiniAppRequest } from '@/lib/api-limits'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_PROJECT_KEY,
})

export async function POST(req: NextRequest) {
  return handleMiniAppRequest(req, async () => {
    const { prompt, size = "1024x1024", n = 1 } = await req.json()
    
    if (!prompt) {
      throw new Error('Il prompt è obbligatorio')
    }
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: n,
      size: size as "1024x1024" | "1792x1024" | "1024x1792",
    })
    
    return {
      images: response.data.map(img => ({
        url: img.url,
        revised_prompt: img.revised_prompt
      }))
    }
  })
} 