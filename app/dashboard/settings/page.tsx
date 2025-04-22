"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiConfigForm } from "@/components/api-config-form"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  const handleApiSave = (apiKey: string, config: Record<string, string>) => {
    console.log(`API ${apiKey} configurada:`, config)
    // Aquí se podría implementar la lógica para guardar en la base de datos
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Configuración</h1>
        <p className="text-gray-400">Personaliza la aplicación según tus preferencias.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800 p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-gray-700">
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-gray-700">
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="apis" className="data-[state=active]:bg-gray-700">
            APIs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Preferencias Generales</CardTitle>
              <CardDescription>Configura las opciones generales de la aplicación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-white">
                      Modo Oscuro
                    </Label>
                    <p className="text-sm text-gray-400">Activa el modo oscuro para reducir la fatiga visual</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-white">
                      Notificaciones
                    </Label>
                    <p className="text-sm text-gray-400">Recibe notificaciones sobre eventos importantes</p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics" className="text-white">
                      Analíticas
                    </Label>
                    <p className="text-sm text-gray-400">Recopila datos anónimos para mejorar la aplicación</p>
                  </div>
                  <Switch id="analytics" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Seguridad</CardTitle>
              <CardDescription>Configura las opciones de seguridad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor" className="text-white">
                      Autenticación de dos factores
                    </Label>
                    <p className="text-sm text-gray-400">Añade una capa adicional de seguridad</p>
                  </div>
                  <Switch id="two-factor" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout" className="text-white">
                      Tiempo de sesión extendido
                    </Label>
                    <p className="text-sm text-gray-400">Mantén la sesión activa por más tiempo</p>
                  </div>
                  <Switch id="session-timeout" />
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-red-500 hover:bg-red-600">Cambiar Contraseña</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apis" className="space-y-4 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ApiConfigForm
              apiName="SecurityTrails"
              apiKey="securitytrails"
              description="API para análisis de dominios, subdominios y registros históricos de DNS"
              docsUrl="https://securitytrails.com/api-docs"
              onSave={(config) => handleApiSave("securitytrails", config)}
            />

            <ApiConfigForm
              apiName="Censys"
              apiKey="censys"
              description="API para análisis de IPs, certificados SSL y banners de puertos abiertos"
              docsUrl="https://search.censys.io/api"
              fields={[
                { name: "apiId", label: "API ID", placeholder: "Ingresa tu API ID" },
                { name: "apiSecret", label: "API Secret", placeholder: "Ingresa tu API Secret", type: "password" },
              ]}
              onSave={(config) => handleApiSave("censys", config)}
            />

            <ApiConfigForm
              apiName="Shodan"
              apiKey="shodan"
              description="API para información sobre dispositivos conectados: IPs, servicios, vulnerabilidades"
              docsUrl="https://developer.shodan.io/"
              onSave={(config) => handleApiSave("shodan", config)}
            />

            <ApiConfigForm
              apiName="AlienVault OTX"
              apiKey="alienvault"
              description="API para IOCs: IPs, hashes, dominios reportados en amenazas reales"
              docsUrl="https://otx.alienvault.com/api/"
              onSave={(config) => handleApiSave("alienvault", config)}
            />

            <ApiConfigForm
              apiName="MalwareBazaar"
              apiKey="malwarebazaar"
              description="API para hashes de malware, familias y detección reciente"
              docsUrl="https://bazaar.abuse.ch/api/"
              onSave={(config) => handleApiSave("malwarebazaar", config)}
            />

            <ApiConfigForm
              apiName="Clearbit"
              apiKey="clearbit"
              description="API para datos de empresa/persona asociada a email, IP o dominio"
              docsUrl="https://dashboard.clearbit.com/docs"
              onSave={(config) => handleApiSave("clearbit", config)}
            />

            <ApiConfigForm
              apiName="Wayback Machine"
              apiKey="wayback"
              description="API para ver versiones anteriores de un sitio"
              docsUrl="https://archive.org/help/wayback_api.php"
              onSave={(config) => handleApiSave("wayback", config)}
            />

            <ApiConfigForm
              apiName="EmailHippo"
              apiKey="emailhippo"
              description="API para validación extendida de correos: deliverability, riesgo"
              docsUrl="https://www.emailhippo.com/products/email-verifier-api"
              onSave={(config) => handleApiSave("emailhippo", config)}
            />
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Añadir Nueva API</CardTitle>
              <CardDescription>Configura una API personalizada</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Añadir Nueva API</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
