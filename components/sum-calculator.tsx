"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function SumCalculator() {
  const [title, setTitle] = useState("Calculadora de Suma")
  const [items, setItems] = useState<{ id: string; value: string; numValue: number }[]>([
    { id: "item-1", value: "", numValue: 0 },
    { id: "item-2", value: "", numValue: 0 },
  ])
  const [total, setTotal] = useState(0)

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem("sum-calculator")
    if (savedData) {
      const data = JSON.parse(savedData)
      setTitle(data.title)
      setItems(data.items)
    }
  }, [])

  // Calcular el total cuando cambian los valores
  useEffect(() => {
    const sum = items.reduce((acc, item) => acc + item.numValue, 0)
    setTotal(sum)
  }, [items])

  // Guardar datos cuando cambian
  useEffect(() => {
    localStorage.setItem(
      "sum-calculator",
      JSON.stringify({
        title,
        items,
      }),
    )
  }, [title, items])

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
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-white">Total:</span>
            <span className="text-2xl font-bold text-white">
              {total.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

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
