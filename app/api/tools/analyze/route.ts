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

    // Analizza il testo con GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Sei un assistente che analizza testi fornendo insights dettagliati su tono, stile, sentimento e argomenti principali.'
        },
        {
          role: 'user',
          content: `Analizza il seguente testo:\n\n${input}`
        }
      ],
    })

    // Sottrai un credito
    await supabase
      .from('user_credits')
      .update({ credits: credits.credits - 1 })
      .eq('user_id', session.user.id)

    return NextResponse.json({
      output: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('Errore nel tool analyze:', error)
    return NextResponse.json(
      { error: 'Errore durante l\'elaborazione' },
      { status: 500 }
    )
  }
} 