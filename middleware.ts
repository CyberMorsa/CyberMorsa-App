import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/", "/login", "/api/login"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Si es una ruta pública, permitir acceso
  if (publicRoutes.includes(pathname) || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next()
  }

  // Verificar si existe el token de autenticación
  const authToken = request.cookies.get("auth-token")

  // Si no hay token, redirigir al login
  if (!authToken) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/login|_next/static|_next/image|favicon.ico).*)"],
}
