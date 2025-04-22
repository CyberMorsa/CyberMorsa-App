"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Key, Lock, Shield, Info } from "lucide-react"

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState({
    emailRep: "",
    hunter: "",
    haveibeenpwned: "",
    fullcontact: "",
    clearbit: "",
    shodan: "",
  })

  const [savedKeys, setSavedKeys] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Cargar claves API guardadas al iniciar
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await fetch("/api/settings/api-keys")
        if (response.ok) {
          const data = await response.json()

          // Actualizar el estado con las claves existentes
          setApiKeys({
            emailRep: data.emailRep || "",
            hunter: data.hunter || "",
            haveibeenpwned: data.haveibeenpwned || "",
            fullcontact: data.fullcontact || "",
            clearbit: data.clearbit || "",
            shodan: data.shodan || "",
          })

          // Guardar qué claves están configuradas
          const configuredKeys = Object.keys(data).filter((key) => data[key])
          setSavedKeys(configuredKeys)
        }
      } catch (error) {
        console.error("Error al cargar claves API:", error)
      }
    }

    fetchApiKeys()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setApiKeys((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/settings/api-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiKeys),
      })

      if (response.ok) {
        const data = await response.json()

        // Actualizar las claves guardadas
        const configuredKeys = Object.keys(apiKeys).filter((key) => apiKeys[key as keyof typeof apiKeys])
        setSavedKeys(configuredKeys)

        setMessage({
          type: "success",
          text: "Claves API guardadas correctamente",
        })
      } else {
        setMessage({
          type: "error",
          text: "Error al guardar las claves API",
        })
      }
    } catch (error) {
      console.error("Error al guardar claves API:", error)
      setMessage({
        type: "error",
        text: "Error al guardar las claves API",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Configuración de APIs OSINT</h1>
        <p className="text-gray-400">Configura tus claves API para habilitar la funcionalidad completa de OSINT</p>
      </div>

      <Alert className="bg-blue-900/20 border-blue-900/50 text-blue-400">
        <Info className="h-4 w-4" />
        <AlertTitle>Información importante</AlertTitle>
        <AlertDescription>
          Para obtener resultados OSINT reales, necesitas configurar al menos una de las APIs listadas abajo. Tus claves
          API se almacenan de forma segura y solo se utilizan para realizar consultas en tu nombre.
        </AlertDescription>
      </Alert>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Claves API</CardTitle>
              <CardDescription>Configura tus claves API para los diferentes servicios OSINT</CardDescription>
            </div>
            <div>
              <Badge className="bg-blue-600/20 text-blue-400">
                {savedKeys.length} {savedKeys.length === 1 ? "clave" : "claves"} configurada
                {savedKeys.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="bg-gray-700 mb-4">
                <TabsTrigger value="email" className="data-[state=active]:bg-gray-600">
                  Email
                </TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-gray-600">
                  Redes Sociales
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-gray-600">
                  Seguridad
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailRep" className="text-white">
                        EmailRep API Key
                      </Label>
                      {savedKeys.includes("emailRep") ? (
                        <Badge className="bg-green-600/20 text-green-400">Configurada</Badge>
                      ) : (
                        <Badge className="bg-gray-600/20 text-gray-400">No configurada</Badge>
                      )}
                    </div>
                    <Input
                      id="emailRep"
                      name="emailRep"
                      value={apiKeys.emailRep}
                      onChange={handleChange}
                      placeholder="Introduce tu clave API de EmailRep"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400">
                      Obtén información sobre la reputación de direcciones de email.{" "}
                      <a
                        href="https://emailrep.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Obtener clave
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hunter" className="text-white">
                        Hunter.io API Key
                      </Label>
                      {savedKeys.includes("hunter") ? (
                        <Badge className="bg-green-600/20 text-green-400">Configurada</Badge>
                      ) : (
                        <Badge className="bg-gray-600/20 text-gray-400">No configurada</Badge>
                      )}
                    </div>
                    <Input
                      id="hunter"
                      name="hunter"
                      value={apiKeys.hunter}
                      onChange={handleChange}
                      placeholder="Introduce tu clave API de Hunter.io"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400">
                      Verifica emails y encuentra información de contacto.{" "}
                      <a
                        href="https://hunter.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Obtener clave
                      </a>
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fullcontact" className="text-white">
                        FullContact API Key
                      </Label>
                      {savedKeys.includes("fullcontact") ? (
                        <Badge className="bg-green-600/20 text-green-400">Configurada</Badge>
                      ) : (
                        <Badge className="bg-gray-600/20 text-gray-400">No configurada</Badge>
                      )}
                    </div>
                    <Input
                      id="fullcontact"
                      name="fullcontact"
                      value={apiKeys.fullcontact}
                      onChange={handleChange}
                      placeholder="Introduce tu clave API de FullContact"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400">
                      Obtén información detallada sobre personas y sus perfiles sociales.{" "}
                      <a
                        href="https://www.fullcontact.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Obtener clave
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="clearbit" className="text-white">
                        Clearbit API Key
                      </Label>
                      {savedKeys.includes("clearbit") ? (
                        <Badge className="bg-green-600/20 text-green-400">Configurada</Badge>
                      ) : (
                        <Badge className="bg-gray-600/20 text-gray-400">No configurada</Badge>
                      )}
                    </div>
                    <Input
                      id="clearbit"
                      name="clearbit"
                      value={apiKeys.clearbit}
                      onChange={handleChange}
                      placeholder="Introduce tu clave API de Clearbit"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400">
                      Enriquece datos de personas y empresas con información detallada.{" "}
                      <a
                        href="https://clearbit.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Obtener clave
                      </a>
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="haveibeenpwned" className="text-white">
                        Have I Been Pwned API Key
                      </Label>
                      {savedKeys.includes("haveibeenpwned") ? (
                        <Badge className="bg-green-600/20 text-green-400">Configurada</Badge>
                      ) : (
                        <Badge className="bg-gray-600/20 text-gray-400">No configurada</Badge>
                      )}
                    </div>
                    <Input
                      id="haveibeenpwned"
                      name="haveibeenpwned"
                      value={apiKeys.haveibeenpwned}
                      onChange={handleChange}
                      placeholder="Introduce tu clave API de Have I Been Pwned"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400">
                      Verifica si un email ha sido comprometido en filtraciones de datos.{" "}
                      <a
                        href="https://haveibeenpwned.com/API/Key"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Obtener clave
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="shodan" className="text-white">
                        Shodan API Key
                      </Label>
                      {savedKeys.includes("shodan") ? (
                        <Badge className="bg-green-600/20 text-green-400">Configurada</Badge>
                      ) : (
                        <Badge className="bg-gray-600/20 text-gray-400">No configurada</Badge>
                      )}
                    </div>
                    <Input
                      id="shodan"
                      name="shodan"
                      value={apiKeys.shodan}
                      onChange={handleChange}
                      placeholder="Introduce tu clave API de Shodan"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <p className="text-xs text-gray-400">
                      Busca dispositivos conectados a internet y vulnerabilidades.{" "}
                      <a
                        href="https://account.shodan.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        Obtener clave
                      </a>
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {message && (
              <Alert
                className={`${
                  message.type === "success"
                    ? "bg-green-900/20 border-green-900/50 text-green-400"
                    : "bg-red-900/20 border-red-900/50 text-red-400"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <AlertTitle>{message.type === "success" ? "Éxito" : "Error"}</AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                {isLoading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    Guardar claves API
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Seguridad de las claves API</CardTitle>
          <CardDescription>Información sobre cómo se almacenan y utilizan tus claves API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-white">Almacenamiento seguro</h4>
                <p className="text-sm text-gray-400">
                  Tus claves API se almacenan de forma cifrada en nuestra base de datos y nunca se comparten con
                  terceros.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-white">Uso responsable</h4>
                <p className="text-sm text-gray-400">
                  Las consultas a las APIs se realizan solo cuando tú inicias una búsqueda OSINT, y los resultados se
                  almacenan para evitar consultas repetidas innecesarias.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
