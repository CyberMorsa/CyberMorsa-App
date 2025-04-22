"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function SubtractionCalculator() {
  const [title, setTitle] = useState("Calculadora de Resta")
  const [initialTotal, setInitialTotal] = useState<string>("0")
  const [initialNumValue, setInitialNumValue] = useState(0)
  const [items, setItems] = useState<{ id: string; value: string; numValue: number }[]>([
    { id: "item-1", value: "", numValue: 0 },
  ])
  const [remainingTotal, setRemainingTotal] = useState(0)
  const [steps, setSteps] = useState<{ total: number; subtracted: number; remaining: number }[]>([])

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem("subtraction-calculator")
    if (savedData) {
      const data = JSON.parse(savedData)
      setTitle(data.title)
      setInitialTotal(data.initialTotal)
      setInitialNumValue(data.initialNumValue)
      setItems(data.items)
    }
  }, [])

  // Calcular el total restante y los pasos cuando cambian los valores
  useEffect(() => {
    let currentTotal = initialNumValue
    const newSteps: { total: number; subtracted: number; remaining: number }[] = []

    items.forEach((item) => {
      if (item.numValue > 0) {
        const remaining = currentTotal - item.numValue
        newSteps.push({
          total: currentTotal,
          subtracted: item.numValue,
          remaining: remaining,
        })
        currentTotal = remaining
      }
    })

    setSteps(newSteps)
    setRemainingTotal(currentTotal)
  }, [initialNumValue, items])

  // Guardar datos cuando cambian
  useEffect(() => {
    localStorage.setItem(
      "subtraction-calculator",
      JSON.stringify({
        title,
        initialTotal,
        initialNumValue,
        items,
      }),
    )
  }, [title, initialTotal, initialNumValue, items])

  const updateInitialTotal = (value: string) => {
    // Permitir solo números y punto decimal
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInitialTotal(value)
      setInitialNumValue(value === "" ? 0 : Number.parseFloat(value) || 0)
    }
  }

  const addItem = () => {
    setItems([...items, { id: `item-${Date.now()}`, value: "", numValue: 0 }])
  }

  const removeItem = (itemId: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== itemId))
    }
  }

  const updateItemValue = (itemId: string, value: string) => {
    // Permitir solo números y punto decimal
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      const numValue = value === "" ? 0 : Number.parseFloat(value) || 0
      setItems(items.map((item) => (item.id === itemId ? { ...item, value, numValue } : item)))
    }
  }

  const resetCalculator = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar la calculadora?")) {
      setItems(items.map((item) => ({ ...item, value: "", numValue: 0 })))
    }
  }

  return (
    <Card className="w-full bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Input
          type="text"
          placeholder="Título de la calculadora"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-bold bg-gray-700 border-gray-600 text-white"
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-white">Total inicial:</span>
            <Input
              type="text"
              placeholder="0.00"
              value={initialTotal}
              onChange={(e) => updateInitialTotal(e.target.value)}
              className="bg-gray-600 border-gray-500 text-white text-right"
            />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-600">
            <span className="text-lg font-medium text-white">Restante:</span>
            <span className={`text-2xl font-bold ${remainingTotal < 0 ? "text-red-400" : "text-white"}`}>
              {remainingTotal.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {steps.length > 0 && (
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">Pasos de cálculo:</h3>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">
                    {step.total.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-red-400">
                    - {step.subtracted.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-gray-300">=</span>
                  <span className="text-green-400">
                    {step.remaining.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className="w-10 text-center text-gray-400">{index + 1}.</div>
              <Input
                type="text"
                placeholder="0.00"
                value={item.value}
                onChange={(e) => updateItemValue(item.id, e.target.value)}
                className="bg-gray-700 border-gray-600 text-white text-right"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-400 hover:bg-gray-700"
                disabled={items.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={addItem}
            variant="outline"
            className="w-full border-dashed border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir fila
          </Button>
          <Button onClick={resetCalculator} variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
