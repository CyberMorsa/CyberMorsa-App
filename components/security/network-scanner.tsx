"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, Wifi, Server, Globe, AlertTriangle, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NetworkScanner() {
  const [networkRange, setNetworkRange] = useState("192.168.1.0/24")
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)

  async function scanNetwork(e: React.FormEvent) {
    e.preventDefault()
    if (!networkRange) return

    setScanning(true)
    setProgress(0)
    setResults(null)

    // Simulación de progreso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    try {
      // Simulación de escaneo de red
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Resultados simulados
      setResults({
        devices: [
          {
            ip: "192.168.1.1",
            mac: "00:1A:2B:3C:4D:5E",
            hostname: "Router",
            vendor: "Cisco",
            type: "router",
            ports: [80, 443, 22, 53],
            status: "online",
          },
          {
            ip: "192.168.1.10",
            mac: "AA:BB:CC:DD:EE:FF",
            hostname: "Desktop-PC",
            vendor: "Dell",
            type: "computer",
            ports: [445, 139, 135],
            status: "online",
          },
          {
            ip: "192.168.1.15",
            mac: "11:22:33:44:55:66",
            hostname: "Laptop-User",
            vendor: "Apple",
            type: "computer",
            ports: [22, 5000],
            status: "online",
          },
          {
            ip: "192.168.1.20",
            mac: "AA:BB:CC:11:22:33",
            hostname: "SmartTV",
            vendor: "Samsung",
            type: "iot",
            ports: [8080, 8443],
            status: "online",
          },
          {
            ip: "192.168.1.25",
            mac: "FF:EE:DD:CC:BB:AA",
            hostname: "Printer",
            vendor: "HP",
            type: "printer",
            ports: [631, 9100],
            status: "online",
          },
          {
            ip: "192.168.1.30",
            mac: "12:34:56:78:90:AB",
            hostname: "SecurityCamera",
            vendor: "Hikvision",
            type: "iot",
            ports: [80, 554],
            status: "online",
            vulnerable: true,
          },
        ],
        summary: {
          total: 6,
          online: 6,
          offline: 0,
          vulnerable: 1,
          types: {
            router: 1,
            computer: 2,
            iot: 2,
            printer: 1,
          },
        },
      })
    } catch (error) {
      console.error("Error al escanear la red:", error)
    } finally {
      clearInterval(interval)
      setProgress(100)
      setScanning(false)
    }
  }

  function getDeviceIcon(type: string) {
    switch (type) {
      case "router":
        return <Wifi className="h-5 w-5 text-blue-400" />
      case "computer":
        return <Server className="h-5 w-5 text-green-400" />
      case "iot":
        return <Globe className="h-5 w-5 text-purple-400" />
      case "printer":
        return <Server className="h-5 w-5 text-yellow-400" />
      default:
        return <Server className="h-5 w-5 text-gray-400" />
    }
  }

  function downloadResults() {
    if (!results) return

    const jsonString = JSON.stringify(results, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `network_scan_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={scanNetwork} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Rango de red (ej: 192.168.1.0/24)"
            value={networkRange}
            onChange={(e) => setNetworkRange(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            disabled={scanning}
          />
          <Button type="submit" disabled={scanning || !networkRange}>
            {scanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Escaneando...
              </>
            ) : (
              "Escanear Red"
            )}
          </Button>
        </div>
      </form>

      {scanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Escaneando dispositivos...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {results && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-white">Resultados del Escaneo</h3>
              <p className="text-sm text-gray-400">
                Se encontraron {results.summary.total} dispositivos en la red {networkRange}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={downloadResults}>
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
              <span className="text-sm text-gray-300">Dispositivos</span>
              <span className="text-lg font-medium text-white">{results.summary.total}</span>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
              <span className="text-sm text-gray-300">En línea</span>
              <span className="text-lg font-medium text-green-400">{results.summary.online}</span>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
              <span className="text-sm text-gray-300">Desconectados</span>
              <span className="text-lg font-medium text-gray-400">{results.summary.offline}</span>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
              <span className="text-sm text-gray-300">Vulnerables</span>
              <span className="text-lg font-medium text-red-400">{results.summary.vulnerable}</span>
            </div>
          </div>

          <Tabs defaultValue="devices">
            <TabsList className="bg-gray-700">
              <TabsTrigger value="devices" className="data-[state=active]:bg-gray-600">
                Dispositivos
              </TabsTrigger>
              <TabsTrigger value="ports" className="data-[state=active]:bg-gray-600">
                Puertos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="devices" className="mt-4">
              <div className="space-y-3">
                {results.devices.map((device: any, index: number) => (
                  <div
                    key={index}
                    className={`bg-gray-700 p-3 rounded-lg ${device.vulnerable ? "border border-red-500/50" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(device.type)}
                        <span className="font-medium text-white">{device.hostname || device.ip}</span>
                        {device.vulnerable && <Badge className="bg-red-500/20 text-red-400">Vulnerable</Badge>}
                      </div>
                      <Badge
                        className={
                          device.status === "online" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        }
                      >
                        {device.status === "online" ? "En línea" : "Desconectado"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">IP: </span>
                        <span className="text-white">{device.ip}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">MAC: </span>
                        <span className="text-white">{device.mac}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Fabricante: </span>
                        <span className="text-white">{device.vendor}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Tipo: </span>
                        <span className="text-white capitalize">{device.type}</span>
                      </div>
                    </div>
                    {device.ports && device.ports.length > 0 && (
                      <div className="mt-2">
                        <span className="text-gray-400 text-sm">Puertos abiertos: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {device.ports.map((port: number) => (
                            <Badge key={port} variant="outline" className="text-xs">
                              {port}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ports" className="mt-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-3">Puertos Abiertos por Dispositivo</h4>
                <div className="space-y-3">
                  {results.devices.map((device: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 border-b border-gray-600 pb-2">
                      <div className="flex-shrink-0">{getDeviceIcon(device.type)}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{device.hostname || device.ip}</p>
                        <p className="text-xs text-gray-400">{device.ip}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {device.ports.map((port: number) => (
                          <Badge
                            key={port}
                            className={
                              port === 22 || port === 23 || port === 3389
                                ? "bg-yellow-500/20 text-yellow-400"
                                : port === 80 || port === 443
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-gray-500/20 text-gray-400"
                            }
                          >
                            {port}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {results.summary.vulnerable > 0 && (
            <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">Dispositivos Vulnerables Detectados</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Se han detectado {results.summary.vulnerable} dispositivos con posibles vulnerabilidades. Se
                    recomienda actualizar el firmware y cambiar las contraseñas predeterminadas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
