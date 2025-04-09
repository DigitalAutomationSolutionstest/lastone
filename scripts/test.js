import fetch from 'node-fetch'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const tools = ['chat', 'transcribe', 'generate-image', 'summarize', 'analyze']

const BASE_URL = 'http://localhost:3000'
const API_URL = `${BASE_URL}/api`
const TEST_USER = {
  email: 'test@example.com',
  password: 'test123456'
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

let token = ''

// Funzione per verificare che il server sia in esecuzione
async function checkServer() {
  try {
    const response = await fetch(BASE_URL)
    if (!response.ok) {
      throw new Error(`Server non disponibile: ${response.status}`)
    }
    console.log(chalk.green('✅ Server in esecuzione'))
    return true
  } catch (error) {
    console.error(chalk.red('❌ Server non raggiungibile:'), error.message)
    console.error(chalk.yellow('⚠️ Assicurati che il server sia in esecuzione con npm run dev'))
    return false
  }
}

async function createUser() {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TEST_USER)
    })

    const data = await response.json()

    if (!response.ok) {
      if (data.error && data.error.toLowerCase().includes('already registered')) {
        console.log(chalk.blue('ℹ️ Utente di test già esistente'))
        return true
      }
      throw new Error(`Errore nella creazione utente: ${data.error || 'Errore sconosciuto'}`)
    }

    console.log(chalk.green('✅ Utente di test creato con successo'))
    return true
  } catch (error) {
    console.error(chalk.red('❌ Errore:'), error.message)
    if (error.code === 'ECONNREFUSED') {
      console.error(chalk.red('❌ Assicurati che il server sia in esecuzione su http://localhost:3000'))
    }
    return false
  }
}

async function login() {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TEST_USER)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Errore nel login: ${data.error || response.status}`)
    }

    console.log(chalk.green('✅ Login effettuato con successo'))
    return data.access_token
  } catch (error) {
    console.error(chalk.red('❌ Errore:'), error.message)
    if (error.code === 'ECONNREFUSED') {
      console.error(chalk.red('❌ Assicurati che il server sia in esecuzione su http://localhost:3000'))
    }
    return null
  }
}

async function testTool(name, input, token) {
  try {
    const response = await fetch(`${API_URL}/tools/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ input })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${data.error || 'Errore sconosciuto'}`)
    }

    if (!data.output) {
      throw new Error('Output mancante nella risposta')
    }

    console.log(chalk.green(`✅ Test ${name} completato con successo`))
    console.log(chalk.blue(`📝 Output: ${data.output.substring(0, 100)}...`))
    return true
  } catch (error) {
    console.error(chalk.red(`❌ Errore nel test ${name}:`), error.message)
    if (error.code === 'ECONNREFUSED') {
      console.error(chalk.red('❌ Assicurati che il server sia in esecuzione su http://localhost:3000'))
    }
    return false
  }
}

async function testCredits() {
  const res = await fetch(`${API_URL}/user/credits`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  if (data.credits !== undefined) {
    console.log(chalk.green(`✅ Crediti utente letti: ${data.credits}`))
  } else {
    throw new Error('❌ Errore nella lettura crediti')
  }
}

async function testStripeWebhook() {
  console.log(chalk.blue('⚠️  Simulazione Webhook Stripe (deve essere attiva Stripe CLI)...'))
  // Simulazione lasciata manuale (Stripe CLI deve essere avviata localmente)
  console.log('👉 Avvia: stripe listen --forward-to localhost:3000/api/stripe/webhook')
  console.log('👉 Poi:   stripe trigger checkout.session.completed')
}

async function runTests() {
  console.log(chalk.cyan('🚀 Inizio test Mini AI App...'))

  // Verifica che il server sia in esecuzione
  const serverRunning = await checkServer()
  if (!serverRunning) {
    process.exit(1)
  }

  // Crea utente di test
  const userCreated = await createUser()
  if (!userCreated) {
    console.error(chalk.red('❌ Impossibile procedere con i test: utente non creato'))
    process.exit(1)
  }

  // Login
  const token = await login()
  if (!token) {
    console.error(chalk.red('❌ Impossibile procedere con i test: login fallito'))
    process.exit(1)
  }

  // Test tools
  const tools = [
    { name: 'chat', input: 'Ciao, come stai?' },
    { name: 'transcribe', input: 'https://example.com/audio.mp3' },
    { name: 'generate-image', input: 'Un gatto che gioca con una palla' },
    { name: 'summarize', input: 'Testo lungo da riassumere...' },
    { name: 'analyze', input: 'Testo da analizzare...' }
  ]

  let allTestsPassed = true
  for (const tool of tools) {
    const success = await testTool(tool.name, tool.input, token)
    if (!success) {
      allTestsPassed = false
    }
  }

  if (allTestsPassed) {
    console.log(chalk.green('✅ Tutti i test completati con successo!'))
  } else {
    console.error(chalk.red('❌ Alcuni test sono falliti'))
    process.exit(1)
  }
}

// Gestione degli errori non catturati
process.on('unhandledRejection', (error) => {
  console.error(chalk.red('❌ Errore non gestito:'), error)
  process.exit(1)
})

runTests().catch(error => {
  console.error(chalk.red('❌ Errore imprevisto:'), error)
  process.exit(1)
}) 