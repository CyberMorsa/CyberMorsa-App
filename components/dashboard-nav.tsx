"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Settings,
  Shield,
  User,
  Database,
  Search,
  AlertTriangle,
  Activity,
  Globe,
  PenToolIcon as Tool,
  Mail,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: NavItem[]
  isExpanded?: boolean
}

export function DashboardNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "OSINT",
      href: "/dashboard/osint",
      icon: Search,
      submenu: [
        {
          title: "Perfilador de Objetivos",
          href: "/dashboard/osint",
          icon: User,
        },
        {
          title: "Person Intelligence",
          href: "/dashboard/osint/person-intelligence",
          icon: User,
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
          title: "Threat Intelligence",
          href: "/dashboard/osint/threat-intelligence",
          icon: AlertTriangle,
        },
      ],
      isExpanded: pathname.includes("/dashboard/osint"),
    },
    {
      title: "Seguridad",
      href: "/dashboard/security",
      icon: Shield,
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
      icon: Tool,
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid gap-2 px-2">
      {navItems.map((item, index) => (
        <div key={index}>
          <NavLink item={item} />
          {item.submenu && item.isExpanded && (
            <div className="ml-4 mt-1 grid gap-1 border-l border-gray-700 pl-4">
              {item.submenu.map((subItem, subIndex) => (
                <NavLink key={subIndex} item={subItem} isSubmenu />
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

interface NavLinkProps {
  item: NavItem
  isSubmenu?: boolean
}

function NavLink({ item, isSubmenu = false }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  return (
    <Link
      href={item.href}
      className={`
        flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all
        ${isActive ? "bg-gray-700 text-white font-medium" : "text-gray-400 hover:bg-gray-800 hover:text-white"}
        ${isSubmenu ? "text-sm py-1.5" : ""}
      `}
    >
      <item.icon className={`h-5 w-5 ${isSubmenu ? "h-4 w-4" : ""}`} />
      <span>{item.title}</span>
    </Link>
  )
}
