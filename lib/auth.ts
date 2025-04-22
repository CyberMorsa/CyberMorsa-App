"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignJWT, jwtVerify } from "jose"

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_this_in_production")

// JWT expiration time (24 hours)
const EXPIRES_IN = "24h"

// Authenticate user
export async function authenticate(username: string, password: string) {
  // Check admin credentials
  const isAdmin = username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD

  // Check guest credentials
  const isGuest = username === process.env.GUEST_USERNAME && password === process.env.GUEST_PASSWORD

  // If credentials are valid
  if (isAdmin || isGuest) {
    // Create JWT token
    const token = await new SignJWT({
      username,
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
