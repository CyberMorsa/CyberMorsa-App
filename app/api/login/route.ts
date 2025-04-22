import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyCredentials, createToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Verificar credenciales
    const user = await verifyCredentials(username, password)

    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Crear token JWT
    const token = await createToken(user)

    // Establecer cookie con el token
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
    })

    return NextResponse.json({ success: true, user: { username: user.username, role: user.role } })
  } catch (error) {
    console.error("Error en login:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
