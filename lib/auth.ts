import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtVerify, SignJWT } from "jose"

// Clave secreta para firmar los tokens JWT
const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_key_change_in_production_environment",
)

// Duración del token: 24 horas
const tokenExpiration = "24h"

// Interfaz para el usuario
export interface User {
  username: string
  role: "admin" | "guest"
}

// Función para verificar las credenciales
export async function verifyCredentials(username: string, password: string): Promise<User | null> {
  // Verificar credenciales de administrador
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return { username, role: "admin" }
  }

  // Verificar credenciales de invitado
  if (username === process.env.GUEST_USERNAME && password === process.env.GUEST_PASSWORD) {
    return { username, role: "guest" }
  }

  // Si no coincide con ninguna credencial, devolver null
  return null
}

// Función para crear un token JWT
export async function createToken(user: User): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(tokenExpiration)
    .sign(secretKey)
}

// Función para verificar un token JWT
export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload.user as User
  } catch (error) {
    return null
  }
}

// Función para obtener el usuario actual
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return null
  }

  return verifyToken(token.value)
}

// Función para verificar la autenticación y redirigir si es necesario
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

// Función para cerrar sesión
export async function logout() {
  cookies().delete("auth-token")
}
