"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Home, Shield, Database, Search, Activity, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface DashboardNavProps {
  user: { username: string; role: string } | null
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Seguridad",
      href: "/dashboard/security",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      label: "Base de Datos",
      href: "/dashboard/database",
      icon: <Database className="h-5 w-5" />,
    },
    {
      label: "OSINT",
      href: "/dashboard/osint",
      icon: <Search className="h-5 w-5" />,
    },
    {
      label: "Actividades",
      href: "/dashboard/activities",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      label: "Configuración",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  async function handleLogout() {
    await logout()
    router.push("/login")
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gray-800 w-64 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "fixed md:static inset-y-0 z-40 md:z-0",
        )}
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">CyberMorsa</h2>
          <p className="text-sm text-gray-400">
            {user?.role === "admin" ? "Administrador" : "Invitado"}: {user?.username}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                pathname === item.href ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700",
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-gray-700 border-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
