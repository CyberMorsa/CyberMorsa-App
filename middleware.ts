import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Exclude login page and API routes from middleware
  if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Check if user is authenticated by looking for the auth-token cookie
  const token = request.cookies.get("auth-token")?.value

  // If not authenticated, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
