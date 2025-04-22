import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

export async function requireAuth() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  return {
    username: session.user.name || "Usuario",
    role: session.user.role || "guest",
  }
}

export async function verifyCredentials(username: string, password: string) {
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return {
      id: "1",
      username: username,
      email: `${username}@example.com`,
      role: "admin",
    }
  }

  if (username === process.env.GUEST_USERNAME && password === process.env.GUEST_PASSWORD) {
    return {
      id: "2",
      username: username,
      email: `${username}@example.com`,
      role: "guest",
    }
  }

  return null
}

import { SignJWT, jwtVerify } from "jose"

const secretKey = process.env.AUTH_SECRET || "tu_clave_secreta_aqui_minimo_32_caracteres"

export async function createToken(user: { username: string; role: string }) {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 // 24 hours

  const jwt = await new SignJWT({ id: user.id, username: user.username, role: user.role })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secretKey))

  return jwt
}

interface UserJwtPayload {
  id: string
  username: string
  role: string
  iat: number
  exp: number
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey))
    return payload as UserJwtPayload
  } catch (error) {
    return null
  }
}
