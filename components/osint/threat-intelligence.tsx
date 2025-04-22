"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Save,
  AlertTriangle,
  FileText,
  Shield,
  Link,
  Hash,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

interface ThreatResult {
  type: "url" | "file" | "hash" | "ioc"
  indicator: string
  verdict: "malicious" | "suspicious" | "clean" | "unknown"
  confidence: number
  categories?: string[]
  firstSeen?: string
  lastSeen?: string
  detectionCount?: number
  totalEngines?: number
  malwareFamily?: string
  tags?: string[]
  threatActors?: string[]
  relatedIndicators?: {
    type: string
    value: string
    relation: string
  }[]
  details: Record<string, any>
  source: string
}

export function ThreatIntelligence() {
  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState("url")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ThreatResult[]>([])

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Por favor, introduce un indicador para analizar")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulación de búsqueda - en un entorno real, esto sería una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Datos de ejemplo
      const mockResults: ThreatResult[] = [
        {
          type: searchType as "url" | "file" | "hash" | "ioc",
          indicator: query,
          verdict: "malicious",
          confidence: 85,
          categories: ["phishing", "malware distribution"],
          firstSeen: "2023-01-15",
          lastSeen: "2023-04-22",
          detectionCount: 18,
          totalEngines: 25,
          malwareFamily: "Emotet",
          tags: ["banking", "trojan", "data theft"],
          threatActors: ["TA505"],
          relatedIndicators: [
            { type: "domain", value: "malicious-domain.com", relation: "resolves_to" },
            { type: "ip", value: "192.168.1.1", relation: "communicates_with" },
          ],
          details: {
            redirectChain: ["https://initial-redirect.com", "https://second-hop.net", query],
            ssl: {
              validFrom: "2023-01-01",
              validTo: "2023-12-31",
              issuer: "Let's Encrypt Authority X3",
            },
            whois: {
              registrar: "NameCheap Inc.",
              createdDate: "2023-01-01",
              updatedDate: "2023-01-01",
            },
          },
          source: "VirusTotal, AlienVault OTX, Malware Bazaar",
        },
      ]

      setResults(mockResults)
    } catch (err) {
      setError("Error al analizar el indicador. Por favor, inténtalo de nuevo.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `threat-intelligence-${searchType}-${new Date().toISOString()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleSave = () => {
    // En un entorno real, esto guardaría los resultados en una base de datos
    console.log("Guardando resultados en la base de datos:", results)
    // Mostrar notificación de éxito
    alert("Resultados guardados correctamente")
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "malicious":
        return "bg-red-500 text-white"
      case "suspicious":
        return "bg-yellow-500 text-white"
      case "clean":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "malicious":
        return <XCircle className="h-5 w-5" />
      case "suspicious":
        return <AlertCircle className="h-5 w-5" />
      case "clean":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Inteligencia de Amenazas</CardTitle>
        <CardDescription>Analiza URLs, archivos, hashes e indicadores de compromiso (IOCs)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo de indicador" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="file">Archivo</SelectItem>
                <SelectItem value="hash">Hash</SelectItem>
                <SelectItem value="ioc">IOC</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex w-full gap-2">
              {searchType === "file" ? (
                <Textarea
                  placeholder="Sube un archivo o pega su contenido base64"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 min-h-[80px]"
                />
              ) : (
                <Input
                  placeholder={`Introduce ${
                    searchType === "url"
                      ? "una URL"
                      : searchType === "hash"
                        ? "un hash (MD5, SHA1, SHA256)"
                        : "un indicador de compromiso"
                  }`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1"
                />
              )}
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Analizando..." : "Analizar"}
                {!isLoading && <Search className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Resumen del análisis</h3>
                <div className="mt-4 flex items-center gap-4">
                  <div
                    className={`flex items-center gap-2 rounded-md px-3 py-1 ${getVerdictColor(results[0].verdict)}`}
                  >
                    {getVerdictIcon(results[0].verdict)}
                    <span className="font-medium capitalize">{results[0].verdict}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Confianza:</span>
                    <div className="flex items-center gap-2">
                      <Progress value={results[0].confidence} className="h-2 w-24" />
                      <span className="text-sm font-medium">{results[0].confidence}%</span>
                    </div>
                  </div>
                  {results[0].detectionCount !== undefined && results[0].totalEngines !== undefined && (
                    <div>
                      <span className="text-sm text-muted-foreground">Detecciones:</span>
                      <span className="ml-2 font-medium">
                        {results[0].detectionCount}/{results[0].totalEngines}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    {searchType === "url" ? (
                      <Link className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    ) : searchType === "file" ? (
                      <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Hash className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <span className="text-sm text-muted-foreground">Indicador:</span>
                      <p className="break-all font-medium">{results[0].indicator}</p>
                    </div>
                  </div>

                  {results[0].malwareFamily && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-sm text-muted-foreground">Familia de malware:</span>
                        <p className="font-medium">{results[0].malwareFamily}</p>
                      </div>
                    </div>
                  )}

                  {results[0].firstSeen && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-sm text-muted-foreground">Primera detección:</span>
                        <p className="font-medium">{results[0].firstSeen}</p>
                      </div>
                    </div>
                  )}

                  {results[0].lastSeen && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-sm text-muted-foreground">Última detección:</span>
                        <p className="font-medium">{results[0].lastSeen}</p>
                      </div>
                    </div>
                  )}
                </div>

                {results[0].categories && results[0].categories.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Categorías</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {results[0].categories.map((category, index) => (
                        <Badge key={index} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {results[0].threatActors && results[0].threatActors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Actores de Amenaza</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {results[0].threatActors.map((actor, index) => (
                        <Badge key={index} variant="secondary">
                          {actor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {results[0].relatedIndicators && results[0].relatedIndicators.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Indicadores Relacionados</h4>
                    <div className="mt-1">
                      {results[0].relatedIndicators.map((related, index) => (
                        <div key={index} className="mb-2 flex items-center gap-2">
                          <Badge variant="outline">{related.type}</Badge>
                          <span>{related.value}</span>
                          <span className="text-muted-foreground">({related.relation})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList>
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="raw">Datos Crudos</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <ScrollArea className="h-[300px] w-full rounded-md border">
                    <div className="p-4">
                      {Object.entries(results[0].details).map(([key, value]) => (
                        <div key={key} className="mb-4">
                          <h5 className="text-sm font-medium">{key}</h5>
                          {typeof value === "object" ? (
                            <pre className="mt-1 rounded-md bg-muted p-2 font-mono text-sm">
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : (
                            <p className="mt-1">{String(value)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="raw">
                  <ScrollArea className="h-[300px] w-full rounded-md border">
                    <pre className="p-4 font-mono text-sm">{JSON.stringify(results[0], null, 2)}</pre>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          ) : null}
        </div>
      </CardContent>
      {results.length > 0 && (
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleExport}>
            Exportar <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={handleSave}>
            Guardar <Save className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
