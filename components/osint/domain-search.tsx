"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export function DomainSearch() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain) return

    setLoading(true)
    setResults(null)

    try {
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos de ejemplo
      const data = {
        domain,
        subdomain_count: Math.floor(Math.random() * 20),
        first_seen: "2018-03-12",
        technologies: ["Nginx", "React", "Node.js", "PostgreSQL"],
        open_ports: [80, 443, 22],
        whois: {
          registrar: "GoDaddy.com, LLC",
          created_date: "2018-03-12",
          updated_date: "2023-02-28",
          expiration_date: "2024-03-12",
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
          <Label htmlFor="domain">Dominio</Label>
          <Input
            id="domain"
            type="text"
            placeholder="ejemplo.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
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
            <AlertTitle>Resultados para {results.domain}</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2">
                <p>
                  <strong>Subdominos:</strong> {results.subdomain_count}
                </p>
                <p>
                  <strong>Primera vez visto:</strong> {results.first_seen}
                </p>
                <p>
                  <strong>Tecnologías:</strong> {results.technologies.join(", ")}
                </p>
                <p>
                  <strong>Puertos abiertos:</strong> {results.open_ports.join(", ")}
                </p>
                <p>
                  <strong>Registrador:</strong> {results.whois.registrar}
                </p>
                <p>
                  <strong>Fecha de creación:</strong> {results.whois.created_date}
                </p>
                <p>
                  <strong>Fecha de expiración:</strong> {results.whois.expiration_date}
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
