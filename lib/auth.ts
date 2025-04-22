import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // Verificar credenciales de administrador
        if (
          credentials.username === process.env.ADMIN_USERNAME &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "1",
            name: credentials.username,
            email: `${credentials.username}@example.com`,
            role: "admin",
          }
        }

        // Verificar credenciales de invitado
        if (
          credentials.username === process.env.GUEST_USERNAME &&
          credentials.password === process.env.GUEST_PASSWORD
        ) {
          return {
            id: "2",
            name: credentials.username,
            email: `${credentials.username}@example.com`,
            role: "guest",
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  secret: process.env.AUTH_SECRET,
}

export async function requireAuth() {
  // Esta función se mantiene para compatibilidad con el código existente
  // pero ahora la verificación real se hace en el layout protegido
  return {
    username: "Usuario",
    role: "guest",
  }
}

export async function verifyCredentials(username: string, password: string) {
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return {
      id: "1",
      username: username,
      role: "admin",
    }
  }

  if (username === process.env.GUEST_USERNAME && password === process.env.GUEST_PASSWORD) {
    return {
      id: "2",
      username: username,
      role: "guest",
    }
  }

  return null
}

export async function createToken(user: { username: string; role: string }) {
  // In a real application, you would use a JWT library to create a token.
  // This is a simplified example and should not be used in production.
  const token = `mock-token-for-${user.username}-${user.role}`
  return token
}
