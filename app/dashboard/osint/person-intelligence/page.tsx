"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, User, MapPin, Phone, Mail, Globe, Calendar, Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function PersonIntelligencePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [personData, setPersonData] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setPersonData(null)

    // Simulación de búsqueda
    setTimeout(() => {
      setPersonData({
        name: "Carlos Rodríguez",
        username: "carlos_r",
        email: "carlos.rodriguez@example.com",
        phone: "+34 612 345 678",
        location: "Madrid, España",
        socialProfiles: [
          { platform: "Twitter", username: "@carlos_r", url: "https://twitter.com/carlos_r", followers: 1243 },
          {
            platform: "LinkedIn",
            username: "carlosrodriguez",
            url: "https://linkedin.com/in/carlosrodriguez",
            connections: 500,
          },
          {
            platform: "Facebook",
            username: "carlos.rodriguez",
            url: "https://facebook.com/carlos.rodriguez",
            friends: 782,
          },
          {
            platform: "Instagram",
            username: "carlos.r.photo",
            url: "https://instagram.com/carlos.r.photo",
            followers: 2150,
          },
        ],
        dataBreaches: [
          { name: "LinkedInBreak", date: "2021-06-15", severity: "medium", info: "Email y contraseña expuestos" },
          { name: "Adobe2020", date: "2020-03-22", severity: "low", info: "Email expuesto" },
        ],
        riskScore: 65,
        lastUpdated: "2023-05-10",
        profileImage: "/placeholder.svg?height=200&width=200",
      })
      setIsLoading(false)
    }, 1500)
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Person Intelligence</h1>
        <p className="text-gray-400">Busca información sobre personas utilizando nombre, email o username</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Buscador de Personas</CardTitle>
          <CardDescription className="text-gray-400">
            Introduce un nombre, email o username para comenzar la búsqueda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Nombre, email o username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Buscando información...</p>
        </div>
      )}

      {personData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Perfil Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={personData.profileImage || "/placeholder.svg"} alt={personData.name} />
                  <AvatarFallback className="bg-blue-700 text-white text-2xl">
                    {personData.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-white">{personData.name}</h3>
                <p className="text-gray-400">@{personData.username}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Email</p>
                    <p className="text-white">{personData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Teléfono</p>
                    <p className="text-white">{personData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Ubicación</p>
                    <p className="text-white">{personData.location}</p>
                  </div>
                </div>

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
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Información Detallada</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="social" className="w-full">
                <TabsList className="bg-gray-700 mb-4">
                  <TabsTrigger value="social" className="data-[state=active]:bg-gray-600">
                    Perfiles Sociales
                  </TabsTrigger>
                  <TabsTrigger value="breaches" className="data-[state=active]:bg-gray-600">
                    Filtraciones de Datos
                  </TabsTrigger>
                  <TabsTrigger value="connections" className="data-[state=active]:bg-gray-600">
                    Conexiones
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="social" className="space-y-4">
                  {personData.socialProfiles.map((profile: any, index: number) => (
                    <Card key={index} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-blue-400" />
                            <div>
                              <h4 className="font-medium text-white">{profile.platform}</h4>
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
                              Visitar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="breaches" className="space-y-4">
                  {personData.dataBreaches.length > 0 ? (
                    personData.dataBreaches.map((breach: any, index: number) => (
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
                                  {breach.severity.charAt(0).toUpperCase() + breach.severity.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-300 mt-1">{breach.info}</p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-gray-400">Fecha: {breach.date}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
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

                <TabsContent value="connections" className="space-y-4">
                  <div className="flex flex-col items-center justify-center py-8">
                    <User className="h-12 w-12 text-blue-400 mb-4" />
                    <p className="text-white text-lg font-medium">Análisis de conexiones</p>
                    <p className="text-gray-400 text-center">
                      El análisis de conexiones está disponible en la versión premium.
                      <br />
                      Actualice su plan para acceder a esta función.
                    </p>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Actualizar Plan</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
