import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Rinnova la sessione se esiste
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Se la richiesta è per un'API protetta
  if (req.nextUrl.pathname.startsWith('/api/tools')) {
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      )
    }
  }

  return res
}

export const config = {
  matcher: [
    '/api/tools/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 