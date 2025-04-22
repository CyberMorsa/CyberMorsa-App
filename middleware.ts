import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Exclude login page and API routes from middleware
  if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const user = await verifyAuth(request)

  // If not authenticated, redirect to login
  if (!user) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
