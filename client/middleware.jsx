import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {data: { user }} = await supabase.auth.getUser()
  const pathnames = ['/admin/login', '/admin']

  
  if (!pathnames.includes(req.nextUrl.pathname)) {
    return NextResponse.next()
  }

  if (!user) {
    if (req.nextUrl.pathname === '/admin/login'){
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  } else {
    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

}