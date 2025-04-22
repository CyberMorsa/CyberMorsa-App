"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Globe, Server, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DomainScanner() {
  const [domain, setDomain] = useState("")
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState<any>(null)

  async function scanDomain(e: React.FormEvent) {
    e.preventDefault()
    if (!domain) return

    setScanning(true)
    setResults(null)

    try {
      // Simulación de escaneo de dominio
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Resultados simulados basados en SecurityTrails, Censys, etc.
      setResults({
        domain,
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        subdomains: Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(
          (_, i) => `${["www", "mail", "api", "blog", "shop", "app"][Math.floor(Math.random() * 6)]}.${domain}`,
        ),
        dns: {
          a: [
            `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          ],
          mx: [`mail.${domain}`, `alt1.aspmx.l.google.com`],
          ns: [`ns1.${domain}`, `ns2.${domain}`],
        },
        whois: {
          registrar: "GoDaddy.com, LLC",
          created: "2015-06-12",
          expires: "2025-06-12",
          updated: "2022-05-30",
        },
        technologies: ["Nginx", "PHP", "MySQL", "jQuery", "Bootstrap"].slice(0, Math.floor(Math.random() * 5) + 1),
        ports: [
          { port: 80, service: "HTTP" },
          { port: 443, service: "HTTPS" },
          Math.random() > 0.7 ? { port: 22, service: "SSH" } : null,
          Math.random() > 0.8 ? { port: 21, service: "FTP" } : null,
        ].filter(Boolean),
      })
    } catch (error) {
      console.error("Error al escanear el dominio:", error)
    } finally {
      setScanning(false)
    }
  }

  function saveToDatabase() {
    if (!results) return

    // Simulación de guardado en base de datos
    alert(`Dominio ${results.domain} guardado en la base de datos`)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={scanDomain} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ingresa un dominio (ej: example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            disabled={scanning}
          />
          <Button type="submit" disabled={scanning || !domain}>
            {scanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Escaneando...
              </>
            ) : (
              "Escanear"
            )}
          </Button>
        </div>
      </form>

      {results && (
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-white">{results.domain}</h3>
              <p className="text-sm text-gray-300">IP: {results.ip}</p>
            </div>
            <Button size="sm" onClick={saveToDatabase}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>

          <Tabs defaultValue="info">
            <TabsList className="bg-gray-700">
              <TabsTrigger value="info" className="data-[state=active]:bg-gray-600">
                Información
              </TabsTrigger>
              <TabsTrigger value="subdomains" className="data-[state=active]:bg-gray-600">
                Subdominios
              </TabsTrigger>
              <TabsTrigger value="tech" className="data-[state=active]:bg-gray-600">
                Tecnologías
              </TabsTrigger>
              <TabsTrigger value="ports" className="data-[state=active]:bg-gray-600">
                Puertos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-white mb-2">WHOIS</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Registrador:</span>
                      <span className="text-white">{results.whois.registrar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Creado:</span>
                      <span className="text-white">{results.whois.created}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expira:</span>
                      <span className="text-white">{results.whois.expires}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Actualizado:</span>
                      <span className="text-white">{results.whois.updated}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-white mb-2">DNS</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-300 block mb-1">Registros A:</span>
                      <div className="space-y-1">
                        {results.dns.a.map((record: string, i: number) => (
                          <div key={i} className="bg-gray-800 px-2 py-1 rounded text-white">
                            {record}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-300 block mb-1">Registros MX:</span>
                      <div className="space-y-1">
                        {results.dns.mx.map((record: string, i: number) => (
                          <div key={i} className="bg-gray-800 px-2 py-1 rounded text-white">
                            {record}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-300 block mb-1">Registros NS:</span>
                      <div className="space-y-1">
                        {results.dns.ns.map((record: string, i: number) => (
                          <div key={i} className="bg-gray-800 px-2 py-1 rounded text-white">
                            {record}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="subdomains" className="mt-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <h4 className="font-medium text-white mb-2">Subdominios Encontrados ({results.subdomains.length})</h4>
                <div className="space-y-2">
                  {results.subdomains.map((subdomain: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                      <Globe className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{subdomain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tech" className="mt-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <h4 className="font-medium text-white mb-2">Tecnologías Detectadas</h4>
                <div className="flex flex-wrap gap-2 mt-3">
                  {results.technologies.map((tech: string, i: number) => (
                    <Badge key={i} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ports" className="mt-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <h4 className="font-medium text-white mb-2">Puertos Abiertos</h4>
                <div className="space-y-2">
                  {results.ports.map((portInfo: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                      <Server className="h-4 w-4 text-green-400" />
                      <span className="text-white">{portInfo.port}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-300">{portInfo.service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
