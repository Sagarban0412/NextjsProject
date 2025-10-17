import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/login(.*)', '/signup(.*)', '/sign-in(.*)', '/sign-up(.*)', '/'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isTeacherRoute = createRouteMatcher(['/teacher(.*)'])
const isProtectedRoute = createRouteMatcher(['/profile(.*)', '/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  
  // Protect non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL('/login', req.url).toString()
    })
  }

  // Role-based access control for authenticated users
  if (userId) {
    // Check multiple possible locations for role
    const role = sessionClaims?.publicMetadata?.role || 
                 sessionClaims?.metadata?.role || 
                 sessionClaims?.role || 
                 'user'
    
    const pathname = req.nextUrl.pathname
    
    // Debug logging
    console.log('User ID:', userId)
    console.log('Session Claims:', JSON.stringify(sessionClaims, null, 2))
    console.log('Detected Role:', role)
    console.log('Pathname:', pathname)

    // Role-based home page redirects
    if (pathname === '/') {
      if (role === 'admin') {
        console.log('Redirecting admin to /admin')
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      if (role === 'teacher') {
        console.log('Redirecting teacher to /teacher')
        return NextResponse.redirect(new URL('/teacher', req.url))
      }
      console.log('User staying on home page')
      // Users stay on home page
    }

    // Admin route protection
    if (isAdminRoute(req) && role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Teacher route protection (admins can access too)
    if (isTeacherRoute(req) && role !== 'teacher' && role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
