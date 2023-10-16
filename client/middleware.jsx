import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const pathnames = ['/admin/login', '/admin']
  const authCookie = req.cookies.get('pocketbase_auth')?.value
  const isAuthenticated = authCookie ? true : false

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