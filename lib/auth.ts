import { jwtVerify, SignJWT } from "jose"
import type { NextAuthOptions } from "next-auth"
import { cookies } from "next/headers"

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_this_in_production")

// JWT expiration time (24 hours)
const EXPIRES_IN = "24h"

// Function to verify authentication from token in cookies
export async function verifyAuth() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as { username: string; role: string; id: string }
  } catch (error) {
    console.error("Error al verificar el token:", error)
    return null
  }
}

// Function to verify authentication from token
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

// Function to get user ID from token
export async function getUserIdFromToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload.id as string
  } catch (error) {
    console.error("Error al verificar el token:", error)
    return null
  }
}

// Function to get user role from token
export async function getUserRoleFromToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload.role as string
  } catch (error) {
    console.error("Error al verificar el token:", error)
    return null
  }
}

// Function to get username from token
export async function getUsernameFromToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload.username as string
  } catch (error) {
    console.error("Error al verificar el token:", error)
    return null
  }
}

// Function to sign JWT token
export async function signJWT(payload: any) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(EXPIRES_IN)
      .sign(JWT_SECRET)

    return token
  } catch (error) {
    console.error("Error al crear el token:", error)
    return null
  }
}

// Function to get JWT secret
export function getJWTSecret() {
  return JWT_SECRET
}

// Function to get JWT expiration time
export function getJWTExpirationTime() {
  return EXPIRES_IN
}

// Function to get authentication options
export const authOptions: NextAuthOptions = {
  // Placeholder to satisfy the type checker. This file doesn't actually use next-auth.
  // The authentication is handled manually with JWTs.
  providers: [],
}
