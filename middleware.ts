import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Rutas que no requieren autenticación
const publicRoutes = ["/", "/login"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Si es una ruta pública o un recurso estático, permitir acceso
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Verificar si existe el token de autenticación
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  // Si no hay token, redirigir al login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
