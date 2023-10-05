import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {data: { user }} = await supabase.auth.getUser()

  if (user) {
    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
  matcher: ['/admin/login', '/admin']
}