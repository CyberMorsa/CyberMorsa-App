"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Play, Save, Download, Copy, Trash } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DatabaseQueryToolProps {
  initialQuery?: string
}

export function DatabaseQueryTool({ initialQuery = "" }: DatabaseQueryToolProps) {
  const [query, setQuery] = useState(initialQuery)
  const [executing, setExecuting] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [savedQueries, setSavedQueries] = useState<{ name: string; query: string }[]>([
    { name: "Todos los emails", query: "SELECT * FROM emails LIMIT 10" },
    { name: "Dominios comprometidos", query: "SELECT * FROM domains WHERE in_breach = true" },
  ])

  // Actualizar la consulta cuando cambia initialQuery
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
    }
  }, [initialQuery])

  // Cargar consultas guardadas
  useEffect(() => {
    const savedQueriesData = localStorage.getItem("saved-queries")
    if (savedQueriesData) {
      setSavedQueries(JSON.parse(savedQueriesData))
    }
  }, [])

  // Guardar consultas cuando cambian
  useEffect(() => {
    localStorage.setItem("saved-queries", JSON.stringify(savedQueries))
  }, [savedQueries])

  async function executeQuery() {
    if (!query.trim()) return

    setExecuting(true)
    setResults(null)
    setError(null)

    try {
      // Simulación de ejecución de consulta
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Detectar el tipo de consulta para simular resultados apropiados
      const queryLower = query.toLowerCase()

      if (queryLower.includes("select")) {
        // Simular resultados de SELECT
        if (queryLower.includes("emails")) {
          setResults({
            columns: ["id", "email", "domain", "reputation_score", "in_breach", "has_social_links", "created_at"],
            rows: [
              {
                id: 1,
                email: "user1@example.com",
                domain: "example.com",
                reputation_score: 0.85,
                in_breach: false,
                has_social_links: true,
                created_at: "2023-01-15",
              },
              {
                id: 2,
                email: "user2@test.org",
                domain: "test.org",
                reputation_score: 0.72,
                in_breach: true,
                has_social_links: false,
                created_at: "2023-02-20",
              },
              {
                id: 3,
                email: "admin@company.net",
                domain: "company.net",
                reputation_score: 0.91,
                in_breach: false,
                has_social_links: true,
                created_at: "2023-03-05",
              },
            ],
          })
        } else if (queryLower.includes("domains")) {
          setResults({
            columns: ["id", "domain", "subdomain_count", "first_seen", "technologies", "open_ports"],
            rows: [
              {
                id: 1,
                domain: "example.com",
                subdomain_count: 5,
                first_seen: "2022-11-10",
                technologies: ["PHP", "MySQL", "Apache"],
                open_ports: [80, 443, 22],
              },
              {
                id: 2,
                domain: "test.org",
                subdomain_count: 3,
                first_seen: "2023-01-22",
                technologies: ["Node.js", "MongoDB"],
                open_ports: [80, 443],
              },
              {
                id: 3,
                domain: "company.net",
                subdomain_count: 12,
                first_seen: "2022-08-15",
                technologies: ["ASP.NET", "SQL Server", "IIS"],
                open_ports: [80, 443, 3389],
              },
            ],
          })
        } else if (queryLower.includes("ips")) {
          setResults({
            columns: ["id", "ip_address", "asn", "isp", "country", "is_abusive", "last_reported"],
            rows: [
              {
                id: 1,
                ip_address: "192.168.1.1",
                asn: "AS15169",
                isp: "Google LLC",
                country: "US",
                is_abusive: false,
                last_reported: null,
              },
              {
                id: 2,
                ip_address: "10.0.0.1",
                asn: "AS16509",
                isp: "Amazon.com, Inc.",
                country: "US",
                is_abusive: false,
                last_reported: null,
              },
              {
                id: 3,
                ip_address: "172.16.0.1",
                asn: "AS8075",
                isp: "Microsoft Corporation",
                country: "US",
                is_abusive: true,
                last_reported: "2023-01-15",
              },
            ],
          })
        } else if (queryLower.includes("usernames")) {
          setResults({
            columns: ["id", "username", "platform", "found", "last_checked"],
            rows: [
              {
                id: 1,
                username: "johndoe",
                platform: "Twitter",
                found: true,
                last_checked: "2023-03-10",
              },
              {
                id: 2,
                username: "johndoe",
                platform: "Instagram",
                found: true,
                last_checked: "2023-03-10",
              },
              {
                id: 3,
                username: "johndoe",
                platform: "LinkedIn",
                found: false,
                last_checked: "2023-03-10",
              },
            ],
          })
        } else if (queryLower.includes("leaks")) {
          setResults({
            columns: ["id", "email", "source", "password_hash", "leak_date"],
            rows: [
              {
                id: 1,
                email: "user1@example.com",
                source: "Adobe",
                password_hash: "5f4dcc3b5aa765d61d8327deb882cf99",
                leak_date: "2013-10-04",
              },
              {
                id: 2,
                email: "user2@test.org",
                source: "LinkedIn",
                password_hash: "5f4dcc3b5aa765d61d8327deb882cf99",
                leak_date: "2012-06-05",
              },
              {
                id: 3,
                email: "admin@company.net",
                source: "Dropbox",
                password_hash: "5f4dcc3b5aa765d61d8327deb882cf99",
                leak_date: "2016-08-31",
              },
            ],
          })
        } else if (queryLower.includes("activities")) {
          setResults({
            columns: ["id", "title", "description", "count", "last_updated", "user_id"],
            rows: [
              {
                id: 1,
                title: "Citas",
                description: "Registro de salidas juntos",
                count: 5,
                last_updated: "2023-04-15",
                user_id: 1,
              },
              {
                id: 2,
                title: "Puntos",
                description: "Registro de puntos acumulados",
                count: 120,
                last_updated: "2023-04-20",
                user_id: 1,
              },
              {
                id: 3,
                title: "Películas",
                description: "Películas vistas juntos",
                count: 8,
                last_updated: "2023-04-10",
                user_id: 2,
              },
            ],
          })
        } else {
          setResults({
            columns: ["id", "name", "value"],
            rows: [
              { id: 1, name: "Item 1", value: "Value 1" },
              { id: 2, name: "Item 2", value: "Value 2" },
              { id: 3, name: "Item 3", value: "Value 3" },
            ],
          })
        }
      } else if (queryLower.includes("insert") || queryLower.includes("update") || queryLower.includes("delete")) {
        // Simular resultados de modificación
        setResults({
          message: "Operación completada con éxito",
          rowsAffected: Math.floor(Math.random() * 5) + 1,
        })
      } else {
        // Otro tipo de consulta
        setResults({
          message: "Consulta ejecutada correctamente",
        })
      }
    } catch (err) {
      setError("Error al ejecutar la consulta. Verifica la sintaxis SQL.")
    } finally {
      setExecuting(false)
    }
  }

  function saveQuery() {
    if (!query.trim()) return

    const queryName = prompt("Nombre para guardar la consulta:")
    if (queryName) {
      setSavedQueries([...savedQueries, { name: queryName, query }])
    }
  }

  function loadQuery(savedQuery: string) {
    setQuery(savedQuery)
  }

  function deleteQuery(index: number) {
    const newQueries = [...savedQueries]
    newQueries.splice(index, 1)
    setSavedQueries(newQueries)
  }

  function downloadResults() {
    if (!results) return

    let csv = ""

    // Si hay columnas y filas (resultado de SELECT)
    if (results.columns && results.rows) {
      // Encabezados
      csv += results.columns.join(",") + "\n"

      // Filas
      results.rows.forEach((row: any) => {
        const values = results.columns.map((col: string) => {
          const value = row[col]
          // Manejar arrays y valores que puedan contener comas
          if (Array.isArray(value)) return `"${value.join("; ")}"`
          if (typeof value === "string" && value.includes(",")) return `"${value}"`
          return value
        })
        csv += values.join(",") + "\n"
      })
    } else {
      // Para otros tipos de resultados
      csv = JSON.stringify(results, null, 2)
    }

    // Crear y descargar el archivo
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "query_results.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="query">
        <TabsList className="bg-gray-700">
          <TabsTrigger value="query" className="data-[state=active]:bg-gray-600">
            Consulta
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-gray-600">
            Guardadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="query" className="space-y-4 mt-4">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe tu consulta SQL aquí..."
            className="min-h-[150px] font-mono text-sm bg-gray-700 border-gray-600 text-white"
          />

          <div className="flex gap-2">
            <Button onClick={executeQuery} disabled={executing || !query.trim()}>
              {executing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ejecutando...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Ejecutar
                </>
              )}
            </Button>

            <Button variant="outline" onClick={saveQuery} disabled={!query.trim()}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>

            {results && (
              <Button variant="outline" onClick={downloadResults}>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          {savedQueries.length > 0 ? (
            <div className="space-y-2">
              {savedQueries.map((saved, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">{saved.name}</h4>
                    <p className="text-xs text-gray-400 font-mono truncate max-w-[300px]">{saved.query}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => loadQuery(saved.query)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteQuery(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No hay consultas guardadas</p>
          )}
        </TabsContent>
      </Tabs>

      {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">{error}</div>}

      {results && !error && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-white mb-3">Resultados</h3>

          {results.message && (
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
              {results.message}
              {results.rowsAffected !== undefined && (
                <p className="mt-1 text-sm">Filas afectadas: {results.rowsAffected}</p>
              )}
            </div>
          )}

          {results.columns && results.rows && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    {results.columns.map((column: string, i: number) => (
                      <th key={i} className="px-4 py-2 text-left text-sm font-medium text-white border border-gray-600">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.rows.map((row: any, i: number) => (
                    <tr key={i} className="bg-gray-800 hover:bg-gray-700">
                      {results.columns.map((column: string, j: number) => (
                        <td key={j} className="px-4 py-2 text-sm text-gray-300 border border-gray-700">
                          {Array.isArray(row[column])
                            ? row[column].join(", ")
                            : row[column] === true
                              ? "Sí"
                              : row[column] === false
                                ? "No"
                                : row[column] || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
