import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      )
    }

    const { input } = await request.json()

    // Verifica crediti
    const { data: credits } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', session.user.id)
      .single()

    if (!credits || credits.credits < 1) {
      return NextResponse.json(
        { error: 'Crediti insufficienti' },
        { status: 402 }
      )
    }

    // Genera immagine con DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: input,
      n: 1,
      size: "1024x1024",
    })

    // Sottrai un credito
    await supabase
      .from('user_credits')
      .update({ credits: credits.credits - 1 })
      .eq('user_id', session.user.id)

    return NextResponse.json({
      output: response.data[0].url
    })
  } catch (error) {
    console.error('Errore nel tool generate-image:', error)
    return NextResponse.json(
      { error: 'Errore durante l\'elaborazione' },
      { status: 500 }
    )
  }
} 