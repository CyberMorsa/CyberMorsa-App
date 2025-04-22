"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export function UsernameSearch() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) return

    setLoading(true)
    setResults(null)

    try {
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos de ejemplo
      const platforms = [
        { name: "Twitter", found: Math.random() > 0.3, url: `https://twitter.com/${username}` },
        { name: "Instagram", found: Math.random() > 0.3, url: `https://instagram.com/${username}` },
        { name: "GitHub", found: Math.random() > 0.3, url: `https://github.com/${username}` },
        { name: "Reddit", found: Math.random() > 0.3, url: `https://reddit.com/user/${username}` },
        { name: "LinkedIn", found: Math.random() > 0.3, url: `https://linkedin.com/in/${username}` },
        { name: "TikTok", found: Math.random() > 0.3, url: `https://tiktok.com/@${username}` },
      ]

      setResults({
        username,
        platforms: platforms.filter((p) => p.found),
        not_found: platforms.filter((p) => !p.found).map((p) => p.name),
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al buscar la información. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!results) return

    toast({
      title: "Guardado",
      description: "La información ha sido guardada correctamente.",
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            id="username"
            type="text"
            placeholder="usuario123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </form>

      {results && (
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Resultados para {results.username}</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2">
                <p>
                  <strong>Encontrado en {results.platforms.length} plataformas:</strong>
                </p>
                <ul className="list-disc pl-5">
                  {results.platforms.map((platform: any) => (
                    <li key={platform.name}>
                      {platform.name}:{" "}
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {platform.url}
                      </a>
                    </li>
                  ))}
                </ul>
                {results.not_found.length > 0 && (
                  <>
                    <p>
                      <strong>No encontrado en:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      {results.not_found.map((platform: string) => (
                        <li key={platform}>{platform}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </AlertDescription>
          </Alert>

          <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Guardar resultados
          </Button>
        </div>
      )}
    </div>
  )
}
