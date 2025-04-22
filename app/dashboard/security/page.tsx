import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Seguridad</h1>
        <p className="text-gray-400">Herramientas y análisis de seguridad para tus necesidades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span>Estado de Seguridad</span>
            </CardTitle>
            <CardDescription>Estado general del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Autenticación segura</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Variables de entorno protegidas</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">Actualización de seguridad pendiente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle>Análisis de Seguridad</CardTitle>
            <CardDescription>Resultados del último análisis de seguridad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                <span className="text-sm font-medium">Autenticación</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Seguro</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                <span className="text-sm font-medium">Almacenamiento de datos</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Seguro</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                <span className="text-sm font-medium">Conexiones API</span>
                <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Verificar</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
