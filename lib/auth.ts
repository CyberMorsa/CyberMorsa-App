export async function verifyCredentials(username: string, password: string) {
  // Dummy user data (replace with database calls in a real application)
  const users = [
    {
      id: "1",
      username: process.env.ADMIN_USERNAME || "admin",
      password: process.env.ADMIN_PASSWORD || "password123",
      name: process.env.ADMIN_USERNAME || "admin",
      role: "admin",
    },
    {
      id: "2",
      username: process.env.GUEST_USERNAME || "invitado",
      password: process.env.GUEST_PASSWORD || "invitado123",
      name: process.env.GUEST_USERNAME || "invitado",
      role: "guest",
    },
  ]

  const user = users.find((u) => u.username === username && u.password === password)
  return user || null
}

export async function createToken(user: any) {
  // In a real application, you would create a JWT token here
  // using a library like jsonwebtoken.
  // This is a placeholder.
  return `dummy_token_for_${user.username}`
}

export const authOptions = {
  providers: [],
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
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}
