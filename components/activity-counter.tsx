"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus, RotateCcw, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ActivityCounterProps {
  title: string
  description: string
  initialCount: number
  id: string
  allowNegative?: boolean
}

export function ActivityCounter({
  title,
  description,
  initialCount = 0,
  id,
  allowNegative = false,
}: ActivityCounterProps) {
  const [count, setCount] = useState(initialCount)
  const [localTitle, setLocalTitle] = useState(title)
  const [localDescription, setLocalDescription] = useState(description)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Cargar el contador desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem(`activity-counter-${id}`)
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setCount(data.count)
        setLocalTitle(data.title)
        setLocalDescription(data.description)
      } catch (error) {
        console.error("Error al cargar datos:", error)
      }
    }
  }, [id])

  // Guardar el contador en localStorage y base de datos cuando cambia
  useEffect(() => {
    const data = {
      count,
      title: localTitle,
      description: localDescription,
    }

    localStorage.setItem(`activity-counter-${id}`, JSON.stringify(data))

    // Guardar en la base de datos (simulado)
    const saveToDatabase = async () => {
      try {
        setIsSaving(true)
        // Simulación de guardado
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Aquí iría la llamada real a la API
        // await fetch("/api/activities/save", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     id,
        //     ...data,
        //   }),
        // })

        setIsSaving(false)
      } catch (error) {
        console.error("Error al guardar en la base de datos:", error)
        setIsSaving(false)
      }
    }

    const debounce = setTimeout(() => {
      saveToDatabase()
    }, 1000)

    return () => clearTimeout(debounce)
  }, [count, localTitle, localDescription, id])

  const increment = () => setCount(count + 1)

  const decrement = () => {
    if (count > 0 || allowNegative) {
      setCount(count - 1)
    }
  }

  const reset = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar el contador a cero?")) {
      setCount(0)
    }
  }

  const saveManually = () => {
    toast({
      title: "Guardado",
      description: "Los datos se han guardado correctamente",
    })
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        {isEditingTitle ? (
          <Input
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
            className="text-xl font-bold bg-gray-700 border-gray-600 text-white"
            autoFocus
          />
        ) : (
          <CardTitle
            className="text-xl font-bold text-white cursor-pointer hover:text-blue-400"
            onClick={() => setIsEditingTitle(true)}
          >
            {localTitle || "Haz clic para añadir un título"}
          </CardTitle>
        )}

        {isEditingDescription ? (
          <Textarea
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            onBlur={() => setIsEditingDescription(false)}
            className="text-sm bg-gray-700 border-gray-600 text-gray-300"
            autoFocus
          />
        ) : (
          <p
            className="text-sm text-gray-400 cursor-pointer hover:text-blue-400"
            onClick={() => setIsEditingDescription(true)}
          >
            {localDescription || "Haz clic para añadir una descripción"}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white mb-6">{count}</div>
            <div className="flex gap-4">
              <Button
                onClick={decrement}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg flex items-center"
                disabled={!allowNegative && count <= 0}
              >
                <Minus className="mr-2 h-5 w-5" />
                <span>Restar</span>
              </Button>
              <Button
                onClick={increment}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg flex items-center"
              >
                <Plus className="mr-2 h-5 w-5" />
                <span>Sumar</span>
              </Button>
              <Button
                onClick={reset}
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 px-6 py-3 text-lg flex items-center"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                <span>Reiniciar</span>
              </Button>
            </div>
            <div className="mt-4 flex items-center">
              <Button
                onClick={saveManually}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700"
                disabled={isSaving}
              >
                <Save className="mr-2 h-4 w-4" />
                <span>{isSaving ? "Guardando..." : "Guardar"}</span>
              </Button>
              {isSaving && <span className="ml-2 text-sm text-gray-400">Guardando cambios...</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
