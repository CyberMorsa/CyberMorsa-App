"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export function IpSearch() {
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ip) return

    setLoading(true)
    setResults(null)

    try {
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos de ejemplo
      const data = {
        ip,
        asn: "AS13335",
        isp: "Cloudflare, Inc.",
        country: "Estados Unidos",
        city: "San Francisco",
        is_abusive: Math.random() > 0.8,
        abuse_score: Math.floor(Math.random() * 100),
        last_reported: Math.random() > 0.5 ? "2023-09-15" : null,
        geo: {
          latitude: "37.7749",
          longitude: "-122.4194",
          timezone: "America/Los_Angeles",
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
          <Label htmlFor="ip">Dirección IP</Label>
          <Input
            id="ip"
            type="text"
            placeholder="8.8.8.8"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
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
            <AlertTitle>Resultados para {results.ip}</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2">
                <p>
                  <strong>ASN:</strong> {results.asn}
                </p>
                <p>
                  <strong>ISP:</strong> {results.isp}
                </p>
                <p>
                  <strong>País:</strong> {results.country}
                </p>
                <p>
                  <strong>Ciudad:</strong> {results.city}
                </p>
                <p>
                  <strong>Es abusivo:</strong> {results.is_abusive ? "Sí" : "No"}
                </p>
                <p>
                  <strong>Puntuación de abuso:</strong> {results.abuse_score}/100
                </p>
                <p>
                  <strong>Última vez reportado:</strong> {results.last_reported || "Nunca"}
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
