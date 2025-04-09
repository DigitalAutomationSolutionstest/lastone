import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Imposta il cookie di sessione
    const response = NextResponse.json({
      access_token: data.session?.access_token,
      user: data.user,
    })

    // Aggiungi l'header Set-Cookie per il token
    response.headers.set(
      'Set-Cookie',
      `auth-token=${data.session?.access_token}; Path=/; HttpOnly; SameSite=Strict`
    )

    return response
  } catch (error) {
    console.error('Errore durante il login:', error)
    return NextResponse.json(
      { error: 'Errore durante il login' },
      { status: 500 }
    )
  }
} 