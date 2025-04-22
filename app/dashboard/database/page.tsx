import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatabaseQueryTool } from "@/components/database/database-query-tool"
import { DatabaseSchema } from "@/components/database/database-schema"
import { DatabaseStats } from "@/components/database/database-stats"

export default function DatabasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Base de Datos</h1>
        <p className="text-gray-200">Gestión y consulta de tu base de datos en Neon.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Estadísticas</CardTitle>
            <CardDescription className="text-gray-300">Información general de la base de datos</CardDescription>
          </CardHeader>
          <CardContent>
            <DatabaseStats />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Consulta SQL</CardTitle>
            <CardDescription className="text-gray-300">Ejecuta consultas SQL en tu base de datos</CardDescription>
          </CardHeader>
          <CardContent>
            <DatabaseQueryTool />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Esquema de la Base de Datos</CardTitle>
          <CardDescription className="text-gray-300">Estructura de tablas y relaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <DatabaseSchema />
        </CardContent>
      </Card>
    </div>
  )
}
