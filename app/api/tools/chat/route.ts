import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    // Verifica il token di autenticazione
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token mancante o non valido' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    const supabase = createRouteHandlerClient({ cookies })

    // Verifica la sessione con il token
    const { data: { user }, error: sessionError } = await supabase.auth.getUser(token)

    if (sessionError || !user) {
      return NextResponse.json(
        { error: 'Sessione non valida' },
        { status: 401 }
      )
    }

    const { input } = await request.json()

    // Verifica crediti
    const { data: credits } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single()

    if (!credits || credits.credits < 1) {
      return NextResponse.json(
        { error: 'Crediti insufficienti' },
        { status: 402 }
      )
    }

    // Genera risposta con GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    })

    // Sottrai un credito
    await supabase
      .from('user_credits')
      .update({ credits: credits.credits - 1 })
      .eq('user_id', user.id)

    return NextResponse.json({
      output: completion.choices[0].message.content
    })
  } catch (error) {
    console.error('Errore nel tool chat:', error)
    return NextResponse.json(
      { error: 'Errore durante l\'elaborazione' },
      { status: 500 }
    )
  }
} 