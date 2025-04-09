# Mini AI Apps - Piattaforma SaaS

Una piattaforma SaaS per vendere mini AI apps, creazione personalizzata di siti web e app personalizzate su richiesta.

## Tecnologie Utilizzate

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Stripe
- Resend
- Framer Motion

## Funzionalità

- Mini AI Apps già implementate
- Sistema di autenticazione
- Integrazione pagamenti con Stripe
- Tema chiaro/scuro
- Animazioni fluide
- Dashboard utente
- Sistema a crediti

## Getting Started

1. Clona il repository
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Copia il file `.env.local.example` in `.env.local` e configura le variabili d'ambiente
4. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

## Struttura del Progetto

```
├── app/                # Directory principale Next.js
│   ├── layout.tsx     # Layout principale
│   └── page.tsx       # Homepage
├── components/        # Componenti React
├── lib/              # Utility e configurazioni
└── public/           # Asset statici
```

## Deployment

Il progetto è configurato per essere deployato su Vercel. Basta connettere il repository GitHub a Vercel e configurare le variabili d'ambiente.

## Contribuire

1. Fork il repository
2. Crea un branch per la tua feature
3. Committa le modifiche
4. Pusha al branch
5. Apri una Pull Request

## Licenza

MIT 