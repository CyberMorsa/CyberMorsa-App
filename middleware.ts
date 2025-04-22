import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar si estamos en desarrollo y si las variables de entorno están configuradas
  if (process.env.NODE_ENV === "development") {
    const missingEnvVars = []

    if (!process.env.ADMIN_USERNAME) missingEnvVars.push("ADMIN_USERNAME")
    if (!process.env.ADMIN_PASSWORD) missingEnvVars.push("ADMIN_PASSWORD")
    if (!process.env.JWT_SECRET) missingEnvVars.push("JWT_SECRET")

    // Si faltan variables de entorno críticas, registrar una advertencia
    if (missingEnvVars.length > 0) {
      console.warn(`⚠️ ADVERTENCIA: Faltan las siguientes variables de entorno: ${missingEnvVars.join(", ")}`)
      console.warn("La autenticación podría no funcionar correctamente.")
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
}
