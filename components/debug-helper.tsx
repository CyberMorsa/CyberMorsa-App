"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, Bug } from "lucide-react"

export function DebugHelper() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function checkAuthConfig() {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth-debug")
      if (!response.ok) {
        throw new Error("No se pudo obtener la información de depuración")
      }

      const data = await response.json()
      setDebugInfo(data)
    } catch (err) {
      setError("Error al verificar la configuración de autenticación")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={checkAuthConfig}
        disabled={loading}
        className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
      >
        <Bug className="h-4 w-4 mr-2" />
        Verificar Configuración
      </Button>

      {debugInfo && (
        <div className="mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 w-64">
          <h4 className="font-medium mb-2">Estado de Variables</h4>
          <ul className="space-y-1">
            {Object.entries(debugInfo.environment).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{key}:</span>
                <span className={value === "no configurado" ? "text-red-400" : "text-green-400"}>
                  {value as string}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="mt-2 p-3 bg-red-900/50 border border-red-700 rounded-lg text-sm text-red-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
