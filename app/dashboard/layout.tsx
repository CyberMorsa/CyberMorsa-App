import type React from "react"
import { requireAuth } from "@/lib/auth"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verify authentication
  const user = await requireAuth()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <DashboardNav user={user} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
