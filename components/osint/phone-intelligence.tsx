"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, Phone, AlertTriangle, CheckCircle, Download, Database, ExternalLink } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PhoneIntelligence() {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [selectedApis, setSelectedApis] = useState({
    numverify: true,
    fullcontact: true,
  })

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!phone || !Object.values(selectedApis).some(Boolean)) return

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
      setResults({
        phone,
        numverify: selectedApis.numverify
          ? {
              valid: Math.random() > 0.2,
              number: phone.replace(/\D/g, ""),
              local_format: phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
              international_format: "+" + phone.replace(/\D/g, ""),
              country_prefix: "+1",
              country_code: "US",
              country_name: "United States",
              location: "California",
              carrier: "Verizon",
              line_type: Math.random() > 0.7 ? "mobile" : Math.random() > 0.5 ? "landline" : "voip",
            }
          : null,
        fullcontact: selectedApis.fullcontact
          ? {
              found: Math.random() > 0.4,
              details: {
                name: {
                  full: "John Smith",
                  first: "John",
                  last: "Smith",
                },
                age: "30-40",
                gender: "Male",
                emails: ["john.smith@example.com", "jsmith@company.com"].slice(0, Math.floor(Math.random() * 3)),
                addresses: [
                  {
                    formatted: "123 Main St, San Francisco, CA 94105",
                    street: "123 Main St",
                    city: "San Francisco",
                    state: "CA",
                    postal_code: "94105",
                    country: "US",
                  },
                ].slice(0, Math.floor(Math.random() * 2)),
                social_profiles: [
                  {
                    type: "linkedin",
                    url: "https://linkedin.com/in/johnsmith",
                    username: "johnsmith",
                  },
                  {
                    type: "twitter",
                    url: "https://twitter.com/johnsmith",
                    username: "johnsmith",
                  },
                  {
                    type: "facebook",
                    url: "https://facebook.com/johnsmith",
                    username: "johnsmith",
                  },
                ].slice(0, Math.floor(Math.random() * 4)),
                employment: [
                  {
                    name: "Tech Company Inc.",
                    title: "Software Engineer",
                    start_date: "2018-03",
                    current: true,
                  },
                  {
                    name: "Previous Corp",
                    title: "Junior Developer",
                    start_date: "2015-06",
                    end_date: "2018-02",
                    current: false,
                  },
                ].slice(0, Math.floor(Math.random() * 3)),
              },
            }
          : null,
      })
    } catch (error) {
      console.error("Error al buscar información del teléfono:", error)
    } finally {
      clearInterval(interval)
      setProgress(100)
      setLoading(false)
    }
  }

  function saveToDatabase() {
    if (!results) return
    // Simulación de guardado en base de datos
    alert(`Teléfono ${results.phone} y todos sus resultados guardados en la base de datos`)
  }

  function downloadResults() {
    if (!results) return
    // Crear y descargar archivo JSON
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `phone_intel_${results.phone.replace(/\D/g, "")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Inteligencia de Teléfono</CardTitle>
          <CardDescription className="text-gray-300">
            Busca información sobre números de teléfono en múltiples fuentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder="Ingresa un número de teléfono (ej: +1 555-123-4567)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading || !phone || !Object.values(selectedApis).some(Boolean)}>
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
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numverify"
                    checked={selectedApis.numverify}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, numverify: checked as boolean })}
                  />
                  <Label htmlFor="numverify" className="text-gray-300">
                    Numverify
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fullcontact"
                    checked={selectedApis.fullcontact}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, fullcontact: checked as boolean })}
                  />
                  <Label htmlFor="fullcontact" className="text-gray-300">
                    FullContact
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
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">{results.phone}</h2>
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
              {results.numverify && (
                <TabsTrigger value="numverify" className="data-[state=active]:bg-gray-600">
                  Numverify
                </TabsTrigger>
              )}
              {results.fullcontact && (
                <TabsTrigger value="fullcontact" className="data-[state=active]:bg-gray-600">
                  FullContact
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
                          <Phone className="h-5 w-5 text-blue-400" />
                          <h3 className="font-medium text-white">Información Básica</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          {results.numverify && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Número:</span>
                                <span className="text-white">{results.numverify.international_format}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Formato local:</span>
                                <span className="text-white">{results.numverify.local_format}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">País:</span>
                                <span className="text-white">{results.numverify.country_name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Ubicación:</span>
                                <span className="text-white">{results.numverify.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Operador:</span>
                                <span className="text-white">{results.numverify.carrier}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Tipo:</span>
                                <span className="text-white capitalize">{results.numverify.line_type}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {results.fullcontact && results.fullcontact.found && (
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <h3 className="font-medium text-white">Información Personal</h3>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Nombre:</span>
                              <span className="text-white">{results.fullcontact.details.name.full}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Edad:</span>
                              <span className="text-white">{results.fullcontact.details.age}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Género:</span>
                              <span className="text-white">{results.fullcontact.details.gender}</span>
                            </div>
                            {results.fullcontact.details.employment &&
                              results.fullcontact.details.employment.length > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Empleo:</span>
                                  <span className="text-white">
                                    {results.fullcontact.details.employment[0].title} en{" "}
                                    {results.fullcontact.details.employment[0].name}
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sección de alertas */}
                    <div className="space-y-3">
                      {results.numverify && !results.numverify.valid && (
                        <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Número de teléfono inválido</p>
                            <p className="text-gray-300 text-sm">
                              Este número de teléfono no parece ser válido o no está en servicio.
                            </p>
                          </div>
                        </div>
                      )}

                      {results.numverify && results.numverify.valid && results.numverify.line_type === "voip" && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Número VoIP detectado</p>
                            <p className="text-gray-300 text-sm">
                              Este número es un servicio de VoIP, lo que podría indicar un número temporal o no
                              personal.
                            </p>
                          </div>
                        </div>
                      )}

                      {results.fullcontact &&
                        results.fullcontact.found &&
                        results.fullcontact.details.social_profiles &&
                        results.fullcontact.details.social_profiles.length > 0 && (
                          <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-white font-medium">Perfiles sociales encontrados</p>
                              <p className="text-gray-300 text-sm">
                                Se encontraron {results.fullcontact.details.social_profiles.length} perfiles sociales
                                asociados a este número.
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {results.fullcontact.details.social_profiles.map((profile: any, i: number) => (
                                  <Badge
                                    key={i}
                                    className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none"
                                  >
                                    {profile.type}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {results.numverify && (
              <TabsContent value="numverify" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Numverify</CardTitle>
                    <CardDescription className="text-gray-300">
                      Información de validación y detalles del número
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Estado</span>
                        <Badge
                          className={
                            results.numverify.valid
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          }
                        >
                          {results.numverify.valid ? "Válido" : "Inválido"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Información del Número</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Número internacional:</span>
                              <span className="text-white">{results.numverify.international_format}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Número local:</span>
                              <span className="text-white">{results.numverify.local_format}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Prefijo de país:</span>
                              <span className="text-white">{results.numverify.country_prefix}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Código de país:</span>
                              <span className="text-white">{results.numverify.country_code}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Detalles del Operador</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">País:</span>
                              <span className="text-white">{results.numverify.country_name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Ubicación:</span>
                              <span className="text-white">{results.numverify.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Operador:</span>
                              <span className="text-white">{results.numverify.carrier}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Tipo de línea:</span>
                              <span className="text-white capitalize">{results.numverify.line_type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.fullcontact && (
              <TabsContent value="fullcontact" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">FullContact</CardTitle>
                    <CardDescription className="text-gray-300">Información personal asociada al número</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Estado</span>
                        <Badge
                          className={
                            results.fullcontact.found
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          }
                        >
                          {results.fullcontact.found ? "Información encontrada" : "No encontrado"}
                        </Badge>
                      </div>

                      {results.fullcontact.found && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-700 p-3 rounded-lg">
                            <h3 className="font-medium text-white mb-2">Información Personal</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-300">Nombre completo:</span>
                                <span className="text-white">{results.fullcontact.details.name.full}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Nombre:</span>
                                <span className="text-white">{results.fullcontact.details.name.first}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Apellido:</span>
                                <span className="text-white">{results.fullcontact.details.name.last}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Edad:</span>
                                <span className="text-white">{results.fullcontact.details.age}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Género:</span>
                                <span className="text-white">{results.fullcontact.details.gender}</span>
                              </div>
                            </div>
                          </div>

                          {results.fullcontact.details.emails && results.fullcontact.details.emails.length > 0 && (
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Emails Asociados</h3>
                              <div className="space-y-2">
                                {results.fullcontact.details.emails.map((email: string, i: number) => (
                                  <div key={i} className="bg-gray-800 p-2 rounded text-sm text-white">
                                    {email}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {results.fullcontact.details.addresses &&
                            results.fullcontact.details.addresses.length > 0 && (
                              <div className="bg-gray-700 p-3 rounded-lg">
                                <h3 className="font-medium text-white mb-2">Direcciones</h3>
                                <div className="space-y-2">
                                  {results.fullcontact.details.addresses.map((address: any, i: number) => (
                                    <div key={i} className="bg-gray-800 p-2 rounded text-sm text-white">
                                      {address.formatted}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {results.fullcontact.details.social_profiles &&
                            results.fullcontact.details.social_profiles.length > 0 && (
                              <div className="bg-gray-700 p-3 rounded-lg">
                                <h3 className="font-medium text-white mb-2">Perfiles Sociales</h3>
                                <div className="space-y-2">
                                  {results.fullcontact.details.social_profiles.map((profile: any, i: number) => (
                                    <div key={i} className="bg-gray-800 p-2 rounded flex justify-between items-center">
                                      <span className="text-sm text-white capitalize">{profile.type}</span>
                                      <a
                                        href={profile.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                                      >
                                        {profile.username} <ExternalLink className="h-3 w-3" />
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {results.fullcontact.details.employment &&
                            results.fullcontact.details.employment.length > 0 && (
                              <div className="bg-gray-700 p-3 rounded-lg">
                                <h3 className="font-medium text-white mb-2">Historial Laboral</h3>
                                <div className="space-y-2">
                                  {results.fullcontact.details.employment.map((job: any, i: number) => (
                                    <div key={i} className="bg-gray-800 p-2 rounded">
                                      <div className="flex justify-between">
                                        <span className="text-sm font-medium text-white">{job.name}</span>
                                        <Badge
                                          className={
                                            job.current
                                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                              : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                                          }
                                        >
                                          {job.current ? "Actual" : "Anterior"}
                                        </Badge>
                                      </div>
                                      <div className="text-xs text-gray-300 mt-1">
                                        <span>{job.title}</span>
                                        <span className="mx-2">•</span>
                                        <span>
                                          {job.start_date}
                                          {job.end_date ? ` - ${job.end_date}` : ""}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      )}
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
