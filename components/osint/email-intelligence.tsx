"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, AlertTriangle, CheckCircle, Download, Database, ExternalLink } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function EmailIntelligence() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [selectedApis, setSelectedApis] = useState({
    haveibeenpwned: true,
    dehashed: true,
    scylla: true,
    hunter: true,
    emailrep: true,
  })

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !Object.values(selectedApis).some(Boolean)) return

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
        email,
        haveibeenpwned: selectedApis.haveibeenpwned
          ? {
              breached: Math.random() > 0.5,
              breachCount: Math.floor(Math.random() * 10),
              breaches: ["Adobe", "LinkedIn", "Dropbox"].slice(0, Math.floor(Math.random() * 4)),
              lastBreach: "2021-05-17",
              firstBreach: "2016-09-22",
              pastes: Math.floor(Math.random() * 5),
            }
          : null,
        dehashed: selectedApis.dehashed
          ? {
              found: Math.random() > 0.3,
              entries: Math.floor(Math.random() * 5) + 1,
              passwords: ["5f4dcc3b5aa765d61d8327deb882cf99", "e10adc3949ba59abbe56e057f20f883e"].slice(
                0,
                Math.floor(Math.random() * 3),
              ),
              ips: ["192.168.1.1", "10.0.0.1"].slice(0, Math.floor(Math.random() * 3)),
              names: ["John Doe", "Jane Smith"].slice(0, Math.floor(Math.random() * 3)),
              phones: ["+1234567890", "+0987654321"].slice(0, Math.floor(Math.random() * 3)),
              sources: ["LinkedIn", "Adobe", "Twitter"].slice(0, Math.floor(Math.random() * 4)),
            }
          : null,
        scylla: selectedApis.scylla
          ? {
              found: Math.random() > 0.4,
              leaks: Math.floor(Math.random() * 4) + 1,
              passwords: ["password123", "qwerty123"].slice(0, Math.floor(Math.random() * 3)),
              sources: ["Collection #1", "AntiPublic"].slice(0, Math.floor(Math.random() * 3)),
            }
          : null,
        hunter: selectedApis.hunter
          ? {
              found: Math.random() > 0.2,
              domain: email.split("@")[1],
              company: "Example Corporation",
              score: Math.floor(Math.random() * 100),
              sources: Math.floor(Math.random() * 10) + 1,
              relatedEmails: ["john@" + email.split("@")[1], "info@" + email.split("@")[1]].slice(
                0,
                Math.floor(Math.random() * 3),
              ),
              pattern: "{first}@" + email.split("@")[1],
            }
          : null,
        emailrep: selectedApis.emailrep
          ? {
              reputation: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
              suspicious: Math.random() > 0.7,
              references: Math.floor(Math.random() * 10),
              details: {
                firstSeen: "2019-03-15",
                lastSeen: "2023-02-22",
                profiles: ["linkedin", "twitter", "github"].slice(0, Math.floor(Math.random() * 4)),
                malicious: Math.random() > 0.8,
                spam: Math.random() > 0.7,
                disposable: Math.random() > 0.9,
                freeProvider: Math.random() > 0.5,
                deliverable: Math.random() > 0.2,
                validMX: true,
              },
            }
          : null,
      })
    } catch (error) {
      console.error("Error al buscar información del email:", error)
    } finally {
      clearInterval(interval)
      setProgress(100)
      setLoading(false)
    }
  }

  function saveToDatabase() {
    if (!results) return
    // Simulación de guardado en base de datos
    alert(`Email ${results.email} y todos sus resultados guardados en la base de datos`)
  }

  function downloadResults() {
    if (!results) return
    // Crear y descargar archivo JSON
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `email_intel_${results.email.replace("@", "_at_")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Inteligencia de Email</CardTitle>
          <CardDescription className="text-gray-300">
            Busca información sobre direcciones de correo electrónico en múltiples fuentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Ingresa una dirección de email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading || !email || !Object.values(selectedApis).some(Boolean)}>
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
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="haveibeenpwned"
                    checked={selectedApis.haveibeenpwned}
                    onCheckedChange={(checked) =>
                      setSelectedApis({ ...selectedApis, haveibeenpwned: checked as boolean })
                    }
                  />
                  <Label htmlFor="haveibeenpwned" className="text-gray-300">
                    HaveIBeenPwned
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dehashed"
                    checked={selectedApis.dehashed}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, dehashed: checked as boolean })}
                  />
                  <Label htmlFor="dehashed" className="text-gray-300">
                    Dehashed
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scylla"
                    checked={selectedApis.scylla}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, scylla: checked as boolean })}
                  />
                  <Label htmlFor="scylla" className="text-gray-300">
                    Scylla.sh
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hunter"
                    checked={selectedApis.hunter}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, hunter: checked as boolean })}
                  />
                  <Label htmlFor="hunter" className="text-gray-300">
                    Hunter.io
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailrep"
                    checked={selectedApis.emailrep}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, emailrep: checked as boolean })}
                  />
                  <Label htmlFor="emailrep" className="text-gray-300">
                    EmailRep.io
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
              <h2 className="text-2xl font-bold text-white">{results.email}</h2>
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
              {results.haveibeenpwned && (
                <TabsTrigger value="haveibeenpwned" className="data-[state=active]:bg-gray-600">
                  HaveIBeenPwned
                </TabsTrigger>
              )}
              {results.dehashed && (
                <TabsTrigger value="dehashed" className="data-[state=active]:bg-gray-600">
                  Dehashed
                </TabsTrigger>
              )}
              {results.scylla && (
                <TabsTrigger value="scylla" className="data-[state=active]:bg-gray-600">
                  Scylla
                </TabsTrigger>
              )}
              {results.hunter && (
                <TabsTrigger value="hunter" className="data-[state=active]:bg-gray-600">
                  Hunter
                </TabsTrigger>
              )}
              {results.emailrep && (
                <TabsTrigger value="emailrep" className="data-[state=active]:bg-gray-600">
                  EmailRep
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="h-5 w-5 text-blue-400" />
                          <h3 className="font-medium text-white">Información Básica</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Email:</span>
                            <span className="text-white">{results.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Dominio:</span>
                            <span className="text-white">{results.email.split("@")[1]}</span>
                          </div>
                          {results.hunter && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Compañía:</span>
                              <span className="text-white">{results.hunter.company}</span>
                            </div>
                          )}
                          {results.emailrep && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Reputación:</span>
                              <span
                                className={
                                  results.emailrep.reputation === "high"
                                    ? "text-green-400"
                                    : results.emailrep.reputation === "medium"
                                      ? "text-yellow-400"
                                      : "text-red-400"
                                }
                              >
                                {results.emailrep.reputation === "high"
                                  ? "Alta"
                                  : results.emailrep.reputation === "medium"
                                    ? "Media"
                                    : "Baja"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          <h3 className="font-medium text-white">Exposición</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          {results.haveibeenpwned && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Brechas:</span>
                              <span className={results.haveibeenpwned.breached ? "text-red-400" : "text-green-400"}>
                                {results.haveibeenpwned.breached
                                  ? `${results.haveibeenpwned.breachCount} brechas`
                                  : "No encontrado"}
                              </span>
                            </div>
                          )}
                          {results.dehashed && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Dehashed:</span>
                              <span className={results.dehashed.found ? "text-red-400" : "text-green-400"}>
                                {results.dehashed.found ? `${results.dehashed.entries} entradas` : "No encontrado"}
                              </span>
                            </div>
                          )}
                          {results.scylla && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Scylla:</span>
                              <span className={results.scylla.found ? "text-red-400" : "text-green-400"}>
                                {results.scylla.found ? `${results.scylla.leaks} filtraciones` : "No encontrado"}
                              </span>
                            </div>
                          )}
                          {results.emailrep && results.emailrep.details && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Malicioso:</span>
                              <span className={results.emailrep.details.malicious ? "text-red-400" : "text-green-400"}>
                                {results.emailrep.details.malicious ? "Sí" : "No"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <h3 className="font-medium text-white">Validación</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          {results.emailrep && results.emailrep.details && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Entregable:</span>
                                <span
                                  className={results.emailrep.details.deliverable ? "text-green-400" : "text-red-400"}
                                >
                                  {results.emailrep.details.deliverable ? "Sí" : "No"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">MX Válido:</span>
                                <span className={results.emailrep.details.validMX ? "text-green-400" : "text-red-400"}>
                                  {results.emailrep.details.validMX ? "Sí" : "No"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-300">Desechable:</span>
                                <span
                                  className={results.emailrep.details.disposable ? "text-red-400" : "text-green-400"}
                                >
                                  {results.emailrep.details.disposable ? "Sí" : "No"}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Sección de alertas */}
                    <div className="space-y-3">
                      {results.haveibeenpwned && results.haveibeenpwned.breached && (
                        <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Email encontrado en filtraciones de datos</p>
                            <p className="text-gray-300 text-sm">
                              Este email aparece en {results.haveibeenpwned.breachCount} filtraciones de datos desde{" "}
                              {results.haveibeenpwned.firstBreach}
                            </p>
                            {results.haveibeenpwned.breaches.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {results.haveibeenpwned.breaches.map((breach: string, i: number) => (
                                  <Badge key={i} className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border-none">
                                    {breach}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {results.emailrep && results.emailrep.suspicious && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Email marcado como sospechoso</p>
                            <p className="text-gray-300 text-sm">
                              Este email ha sido marcado como potencialmente sospechoso según EmailRep.io
                            </p>
                          </div>
                        </div>
                      )}

                      {results.emailrep && results.emailrep.details && results.emailrep.details.profiles.length > 0 && (
                        <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Perfiles asociados encontrados</p>
                            <p className="text-gray-300 text-sm">
                              Este email está asociado con perfiles en las siguientes plataformas:
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {results.emailrep.details.profiles.map((profile: string, i: number) => (
                                <Badge
                                  key={i}
                                  className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none"
                                >
                                  {profile}
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

            {results.haveibeenpwned && (
              <TabsContent value="haveibeenpwned" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Have I Been Pwned</CardTitle>
                      <CardDescription className="text-gray-300">
                        Información sobre filtraciones de datos
                      </CardDescription>
                    </div>
                    <a
                      href={`https://haveibeenpwned.com/account/${results.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                    >
                      Ver en HIBP <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Estado</span>
                        <Badge
                          className={
                            results.haveibeenpwned.breached
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }
                        >
                          {results.haveibeenpwned.breached ? "Comprometido" : "No comprometido"}
                        </Badge>
                      </div>

                      {results.haveibeenpwned.breached && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Detalles de Filtraciones</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Número de brechas:</span>
                                  <span className="text-white">{results.haveibeenpwned.breachCount}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Primera filtración:</span>
                                  <span className="text-white">{results.haveibeenpwned.firstBreach}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Última filtración:</span>
                                  <span className="text-white">{results.haveibeenpwned.lastBreach}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-300">Pastes:</span>
                                  <span className="text-white">{results.haveibeenpwned.pastes}</span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Fuentes de Filtraciones</h3>
                              {results.haveibeenpwned.breaches.length > 0 ? (
                                <div className="space-y-2">
                                  {results.haveibeenpwned.breaches.map((breach: string, i: number) => (
                                    <div key={i} className="bg-gray-800 p-2 rounded flex items-center gap-2">
                                      <AlertTriangle className="h-4 w-4 text-red-400" />
                                      <span className="text-white">{breach}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-300 text-sm">No se encontraron detalles de las fuentes</p>
                              )}
                            </div>
                          </div>

                          <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                            <h3 className="font-medium text-white mb-2">Recomendaciones</h3>
                            <ul className="space-y-1 text-sm text-gray-300">
                              <li className="flex items-start gap-2">
                                <span className="text-red-400">•</span>
                                <span>
                                  Cambia inmediatamente las contraseñas en todos los servicios donde uses este email
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-red-400">•</span>
                                <span>Activa la autenticación de dos factores donde sea posible</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-red-400">•</span>
                                <span>Utiliza un gestor de contraseñas para crear contraseñas únicas y seguras</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-red-400">•</span>
                                <span>Revisa tus cuentas en busca de actividad sospechosa</span>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.dehashed && (
              <TabsContent value="dehashed" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Dehashed</CardTitle>
                      <CardDescription className="text-gray-300">Información de credenciales filtradas</CardDescription>
                    </div>
                    <a
                      href={`https://dehashed.com/search?query=${results.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                    >
                      Ver en Dehashed <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Estado</span>
                        <Badge
                          className={
                            results.dehashed.found
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }
                        >
                          {results.dehashed.found
                            ? `${results.dehashed.entries} entradas encontradas`
                            : "No encontrado"}
                        </Badge>
                      </div>

                      {results.dehashed.found && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {results.dehashed.passwords.length > 0 && (
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Contraseñas Filtradas (Hashes)</h3>
                              <div className="space-y-2">
                                {results.dehashed.passwords.map((password: string, i: number) => (
                                  <div
                                    key={i}
                                    className="bg-gray-800 p-2 rounded text-sm font-mono text-gray-300 break-all"
                                  >
                                    {password}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {results.dehashed.sources.length > 0 && (
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Fuentes de Filtraciones</h3>
                              <div className="space-y-2">
                                {results.dehashed.sources.map((source: string, i: number) => (
                                  <div key={i} className="bg-gray-800 p-2 rounded flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                    <span className="text-white">{source}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {results.dehashed.names.length > 0 && (
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Nombres Asociados</h3>
                              <div className="space-y-2">
                                {results.dehashed.names.map((name: string, i: number) => (
                                  <div key={i} className="bg-gray-800 p-2 rounded text-sm text-white">
                                    {name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {results.dehashed.ips.length > 0 && (
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">IPs Asociadas</h3>
                              <div className="space-y-2">
                                {results.dehashed.ips.map((ip: string, i: number) => (
                                  <div key={i} className="bg-gray-800 p-2 rounded text-sm text-white">
                                    {ip}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {results.dehashed.phones.length > 0 && (
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Teléfonos Asociados</h3>
                              <div className="space-y-2">
                                {results.dehashed.phones.map((phone: string, i: number) => (
                                  <div key={i} className="bg-gray-800 p-2 rounded text-sm text-white">
                                    {phone}
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

            {results.scylla && (
              <TabsContent value="scylla" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Scylla.sh</CardTitle>
                    <CardDescription className="text-gray-300">Información de filtraciones de datos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Estado</span>
                        <Badge
                          className={
                            results.scylla.found
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }
                        >
                          {results.scylla.found ? `${results.scylla.leaks} filtraciones encontradas` : "No encontrado"}
                        </Badge>
                      </div>

                      {results.scylla.found && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {results.scylla.passwords.length > 0 && (
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Contraseñas Filtradas</h3>
                              <div className="space-y-2">
                                {results.scylla.passwords.map((password: string, i: number) => (
                                  <div key={i} className="bg-gray-800 p-2 rounded text-sm font-mono text-gray-300">
                                    {password}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {results.scylla.sources.length > 0 && (
                            <div className="bg-gray-700 p-3 rounded-lg">
                              <h3 className="font-medium text-white mb-2">Fuentes de Filtraciones</h3>
                              <div className="space-y-2">
                                {results.scylla.sources.map((source: string, i: number) => (
                                  <div key={i} className="bg-gray-800 p-2 rounded flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                    <span className="text-white">{source}</span>
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

            {results.hunter && (
              <TabsContent value="hunter" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Hunter.io</CardTitle>
                      <CardDescription className="text-gray-300">Información sobre emails corporativos</CardDescription>
                    </div>
                    <a
                      href={`https://hunter.io/email-verifier/${results.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                    >
                      Ver en Hunter <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Estado</span>
                        <Badge
                          className={
                            results.hunter.found
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          }
                        >
                          {results.hunter.found ? "Encontrado" : "No encontrado"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Información del Dominio</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Dominio:</span>
                              <span className="text-white">{results.hunter.domain}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Compañía:</span>
                              <span className="text-white">{results.hunter.company}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Puntuación:</span>
                              <span className="text-white">{results.hunter.score}/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Fuentes:</span>
                              <span className="text-white">{results.hunter.sources}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Patrón:</span>
                              <span className="text-white font-mono">{results.hunter.pattern}</span>
                            </div>
                          </div>
                        </div>

                        {results.hunter.relatedEmails.length > 0 && (
                          <div className="bg-gray-700 p-3 rounded-lg">
                            <h3 className="font-medium text-white mb-2">Emails Relacionados</h3>
                            <div className="space-y-2">
                              {results.hunter.relatedEmails.map((email: string, i: number) => (
                                <div key={i} className="bg-gray-800 p-2 rounded text-sm text-white">
                                  {email}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.emailrep && (
              <TabsContent value="emailrep" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">EmailRep.io</CardTitle>
                      <CardDescription className="text-gray-300">
                        Información sobre la reputación del email
                      </CardDescription>
                    </div>
                    <a
                      href={`https://emailrep.io/${results.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                    >
                      Ver en EmailRep <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Reputación</span>
                        <Badge
                          className={
                            results.emailrep.reputation === "high"
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : results.emailrep.reputation === "medium"
                                ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          }
                        >
                          {results.emailrep.reputation === "high"
                            ? "Alta"
                            : results.emailrep.reputation === "medium"
                              ? "Media"
                              : "Baja"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Detalles</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Primera vez visto:</span>
                              <span className="text-white">{results.emailrep.details.firstSeen}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Última vez visto:</span>
                              <span className="text-white">{results.emailrep.details.lastSeen}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Referencias:</span>
                              <span className="text-white">{results.emailrep.references}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Sospechoso:</span>
                              <span className={results.emailrep.suspicious ? "text-red-400" : "text-green-400"}>
                                {results.emailrep.suspicious ? "Sí" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Atributos</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Malicioso:</span>
                              <span className={results.emailrep.details.malicious ? "text-red-400" : "text-green-400"}>
                                {results.emailrep.details.malicious ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Spam:</span>
                              <span className={results.emailrep.details.spam ? "text-red-400" : "text-green-400"}>
                                {results.emailrep.details.spam ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Desechable:</span>
                              <span className={results.emailrep.details.disposable ? "text-red-400" : "text-green-400"}>
                                {results.emailrep.details.disposable ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Proveedor gratuito:</span>
                              <span
                                className={results.emailrep.details.freeProvider ? "text-yellow-400" : "text-green-400"}
                              >
                                {results.emailrep.details.freeProvider ? "Sí" : "No"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Entregable:</span>
                              <span
                                className={results.emailrep.details.deliverable ? "text-green-400" : "text-red-400"}
                              >
                                {results.emailrep.details.deliverable ? "Sí" : "No"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {results.emailrep.details.profiles.length > 0 && (
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-2">Perfiles Asociados</h3>
                          <div className="flex flex-wrap gap-2">
                            {results.emailrep.details.profiles.map((profile: string, i: number) => (
                              <Badge key={i} className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">
                                {profile}
                              </Badge>
                            ))}
                          </div>
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
