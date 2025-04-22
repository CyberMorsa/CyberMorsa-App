"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Globe, AlertTriangle, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function IpAnalyzer() {
  const [ip, setIp] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  async function analyzeIp(e: React.FormEvent) {
    e.preventDefault()
    if (!ip) return

    setAnalyzing(true)
    setResults(null)

    try {
      // Simulación de análisis de IP
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Resultados simulados basados en IPInfo.io, AbuseIPDB, etc.
      const isAbusive = Math.random() > 0.7

      setResults({
        ip,
        hostname: Math.random() > 0.5 ? `server-${Math.floor(Math.random() * 100)}.example.com` : null,
        geolocation: {
          country: "US",
          countryName: "United States",
          region: "California",
          city: "San Francisco",
          postal: "94105",
          latitude: 37.7749,
          longitude: -122.4194,
          timezone: "America/Los_Angeles",
        },
        network: {
          asn: `AS${Math.floor(Math.random() * 10000) + 10000}`,
          org: "Amazon.com, Inc.",
          isp: "Amazon AWS",
          domain: "amazonaws.com",
        },
        security: {
          isProxy: Math.random() > 0.7,
          isTor: Math.random() > 0.9,
          isVpn: Math.random() > 0.8,
          isHosting: Math.random() > 0.6,
          threatScore: isAbusive ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 30),
          abuseReports: isAbusive ? Math.floor(Math.random() * 10) + 1 : 0,
          abuseCategories: isAbusive
            ? ["SSH Brute Force", "Port Scan", "Web Scanning"].slice(0, Math.floor(Math.random() * 3) + 1)
            : [],
        },
      })
    } catch (error) {
      console.error("Error al analizar la IP:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  function saveToDatabase() {
    if (!results) return

    // Simulación de guardado en base de datos
    alert(`IP ${results.ip} guardada en la base de datos`)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={analyzeIp} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ingresa una dirección IP"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            disabled={analyzing}
          />
          <Button type="submit" disabled={analyzing || !ip}>
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analizando...
              </>
            ) : (
              "Analizar"
            )}
          </Button>
        </div>
      </form>

      {results && (
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-white">{results.ip}</h3>
              {results.hostname && <p className="text-sm text-gray-300">Hostname: {results.hostname}</p>}
            </div>
            <Button size="sm" onClick={saveToDatabase}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-700 rounded-lg">
              <h4 className="font-medium text-white mb-2">Geolocalización</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">País:</span>
                  <span className="text-white">
                    {results.geolocation.countryName} ({results.geolocation.country})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Región:</span>
                  <span className="text-white">{results.geolocation.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Ciudad:</span>
                  <span className="text-white">{results.geolocation.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Código Postal:</span>
                  <span className="text-white">{results.geolocation.postal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Coordenadas:</span>
                  <span className="text-white">
                    {results.geolocation.latitude}, {results.geolocation.longitude}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Zona Horaria:</span>
                  <span className="text-white">{results.geolocation.timezone}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-700 rounded-lg">
              <h4 className="font-medium text-white mb-2">Red</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">ASN:</span>
                  <span className="text-white">{results.network.asn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Organización:</span>
                  <span className="text-white">{results.network.org}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">ISP:</span>
                  <span className="text-white">{results.network.isp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Dominio:</span>
                  <span className="text-white">{results.network.domain}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-700 rounded-lg">
            <h4 className="font-medium text-white mb-2">Seguridad</h4>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300">Puntuación de amenaza:</span>
              <Badge
                className={
                  results.security.threatScore > 70
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : results.security.threatScore > 40
                      ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                }
              >
                {results.security.threatScore}/100
              </Badge>
            </div>

            <div className="space-y-3">
              {(results.security.isProxy || results.security.isTor || results.security.isVpn) && (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Servicio de anonimización detectado</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {results.security.isProxy && (
                        <Badge variant="outline" className="text-xs">
                          Proxy
                        </Badge>
                      )}
                      {results.security.isTor && (
                        <Badge variant="outline" className="text-xs">
                          Tor
                        </Badge>
                      )}
                      {results.security.isVpn && (
                        <Badge variant="outline" className="text-xs">
                          VPN
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {results.security.isHosting && (
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Proveedor de hosting</p>
                    <p className="text-xs text-gray-300">
                      Esta IP pertenece a un proveedor de hosting o centro de datos
                    </p>
                  </div>
                </div>
              )}

              {results.security.abuseReports > 0 && (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Reportes de abuso: {results.security.abuseReports}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {results.security.abuseCategories.map((category: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs text-red-300 border-red-500/50">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
