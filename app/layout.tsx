import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@/components/google-analytics";
import { Analytics } from "@vercel/analytics/react";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini AI Apps - Intelligenza Artificiale a tua disposizione",
  description: "Accedi a 5 potenti strumenti AI in un'unica dashboard. Chatbot, generazione siti, assistente codice, trascrizione audio e analisi CSV.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GoogleAnalytics />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
} 