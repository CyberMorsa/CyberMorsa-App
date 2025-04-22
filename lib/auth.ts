"\"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignJWT, jwtVerify } from "jose"
import type { NextAuthOptions } from "next-auth"

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_this_in_production")

// JWT expiration time (24 hours)
const EXPIRES_IN = "24h"

// Función de depuración para variables de entorno
function getEnvDebugInfo() {
  return {
    adminUsername: process.env.ADMIN_USERNAME || "no configurado",
    adminPasswordSet: !!process.env.ADMIN_PASSWORD,
    guestUsername: process.env.GUEST_USERNAME || "no configurado",
    guestPasswordSet: !!process.env.GUEST_PASSWORD,
    jwtSecretSet: !!process.env.JWT_SECRET,
  }
}

// Authenticate user
export async function authenticate(username: string, password: string) {
  // Trim inputs to remove any accidental spaces
  const trimmedUsername = username.trim()
  const trimmedPassword = password.trim()

  // Debug info
  console.log("Intento de autenticación para:", trimmedUsername)
  console.log("Estado de variables de entorno:", getEnvDebugInfo())

  // Fallback to hardcoded credentials if environment variables are not set
  const adminUsername = process.env.ADMIN_USERNAME || "admin"
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123"
  const guestUsername = process.env.GUEST_USERNAME || "guest"
  const guestPassword = process.env.GUEST_PASSWORD || "guest123"

  // Check admin credentials - case insensitive username comparison
  const isAdmin = trimmedUsername.toLowerCase() === adminUsername.toLowerCase() && trimmedPassword === adminPassword

  // Check guest credentials - case insensitive username comparison
  const isGuest = trimmedUsername.toLowerCase() === guestUsername.toLowerCase() && trimmedPassword === guestPassword

  console.log("Resultado de autenticación:", {
    isAdmin,
    isGuest,
    adminUsernameMatch: trimmedUsername.toLowerCase() === adminUsername.toLowerCase(),
    guestUsernameMatch: trimmedUsername.toLowerCase() === guestUsername.toLowerCase(),
  })

  // If credentials are valid
  if (isAdmin || isGuest) {
    try {
      // Create JWT token
      const token = await new SignJWT({
        username: trimmedUsername,
        role: isAdmin ? "admin" : "guest",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(EXPIRES_IN)
        .sign(JWT_SECRET)

      // Set cookie
      cookies().set({
        name: "auth-token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return { success: true, role: isAdmin ? "admin" : "guest" }
    } catch (error) {
      console.error("Error al crear o establecer el token:", error)
      return { success: false, error: "Error interno al procesar la autenticación" }
    }
  }

  return { success: false }
}

// Verify authentication
export async function verifyAuth() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as { username: string; role: string }
  } catch (error) {
    console.error("Error al verificar el token:", error)
    // Delete invalid token
    cookies().delete("auth-token")
    return null
  }
}

// Logout
export async function logout() {
  cookies().delete("auth-token")
}

// Middleware to protect routes
export async function requireAuth() {
  const user = await verifyAuth()

  if (!user) {
    redirect("/login")
  }

  return user
}

export const authOptions: NextAuthOptions = {
  // Placeholder to satisfy the type checker.  This file doesn't actually use next-auth.
  // The authentication is handled manually with JWTs.
  providers: [],
}
