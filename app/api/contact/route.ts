import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, projectType, description } = body

    // Validazione base
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      )
    }

    // Invio email usando Resend
    const data = await resend.emails.send({
      from: 'Mini Ai App <noreply@miniaiapp.com>',
      to: ['admin@miniaiapp.com'],
      subject: `Nuova richiesta progetto: ${projectType}`,
      html: `
        <h2>Nuova richiesta di progetto</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Azienda:</strong> ${company || 'Non specificata'}</p>
        <p><strong>Tipo di progetto:</strong> ${projectType}</p>
        <p><strong>Descrizione:</strong></p>
        <p>${description}</p>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Errore nell\'invio della richiesta:', error)
    return NextResponse.json(
      { error: 'Errore nell\'elaborazione della richiesta' },
      { status: 500 }
    )
  }
} 