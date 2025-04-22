"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Shield, Globe, User, Mail } from "lucide-react"

interface Activity {
  id: number
  type: "alert" | "info" | "success" | "warning"
  message: string
  source: string
  timestamp: string
  icon: any
}

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Simulación de actividades recientes
    const mockActivities: Activity[] = [
      {
        id: 1,
        type: "alert",
        message: "Intento de acceso no autorizado detectado",
        source: "Firewall",
        timestamp: "Hace 5 minutos",
        icon: AlertTriangle,
      },
      {
        id: 2,
        type: "info",
        message: "Nuevo dominio relacionado encontrado: example-phishing.com",
        source: "OSINT",
        timestamp: "Hace 15 minutos",
        icon: Globe,
      },
      {
        id: 3,
        type: "success",
        message: "Análisis de vulnerabilidades completado",
        source: "Scanner",
        timestamp: "Hace 30 minutos",
        icon: CheckCircle,
      },
      {
        id: 4,
        type: "warning",
        message: "Certificado SSL expirará en 7 días",
        source: "Monitor SSL",
        timestamp: "Hace 1 hora",
        icon: Shield,
      },
      {
        id: 5,
        type: "info",
        message: "Nueva dirección IP asociada a usuario: 192.168.1.1",
        source: "Tracker",
        timestamp: "Hace 2 horas",
        icon: User,
      },
      {
        id: 6,
        type: "alert",
        message: "Email sospechoso detectado en filtración de datos",
        source: "Email Monitor",
        timestamp: "Hace 3 horas",
        icon: Mail,
      },
    ]

    setActivities(mockActivities)
  }, [])

  const getActivityStyles = (type: string) => {
    switch (type) {
      case "alert":
        return {
          badge: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
          icon: "text-red-400",
        }
      case "warning":
        return {
          badge: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30",
          icon: "text-yellow-400",
        }
      case "success":
        return {
          badge: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
          icon: "text-green-400",
        }
      case "info":
      default:
        return {
          badge: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
          icon: "text-blue-400",
        }
    }
  }

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
      {activities.map((activity) => {
        const styles = getActivityStyles(activity.type)
        const Icon = activity.icon

        return (
          <div key={activity.id} className="flex items-start gap-3 bg-gray-700 p-3 rounded-lg">
            <div className={`mt-0.5 ${styles.icon}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={styles.badge}>{activity.source}</Badge>
                <span className="text-xs text-gray-400">{activity.timestamp}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
