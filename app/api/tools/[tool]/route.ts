// ✅ API handler centralizzato per tutte le mini app AI
// Percorso: app/api/tools/[tool]/route.ts

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const API_KEYS = {
  openai: process.env.OPENAI_PROJECT_KEY,
  anthropic: process.env.ANTHROPIC_KEY,
  huggingface: process.env.HUGGINGFACE_KEY,
  resend: process.env.RESEND_API_KEY,
}

const TOOL_HANDLERS: Record<string, (input: string) => Promise<string>> = {
  writer: async (input) => {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEYS.openai}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Scrivi un testo professionale in italiano.' },
          { role: 'user', content: input },
        ],
        temperature: 0.7,
      }),
    })
    const json = await res.json()
    return json.choices[0].message.content.trim()
  },
  translator: async (input) => {
    const res = await fetch('https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-it-en', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEYS.huggingface}`,
      },
      body: JSON.stringify({ inputs: input }),
    })
    const json = await res.json()
    return json[0].translation_text
  },
  chatbot: async (input) => {
    const res = await fetch('https://api.anthropic.com/v1/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEYS.anthropic!,
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        prompt: `\n\nHuman: ${input}\n\nAssistant:`,
        max_tokens_to_sample: 500,
      }),
    })
    const json = await res.json()
    return json.completion.trim()
  },
}

export async function POST(req: Request, { params }: { params: { tool: string } }) {
  const { tool } = params
  const { input, user_id } = await req.json()

  if (!user_id || !input || !TOOL_HANDLERS[tool]) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  // Verifica crediti utente
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', user_id)
    .single()

  if (error || !profile || profile.credits <= 0) {
    return NextResponse.json({ error: 'Crediti insufficienti' }, { status: 403 })
  }

  try {
    const output = await TOOL_HANDLERS[tool](input)

    // Decrementa i crediti
    await supabase.rpc('decrement_credits', { user_id })

    return NextResponse.json({ output })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Errore elaborazione AI' }, { status: 500 })
  }
} 