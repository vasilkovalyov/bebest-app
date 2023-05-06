import { NextRequest, NextResponse } from 'next/server'
import pages from '@/constants/pages'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')
  const pathname = req.nextUrl.pathname.split('/')[1]
  if (pathname === pages.admin.replace('/', '') && !token) {
    return NextResponse.redirect(new URL('/404', req.url))
  }

  return NextResponse.next()
}
