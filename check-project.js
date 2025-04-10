// 🧪 Verifica automatica MiniAIApp – Cursor Dev Assistant

import fs from 'fs';

console.log('🧪 Avvio controllo struttura del progetto...\n')

// 📁 1. Verifica presenza file essenziali
const requiredFiles = ['app/layout.tsx', 'app/page.tsx', 'app/globals.css', 'postcss.config.js', 'tailwind.config.js']
let missingFiles = requiredFiles.filter(file => !fs.existsSync(file))

if (missingFiles.length > 0) {
  console.error('❌ File mancanti:', missingFiles)
} else {
  console.log('✅ Tutti i file essenziali sono presenti')
}

// 📄 2. Verifica se globals.css ha le direttive Tailwind
if (fs.existsSync('app/globals.css')) {
  const css = fs.readFileSync('app/globals.css', 'utf8')
  const requiredDirectives = ['@tailwind base;', '@tailwind components;', '@tailwind utilities;']
  let missingDirectives = requiredDirectives.filter(d => !css.includes(d))

  if (missingDirectives.length > 0) {
    console.error('❌ globals.css manca alcune direttive Tailwind:', missingDirectives)
  } else {
    console.log('✅ globals.css include tutte le direttive Tailwind')
  }
} else {
  console.error('❌ Impossibile verificare le direttive Tailwind: globals.css non esiste')
}

// 🧩 3. Verifica import CSS nel layout.tsx
if (fs.existsSync('app/layout.tsx')) {
  const layout = fs.readFileSync('app/layout.tsx', 'utf8')
  if (!layout.includes("globals.css")) {
    console.error('❌ layout.tsx NON importa globals.css')
  } else {
    console.log('✅ layout.tsx importa globals.css correttamente')
  }
} else {
  console.error('❌ Impossibile verificare import CSS: layout.tsx non esiste')
}

// 🧠 4. Verifica presenza di sezioni principali nella homepage
if (fs.existsSync('app/page.tsx')) {
  const page = fs.readFileSync('app/page.tsx', 'utf8')
  // Controlli più flessibili
  const sectionChecks = [
    { name: 'Hero', patterns: ['Hero', 'hero', 'header', 'banner'] },
    { name: 'MiniAppsOverview', patterns: ['MiniAppsOverview', 'miniApps', 'Mini Apps', 'app.title', 'Mini-app'] },
    { name: 'Footer', patterns: ['Footer', 'footer'] },
    { name: 'ProvGratis', patterns: ['Prova Gratis', 'prova gratis', 'trial'] }
  ]
  
  const missing = []
  
  for (const section of sectionChecks) {
    const found = section.patterns.some(pattern => page.includes(pattern))
    if (!found) {
      missing.push(section.name)
    }
  }

  if (missing.length > 0) {
    console.warn('⚠️ Alcune sezioni potrebbero mancare nella home:', missing)
  } else {
    console.log('✅ Tutte le sezioni principali sono presenti in app/page.tsx')
  }
} else {
  console.error('❌ Impossibile verificare le sezioni: page.tsx non esiste')
}

// 🔧 5. Verifica configurazione PostCSS
if (fs.existsSync('postcss.config.js')) {
  const postcss = fs.readFileSync('postcss.config.js', 'utf8')
  if (!postcss.includes('tailwindcss') || !postcss.includes('postcss-import')) {
    console.warn('⚠️ postcss.config.js potrebbe non essere configurato correttamente.')
  } else {
    console.log('✅ postcss.config.js contiene i plugin richiesti')
  }
} else {
  console.error('❌ Impossibile verificare la configurazione: postcss.config.js non esiste')
}

console.log('\n✅ Verifica completata. Correggi gli errori sopra se presenti.') 