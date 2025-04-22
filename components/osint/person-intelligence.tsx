"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Save,
  AlertTriangle,
  User,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Globe,
  Calendar,
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

interface PersonResult {
  name: string
  age?: number
  location?: string
  occupation?: string
  email?: string
  phone?: string
  socialProfiles?: {
    platform: string
    username: string
    url: string
  }[]
  addresses?: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }[]
  relatedPersons?: {
    name: string
    relationship: string
  }[]
  riskScore?: number
  riskFactors?: string[]
  dataSource: string
}

export function PersonIntelligence() {
  const [query, setQuery] = useState("")
  const [searchType, setSearchType] = useState("name")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<PersonResult[]>([])

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Por favor, introduce un nombre o identificador para buscar")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulación de búsqueda - en un entorno real, esto sería una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Datos de ejemplo
      const mockResults: PersonResult[] = [
        {
          name: "Juan Pérez García",
          age: 42,
          location: "Madrid, España",
          occupation: "Desarrollador de Software",
          email: "juan.perez@example.com",
          phone: "+34 612 345 678",
          socialProfiles: [
            { platform: "LinkedIn", username: "juanperezgarcia", url: "https://linkedin.com/in/juanperezgarcia" },
            { platform: "Twitter", username: "@jperez", url: "https://twitter.com/jperez" },
          ],
          addresses: [
            {
              street: "Calle Serrano 123",
              city: "Madrid",
              state: "Comunidad de Madrid",
              country: "España",
              postalCode: "28006",
            },
          ],
          relatedPersons: [
            { name: "María Pérez", relationship: "Esposa" },
            { name: "Carlos Pérez", relationship: "Hijo" },
          ],
          riskScore: 15,
          riskFactors: ["Exposición de datos personales en redes sociales"],
          dataSource: "Fuentes públicas combinadas",
        },
      ]

      setResults(mockResults)
    } catch (err) {
      setError("Error al buscar información. Por favor, inténtalo de nuevo.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `person-intelligence-${query}-${new Date().toISOString()}.json`

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Inteligencia de Personas</CardTitle>
        <CardDescription>
          Busca información sobre personas por nombre, email, teléfono u otros identificadores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo de búsqueda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Teléfono</SelectItem>
                <SelectItem value="username">Usuario</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex w-full gap-2">
              <Input
                placeholder={`Introduce ${searchType === "name" ? "un nombre" : searchType === "email" ? "un email" : searchType === "phone" ? "un teléfono" : "un nombre de usuario"}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Buscando..." : "Buscar"}
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
                <h3 className="text-lg font-medium">Resumen de resultados</h3>
                <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">
                      Nombre: <strong>{results[0].name}</strong>
                    </span>
                  </div>
                  {results[0].age && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        Edad: <strong>{results[0].age} años</strong>
                      </span>
                    </div>
                  )}
                  {results[0].location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        Ubicación: <strong>{results[0].location}</strong>
                      </span>
                    </div>
                  )}
                  {results[0].occupation && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        Ocupación: <strong>{results[0].occupation}</strong>
                      </span>
                    </div>
                  )}
                  {results[0].email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        Email: <strong>{results[0].email}</strong>
                      </span>
                    </div>
                  )}
                  {results[0].phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        Teléfono: <strong>{results[0].phone}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {results[0].riskScore !== undefined && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Evaluación de riesgo</h4>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`rounded-full ${
                            results[0].riskScore < 30
                              ? "bg-green-500"
                              : results[0].riskScore < 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${results[0].riskScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{results[0].riskScore}%</span>
                    </div>
                    {results[0].riskFactors && results[0].riskFactors.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {results[0].riskFactors.map((factor, index) => (
                          <Badge key={index} variant="outline">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="social">Perfiles Sociales</TabsTrigger>
                  <TabsTrigger value="addresses">Direcciones</TabsTrigger>
                  <TabsTrigger value="relations">Relaciones</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Información detallada</h3>
                    <ScrollArea className="h-[300px] mt-2">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Nombre completo</h4>
                          <p>{results[0].name}</p>
                        </div>
                        {results[0].age && (
                          <div>
                            <h4 className="text-sm font-medium">Edad</h4>
                            <p>{results[0].age} años</p>
                          </div>
                        )}
                        {results[0].location && (
                          <div>
                            <h4 className="text-sm font-medium">Ubicación</h4>
                            <p>{results[0].location}</p>
                          </div>
                        )}
                        {results[0].occupation && (
                          <div>
                            <h4 className="text-sm font-medium">Ocupación</h4>
                            <p>{results[0].occupation}</p>
                          </div>
                        )}
                        {results[0].email && (
                          <div>
                            <h4 className="text-sm font-medium">Email</h4>
                            <p>{results[0].email}</p>
                          </div>
                        )}
                        {results[0].phone && (
                          <div>
                            <h4 className="text-sm font-medium">Teléfono</h4>
                            <p>{results[0].phone}</p>
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-medium">Fuente de datos</h4>
                          <p>{results[0].dataSource}</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="social">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Perfiles en redes sociales</h3>
                    <ScrollArea className="h-[300px] mt-2">
                      {results[0].socialProfiles && results[0].socialProfiles.length > 0 ? (
                        <div className="space-y-4">
                          {results[0].socialProfiles.map((profile, index) => (
                            <div key={index} className="rounded-md border p-3">
                              <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">{profile.platform}</span>
                              </div>
                              <div className="mt-2 space-y-1 text-sm">
                                <p>Usuario: {profile.username}</p>
                                <p>
                                  URL:{" "}
                                  <a
                                    href={profile.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    {profile.url}
                                  </a>
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No se encontraron perfiles en redes sociales.</p>
                      )}
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="addresses">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Direcciones conocidas</h3>
                    <ScrollArea className="h-[300px] mt-2">
                      {results[0].addresses && results[0].addresses.length > 0 ? (
                        <div className="space-y-4">
                          {results[0].addresses.map((address, index) => (
                            <div key={index} className="rounded-md border p-3">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Dirección {index + 1}</span>
                              </div>
                              <div className="mt-2 space-y-1 text-sm">
                                <p>{address.street}</p>
                                <p>
                                  {address.city}, {address.state}
                                </p>
                                <p>
                                  {address.postalCode}, {address.country}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No se encontraron direcciones.</p>
                      )}
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="relations">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Personas relacionadas</h3>
                    <ScrollArea className="h-[300px] mt-2">
                      {results[0].relatedPersons && results[0].relatedPersons.length > 0 ? (
                        <div className="space-y-4">
                          {results[0].relatedPersons.map((person, index) => (
                            <div key={index} className="rounded-md border p-3">
                              <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">{person.name}</span>
                              </div>
                              <div className="mt-1 text-sm">
                                <p>Relación: {person.relationship}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No se encontraron personas relacionadas.</p>
                      )}
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : null}
        </div>
      </CardContent>

      {results.length > 0 && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleExport}>
            Exportar JSON
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={handleSave}>
            Guardar resultados
            <Save className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
