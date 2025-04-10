# Mini AI Apps

## Descrizione
Mini AI Apps è un'applicazione web che offre servizi di AI come chat, trascrizione, generazione di immagini e analisi del testo. L'applicazione è costruita utilizzando Next.js, Tailwind CSS e integra varie API AI come OpenAI, Anthropic, HuggingFace, e Stripe per i pagamenti.

## Stack Utilizzato
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: API AI (OpenAI, Anthropic, HuggingFace)
- **Database**: Supabase
- **Pagamenti**: Stripe
- **Email**: Resend

## Istruzioni per l'Avvio Locale
1. Clona il repository:
   ```bash
   git clone https://github.com/tuonome/miniaiapp.git
   cd miniaiapp
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Configura le variabili d'ambiente:
   Crea un file `.env.local` nella root del progetto e aggiungi le seguenti variabili:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
   STRIPE_SECRET_KEY=...
   STRIPE_WEBHOOK_SECRET=...
   NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXX
   NEXT_PUBLIC_API_URL=https://api.miniaiapps.tech
   NEXT_PUBLIC_APP_URL=https://www.miniaiapps.tech
   API_KEY=eD2Z5adX...
   ANTHROPIC_API_KEY=sk-ant-api03-...
   OPENAI_API_KEY=sk-proj-LET...
   HF_API_KEY=hf_MPMpCsBZ...
   RESEND_API_KEY=r8_Nozi...
   ```

4. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

5. Apri il browser e vai a `http://localhost:3000`

## Variabili Richieste
- `NEXT_PUBLIC_SUPABASE_URL`: URL del tuo progetto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chiave anonima di Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Chiave di servizio di Supabase
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Chiave pubblica di Stripe
- `STRIPE_SECRET_KEY`: Chiave segreta di Stripe
- `STRIPE_WEBHOOK_SECRET`: Segreto del webhook di Stripe
- `NEXT_PUBLIC_ANALYTICS_ID`: ID di Google Analytics
- `NEXT_PUBLIC_API_URL`: URL dell'API
- `NEXT_PUBLIC_APP_URL`: URL dell'applicazione
- `API_KEY`: Chiave API generica
- `ANTHROPIC_API_KEY`: Chiave API di Anthropic
- `OPENAI_API_KEY`: Chiave API di OpenAI
- `HF_API_KEY`: Chiave API di HuggingFace
- `RESEND_API_KEY`: Chiave API di Resend

## Funzionalità

- Mini AI Apps già implementate
- Sistema di autenticazione
- Integrazione pagamenti con Stripe
- Tema chiaro/scuro
- Animazioni fluide
- Dashboard utente
- Sistema a crediti

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