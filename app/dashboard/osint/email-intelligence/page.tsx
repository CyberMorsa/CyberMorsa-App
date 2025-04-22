import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Mail, Shield, AlertTriangle, Database } from "lucide-react"

export default function EmailIntelligencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Inteligencia de Email</h1>
        <p className="text-gray-400">Analiza direcciones de correo electrónico para obtener información detallada.</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Análisis de Email</CardTitle>
          <CardDescription>Introduce una dirección de correo electrónico para analizarla</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input placeholder="ejemplo@dominio.com" className="pl-10 bg-gray-700 border-gray-600 text-white" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" />
              Analizar
            </Button>
          </div>

          <div className="mt-8 text-center text-gray-400">
            <Mail className="mx-auto h-12 w-12 text-gray-500 mb-3" />
            <p>Introduce una dirección de correo electrónico para comenzar el análisis</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Resultados del análisis</CardTitle>
          <CardDescription>Los resultados se mostrarán aquí después del análisis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="bg-gray-700 w-full">
              <TabsTrigger value="info" className="flex-1">
                Información
              </TabsTrigger>
              <TabsTrigger value="breaches" className="flex-1">
                Filtraciones
              </TabsTrigger>
              <TabsTrigger value="reputation" className="flex-1">
                Reputación
              </TabsTrigger>
              <TabsTrigger value="domains" className="flex-1">
                Dominios
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="mt-4">
              <div className="text-center text-gray-400 py-8">
                <Database className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                <p>No hay información disponible</p>
              </div>
            </TabsContent>
            <TabsContent value="breaches" className="mt-4">
              <div className="text-center text-gray-400 py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                <p>No se han encontrado filtraciones</p>
              </div>
            </TabsContent>
            <TabsContent value="reputation" className="mt-4">
              <div className="text-center text-gray-400 py-8">
                <Shield className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                <p>No hay datos de reputación disponibles</p>
              </div>
            </TabsContent>
            <TabsContent value="domains" className="mt-4">
              <div className="text-center text-gray-400 py-8">
                <Search className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                <p>No se han encontrado dominios relacionados</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
