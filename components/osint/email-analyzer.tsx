"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, AlertTriangle, CheckCircle, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function EmailAnalyzer() {
  const [email, setEmail] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  async function analyzeEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setAnalyzing(true)
    setResults(null)

    try {
      // Simulación de análisis de email
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Resultados simulados basados en EmailRep.io
      setResults({
        email,
        reputation: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
        suspicious: Math.random() > 0.7,
        references: Math.floor(Math.random() * 10),
        details: {
          first_seen: "2022-05-15",
          last_seen: "2023-04-22",
          domain_exists: true,
          domain_reputation: Math.random() > 0.5 ? "high" : "medium",
          domain_creation_date: "2015-03-10",
          profiles: [
            Math.random() > 0.5 ? "linkedin" : null,
            Math.random() > 0.5 ? "twitter" : null,
            Math.random() > 0.5 ? "github" : null,
          ].filter(Boolean),
          breach_details:
            Math.random() > 0.7
              ? {
                  breached: true,
                  breach_count: Math.floor(Math.random() * 3) + 1,
                  first_breach: "2020-11-05",
                  sources: ["Adobe", "LinkedIn"],
                }
              : {
                  breached: false,
                },
        },
      })
    } catch (error) {
      console.error("Error al analizar el email:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  function saveToDatabase() {
    if (!results) return

    // Simulación de guardado en base de datos
    alert(`Email ${results.email} guardado en la base de datos`)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={analyzeEmail} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Ingresa una dirección de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            disabled={analyzing}
          />
          <Button type="submit" disabled={analyzing || !email}>
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analizando...
              </>
            ) : (
              "Analizar"
            )}
          </Button>
        </div>
      </form>

      {results && (
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-white">{results.email}</h3>
              <p className="text-sm text-gray-300">Resultados del análisis</p>
            </div>
            <Badge
              className={
                results.reputation === "high"
                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  : results.reputation === "medium"
                    ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              }
            >
              Reputación {results.reputation === "high" ? "Alta" : results.reputation === "medium" ? "Media" : "Baja"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-700 rounded-lg">
              <h4 className="font-medium text-white mb-2">Información General</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Primera vez visto:</span>
                  <span className="text-white">{results.details.first_seen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Última vez visto:</span>
                  <span className="text-white">{results.details.last_seen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Dominio existe:</span>
                  <span className="text-white">{results.details.domain_exists ? "Sí" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Reputación del dominio:</span>
                  <span
                    className={
                      results.details.domain_reputation === "high"
                        ? "text-green-400"
                        : results.details.domain_reputation === "medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }
                  >
                    {results.details.domain_reputation === "high"
                      ? "Alta"
                      : results.details.domain_reputation === "medium"
                        ? "Media"
                        : "Baja"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Fecha de creación del dominio:</span>
                  <span className="text-white">{results.details.domain_creation_date}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-700 rounded-lg">
              <h4 className="font-medium text-white mb-2">Seguridad</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  {results.suspicious ? (
                    <>
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Email sospechoso</p>
                        <p className="text-xs text-gray-300">
                          Este email ha sido marcado como potencialmente malicioso
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Email seguro</p>
                        <p className="text-xs text-gray-300">No se han detectado actividades sospechosas</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  {results.details.breach_details.breached ? (
                    <>
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Encontrado en filtraciones de datos</p>
                        <p className="text-xs text-gray-300">
                          Aparece en {results.details.breach_details.breach_count} filtraciones (desde{" "}
                          {results.details.breach_details.first_breach})
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {results.details.breach_details.sources.map((source: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">No encontrado en filtraciones</p>
                        <p className="text-xs text-gray-300">
                          Este email no aparece en bases de datos de filtraciones conocidas
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {results.details.profiles.length > 0 && (
            <div className="p-3 bg-gray-700 rounded-lg">
              <h4 className="font-medium text-white mb-2">Perfiles Asociados</h4>
              <div className="flex flex-wrap gap-2">
                {results.details.profiles.map((profile: string, i: number) => (
                  <Badge key={i} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                    {profile}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button onClick={saveToDatabase} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Guardar en Base de Datos
          </Button>
        </div>
      )}
    </div>
  )
}
