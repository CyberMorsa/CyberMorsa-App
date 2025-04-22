"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, Globe, AlertTriangle, Download, Database, ExternalLink, History } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function IpIntelligence() {
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [selectedApis, setSelectedApis] = useState({
    abuseipdb: true,
    ipinfo: true,
    ipapi: true,
    greynoise: true,
  })
  const [savedResults, setSavedResults] = useState<any[]>([])
  const [loadingSaved, setLoadingSaved] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const { toast } = useToast()

  // Cargar resultados guardados al montar el componente
  useEffect(() => {
    fetchSavedResults()
  }, [])

  // Función para obtener resultados guardados
  const fetchSavedResults = async () => {
    try {
      setLoadingSaved(true)
      const response = await fetch("/api/osint/ip-intelligence")
      const data = await response.json()

      if (data.success) {
        setSavedResults(data.data)
      } else {
        console.error("Error al cargar resultados guardados:", data.error)
      }
    } catch (error) {
      console.error("Error al cargar resultados guardados:", error)
    } finally {
      setLoadingSaved(false)
    }
  }

  // Función para cargar un resultado guardado
  const loadSavedResult = (savedResult: any) => {
    setResults(savedResult.raw_data)
    setIp(savedResult.ip_address)
    setShowHistory(false)
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!ip || !Object.values(selectedApis).some(Boolean)) return

    setLoading(true)
    setProgress(0)
    setResults(null)

    // Simulación de progreso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 150)

    try {
      // Simulación de búsqueda en múltiples APIs
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Resultados simulados
      const isAbusive = Math.random() > 0.7
      const isScanner = Math.random() > 0.8

      const resultData = {
        ip,
        abuseipdb: selectedApis.abuseipdb
          ? {
              abuseScore: isAbusive ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 30),
              reports: isAbusive ? Math.floor(Math.random() * 10) + 1 : 0,
              lastReported: isAbusive
                ? new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0]
                : null,
              categories: isAbusive
                ? ["SSH Brute Force", "Web Scanning", "Port Scan", "Web Spam", "Email Spam"].slice(
                    0,
                    Math.floor(Math.random() * 3) + 1,
                  )
                : [],
              reporters: isAbusive ? Math.floor(Math.random() * 5) + 1 : 0,
              comments: isAbusive
                ? [
                    "Attempted SSH login with default credentials",
                    "Port scanning detected on our network",
                    "Web vulnerability scanning detected",
                  ].slice(0, Math.floor(Math.random() * 2) + 1)
                : [],
            }
          : null,
        ipinfo: selectedApis.ipinfo
          ? {
              hostname: Math.random() > 0.5 ? `server-${Math.floor(Math.random() * 100)}.example.com` : null,
              city: "San Francisco",
              region: "California",
              country: "US",
              loc: "37.7749,-122.4194",
              org: "AS14618 Amazon.com, Inc.",
              postal: "94105",
              timezone: "America/Los_Angeles",
              asn: {
                asn: "AS14618",
                name: "AMAZON-AES",
                domain: "amazonaws.com",
                route: "54.160.0.0/13",
                type: "business",
              },
              company: {
                name: "Amazon.com, Inc.",
                domain: "amazonaws.com",
                type: "hosting",
              },
              privacy: {
                vpn: Math.random() > 0.8,
                proxy: Math.random() > 0.9,
                tor: Math.random() > 0.95,
                hosting: true,
              },
            }
          : null,
        ipapi: selectedApis.ipapi
          ? {
              status: "success",
              country: "United States",
              countryCode: "US",
              region: "CA",
              regionName: "California",
              city: "San Francisco",
              zip: "94105",
              lat: 37.7749,
              lon: -122.4194,
              timezone: "America/Los_Angeles",
              isp: "Amazon.com, Inc.",
              org: "AWS EC2 (us-west-1)",
              as: "AS14618 Amazon.com, Inc.",
              mobile: false,
              proxy: Math.random() > 0.8,
              hosting: true,
            }
          : null,
        greynoise: selectedApis.greynoise
          ? {
              seen: isScanner,
              classification: isScanner ? "malicious" : "benign",
              last_seen: isScanner
                ? new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0]
                : null,
              actor: isScanner ? "unknown" : null,
              tags: isScanner
                ? ["SSH Scanner", "Web Scanner", "Exploit Scanner"].slice(0, Math.floor(Math.random() * 2) + 1)
                : [],
              cve: isScanner
                ? ["CVE-2021-44228", "CVE-2019-19781", "CVE-2020-0796"].slice(0, Math.floor(Math.random() * 2))
                : [],
              metadata: {
                category: isScanner ? "scanner" : "business",
                source: isScanner ? "automatic" : "user",
                organization: "Amazon.com, Inc.",
                os: "Linux",
                asn: "AS14618",
              },
              raw_data: {
                scan_reason: isScanner ? "SSH Scan detected" : null,
                web_paths: isScanner ? ["/wp-admin", "/wp-login.php", "/admin"] : [],
                ja3: "e7d705a3286e19ea42f587b344ee6865",
                ports: isScanner ? [22, 80, 443, 8080] : [80, 443],
              },
            }
          : null,
      }

      setResults(resultData)
    } catch (error) {
      console.error("Error al buscar información de la IP:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo completar la búsqueda. Inténtalo de nuevo.",
      })
    } finally {
      clearInterval(interval)
      setProgress(100)
      setLoading(false)
    }
  }

  async function saveToDatabase() {
    if (!results) return

    try {
      // Preparar datos para guardar
      const dataToSave = {
        ip_address: results.ip,
        hostname: results.ipinfo?.hostname || null,
        country: results.ipinfo?.country || results.ipapi?.countryCode || null,
        region: results.ipinfo?.region || results.ipapi?.regionName || null,
        city: results.ipinfo?.city || results.ipapi?.city || null,
        latitude: results.ipinfo?.loc?.split(",")[0] || results.ipapi?.lat || null,
        longitude: results.ipinfo?.loc?.split(",")[1] || results.ipapi?.lon || null,
        isp: results.ipapi?.isp || results.ipinfo?.org?.split(" ")[1] || null,
        organization: results.ipinfo?.company?.name || results.ipapi?.org || null,
        asn: results.ipinfo?.asn?.asn || results.ipapi?.as?.split(" ")[0] || null,
        is_proxy: results.ipinfo?.privacy?.proxy || results.ipapi?.proxy || false,
        is_vpn: results.ipinfo?.privacy?.vpn || false,
        is_tor: results.ipinfo?.privacy?.tor || false,
        is_hosting: results.ipinfo?.privacy?.hosting || results.ipapi?.hosting || false,
        abuse_score: results.abuseipdb?.abuseScore || null,
        threat_level: results.greynoise?.classification || null,
        categories: results.abuseipdb?.categories || [],
        reports: results.abuseipdb?.comments?.map((comment: string) => ({ comment })) || [],
        raw_data: results,
      }

      // Enviar a la API
      const response = await fetch("/api/osint/ip-intelligence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Guardado exitoso",
          description: "Los resultados se han guardado en la base de datos",
        })

        // Actualizar la lista de resultados guardados
        fetchSavedResults()
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "No se pudieron guardar los resultados",
        })
      }
    } catch (error) {
      console.error("Error al guardar en la base de datos:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron guardar los resultados",
      })
    }
  }

  function downloadResults() {
    if (!results) return
    // Crear y descargar archivo JSON
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ip_intel_${results.ip.replace(/\./g, "_")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Inteligencia de IP</CardTitle>
            <CardDescription className="text-gray-300">
              Busca información sobre direcciones IP en múltiples fuentes
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            Historial
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Ingresa una dirección IP (ej: 8.8.8.8)"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading || !ip || !Object.values(selectedApis).some(Boolean)}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  "Buscar"
                )}
              </Button>
            </div>

            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm font-medium text-white mb-2">Selecciona las APIs a consultar:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="abuseipdb"
                    checked={selectedApis.abuseipdb}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, abuseipdb: checked as boolean })}
                  />
                  <Label htmlFor="abuseipdb" className="text-gray-300">
                    AbuseIPDB
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ipinfo"
                    checked={selectedApis.ipinfo}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, ipinfo: checked as boolean })}
                  />
                  <Label htmlFor="ipinfo" className="text-gray-300">
                    IPinfo.io
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ipapi"
                    checked={selectedApis.ipapi}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, ipapi: checked as boolean })}
                  />
                  <Label htmlFor="ipapi" className="text-gray-300">
                    ip-api.com
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="greynoise"
                    checked={selectedApis.greynoise}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, greynoise: checked as boolean })}
                  />
                  <Label htmlFor="greynoise" className="text-gray-300">
                    GreyNoise
                  </Label>
                </div>
              </div>
            </div>
          </form>

          {loading && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Consultando APIs...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Diálogo de historial */}
          <Dialog open={showHistory} onOpenChange={setShowHistory}>
            <DialogContent className="bg-gray-800 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle>Historial de Búsquedas</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Resultados guardados de análisis de IP previos
                </DialogDescription>
              </DialogHeader>

              {loadingSaved ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : savedResults.length > 0 ? (
                <div className="max-h-[400px] overflow-y-auto space-y-2">
                  {savedResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
                      onClick={() => loadSavedResult(result)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{result.ip_address}</p>
                          <p className="text-sm text-gray-300">
                            {result.country && `${result.city || ""} ${result.region || ""}, ${result.country}`}
                          </p>
                        </div>
                        <Badge
                          className={
                            result.threat_level === "malicious"
                              ? "bg-red-500/20 text-red-400"
                              : result.threat_level === "suspicious"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                          }
                        >
                          {result.threat_level || "desconocido"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{new Date(result.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-400">
                  <p>No hay resultados guardados</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">{results.ip}</h2>
              <p className="text-gray-300">Resultados de la búsqueda en múltiples fuentes</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadResults}>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button onClick={saveToDatabase}>
                <Database className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList className="bg-gray-700">
              <TabsTrigger value="summary" className="data-[state=active]:bg-gray-600">
                Resumen
              </TabsTrigger>
              {results.abuseipdb && (
                <TabsTrigger value="abuseipdb" className="data-[state=active]:bg-gray-600">
                  AbuseIPDB
                </TabsTrigger>
              )}
              {results.ipinfo && (
                <TabsTrigger value="ipinfo" className="data-[state=active]:bg-gray-600">
                  IPinfo.io
                </TabsTrigger>
              )}
              {results.ipapi && (
                <TabsTrigger value="ipapi" className="data-[state=active]:bg-gray-600">
                  ip-api.com
                </TabsTrigger>
              )}
              {results.greynoise && (
                <TabsTrigger value="greynoise" className="data-[state=active]:bg-gray-600">
                  GreyNoise
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Resumen de Hallazgos</CardTitle>
                  <CardDescription className="text-gray-300">
                    Información consolidada de todas las fuentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-5 w-5 text-blue-400" />
                          <h3 className="font-medium text-white">Información Geográfica</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          {results.ipinfo && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-300">País:</span>
                                <span className="text-white">{results.ipinfo.country}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Región:</span>
                                <span className="text-white">{results.ipinfo.region}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Ciudad:</span>
                                <span className="text-white">{results.ipinfo.city}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Coordenadas:</span>
                                <span className="text-white">{results.ipinfo.loc}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Organización:</span>
                                <span className="text-white">{results.ipinfo.org}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          <h3 className="font-medium text-white">Evaluación de Riesgo</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          {results.abuseipdb && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Puntuación de abuso:</span>
                              <span
                                className={
                                  results.abuseipdb.abuseScore > 50
                                    ? "text-red-400"
                                    : results.abuseipdb.abuseScore > 20
                                      ? "text-yellow-400"
                                      : "text-green-400"
                                }
                              >
                                {results.abuseipdb.abuseScore}/100
                              </span>
                            </div>
                          )}
                          {results.greynoise && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">GreyNoise:</span>
                              <span
                                className={
                                  results.greynoise.classification === "malicious" ? "text-red-400" : "text-green-400"
                                }
                              >
                                {results.greynoise.classification}
                              </span>
                            </div>
                          )}
                          {results.ipinfo && results.ipinfo.privacy && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-300">VPN:</span>
                                <span className={results.ipinfo.privacy.vpn ? "text-yellow-400" : "text-green-400"}>
                                  {results.ipinfo.privacy.vpn ? "Sí" : "No"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Proxy:</span>
                                <span className={results.ipinfo.privacy.proxy ? "text-yellow-400" : "text-green-400"}>
                                  {results.ipinfo.privacy.proxy ? "Sí" : "No"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Tor:</span>
                                <span className={results.ipinfo.privacy.tor ? "text-red-400" : "text-green-400"}>
                                  {results.ipinfo.privacy.tor ? "Sí" : "No"}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Sección de alertas */}
                    <div className="space-y-3">
                      {results.abuseipdb && results.abuseipdb.abuseScore > 50 && (
                        <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">IP reportada por actividad maliciosa</p>
                            <p className="text-gray-300 text-sm">
                              Esta IP tiene una puntuación de abuso de {results.abuseipdb.abuseScore}/100 con{" "}
                              {results.abuseipdb.reports} reportes.
                            </p>
                            {results.abuseipdb.categories.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {results.abuseipdb.categories.map((category: string, i: number) => (
                                  <Badge key={i} className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border-none">
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {results.greynoise && results.greynoise.seen && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Actividad de escaneo detectada</p>
                            <p className="text-gray-300 text-sm">
                              GreyNoise ha detectado que esta IP está realizando escaneos en internet.
                            </p>
                            {results.greynoise.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {results.greynoise.tags.map((tag: string, i: number) => (
                                  <Badge
                                    key={i}
                                    className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border-none"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {((results.ipinfo &&
                        (results.ipinfo.privacy?.vpn ||
                          results.ipinfo.privacy?.proxy ||
                          results.ipinfo.privacy?.tor)) ||
                        (results.ipapi && results.ipapi.proxy)) && (
                        <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg flex items-start gap-3">
                          <Globe className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Servicio de anonimización detectado</p>
                            <p className="text-gray-300 text-sm">
                              Esta IP está asociada con servicios que pueden ocultar la identidad real del usuario.
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {results.ipinfo?.privacy?.vpn && (
                                <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">
                                  VPN
                                </Badge>
                              )}
                              {(results.ipinfo?.privacy?.proxy || results.ipapi?.proxy) && (
                                <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">
                                  Proxy
                                </Badge>
                              )}
                              {results.ipinfo?.privacy?.tor && (
                                <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">
                                  Tor
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {results.abuseipdb && (
              <TabsContent value="abuseipdb" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">AbuseIPDB</CardTitle>
                      <CardDescription className="text-gray-300">Información sobre reportes de abuso</CardDescription>
                    </div>
                    <a
                      href={`https://www.abuseipdb.com/check/${results.ip}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                    >
                      Ver en AbuseIPDB <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Puntuación de Abuso</span>
                        <Badge
                          className={
                            results.abuseipdb.abuseScore > 50
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : results.abuseipdb.abuseScore > 20
                                ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }
                        >
                          {results.abuseipdb.abuseScore}/100
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Detalles de Reportes</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Número de reportes:</span>
                              <span className="text-white">{results.abuseipdb.reports}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Reportadores distintos:</span>
                              <span className="text-white">{results.abuseipdb.reporters}</span>
                            </div>
                            {results.abuseipdb.lastReported && (
                              <div className="flex justify-between">
                                <span className="text-gray-300">Último reporte:</span>
                                <span className="text-white">{results.abuseipdb.lastReported}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {results.abuseipdb.categories.length > 0 && (
                          <div className="bg-gray-700 p-3 rounded-lg">
                            <h3 className="font-medium text-white mb-2">Categorías de Abuso</h3>
                            <div className="flex flex-wrap gap-2">
                              {results.abuseipdb.categories.map((category: string, i: number) => (
                                <Badge key={i} className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border-none">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {results.abuseipdb.comments.length > 0 && (
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Comentarios de Reportes</h3>
                          <div className="space-y-2">
                            {results.abuseipdb.comments.map((comment: string, i: number) => (
                              <div key={i} className="bg-gray-800 p-2 rounded text-sm text-white">
                                "{comment}"
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.ipinfo && (
              <TabsContent value="ipinfo" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">IPinfo.io</CardTitle>
                      <CardDescription className="text-gray-300">Información detallada sobre la IP</CardDescription>
                    </div>
                    <a
                      href={`https://ipinfo.io/${results.ip}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                    >
                      Ver en IPinfo <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Información Geográfica</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">País:</span>
                              <span className="text-white">{results.ipinfo.country}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Región:</span>
                              <span className="text-white">{results.ipinfo.region}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Ciudad:</span>
                              <span className="text-white">{results.ipinfo.city}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Código Postal:</span>
                              <span className="text-white">{results.ipinfo.postal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Coordenadas:</span>
                              <span className="text-white">{results.ipinfo.loc}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Zona Horaria:</span>
                              <span className="text-white">{results.ipinfo.timezone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Información de Red</h3>
                          <div className="space-y-2 text-sm">
                            {results.ipinfo.hostname && (
                              <div className="flex justify-between">
                                <span className="text-gray-300">Hostname:</span>
                                <span className="text-white">{results.ipinfo.hostname}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-300">ASN:</span>
                              <span className="text-white">{results.ipinfo.asn.asn}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Nombre ASN:</span>
                              <span className="text-white">{results.ipinfo.asn.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Dominio:</span>
                              <span className="text-white">{results.ipinfo.asn.domain}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Ruta:</span>
                              <span className="text-white">{results.ipinfo.asn.route}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Tipo:</span>
                              <span className="text-white capitalize">{results.ipinfo.asn.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Información de Compañía</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Nombre:</span>
                              <span className="text-white">{results.ipinfo.company.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Dominio:</span>
                              <span className="text-white">{results.ipinfo.company.domain}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Tipo:</span>
                              <span className="text-white capitalize">{results.ipinfo.company.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Privacidad</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">VPN:</span>
                              <span className={results.ipinfo.privacy.vpn ? "text-yellow-400" : "text-green-400"}>
                                {results.ipinfo.privacy.vpn ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Proxy:</span>
                              <span className={results.ipinfo.privacy.proxy ? "text-yellow-400" : "text-green-400"}>
                                {results.ipinfo.privacy.proxy ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Tor:</span>
                              <span className={results.ipinfo.privacy.tor ? "text-red-400" : "text-green-400"}>
                                {results.ipinfo.privacy.tor ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Hosting:</span>
                              <span className={results.ipinfo.privacy.hosting ? "text-blue-400" : "text-green-400"}>
                                {results.ipinfo.privacy.hosting ? "Sí" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.ipapi && (
              <TabsContent value="ipapi" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">ip-api.com</CardTitle>
                      <CardDescription className="text-gray-300">Información geográfica y de red</CardDescription>
                    </div>
                    <a
                      href={`http://ip-api.com/json/${results.ip}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                    >
                      Ver en ip-api <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Información Geográfica</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">País:</span>
                              <span className="text-white">
                                {results.ipapi.country} ({results.ipapi.countryCode})
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Región:</span>
                              <span className="text-white">
                                {results.ipapi.regionName} ({results.ipapi.region})
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Ciudad:</span>
                              <span className="text-white">{results.ipapi.city}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Código Postal:</span>
                              <span className="text-white">{results.ipapi.zip}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Coordenadas:</span>
                              <span className="text-white">
                                {results.ipapi.lat}, {results.ipapi.lon}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Zona Horaria:</span>
                              <span className="text-white">{results.ipapi.timezone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Información de Red</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">ISP:</span>
                              <span className="text-white">{results.ipapi.isp}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Organización:</span>
                              <span className="text-white">{results.ipapi.org}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">AS:</span>
                              <span className="text-white">{results.ipapi.as}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Móvil:</span>
                              <span className={results.ipapi.mobile ? "text-yellow-400" : "text-green-400"}>
                                {results.ipapi.mobile ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Proxy:</span>
                              <span className={results.ipapi.proxy ? "text-yellow-400" : "text-green-400"}>
                                {results.ipapi.proxy ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Hosting:</span>
                              <span className={results.ipapi.hosting ? "text-blue-400" : "text-green-400"}>
                                {results.ipapi.hosting ? "Sí" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.greynoise && (
              <TabsContent value="greynoise" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">GreyNoise</CardTitle>
                      <CardDescription className="text-gray-300">
                        Información sobre actividad de escaneo
                      </CardDescription>
                    </div>
                    <a
                      href={`https://viz.greynoise.io/ip/${results.ip}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                    >
                      Ver en GreyNoise <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Estado</span>
                        <Badge
                          className={
                            results.greynoise.classification === "malicious"
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }
                        >
                          {results.greynoise.seen ? "Visto" : "No visto"} - {results.greynoise.classification}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.greynoise.seen && (
                          <>
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Detalles de Actividad</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Última vez visto:</span>
                                  <span className="text-white">{results.greynoise.last_seen}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Actor:</span>
                                  <span className="text-white">{results.greynoise.actor || "Desconocido"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Categoría:</span>
                                  <span className="text-white capitalize">{results.greynoise.metadata.category}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Fuente:</span>
                                  <span className="text-white capitalize">{results.greynoise.metadata.source}</span>
                                </div>
                              </div>
                            </div>

                            {results.greynoise.tags.length > 0 && (
                              <div className="bg-gray-700 p-3 rounded-lg">
                                <h3 className="font-medium text-white mb-2">Etiquetas</h3>
                                <div className="flex flex-wrap gap-2">
                                  {results.greynoise.tags.map((tag: string, i: number) => (
                                    <Badge
                                      key={i}
                                      className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border-none"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {results.greynoise.cve.length > 0 && (
                              <div className="bg-gray-700 p-3 rounded-lg">
                                <h3 className="font-medium text-white mb-2">CVEs Relacionados</h3>
                                <div className="space-y-2">
                                  {results.greynoise.cve.map((cve: string, i: number) => (
                                    <div key={i} className="bg-gray-800 p-2 rounded flex items-center gap-2">
                                      <AlertTriangle className="h-4 w-4 text-red-400" />
                                      <span className="text-sm text-white">{cve}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Metadatos</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Organización:</span>
                                  <span className="text-white">{results.greynoise.metadata.organization}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Sistema Operativo:</span>
                                  <span className="text-white">{results.greynoise.metadata.os}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">ASN:</span>
                                  <span className="text-white">{results.greynoise.metadata.asn}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Datos Técnicos</h3>
                              <div className="space-y-2 text-sm">
                                {results.greynoise.raw_data.scan_reason && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-300">Razón de escaneo:</span>
                                    <span className="text-white">{results.greynoise.raw_data.scan_reason}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-gray-300">JA3:</span>
                                  <span className="text-white font-mono text-xs">{results.greynoise.raw_data.ja3}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Puertos:</span>
                                  <span className="text-white">{results.greynoise.raw_data.ports.join(", ")}</span>
                                </div>
                                {results.greynoise.raw_data.web_paths.length > 0 && (
                                  <div>
                                    <span className="text-gray-300">Rutas web escaneadas:</span>
                                    <div className="mt-1 space-y-1">
                                      {results.greynoise.raw_data.web_paths.map((path: string, i: number) => (
                                        <div key={i} className="bg-gray-800 p-1 rounded text-xs font-mono text-white">
                                          {path}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </div>
  )
}
