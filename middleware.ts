import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './src/lib/auth'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /admin, /blog)
  const { pathname } = request.nextUrl

  // Check if the path requires authentication
  const requiresAuth = pathname.startsWith('/admin')

  if (requiresAuth) {
    // Get the token from cookies
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Verify the token
    const payload = verifyToken(token)
    
    if (!payload) {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }

    // Check if user has admin role for admin routes
    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // For login page, redirect to admin if already authenticated
  if (pathname === '/admin/login') {
    const token = request.cookies.get('auth-token')?.value
    
    if (token) {
      const payload = verifyToken(token)
      if (payload && payload.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}