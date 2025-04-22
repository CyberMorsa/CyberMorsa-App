import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Globe, Mail, User } from "lucide-react"

export default function OsintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">OSINT</h1>
        <p className="text-gray-400">Herramientas de inteligencia de fuentes abiertas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-400" />
              <span>Análisis de Email</span>
            </CardTitle>
            <CardDescription>Verifica información sobre direcciones de correo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Consulta información sobre direcciones de correo electrónico, incluyendo reputación, filtraciones de datos
              y presencia en redes sociales.
            </p>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-xs text-gray-400 mb-2">APIs disponibles:</p>
              <ul className="text-xs space-y-1 text-gray-300">
                <li>• EmailRep.io - Reputación y análisis</li>
                <li>• Hunter.io - Verificación y validación</li>
                <li>• HaveIBeenPwned - Filtraciones de datos</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-400" />
              <span>Análisis de Dominios</span>
            </CardTitle>
            <CardDescription>Información sobre dominios y subdominios</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Obtén información detallada sobre dominios, incluyendo subdominios, DNS, tecnologías utilizadas y más.
            </p>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-xs text-gray-400 mb-2">APIs disponibles:</p>
              <ul className="text-xs space-y-1 text-gray-300">
                <li>• SecurityTrails - Subdominios y DNS</li>
                <li>• Censys - Puertos y certificados</li>
                <li>• Shodan - Servicios y vulnerabilidades</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-400" />
              <span>Análisis de Usuarios</span>
            </CardTitle>
            <CardDescription>Información sobre nombres de usuario</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Busca información sobre nombres de usuario en diferentes plataformas y redes sociales.
            </p>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-xs text-gray-400 mb-2">APIs disponibles:</p>
              <ul className="text-xs space-y-1 text-gray-300">
                <li>• WhatsMyName - Verificación en múltiples sitios</li>
                <li>• Social-Searcher - Posts públicos</li>
                <li>• Namechk - Disponibilidad de username</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-yellow-400" />
              <span>Búsqueda Avanzada</span>
            </CardTitle>
            <CardDescription>Herramientas de búsqueda especializada</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Utiliza herramientas avanzadas de búsqueda para encontrar información específica.
            </p>
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-xs text-gray-400 mb-2">Herramientas disponibles:</p>
              <ul className="text-xs space-y-1 text-gray-300">
                <li>• Google Dorks - Búsquedas avanzadas</li>
                <li>• Wayback Machine - Contenido histórico</li>
                <li>• GreyNoise - Análisis de tráfico</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
