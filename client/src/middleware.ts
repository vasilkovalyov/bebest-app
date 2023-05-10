import { NextRequest, NextResponse } from 'next/server'
import pages from '@/constants/pages'
import { isAuth } from './services/auth'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname.split('/')[1]
  const authToken = req.cookies.get('token')

  if (pathname === 'admin' && !authToken) {
    return NextResponse.redirect(new URL('/404', req.url))
  }

  const response = await isAuth(authToken?.value)
  if (pathname === pages.admin.replace('/', '') && !response.isAuth) {
    return NextResponse.redirect(new URL('/404', req.url))
  }

  return NextResponse.next()
}
