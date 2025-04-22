"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, User, Check, X, Save } from "lucide-react"

export function UsernameTracker() {
  const [username, setUsername] = useState("")
  const [tracking, setTracking] = useState(false)
  const [results, setResults] = useState<any>(null)

  const platforms = [
    { name: "Twitter", icon: "twitter" },
    { name: "Instagram", icon: "instagram" },
    { name: "GitHub", icon: "github" },
    { name: "Reddit", icon: "reddit" },
    { name: "LinkedIn", icon: "linkedin" },
    { name: "Facebook", icon: "facebook" },
    { name: "TikTok", icon: "tiktok" },
    { name: "YouTube", icon: "youtube" },
  ]

  async function trackUsername(e: React.FormEvent) {
    e.preventDefault()
    if (!username) return

    setTracking(true)
    setResults(null)

    try {
      // Simulación de búsqueda de username
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Resultados simulados basados en WhatsMyName
      setResults({
        username,
        found: platforms.map((platform) => ({
          platform: platform.name,
          icon: platform.icon,
          exists: Math.random() > 0.5,
          url:
            platform.name.toLowerCase() === "github"
              ? `https://github.com/${username}`
              : platform.name.toLowerCase() === "twitter"
                ? `https://twitter.com/${username}`
                : `https://${platform.name.toLowerCase()}.com/${username}`,
        })),
      })
    } catch (error) {
      console.error("Error al rastrear el nombre de usuario:", error)
    } finally {
      setTracking(false)
    }
  }

  function saveToDatabase() {
    if (!results) return

    // Simulación de guardado en base de datos
    alert(`Usuario ${results.username} guardado en la base de datos`)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={trackUsername} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ingresa un nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            disabled={tracking}
          />
          <Button type="submit" disabled={tracking || !username}>
            {tracking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando...
              </>
            ) : (
              "Buscar"
            )}
          </Button>
        </div>
      </form>

      {results && (
        <div className="space-y-4 mt-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-white">@{results.username}</h3>
              <p className="text-sm text-gray-300">
                Encontrado en {results.found.filter((f: any) => f.exists).length} de {platforms.length} plataformas
              </p>
            </div>
            <Button size="sm" onClick={saveToDatabase}>
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.found.map((result: any, i: number) => (
              <div
                key={i}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  result.exists ? "bg-green-500/10 border border-green-500/30" : "bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      result.exists ? "bg-green-500/20" : "bg-gray-600"
                    }`}
                  >
                    <User className={`h-4 w-4 ${result.exists ? "text-green-400" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-white">{result.platform}</p>
                    {result.exists && (
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline"
                      >
                        {result.url}
                      </a>
                    )}
                  </div>
                </div>
                {result.exists ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-gray-500" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
