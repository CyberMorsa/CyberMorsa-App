"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authenticate } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2, Info } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  // Limpiar errores cuando cambian las credenciales
  useEffect(() => {
    if (error) setError("")
  }, [username, password])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    setDebugInfo(null)

    try {
      // Validar entrada
      if (!username.trim() || !password.trim()) {
        setError("El nombre de usuario y la contraseña son obligatorios")
        setIsLoading(false)
        return
      }

      const result = await authenticate(username, password)

      if (result.success) {
        // Redirigir al dashboard
        router.push("/dashboard")
        router.refresh() // Forzar actualización para reflejar el nuevo estado de autenticación
      } else {
        setError(result.error || "Credenciales incorrectas. Inténtalo de nuevo.")
        // Mostrar información de depuración en desarrollo
        if (process.env.NODE_ENV !== "production") {
          setDebugInfo(`Intento fallido para usuario: ${username}`)
        }
      }
    } catch (err) {
      console.error("Error de autenticación:", err)
      setError("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username" className="text-white">
          Usuario
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="bg-gray-700/50 border-gray-600 text-white"
          placeholder="Ingresa tu nombre de usuario"
          autoComplete="username"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-700/50 border-gray-600 text-white"
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesión...
          </>
        ) : (
          "Iniciar Sesión"
        )}
      </Button>

      {/* Información de ayuda */}
      <div className="mt-4 text-sm text-gray-400">
        <p>Si tienes problemas para iniciar sesión:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Verifica que las variables de entorno estén configuradas correctamente</li>
          <li>Asegúrate de usar las credenciales exactas (sensible a mayúsculas/minúsculas para contraseñas)</li>
        </ul>
      </div>

      {/* Información de depuración (solo en desarrollo) */}
      {debugInfo && (
        <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-sm text-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <Info className="h-4 w-4" />
            <span className="font-medium">Información de depuración</span>
          </div>
          <p>{debugInfo}</p>
        </div>
      )}
    </form>
  )
}
