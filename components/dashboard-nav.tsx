"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Shield,
  Database,
  Search,
  Activity,
  Settings,
  Wrench,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Lock,
  Wifi,
  Globe,
  User,
  Mail,
  FileText,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string
  badgeColor?: string
  submenu?: NavItem[]
}

export function DashboardNav() {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    "/dashboard/osint": true,
    "/dashboard/security": true,
  })

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Seguridad",
      href: "/dashboard/security",
      icon: Shield,
      badge: "3",
      badgeColor: "bg-red-500",
      submenu: [
        {
          title: "Escáner",
          href: "/dashboard/security?tab=scanner",
          icon: Search,
        },
        {
          title: "Vulnerabilidades",
          href: "/dashboard/security?tab=vulnerabilities",
          icon: AlertTriangle,
          badge: "3",
          badgeColor: "bg-red-500",
        },
        {
          title: "Contraseñas",
          href: "/dashboard/security?tab=passwords",
          icon: Lock,
        },
        {
          title: "Red",
          href: "/dashboard/security?tab=network",
          icon: Wifi,
        },
        {
          title: "Informe",
          href: "/dashboard/security?tab=report",
          icon: FileText,
        },
      ],
    },
    {
      title: "OSINT",
      href: "/dashboard/osint",
      icon: Search,
      submenu: [
        {
          title: "Dashboard OSINT",
          href: "/dashboard/osint",
          icon: LayoutDashboard,
        },
        {
          title: "Email Intelligence",
          href: "/dashboard/osint/email-intelligence",
          icon: Mail,
        },
        {
          title: "IP Intelligence",
          href: "/dashboard/osint/ip-intelligence",
          icon: Globe,
        },
        {
          title: "Person Intelligence",
          href: "/dashboard/osint/person-intelligence",
          icon: User,
        },
        {
          title: "Threat Intelligence",
          href: "/dashboard/osint/threat-intelligence",
          icon: AlertTriangle,
        },
      ],
    },
    {
      title: "Base de Datos",
      href: "/dashboard/database",
      icon: Database,
    },
    {
      title: "Actividades",
      href: "/dashboard/activities",
      icon: Activity,
    },
    {
      title: "Herramientas",
      href: "/dashboard/tools",
      icon: Wrench,
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const toggleSubmenu = (href: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <div key={item.href} className="space-y-1">
          {item.submenu ? (
            <>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-between hover:bg-gray-700 hover:text-white text-base font-medium py-2.5",
                  isActive(item.href) ? "bg-gray-700 text-white" : "text-gray-300",
                )}
                onClick={() => toggleSubmenu(item.href)}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge className={cn("ml-2 text-xs", item.badgeColor || "bg-blue-500")}>{item.badge}</Badge>
                  )}
                </div>
                {expandedMenus[item.href] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
              {expandedMenus[item.href] && (
                <div className="pl-8 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "flex items-center text-sm px-3 py-2.5 rounded-md hover:bg-gray-700 hover:text-white",
                        pathname === subItem.href || pathname.includes(subItem.href.split("?")[0])
                          ? "bg-gray-700 text-white font-medium"
                          : "text-gray-300",
                      )}
                    >
                      <subItem.icon className="mr-3 h-4 w-4" />
                      <span>{subItem.title}</span>
                      {subItem.badge && (
                        <Badge className={cn("ml-2 text-xs", subItem.badgeColor || "bg-blue-500")}>
                          {subItem.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-gray-700 hover:text-white text-base font-medium",
                isActive(item.href) ? "bg-gray-700 text-white" : "text-gray-300",
              )}
            >
              <div className="flex items-center">
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.title}</span>
              </div>
              {item.badge && <Badge className={cn("text-xs", item.badgeColor || "bg-blue-500")}>{item.badge}</Badge>}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
