'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('')
  const [credits, setCredits] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user
      if (!user) return router.push('/login')
      setUserEmail(user.email || '')

      const { data } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user.id)
        .single()

      setCredits(data?.credits || 0)
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground">
            Crediti: <strong>{credits}</strong>
          </p>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      <p className="text-muted-foreground">
        Benvenuto <strong>{userEmail}</strong>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Esempio 3 mini app */}
        {['Chat AI', 'Generatore Immagini', 'Traduttore'].map((tool) => (
          <div
            key={tool}
            className="rounded-xl border p-4 hover:shadow-md cursor-pointer transition"
            onClick={() => router.push(`/dashboard/${tool.toLowerCase().replace(/\s/g, '-')}`)}
          >
            <h2 className="text-lg font-semibold">{tool}</h2>
            <p className="text-sm text-muted-foreground">Apri la mini app</p>
          </div>
        ))}
      </div>
    </div>
  )
} 