"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus, RotateCcw } from "lucide-react"

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

  // Cargar el contador desde localStorage al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem(`activity-counter-${id}`)
    if (savedData) {
      const data = JSON.parse(savedData)
      setCount(data.count)
      setLocalTitle(data.title)
      setLocalDescription(data.description)
    }
  }, [id])

  // Guardar el contador en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem(
      `activity-counter-${id}`,
      JSON.stringify({
        count,
        title: localTitle,
        description: localDescription,
      }),
    )
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

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">{localTitle}</CardTitle>
        <p className="text-sm text-gray-400">{localDescription}</p>
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
