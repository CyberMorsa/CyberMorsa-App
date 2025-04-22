import { verifyAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Database, Search, Activity } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await verifyAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Panel de Control</h1>
        <p className="text-gray-200">Bienvenido, {user?.username}. Accede a todas tus herramientas desde aquí.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/security" className="block">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-blue-400" />
                <span>Seguridad</span>
              </CardTitle>
              <CardDescription className="text-gray-300">Herramientas de seguridad</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-200">Accede a herramientas de análisis de seguridad y monitoreo.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/database" className="block">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="h-5 w-5 text-green-400" />
                <span>Base de Datos</span>
              </CardTitle>
              <CardDescription className="text-gray-300">Gestión de datos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-200">Administra tu base de datos y consulta información almacenada.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/osint" className="block">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Search className="h-5 w-5 text-purple-400" />
                <span>OSINT</span>
              </CardTitle>
              <CardDescription className="text-gray-300">Inteligencia de fuentes abiertas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-200">Herramientas para recolección y análisis de información pública.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/activities" className="block">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="h-5 w-5 text-red-400" />
                <span>Actividades</span>
              </CardTitle>
              <CardDescription className="text-gray-300">Seguimiento de actividades</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-200">Lleva un registro de actividades y puntuaciones personalizadas.</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Actividad Reciente</CardTitle>
            <CardDescription className="text-gray-300">Últimas acciones realizadas en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b border-gray-700 pb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-medium text-white">Acción de ejemplo #{i}</p>
                    <p className="text-xs text-gray-300">
                      Hace {i} hora{i !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Estado del Sistema</CardTitle>
            <CardDescription className="text-gray-300">Información sobre el estado actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Base de datos</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Activa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">APIs</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Conectadas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Almacenamiento</span>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">70% libre</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
