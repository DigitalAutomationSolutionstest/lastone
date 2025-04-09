import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Aggiungi crediti iniziali
    if (data.user) {
      await supabase
        .from('user_credits')
        .insert({
          user_id: data.user.id,
          credits: 3
        })
    }

    return NextResponse.json({
      user: data.user,
      session: data.session
    })
  } catch (error) {
    console.error('Errore durante la registrazione:', error)
    return NextResponse.json(
      { error: 'Errore durante la registrazione' },
      { status: 500 }
    )
  }
} 