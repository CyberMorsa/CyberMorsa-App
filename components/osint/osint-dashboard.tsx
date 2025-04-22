"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Mail, Phone, User, Globe, Shield, Database, RefreshCw } from "lucide-react"

export function OsintDashboard() {
  const [stats, setStats] = useState({
    emailSearches: 0,
    phoneSearches: 0,
    usernameSearches: 0,
    ipSearches: 0,
    personSearches: 0,
    threatSearches: 0,
    totalSearches: 0,
    savedResults: 0,
    lastUpdated: "",
  })

  const [apiStatus, setApiStatus] = useState({
    haveIBeenPwned: "online",
    dehashed: "online",
    emailRep: "online",
    hunter: "online",
    numverify: "online",
    fullContact: "online",
    socialSearcher: "online",
    abuseIPDB: "online",
    ipInfo: "online",
    virusTotal: "online",
    urlScan: "online",
  })

  useEffect(() => {
    // Simulación de carga de estadísticas
    setStats({
      emailSearches: 24,
      phoneSearches: 8,
      usernameSearches: 15,
      ipSearches: 19,
      personSearches: 6,
      threatSearches: 12,
      totalSearches: 84,
      savedResults: 37,
      lastUpdated: new Date().toLocaleString(),
    })

    // Simulación de estado de APIs
    setApiStatus({
      haveIBeenPwned: Math.random() > 0.1 ? "online" : "offline",
      dehashed: Math.random() > 0.1 ? "online" : "offline",
      emailRep: Math.random() > 0.1 ? "online" : "offline",
      hunter: Math.random() > 0.1 ? "online" : "offline",
      numverify: Math.random() > 0.1 ? "online" : "offline",
      fullContact: Math.random() > 0.1 ? "online" : "offline",
      socialSearcher: Math.random() > 0.1 ? "online" : "offline",
      abuseIPDB: Math.random() > 0.1 ? "online" : "offline",
      ipInfo: Math.random() > 0.1 ? "online" : "offline",
      virusTotal: Math.random() > 0.1 ? "online" : "offline",
      urlScan: Math.random() > 0.1 ? "online" : "offline",
    })
  }, [])

  function refreshApiStatus() {
    // Simulación de actualización de estado de APIs
    setApiStatus({
      haveIBeenPwned: Math.random() > 0.1 ? "online" : "offline",
      dehashed: Math.random() > 0.1 ? "online" : "offline",
      emailRep: Math.random() > 0.1 ? "online" : "offline",
      hunter: Math.random() > 0.1 ? "online" : "offline",
      numverify: Math.random() > 0.1 ? "online" : "offline",
      fullContact: Math.random() > 0.1 ? "online" : "offline",
      socialSearcher: Math.random() > 0.1 ? "online" : "offline",
      abuseIPDB: Math.random() > 0.1 ? "online" : "offline",
      ipInfo: Math.random() > 0.1 ? "online" : "offline",
      virusTotal: Math.random() > 0.1 ? "online" : "offline",
      urlScan: Math.random() > 0.1 ? "online" : "offline",
    })
    setStats({
      ...stats,
      lastUpdated: new Date().toLocaleString(),
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-400" />
            <span>Estadísticas de Búsqueda</span>
          </CardTitle>
          <CardDescription className="text-gray-300">Resumen de actividad OSINT</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">Email:</span>
                <span className="text-sm font-medium text-white">{stats.emailSearches}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">Teléfono:</span>
                <span className="text-sm font-medium text-white">{stats.phoneSearches}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-300">Username:</span>
                <span className="text-sm font-medium text-white">{stats.usernameSearches}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-300">IP:</span>
                <span className="text-sm font-medium text-white">{stats.ipSearches}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-red-400" />
                <span className="text-sm text-gray-300">Persona:</span>
                <span className="text-sm font-medium text-white">{stats.personSearches}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-gray-300">Amenazas:</span>
                <span className="text-sm font-medium text-white">{stats.threatSearches}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">Resultados guardados:</span>
              <span className="text-sm font-medium text-white">{stats.savedResults}</span>
            </div>
            <div className="text-xs text-gray-400">Total: {stats.totalSearches}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700 md:col-span-2">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span>Estado de APIs</span>
            </CardTitle>
            <CardDescription className="text-gray-300">Disponibilidad de servicios OSINT</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={refreshApiStatus} className="h-8">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(apiStatus).map(([api, status]) => (
              <div key={api} className="flex items-center justify-between bg-gray-700 p-2 rounded-md">
                <span className="text-sm text-white">
                  {api.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </span>
                <Badge
                  className={
                    status === "online"
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  }
                >
                  {status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-400 text-right">Última actualización: {stats.lastUpdated}</div>
        </CardContent>
      </Card>
    </div>
  )
}
