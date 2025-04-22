"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export function DatabaseSchema() {
  const [activeTab, setActiveTab] = useState("visual")

  const tables = [
    {
      name: "emails",
      description: "Almacena información de correos electrónicos",
      columns: [
        { name: "id", type: "SERIAL", constraints: "PRIMARY KEY" },
        { name: "email", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "domain", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "reputation_score", type: "FLOAT", constraints: "" },
        { name: "in_breach", type: "BOOLEAN", constraints: "DEFAULT FALSE" },
        { name: "has_social_links", type: "BOOLEAN", constraints: "DEFAULT FALSE" },
        { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT CURRENT_TIMESTAMP" },
      ],
    },
    {
      name: "domains",
      description: "Información de dominios y subdominios",
      columns: [
        { name: "id", type: "SERIAL", constraints: "PRIMARY KEY" },
        { name: "domain", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "subdomain_count", type: "INTEGER", constraints: "DEFAULT 0" },
        { name: "first_seen", type: "TIMESTAMP", constraints: "DEFAULT CURRENT_TIMESTAMP" },
        { name: "technologies", type: "TEXT[]", constraints: "" },
        { name: "open_ports", type: "INTEGER[]", constraints: "" },
      ],
    },
    {
      name: "usernames",
      description: "Información de nombres de usuario en diferentes plataformas",
      columns: [
        { name: "id", type: "SERIAL", constraints: "PRIMARY KEY" },
        { name: "username", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "platform", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "found", type: "BOOLEAN", constraints: "DEFAULT FALSE" },
        { name: "last_checked", type: "TIMESTAMP", constraints: "DEFAULT CURRENT_TIMESTAMP" },
      ],
    },
    {
      name: "ips",
      description: "Información sobre direcciones IP",
      columns: [
        { name: "id", type: "SERIAL", constraints: "PRIMARY KEY" },
        { name: "ip_address", type: "VARCHAR(45)", constraints: "NOT NULL" },
        { name: "asn", type: "VARCHAR(255)", constraints: "" },
        { name: "isp", type: "VARCHAR(255)", constraints: "" },
        { name: "country", type: "VARCHAR(2)", constraints: "" },
        { name: "is_abusive", type: "BOOLEAN", constraints: "DEFAULT FALSE" },
        { name: "last_reported", type: "TIMESTAMP", constraints: "" },
      ],
    },
    {
      name: "leaks",
      description: "Información sobre filtraciones de datos",
      columns: [
        { name: "id", type: "SERIAL", constraints: "PRIMARY KEY" },
        { name: "email", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "source", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "password_hash", type: "TEXT", constraints: "" },
        { name: "leak_date", type: "DATE", constraints: "" },
      ],
    },
    {
      name: "activities",
      description: "Registro de actividades y puntuaciones",
      columns: [
        { name: "id", type: "SERIAL", constraints: "PRIMARY KEY" },
        { name: "title", type: "VARCHAR(255)", constraints: "NOT NULL" },
        { name: "description", type: "TEXT", constraints: "" },
        { name: "count", type: "INTEGER", constraints: "DEFAULT 0" },
        { name: "last_updated", type: "TIMESTAMP", constraints: "DEFAULT CURRENT_TIMESTAMP" },
        { name: "user_id", type: "INTEGER", constraints: "NOT NULL" },
      ],
    },
  ]

  function generateSQLSchema() {
    return tables
      .map((table) => {
        const columnsSQL = table.columns
          .map((col) => `  ${col.name} ${col.type}${col.constraints ? ` ${col.constraints}` : ""}`)
          .join(",\n")

        return `CREATE TABLE ${table.name} (\n${columnsSQL}\n);`
      })
      .join("\n\n")
  }

  function copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Esquema copiado al portapapeles"))
      .catch((err) => console.error("Error al copiar: ", err))
  }

  return (
    <div>
      <Tabs defaultValue="visual" onValueChange={setActiveTab}>
        <TabsList className="bg-gray-700">
          <TabsTrigger value="visual" className="data-[state=active]:bg-gray-600">
            Visual
          </TabsTrigger>
          <TabsTrigger value="sql" className="data-[state=active]:bg-gray-600">
            SQL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="mt-4">
          <div className="space-y-6">
            {tables.map((table, i) => (
              <div key={i} className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-600 px-4 py-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-white">{table.name}</h3>
                    <p className="text-xs text-gray-300">{table.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="px-2 py-1 text-sm font-medium text-gray-300">Columna</th>
                        <th className="px-2 py-1 text-sm font-medium text-gray-300">Tipo</th>
                        <th className="px-2 py-1 text-sm font-medium text-gray-300">Restricciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((column, j) => (
                        <tr key={j} className="border-t border-gray-600">
                          <td className="px-2 py-1 text-sm text-white">{column.name}</td>
                          <td className="px-2 py-1 text-sm text-gray-300">{column.type}</td>
                          <td className="px-2 py-1 text-sm text-gray-300">{column.constraints}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sql" className="mt-4">
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 z-10"
              onClick={() => copyToClipboard(generateSQLSchema())}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copiar
            </Button>
            <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-gray-300 max-h-[400px] overflow-y-auto">
              {generateSQLSchema()}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
