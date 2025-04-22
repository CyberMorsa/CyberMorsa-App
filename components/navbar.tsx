"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Shield, Menu, X, LogOut, Loader2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "OSINT", href: "/osint" },
  { name: "Actividades", href: "/activities" },
  { name: "Recordatorios", href: "/reminders" },
  { name: "Ciberseguridad", href: "/cybersecurity" },
  { name: "Guardados", href: "/saved" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const { data: session } = useSession()

  const handleLogout = async () => {
    setLoggingOut(true)
    await signOut({ redirect: true, callbackUrl: "/" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold hidden md:inline-block">OSINT Personal</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user?.name && (
            <span className="text-sm text-muted-foreground hidden md:inline-block mr-2">{session.user.name}</span>
          )}
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Cerrar sesión</span>
              </>
            )}
          </Button>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block py-2 text-base font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
