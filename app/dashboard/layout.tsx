import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-md flex items-center justify-center">
            <span className="font-bold text-white">CM</span>
          </div>
          <div>
            <h1 className="font-bold text-white">CyberMorsa</h1>
            <p className="text-xs text-gray-400">Plataforma de Ciberseguridad</p>
          </div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <DashboardNav />
        </div>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-300" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">Administrador</p>
              <p className="text-xs text-gray-400 truncate">admin@cybermorsa.com</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-white">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer text-red-400 hover:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-gray-700 bg-gray-800 flex items-center justify-between px-6">
          <div>
            <h2 className="text-lg font-medium text-white">CyberMorsa v2.0</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="h-12 border-t border-gray-700 bg-gray-800 flex items-center justify-between px-6">
          <div className="text-sm text-gray-400">© 2023 CyberMorsa. Todos los derechos reservados.</div>
          <div className="text-sm text-gray-400">Versión 2.0.0</div>
        </footer>
      </div>
    </div>
  )
}
