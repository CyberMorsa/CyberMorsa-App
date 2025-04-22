import { jwtVerify, SignJWT } from "jose"
import type { NextApiRequest, NextApiResponse } from "next"
import type { NextRequest, NextResponse } from "next/server"
import type { NextAuthOptions } from "next-auth"

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_this_in_production")

// JWT expiration time (24 hours)
const EXPIRES_IN = "24h"

// Función de depuración para variables de entorno
export function getEnvDebugInfo() {
  return {
    adminUsername: process.env.ADMIN_USERNAME || "no configurado",
    adminPasswordSet: !!process.env.ADMIN_PASSWORD,
    guestUsername: process.env.GUEST_USERNAME || "no configurado",
    guestPasswordSet: !!process.env.GUEST_PASSWORD,
    jwtSecretSet: !!process.env.JWT_SECRET,
  }
}

// Authenticate user - compatible with API routes
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

      return {
        success: true,
        role: isAdmin ? "admin" : "guest",
        token,
      }
    } catch (error) {
      console.error("Error al crear el token:", error)
      return { success: false, error: "Error interno al procesar la autenticación" }
    }
  }

  return { success: false }
}

// Verify authentication from token
export async function verifyToken(token: string) {
  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as { username: string; role: string }
  } catch (error) {
    console.error("Error al verificar el token:", error)
    return null
  }
}

// Verify authentication from request
export async function verifyAuth(req: NextApiRequest | NextRequest) {
  // For API routes
  if ("cookies" in req && typeof req.cookies === "object") {
    const token = req.cookies["auth-token"]
    return token ? verifyToken(token) : null
  }

  // For middleware
  if ("cookies" in req && typeof req.cookies === "function") {
    const token = req.cookies().get("auth-token")?.value
    return token ? verifyToken(token) : null
  }

  return null
}

// Set auth cookie in response
export function setAuthCookie(res: NextApiResponse | NextResponse, token: string) {
  // For API routes
  if ("setHeader" in res) {
    res.setHeader(
      "Set-Cookie",
      `auth-token=${token}; Path=/; HttpOnly; ${process.env.NODE_ENV === "production" ? "Secure; " : ""}Max-Age=${60 * 60 * 24}`,
    )
    return res
  }

  // For middleware
  if ("cookies" in res && typeof res.cookies === "object") {
    res.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
    })
    return res
  }

  return res
}

// Clear auth cookie in response
export function clearAuthCookie(res: NextApiResponse | NextResponse) {
  // For API routes
  if ("setHeader" in res) {
    res.setHeader("Set-Cookie", "auth-token=; Path=/; HttpOnly; Max-Age=0")
    return res
  }

  // For middleware
  if ("cookies" in res && typeof res.cookies === "object") {
    res.cookies.delete("auth-token")
    return res
  }

  return res
}

export const authOptions: NextAuthOptions = {
  // Placeholder to satisfy the type checker. This file doesn't actually use next-auth.
  // The authentication is handled manually with JWTs.
  providers: [],
}
