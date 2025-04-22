"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Shield, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function SecurityScanner() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [target, setTarget] = useState("")
  const [results, setResults] = useState<null | {
    vulnerabilities: number
    securityScore: number
    recommendations: string[]
  }>(null)

  async function startScan(e: React.FormEvent) {
    e.preventDefault()
    if (!target) return

    setScanning(true)
    setProgress(0)
    setResults(null)

    // Simulación de escaneo
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setScanning(false)

          // Resultados simulados
          setResults({
            vulnerabilities: Math.floor(Math.random() * 5),
            securityScore: Math.floor(Math.random() * 40) + 60,
            recommendations: [
              "Actualiza tus sistemas a la última versión",
              "Implementa autenticación de dos factores",
              "Revisa los permisos de acceso a recursos críticos",
            ],
          })

          return 100
        }
        return newProgress
      })
    }, 500)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={startScan} className="flex gap-2">
        <Input
          type="text"
          placeholder="Dominio o IP a escanear"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white"
          disabled={scanning}
        />
        <Button type="submit" disabled={scanning || !target}>
          {scanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Escaneando...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Escanear
            </>
          )}
        </Button>
      </form>

      {scanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Escaneando...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {results && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-white">Resultados del Escaneo</h3>
              <p className="text-sm text-gray-300">Objetivo: {target}</p>
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-full flex items-center">
              <Shield
                className={`h-4 w-4 mr-2 ${results.securityScore > 80 ? "text-green-500" : results.securityScore > 60 ? "text-yellow-500" : "text-red-500"}`}
              />
              <span className="text-white font-medium">{results.securityScore}/100</span>
            </div>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h4 className="font-medium text-white mb-2">Vulnerabilidades encontradas: {results.vulnerabilities}</h4>

            {results.vulnerabilities > 0 ? (
              <div className="space-y-2">
                {Array.from({ length: results.vulnerabilities }).map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">Vulnerabilidad #{i + 1}</p>
                      <p className="text-xs text-gray-300">Descripción de la vulnerabilidad encontrada</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-green-400">¡No se encontraron vulnerabilidades!</p>
            )}
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Recomendaciones:</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              {results.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
