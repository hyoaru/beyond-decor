import { NextResponse } from 'next/server'
import PocketBase from "pocketbase"

export async function middleware(req) {
  const res = NextResponse.next()
  const pathnames = ['/admin/login', '/admin']
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  
  const authCookie = req.cookies.get('pb_auth')?.value
  const authCookieParsed = JSON.parse(authCookie)
  pocketbase.authStore.save(authCookieParsed.token, authCookieParsed.model)

  const isAuthenticated = pocketbase.authStore.isAdmin
  if (!pathnames.includes(req.nextUrl.pathname)) {
    return NextResponse.next()
  }

  if (!isAuthenticated) {
    if (req.nextUrl.pathname === '/admin/login') {
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