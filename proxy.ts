import { NextRequest, NextResponse } from "next/server"

/**
 * Protected routes - require login to access
 */
const protectedRoutes = ["/dashboard"]

/**
 * Proxy (formerly Middleware) - First line of defense for route protection
 * 
 * Route strategy:
 * - / is a public page, anyone can access
 * - /dashboard and its sub-routes require login
 * 
 * Note: This is only an Optimistic check, real authorization should be done in DAL
 */
export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const sessionToken = request.cookies.get("session_token")?.value

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

  // Redirect to home if accessing protected route without login
  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - static resource files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
