import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Table } from "lucide-react"

export default function DatabasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Base de Datos</h1>
        <p className="text-gray-400">Gestión y visualización de tu base de datos en Neon.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-400" />
              <span>Estado de la BD</span>
            </CardTitle>
            <CardDescription>Información de conexión</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Estado</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Conectado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tipo</span>
                <span className="text-sm">PostgreSQL (Neon)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tablas</span>
                <span className="text-sm">8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle>Tablas Principales</CardTitle>
            <CardDescription>Estructura de las tablas principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-700">
                <Table className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">emails</p>
                  <p className="text-xs text-gray-400">Almacena información de correos electrónicos</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-2 border-b border-gray-700">
                <Table className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">domains</p>
                  <p className="text-xs text-gray-400">Información de dominios y subdominios</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-2 border-b border-gray-700">
                <Table className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium">activities</p>
                  <p className="text-xs text-gray-400">Registro de actividades y puntuaciones</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Estructura SQL</CardTitle>
          <CardDescription>Esquema de la base de datos</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">
            <code>{`
CREATE TABLE emails (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL,
  reputation_score FLOAT,
  in_breach BOOLEAN DEFAULT FALSE,
  has_social_links BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE domains (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL,
  subdomain_count INTEGER DEFAULT 0,
  first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  technologies TEXT[],
  open_ports INTEGER[]
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  count INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL
);
            `}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
