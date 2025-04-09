'use client'

export default function Footer() {
  return (
    <footer className="py-10 bg-muted/40 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} Digital Automaton Solutions. Tutti i diritti riservati.</p>
      <p className="mt-2">
        <a href="mailto:info.digitalautomatonsolutions@gmai.com" className="underline hover:text-primary transition">
          info.digitalautomatonsolutions@gmai.com
        </a>
      </p>
    </footer>
  )
} 