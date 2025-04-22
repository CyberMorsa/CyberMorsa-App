"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authenticate } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await authenticate(username, password)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError("Credenciales incorrectas. Inténtalo de nuevo.")
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
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
    </form>
  )
}
