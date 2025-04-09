export const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID || ''

// Funzione per tracciare gli eventi
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

// Funzione per tracciare le visualizzazioni di pagina
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', ANALYTICS_ID, {
      page_path: url,
    })
  }
}

// Aggiungi il tipo gtag alla finestra
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void
  }
} 