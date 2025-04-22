"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Search,
  Mail,
  User,
  Globe,
  Phone,
  Shield,
  AlertTriangle,
  Check,
  X,
  Info,
  MapPin,
  Link2,
  ExternalLink,
} from "lucide-react"

export function TargetProfiler() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [targetType, setTargetType] = useState<"email" | "username" | "ip" | "phone" | null>(null)

  const detectTargetType = (input: string): "email" | "username" | "ip" | "phone" | null => {
    // Email regex
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      return "email"
    }
    // IP regex (simple version)
    if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(input)) {
      return "ip"
    }
    // Phone regex (simple international format)
    if (/^\+?[0-9]{8,15}$/.test(input)) {
      return "phone"
    }
    // Username (if not any of the above and has valid chars)
    if (/^[a-zA-Z0-9_.-]+$/.test(input)) {
      return "username"
    }

    return null
  }

  const getTargetTypeIcon = () => {
    switch (targetType) {
      case "email":
        return <Mail className="h-5 w-5" />
      case "username":
        return <User className="h-5 w-5" />
      case "ip":
        return <Globe className="h-5 w-5" />
      case "phone":
        return <Phone className="h-5 w-5" />
      default:
        return <Search className="h-5 w-5" />
    }
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    const detectedType = detectTargetType(query.trim())
    setTargetType(detectedType)

    if (!detectedType) {
      setError("Formato no válido. Introduce un email, nombre de usuario, IP o teléfono.")
      setResults(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Datos de ejemplo según el tipo
      let mockData

      switch (detectedType) {
        case "email":
          mockData = {
            type: "email",
            query: query.trim(),
            email: query.trim(),
            breaches: [
              { name: "Adobe", date: "2013-10-04", count: 153000000 },
              { name: "LinkedIn", date: "2016-05-18", count: 164611595 },
            ],
            reputation: { score: 85, risk: "low" },
            domains: ["example.com", "example.org"],
            first_seen: "2015-03-12",
            last_seen: "2023-01-15",
            social_profiles: ["LinkedIn", "Twitter", "GitHub"],
          }
          break

        case "username":
          mockData = {
            type: "username",
            query: query.trim(),
            username: query.trim(),
            found_on: ["GitHub", "Twitter", "Reddit", "HackerNews"],
            reputation: { score: 92, risk: "low" },
            related_emails: ["user@example.com", "user.name@example.org"],
            first_seen: "2014-05-22",
            last_seen: "2023-02-10",
          }
          break

        case "ip":
          mockData = {
            type: "ip",
            query: query.trim(),
            ip: query.trim(),
            geolocation: {
              country: "Estados Unidos",
              city: "Mountain View",
              coordinates: [37.4056, -122.0775],
            },
            asn: {
              number: "AS15169",
              name: "Google LLC",
              route: "8.8.8.0/24",
            },
            reputation: { score: 95, risk: "low" },
            open_ports: [80, 443],
            blacklists: { listed: false, count: 0 },
          }
          break

        case "phone":
          mockData = {
            type: "phone",
            query: query.trim(),
            phone: query.trim(),
            valid: true,
            country: "España",
            carrier: "Movistar",
            line_type: "mobile",
            social_profiles: ["WhatsApp", "Telegram"],
            breaches: { found: true, count: 1 },
          }
          break
      }

      setResults(mockData)
    } catch (err) {
      setError("Error al procesar la solicitud. Inténtalo de nuevo.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Perfilador de Objetivos</CardTitle>
          <CardDescription>
            Introduce un email, nombre de usuario, IP o teléfono para obtener un perfil completo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Email, username, IP o teléfono"
                className="pl-10 bg-gray-700 border-gray-600 text-white"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-4 rounded-full bg-blue-400/30 mr-2" />
                  Analizando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analizar
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-md text-red-400 text-sm flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          {!results && !isLoading && !error && (
            <div className="mt-8 text-center text-gray-400">
              <Search className="mx-auto h-12 w-12 text-gray-500 mb-3" />
              <p>Introduce un objetivo para comenzar el análisis</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30">ejemplo@dominio.com</Badge>
                <Badge className="bg-green-600/20 text-green-400 hover:bg-green-600/30">username123</Badge>
                <Badge className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30">8.8.8.8</Badge>
                <Badge className="bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30">+34612345678</Badge>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
                <div className="ml-4 space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-gray-700" />
                  <Skeleton className="h-4 w-[200px] bg-gray-700" />
                </div>
              </div>
              <Skeleton className="h-[300px] w-full bg-gray-700" />
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                  {getTargetTypeIcon()}
                </div>
                <div>
                  <CardTitle className="text-white">{results.query}</CardTitle>
                  <CardDescription className="flex items-center">
                    {targetType === "email" && "Dirección de correo electrónico"}
                    {targetType === "username" && "Nombre de usuario"}
                    {targetType === "ip" && "Dirección IP"}
                    {targetType === "phone" && "Número de teléfono"}
                    <Badge className="ml-2 bg-blue-600/20 text-blue-400">{targetType?.toUpperCase()}</Badge>
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700">
                Guardar perfil
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="bg-gray-700 w-full">
                <TabsTrigger value="summary" className="flex-1">
                  Resumen
                </TabsTrigger>
                {targetType === "email" && (
                  <TabsTrigger value="breaches" className="flex-1">
                    Filtraciones
                  </TabsTrigger>
                )}
                {targetType === "username" && (
                  <TabsTrigger value="platforms" className="flex-1">
                    Plataformas
                  </TabsTrigger>
                )}
                {targetType === "ip" && (
                  <TabsTrigger value="geo" className="flex-1">
                    Geolocalización
                  </TabsTrigger>
                )}
                {targetType === "phone" && (
                  <TabsTrigger value="carrier" className="flex-1">
                    Operador
                  </TabsTrigger>
                )}
                <TabsTrigger value="reputation" className="flex-1">
                  Reputación
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Información general */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Información general</h3>
                    <div className="space-y-2">
                      {targetType === "email" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Dominio:</span>
                            <span className="text-white">{results.email.split("@")[1]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Primera vez visto:</span>
                            <span className="text-white">{results.first_seen}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Última vez visto:</span>
                            <span className="text-white">{results.last_seen}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Filtraciones:</span>
                            <span className="text-white">{results.breaches.length}</span>
                          </div>
                        </>
                      )}

                      {targetType === "username" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Plataformas encontradas:</span>
                            <span className="text-white">{results.found_on.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Primera vez visto:</span>
                            <span className="text-white">{results.first_seen}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Última vez visto:</span>
                            <span className="text-white">{results.last_seen}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Emails relacionados:</span>
                            <span className="text-white">{results.related_emails.length}</span>
                          </div>
                        </>
                      )}

                      {targetType === "ip" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">País:</span>
                            <span className="text-white">{results.geolocation.country}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Ciudad:</span>
                            <span className="text-white">{results.geolocation.city}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">ASN:</span>
                            <span className="text-white">{results.asn.number}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Organización:</span>
                            <span className="text-white">{results.asn.name}</span>
                          </div>
                        </>
                      )}

                      {targetType === "phone" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">País:</span>
                            <span className="text-white">{results.country}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Operador:</span>
                            <span className="text-white">{results.carrier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tipo:</span>
                            <span className="text-white">{results.line_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Válido:</span>
                            <span className="text-white">{results.valid ? "Sí" : "No"}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Reputación */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Reputación</h3>
                    <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
                      <div
                        className={`
                        h-32 w-32 rounded-full flex items-center justify-center text-3xl font-bold
                        ${results.reputation.risk === "low" ? "bg-green-600/20 text-green-400" : ""}
                        ${results.reputation.risk === "medium" ? "bg-yellow-600/20 text-yellow-400" : ""}
                        ${results.reputation.risk === "high" ? "bg-red-600/20 text-red-400" : ""}
                      `}
                      >
                        {results.reputation.score}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-gray-300">Nivel de riesgo</p>
                        <Badge
                          className={`
                          mt-1
                          ${results.reputation.risk === "low" ? "bg-green-600/20 text-green-400" : ""}
                          ${results.reputation.risk === "medium" ? "bg-yellow-600/20 text-yellow-400" : ""}
                          ${results.reputation.risk === "high" ? "bg-red-600/20 text-red-400" : ""}
                        `}
                        >
                          {results.reputation.risk === "low" && "BAJO"}
                          {results.reputation.risk === "medium" && "MEDIO"}
                          {results.reputation.risk === "high" && "ALTO"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección específica según el tipo */}
                <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
                  {targetType === "email" && (
                    <>
                      <h3 className="text-lg font-medium text-white mb-3">Perfiles sociales</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.social_profiles.map((profile: string) => (
                          <Badge key={profile} className="bg-blue-600/20 text-blue-400">
                            {profile}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}

                  {targetType === "username" && (
                    <>
                      <h3 className="text-lg font-medium text-white mb-3">Plataformas encontradas</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.found_on.map((platform: string) => (
                          <Badge key={platform} className="bg-blue-600/20 text-blue-400">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}

                  {targetType === "ip" && (
                    <>
                      <h3 className="text-lg font-medium text-white mb-3">Puertos abiertos</h3>
                      {results.open_ports.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {results.open_ports.map((port: number) => (
                            <Badge key={port} className="bg-blue-600/20 text-blue-400">
                              Puerto {port}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400">No se encontraron puertos abiertos</p>
                      )}
                    </>
                  )}

                  {targetType === "phone" && (
                    <>
                      <h3 className="text-lg font-medium text-white mb-3">Servicios asociados</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.social_profiles.map((profile: string) => (
                          <Badge key={profile} className="bg-blue-600/20 text-blue-400">
                            {profile}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              {targetType === "email" && (
                <TabsContent value="breaches" className="mt-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Filtraciones detectadas</h3>
                    <div className="space-y-3">
                      {results.breaches.map((breach: any) => (
                        <div key={breach.name} className="bg-gray-700 rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-white">{breach.name}</p>
                            <p className="text-sm text-gray-400">Fecha: {breach.date}</p>
                          </div>
                          <Badge className="bg-red-600/20 text-red-400">
                            {breach.count.toLocaleString()} afectados
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )}

              {targetType === "username" && (
                <TabsContent value="platforms" className="mt-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Plataformas donde se encontró</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {results.found_on.map((platform: string) => (
                        <div key={platform} className="bg-gray-700 rounded-lg p-3 flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mr-3">
                            <Link2 className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{platform}</p>
                            <div className="flex items-center text-sm text-gray-400">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              <span>Ver perfil</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )}

              {targetType === "ip" && (
                <TabsContent value="geo" className="mt-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Geolocalización</h3>
                    <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-300">Mapa no disponible en esta versión</p>
                        <p className="text-sm text-gray-400">
                          Coordenadas: {results.geolocation.coordinates.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">País</p>
                        <p className="font-medium text-white">{results.geolocation.country}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Ciudad</p>
                        <p className="font-medium text-white">{results.geolocation.city}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">ASN</p>
                        <p className="font-medium text-white">{results.asn.number}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Organización</p>
                        <p className="font-medium text-white">{results.asn.name}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}

              {targetType === "phone" && (
                <TabsContent value="carrier" className="mt-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">Información del operador</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">País</p>
                        <p className="font-medium text-white">{results.country}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Operador</p>
                        <p className="font-medium text-white">{results.carrier}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Tipo de línea</p>
                        <p className="font-medium text-white">{results.line_type}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Estado</p>
                        <p className="font-medium text-white flex items-center">
                          {results.valid ? (
                            <>
                              <Check className="h-4 w-4 text-green-400 mr-1" />
                              Válido
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 text-red-400 mr-1" />
                              No válido
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-md font-medium text-white mb-2">Servicios asociados</h4>
                      <div className="flex flex-wrap gap-2">
                        {results.social_profiles.map((profile: string) => (
                          <Badge key={profile} className="bg-blue-600/20 text-blue-400">
                            {profile}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-md font-medium text-white mb-2">Filtraciones</h4>
                      {results.breaches.found ? (
                        <div className="bg-red-900/20 border border-red-900/50 rounded-md p-3 text-red-400 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          <div>
                            <p>Se ha encontrado este número en filtraciones de datos</p>
                            <p className="text-sm">Número de filtraciones: {results.breaches.count}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-green-900/20 border border-green-900/50 rounded-md p-3 text-green-400 flex items-center">
                          <Check className="h-5 w-5 mr-2" />
                          <p>No se ha encontrado este número en filtraciones de datos</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              )}

              <TabsContent value="reputation" className="mt-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">Análisis de reputación</h3>

                  <div className="flex flex-col items-center justify-center mb-6">
                    <div
                      className={`
                      h-32 w-32 rounded-full flex items-center justify-center text-3xl font-bold
                      ${results.reputation.risk === "low" ? "bg-green-600/20 text-green-400" : ""}
                      ${results.reputation.risk === "medium" ? "bg-yellow-600/20 text-yellow-400" : ""}
                      ${results.reputation.risk === "high" ? "bg-red-600/20 text-red-400" : ""}
                    `}
                    >
                      {results.reputation.score}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-300">Nivel de riesgo</p>
                      <Badge
                        className={`
                        mt-1
                        ${results.reputation.risk === "low" ? "bg-green-600/20 text-green-400" : ""}
                        ${results.reputation.risk === "medium" ? "bg-yellow-600/20 text-yellow-400" : ""}
                        ${results.reputation.risk === "high" ? "bg-red-600/20 text-red-400" : ""}
                      `}
                      >
                        {results.reputation.risk === "low" && "BAJO"}
                        {results.reputation.risk === "medium" && "MEDIO"}
                        {results.reputation.risk === "high" && "ALTO"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center text-green-400 mb-2">
                        <Check className="h-5 w-5" />
                      </div>
                      <p className="font-medium text-white text-center">Confiable</p>
                      <p className="text-sm text-gray-400 text-center">No hay indicios de actividad maliciosa</p>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mb-2">
                        <Info className="h-5 w-5" />
                      </div>
                      <p className="font-medium text-white text-center">Legítimo</p>
                      <p className="text-sm text-gray-400 text-center">Asociado a servicios legítimos</p>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-3 flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center text-green-400 mb-2">
                        <Shield className="h-5 w-5" />
                      </div>
                      <p className="font-medium text-white text-center">Seguro</p>
                      <p className="text-sm text-gray-400 text-center">No aparece en listas negras</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                <Search className="mr-2 h-4 w-4" />
                Nueva búsqueda
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                  Exportar resultados
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Añadir a Watchlist</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
