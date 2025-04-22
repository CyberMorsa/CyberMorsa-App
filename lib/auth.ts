import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import * as jwt from "jsonwebtoken"

// Dummy user data (replace with database calls in a real application)
const users = [
  {
    id: "1",
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "password123",
    role: "admin",
  },
  {
    id: "2",
    username: process.env.GUEST_USERNAME || "invitado",
    password: process.env.GUEST_PASSWORD || "invitado123",
    role: "guest",
  },
]

export async function verifyCredentials(username: string, password: string) {
  const user = users.find((u) => u.username === username)

  if (!user) {
    return null
  }

  // In a real application, you would compare the password with a hashed password stored in the database
  if (user.password !== password) {
    return null
  }

  return { id: user.id, username: user.username, role: user.role }
}

export async function createToken(user: { id: string; username: string; role: string }) {
  // In a real application, you would use a more secure method to create a JWT
  const secret = process.env.NEXTAUTH_SECRET || "tu_clave_secreta_aqui_minimo_32_caracteres"
  const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, secret, {
    expiresIn: "24h",
  })
  return token
}

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
}
