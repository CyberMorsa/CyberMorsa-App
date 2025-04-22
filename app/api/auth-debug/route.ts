import { NextResponse } from "next/server"

export async function GET() {
  // Solo disponible en desarrollo
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "No disponible en producción" }, { status: 403 })
  }

  // Información de depuración sobre las variables de entorno (sin exponer valores sensibles)
  const envInfo = {
    adminUsername: process.env.ADMIN_USERNAME ? "configurado" : "no configurado",
    adminPassword: process.env.ADMIN_PASSWORD ? "configurado" : "no configurado",
    guestUsername: process.env.GUEST_USERNAME ? "configurado" : "no configurado",
    guestPassword: process.env.GUEST_PASSWORD ? "configurado" : "no configurado",
    jwtSecret: process.env.JWT_SECRET ? "configurado" : "no configurado",
    nodeEnv: process.env.NODE_ENV,
  }

  return NextResponse.json({
    message: "Información de depuración de autenticación",
    environment: envInfo,
  })
}
