"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
  const reset = () => setCount(0)

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className="text-xl font-bold bg-gray-700 border-gray-600 text-white"
              placeholder="Título del contador"
            />
            <Textarea
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-300 resize-none"
              placeholder="Descripción (opcional)"
              rows={2}
            />
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-6xl font-bold text-white mb-4">{count}</div>
            <div className="flex gap-2">
              <Button
                onClick={decrement}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={!allowNegative && count <= 0}
              >
                <Minus className="mr-1 h-5 w-5" />
                <span className="text-lg">Restar</span>
              </Button>
              <Button onClick={increment} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-1 h-5 w-5" />
                <span className="text-lg">Sumar</span>
              </Button>
              <Button
                onClick={reset}
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <RotateCcw className="mr-1 h-5 w-5" />
                <span className="text-lg">Reiniciar</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
