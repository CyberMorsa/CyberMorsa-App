"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Search,
  User,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Link2,
  ExternalLink,
  Info,
  Download,
  Eye,
  Plus,
  Loader2,
  Key,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Interfaces para tipado
interface SocialProfile {
  platform: string
  username: string
  url: string
  followers?: number
  connections?: number
  friends?: number
  posts?: number
  bio?: string
  verified?: boolean
  lastActive?: string
}

interface DataBreach {
  name: string
  date: string
  severity: "high" | "medium" | "low"
  info: string
  affectedData?: string[]
}

interface PersonData {
  query: string
  queryType: "name" | "email" | "username" | "phone"
  name?: string
  username?: string
  email?: string
  phone?: string
  location?: string
  socialProfiles: SocialProfile[]
  dataBreaches: DataBreach[]
  relatedEmails?: string[]
  relatedUsernames?: string[]
  relatedPhones?: string[]
  riskScore: number
  lastUpdated: string
  profileImage?: string
  bio?: string
  occupation?: string
  websites?: string[]
  ipAddresses?: string[]
  domains?: string[]
}

export function PersonIntelligenceSearcher() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [personData, setPersonData] = useState<PersonData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [needsApiKeys, setNeedsApiKeys] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Función para detectar el tipo de consulta
  const detectQueryType = (query: string): "name" | "email" | "username" | "phone" => {
    // Email regex
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query)) {
      return "email"
    }
    // Phone regex (simple international format)
    if (/^\+?[0-9]{8,15}$/.test(query)) {
      return "phone"
    }
    // Si tiene espacios, probablemente es un nombre
    if (/\s/.test(query)) {
      return "name"
    }
    // Por defecto asumimos que es un username
    return "username"
  }

  // Función para realizar la búsqueda OSINT
  const performOsintSearch = async (query: string) => {
    const queryType = detectQueryType(query)

    try {
      setIsLoading(true)
      setError(null)
      setNeedsApiKeys(false)

      // Realizamos la petición a nuestra API
      const response = await fetch("/api/osint/person-intelligence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          queryType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.needsApiKeys) {
          setNeedsApiKeys(true)
          throw new Error("Se requieren claves API para realizar búsquedas OSINT reales")
        }
        throw new Error(data.error || "Error al realizar la búsqueda OSINT")
      }

      // Guardamos en el historial
      if (!searchHistory.includes(query)) {
        setSearchHistory((prev) => [query, ...prev].slice(0, 10))
      }

      setPersonData(data)
    } catch (err) {
      console.error("Error en la búsqueda OSINT:", err)
      setError((err as Error).message || "Error al procesar la solicitud. Verifica tu conexión e inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    performOsintSearch(searchQuery.trim())
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const navigateToApiSettings = () => {
    router.push("/dashboard/settings/api-keys")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Buscador OSINT Avanzado</CardTitle>
          <CardDescription className="text-gray-400">
            Introduce un nombre, email, username o teléfono para realizar un análisis OSINT completo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Nombre, email, username o teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analizar
                </>
              )}
            </Button>
          </form>

          {searchHistory.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Búsquedas recientes:</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((query, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-700 hover:bg-gray-600 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(query)
                      performOsintSearch(query)
                    }}
                  >
                    {query}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {needsApiKeys && (
            <Alert className="mt-4 bg-yellow-900/20 border-yellow-900/50 text-yellow-400">
              <Key className="h-4 w-4" />
              <AlertTitle>Se requieren claves API</AlertTitle>
              <AlertDescription className="flex flex-col gap-2">
                <p>Para realizar búsquedas OSINT reales, necesitas configurar al menos una clave API.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-start border-yellow-500/50 text-yellow-400 hover:bg-yellow-900/20"
                  onClick={navigateToApiSettings}
                >
                  Configurar claves API
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {error && !needsApiKeys && (
            <Alert variant="destructive" className="mt-4 bg-red-900/20 border-red-900/50 text-red-400">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Buscando información en múltiples fuentes...</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Redes Sociales</p>
              <div className="flex items-center">
                <div className="animate-pulse bg-blue-500/20 h-2 w-full rounded"></div>
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Filtraciones</p>
              <div className="flex items-center">
                <div className="animate-pulse bg-red-500/20 h-2 w-full rounded"></div>
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Dominios</p>
              <div className="flex items-center">
                <div className="animate-pulse bg-green-500/20 h-2 w-full rounded"></div>
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Metadatos</p>
              <div className="flex items-center">
                <div className="animate-pulse bg-purple-500/20 h-2 w-full rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {personData && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 md:col-span-1">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Perfil Personal</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-600 text-white hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-600 text-white hover:bg-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-gray-400">Información básica del objetivo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={personData.profileImage || "/placeholder.svg"} alt={personData.name} />
                  <AvatarFallback className="bg-blue-700 text-white text-2xl">
                    {personData.name
                      ? personData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : personData.username?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-white">{personData.name}</h3>
                <p className="text-gray-400">@{personData.username}</p>
                {personData.occupation && (
                  <Badge className="mt-2 bg-blue-600/20 text-blue-400">{personData.occupation}</Badge>
                )}
              </div>

              <div className="space-y-4">
                {personData.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Email</p>
                      <p className="text-white">{personData.email}</p>
                    </div>
                  </div>
                )}

                {personData.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Teléfono</p>
                      <p className="text-white">{personData.phone}</p>
                    </div>
                  </div>
                )}

                {personData.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Ubicación</p>
                      <p className="text-white">{personData.location}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Puntuación de Riesgo</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            personData.riskScore > 70
                              ? "bg-red-500"
                              : personData.riskScore > 40
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${personData.riskScore}%` }}
                        ></div>
                      </div>
                      <span className="text-white">{personData.riskScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Última Actualización</p>
                    <p className="text-white">{personData.lastUpdated}</p>
                  </div>
                </div>

                {personData.websites && personData.websites.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Sitios Web</p>
                      <div className="space-y-1">
                        {personData.websites.map((website, index) => (
                          <p key={index} className="text-white flex items-center">
                            <Link2 className="h-3 w-3 mr-1" />
                            <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {website}
                            </a>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Información Detallada</CardTitle>
              <CardDescription className="text-gray-400">Análisis completo de la huella digital</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="social" className="w-full">
                <TabsList className="bg-gray-700 mb-4">
                  <TabsTrigger value="social" className="data-[state=active]:bg-gray-600">
                    Perfiles Sociales
                  </TabsTrigger>
                  <TabsTrigger value="breaches" className="data-[state=active]:bg-gray-600">
                    Filtraciones
                  </TabsTrigger>
                  <TabsTrigger value="related" className="data-[state=active]:bg-gray-600">
                    Información Relacionada
                  </TabsTrigger>
                  <TabsTrigger value="technical" className="data-[state=active]:bg-gray-600">
                    Datos Técnicos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="social" className="space-y-4">
                  {personData.socialProfiles.length > 0 ? (
                    personData.socialProfiles.map((profile, index) => (
                      <Card key={index} className="bg-gray-700 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                <Globe className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-white flex items-center">
                                  {profile.platform}
                                  {profile.verified && (
                                    <Badge className="ml-2 bg-green-500/20 text-green-400">Verificado</Badge>
                                  )}
                                </h4>
                                <p className="text-sm text-gray-400">{profile.username}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {profile.followers && (
                                <Badge className="bg-blue-500/20 text-blue-400">
                                  {profile.followers.toLocaleString()} seguidores
                                </Badge>
                              )}
                              {profile.connections && (
                                <Badge className="bg-blue-500/20 text-blue-400">
                                  {profile.connections.toLocaleString()} conexiones
                                </Badge>
                              )}
                              {profile.friends && (
                                <Badge className="bg-blue-500/20 text-blue-400">
                                  {profile.friends.toLocaleString()} amigos
                                </Badge>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-white hover:bg-gray-600"
                                onClick={() => window.open(profile.url, "_blank")}
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Visitar
                              </Button>
                            </div>
                          </div>
                          {profile.bio && (
                            <div className="mt-3 p-3 bg-gray-800 rounded-md text-gray-300 text-sm">{profile.bio}</div>
                          )}
                          {profile.lastActive && (
                            <div className="mt-2 text-xs text-gray-400">Última actividad: {profile.lastActive}</div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Info className="h-12 w-12 text-gray-500 mb-4" />
                      <p className="text-white text-lg font-medium">No se encontraron perfiles sociales</p>
                      <p className="text-gray-400">No se han encontrado perfiles sociales asociados a esta identidad</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="breaches" className="space-y-4">
                  {personData.dataBreaches.length > 0 ? (
                    <>
                      <Alert className="bg-yellow-900/20 border-yellow-900/50 text-yellow-400">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Información sensible</AlertTitle>
                        <AlertDescription>
                          Se han encontrado {personData.dataBreaches.length} filtraciones de datos asociadas a este
                          perfil.
                        </AlertDescription>
                      </Alert>

                      {personData.dataBreaches.map((breach, index) => (
                        <Card key={index} className={`border p-4 rounded-lg ${getSeverityColor(breach.severity)}`}>
                          <CardContent className="p-0">
                            <div className="flex items-start gap-3">
                              {breach.severity === "high" ? (
                                <AlertTriangle className="h-5 w-5 text-red-400" />
                              ) : breach.severity === "medium" ? (
                                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-blue-400" />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-white">{breach.name}</h4>
                                  <Badge className={getSeverityColor(breach.severity)}>
                                    {breach.severity === "high" && "Alto Riesgo"}
                                    {breach.severity === "medium" && "Riesgo Medio"}
                                    {breach.severity === "low" && "Riesgo Bajo"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">{breach.info}</p>
                                {breach.affectedData && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-400 mb-1">Datos afectados:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {breach.affectedData.map((data, i) => (
                                        <Badge key={i} variant="outline" className="border-gray-600 text-gray-300">
                                          {data}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="text-xs text-gray-400">Fecha: {breach.date}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                      <p className="text-white text-lg font-medium">No se encontraron filtraciones de datos</p>
                      <p className="text-gray-400">
                        Esta persona no aparece en las bases de datos de filtraciones conocidas
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="related" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {personData.relatedEmails && personData.relatedEmails.length > 0 && (
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-white text-base">Emails Relacionados</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {personData.relatedEmails.map((email, i) => (
                              <li key={i} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 text-blue-400 mr-2" />
                                  <span className="text-gray-300">{email}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                  onClick={() => {
                                    setSearchQuery(email)
                                    performOsintSearch(email)
                                  }}
                                >
                                  <Search className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {personData.relatedUsernames && personData.relatedUsernames.length > 0 && (
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-white text-base">Usernames Relacionados</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {personData.relatedUsernames.map((username, i) => (
                              <li key={i} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 text-blue-400 mr-2" />
                                  <span className="text-gray-300">@{username}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                  onClick={() => {
                                    setSearchQuery(username)
                                    performOsintSearch(username)
                                  }}
                                >
                                  <Search className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {personData.domains && personData.domains.length > 0 && (
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white text-base">Dominios Asociados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {personData.domains.map((domain, i) => (
                            <div key={i} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 text-blue-400 mr-2" />
                                <span className="text-gray-300">{domain}</span>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                  onClick={() => window.open(`https://${domain}`, "_blank")}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                  onClick={() => {
                                    setSearchQuery(domain)
                                    performOsintSearch(domain)
                                  }}
                                >
                                  <Search className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="technical" className="space-y-4">
                  {personData.ipAddresses && personData.ipAddresses.length > 0 && (
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white text-base">Direcciones IP</CardTitle>
                        <CardDescription className="text-gray-400">IPs asociadas con este perfil</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {personData.ipAddresses.map((ip, i) => (
                            <div key={i} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 text-blue-400 mr-2" />
                                <span className="text-gray-300">{ip}</span>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                  onClick={() => {
                                    setSearchQuery(ip)
                                    performOsintSearch(ip)
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-base">Análisis Técnico</CardTitle>
                      <CardDescription className="text-gray-400">Información técnica adicional</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Alert className="bg-blue-900/20 border-blue-900/50 text-blue-400">
                          <Info className="h-4 w-4" />
                          <AlertTitle>Información</AlertTitle>
                          <AlertDescription>
                            El análisis técnico avanzado está disponible en la versión premium.
                          </AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-800 p-3 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Análisis de Metadatos</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-gray-600 text-white hover:bg-gray-700"
                            >
                              Ejecutar Análisis
                            </Button>
                          </div>
                          <div className="bg-gray-800 p-3 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Búsqueda Avanzada</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-gray-600 text-white hover:bg-gray-700"
                            >
                              Iniciar Búsqueda
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => {
                    setSearchQuery("")
                    setPersonData(null)
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Nueva búsqueda
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar resultados
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir a Watchlist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
