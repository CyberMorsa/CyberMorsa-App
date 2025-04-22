"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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

  // Load count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem(`activity-counter-${id}`)
    if (savedCount) {
      setCount(Number.parseInt(savedCount, 10))
    }
  }, [id])

  // Save count to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(`activity-counter-${id}`, count.toString())
  }, [count, id])

  const increment = () => setCount((prev) => prev + 1)

  const decrement = () => {
    if (allowNegative || count > 0) {
      setCount((prev) => prev - 1)
    }
  }

  const reset = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar el contador a cero?")) {
      setCount(0)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-5xl font-bold tabular-nums bg-gray-700 px-6 py-3 rounded-lg">{count}</div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={!allowNegative && count === 0}
          className="border-gray-700 text-white hover:bg-gray-700"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          className="border-gray-700 text-white hover:bg-gray-700"
        >
          <Plus className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" onClick={reset} className="border-gray-700 text-white hover:bg-gray-700">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
