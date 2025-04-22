"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ApiConfigFormProps {
  apiName: string
  apiKey: string
  description: string
  docsUrl: string
  fields?: { name: string; label: string; placeholder: string; type?: string }[]
  onSave: (config: Record<string, string>) => void
}

export function ApiConfigForm({
  apiName,
  apiKey,
  description,
  docsUrl,
  fields = [{ name: "apiKey", label: "API Key", placeholder: "Ingresa tu API Key", type: "password" }],
  onSave,
}: ApiConfigFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null)

  // Cargar configuración guardada
  useEffect(() => {
    const savedConfig = localStorage.getItem(`api-config-${apiKey}`)
    if (savedConfig) {
      setFormData(JSON.parse(savedConfig))
    }
  }, [apiKey])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveStatus(null)

    try {
      // Guardar en localStorage
      localStorage.setItem(`api-config-${apiKey}`, JSON.stringify(formData))

      // Llamar al callback
      onSave(formData)

      // Mostrar éxito
      setSaveStatus("success")
    } catch (error) {
      console.error("Error al guardar la configuración:", error)
      setSaveStatus("error")
    } finally {
      setIsSaving(false)

      // Limpiar el estado después de 3 segundos
      setTimeout(() => {
        setSaveStatus(null)
      }, 3000)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{apiName}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Ver documentación
            </a>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar configuración"}
              <Save className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {saveStatus === "success" && (
            <Alert variant="default" className="bg-green-900/20 border-green-900 text-green-400 mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Configuración guardada</AlertTitle>
              <AlertDescription>La configuración de la API se ha guardado correctamente.</AlertDescription>
            </Alert>
          )}

          {saveStatus === "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>No se pudo guardar la configuración. Inténtalo de nuevo.</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
