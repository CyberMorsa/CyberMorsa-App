import type React from "react"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { requireAuth } from "@/lib/auth"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verificar autenticación
  await requireAuth()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-6 px-4">{children}</main>
      <Toaster />
    </div>
  )
}
