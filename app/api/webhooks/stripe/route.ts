import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Inizializza il client Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Errore nella verifica della firma del webhook:', err)
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 }
    )
  }

  // Gestisci solo gli eventi di pagamento completato
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const email = session.customer_email || ''
    const credits = session?.metadata?.credits ? parseInt(session.metadata.credits) : 0

    if (!email || !credits) {
      console.error('Email o crediti mancanti nella sessione:', { email, credits })
      return NextResponse.json(
        { error: 'Email o crediti non presenti nella sessione' },
        { status: 400 }
      )
    }

    try {
      // Trova l'utente tramite email
      const { data: user, error: userError } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', email)
        .single()

      if (userError || !user?.id) {
        console.error('Errore nel trovare l\'utente:', userError)
        return NextResponse.json(
          { error: 'Utente non trovato' },
          { status: 404 }
        )
      }

      // Verifica i crediti esistenti
      const { data: existing, error: creditsError } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user.id)
        .single()

      if (creditsError && creditsError.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Errore nel recuperare i crediti:', creditsError)
        return NextResponse.json(
          { error: 'Errore nel recuperare i crediti' },
          { status: 500 }
        )
      }

      // Aggiorna o crea i crediti
      if (existing) {
        const { error: updateError } = await supabase
          .from('user_credits')
          .update({ 
            credits: existing.credits + credits,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)

        if (updateError) {
          console.error('Errore nell\'aggiornamento dei crediti:', updateError)
          return NextResponse.json(
            { error: 'Errore nell\'aggiornamento dei crediti' },
            { status: 500 }
          )
        }
      } else {
        const { error: insertError } = await supabase
          .from('user_credits')
          .insert({
            user_id: user.id,
            credits,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (insertError) {
          console.error('Errore nell\'inserimento dei crediti:', insertError)
          return NextResponse.json(
            { error: 'Errore nell\'inserimento dei crediti' },
            { status: 500 }
          )
        }
      }

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Errore generico:', error)
      return NextResponse.json(
        { error: 'Errore interno del server' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
} 