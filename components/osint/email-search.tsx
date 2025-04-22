"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export function EmailSearch() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setResults(null)

    try {
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos de ejemplo
      const data = {
        email,
        domain: email.split("@")[1],
        reputation_score: Math.floor(Math.random() * 100),
        in_breach: Math.random() > 0.5,
        has_social_links: Math.random() > 0.3,
        sources: ["EmailRep.io", "HaveIBeenPwned"],
        metadata: {
          first_seen: "2021-05-15",
          last_seen: "2023-10-20",
          associated_domains: [email.split("@")[1], "example.com"],
        },
      }

      setResults(data)
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
          <Label htmlFor="email">Dirección de Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="ejemplo@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <AlertTitle>Resultados para {results.email}</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2">
                <p>
                  <strong>Dominio:</strong> {results.domain}
                </p>
                <p>
                  <strong>Puntuación de reputación:</strong> {results.reputation_score}/100
                </p>
                <p>
                  <strong>En filtraciones:</strong> {results.in_breach ? "Sí" : "No"}
                </p>
                <p>
                  <strong>Enlaces sociales:</strong> {results.has_social_links ? "Sí" : "No"}
                </p>
                <p>
                  <strong>Fuentes:</strong> {results.sources.join(", ")}
                </p>
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
