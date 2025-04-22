"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DatabaseStats } from "@/components/database/database-stats"
import { DatabaseQueryTool } from "@/components/database/database-query-tool"
import { DatabaseSchema } from "@/components/database/database-schema"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Copy, Database, Shield, User, Mail, Globe, AlertTriangle } from "lucide-react"

export default function DatabasePage() {
  const [activeTab, setActiveTab] = useState("stats")
  const [queryText, setQueryText] = useState("")

  // Consultas predefinidas
  const predefinedQueries = [
    {
      name: "Emails en riesgo",
      description: "Muestra todos los emails marcados como comprometidos",
      icon: Mail,
      query: "SELECT * FROM emails WHERE in_breach = TRUE ORDER BY reputation_score ASC",
    },
    {
      name: "Dominios populares",
      description: "Muestra los dominios con más subdominios",
      icon: Globe,
      query: "SELECT domain, subdomain_count FROM domains ORDER BY subdomain_count DESC LIMIT 10",
    },
    {
      name: "IPs abusivas",
      description: "Muestra las IPs marcadas como abusivas",
      icon: Shield,
      query: "SELECT ip_address, asn, country, last_reported FROM ips WHERE is_abusive = TRUE",
    },
    {
      name: "Usuarios por plataforma",
      description: "Cuenta de usuarios por plataforma",
      icon: User,
      query: "SELECT platform, COUNT(*) as total FROM usernames GROUP BY platform ORDER BY total DESC",
    },
    {
      name: "Últimas filtraciones",
      description: "Muestra las filtraciones más recientes",
      icon: Database,
      query: "SELECT email, source, leak_date FROM leaks ORDER BY leak_date DESC LIMIT 10",
    },
    {
      name: "Amenazas recientes",
      description: "Muestra las amenazas detectadas recientemente",
      icon: AlertTriangle,
      query: "SELECT indicator, type, verdict, confidence FROM threat_intelligence ORDER BY created_at DESC LIMIT 10",
    },
    {
      name: "Personas con alto riesgo",
      description: "Muestra personas con puntuación de riesgo alta",
      icon: User,
      query: "SELECT name, email, risk_score FROM person_intelligence WHERE risk_score > 70 ORDER BY risk_score DESC",
    },
    {
      name: "IPs con proxy/VPN",
      description: "Muestra IPs detectadas como proxy o VPN",
      icon: Shield,
      query: "SELECT ip_address, country, city FROM ip_intelligence WHERE is_proxy = TRUE OR is_vpn = TRUE",
    },
  ]

  const executeQuery = (query: string) => {
    setQueryText(query)
    setActiveTab("query")
    // Aquí se podría añadir lógica para ejecutar automáticamente la consulta
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Base de Datos</h1>
        <p className="text-gray-400">Gestión y consulta de tu base de datos en Neon.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800 p-1">
          <TabsTrigger value="stats" className="data-[state=active]:bg-gray-700">
            Estadísticas
          </TabsTrigger>
          <TabsTrigger value="query" className="data-[state=active]:bg-gray-700">
            Consulta SQL
          </TabsTrigger>
          <TabsTrigger value="schema" className="data-[state=active]:bg-gray-700">
            Esquema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="mt-0">
          <DatabaseStats />
        </TabsContent>

        <TabsContent value="query" className="mt-0">
          <DatabaseQueryTool initialQuery={queryText} />
        </TabsContent>

        <TabsContent value="schema" className="mt-0">
          <DatabaseSchema />
        </TabsContent>
      </Tabs>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Consultas Rápidas</CardTitle>
          <CardDescription>Consultas predefinidas para acceder rápidamente a información importante</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predefinedQueries.map((queryItem, index) => (
              <Card
                key={index}
                className="bg-gray-700 border-gray-600 hover:bg-gray-650 transition-colors cursor-pointer"
                onClick={() => executeQuery(queryItem.query)}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-gray-600 p-2 rounded-md">
                    <queryItem.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{queryItem.name}</h3>
                    <p className="text-xs text-gray-400">{queryItem.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-600"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.clipboard.writeText(queryItem.query)
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Ayuda SQL</CardTitle>
          <CardDescription>Comandos SQL comunes para consultar la base de datos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-md">
              <h3 className="font-medium text-white mb-1">Consulta básica</h3>
              <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded overflow-x-auto">
                SELECT * FROM nombre_tabla WHERE condicion LIMIT 10;
              </pre>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <h3 className="font-medium text-white mb-1">Contar registros</h3>
              <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded overflow-x-auto">
                SELECT COUNT(*) FROM nombre_tabla WHERE condicion;
              </pre>
            </div>
            <div className="bg-gray-700 p-3 rounded-md">
              <h3 className="font-medium text-white mb-1">Agrupar y contar</h3>
              <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded overflow-x-auto">
                SELECT campo, COUNT(*) as total FROM nombre_tabla GROUP BY campo ORDER BY total DESC;
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
