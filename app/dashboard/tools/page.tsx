"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CounterManager } from "@/components/counter-manager"
import { SumCalculator } from "@/components/sum-calculator"
import { SubtractionCalculator } from "@/components/subtraction-calculator"

const tools = [
  { id: "counters", name: "Contadores", component: CounterManager },
  { id: "sum-calculator", name: "Calculadora de Suma", component: SumCalculator },
  { id: "subtraction-calculator", name: "Calculadora de Resta", component: SubtractionCalculator },
]

export default function ToolsPage() {
  const [currentToolIndex, setCurrentToolIndex] = useState(0)

  const CurrentTool = tools[currentToolIndex].component

  const goToPrevTool = () => {
    setCurrentToolIndex((prev) => (prev === 0 ? tools.length - 1 : prev - 1))
  }

  const goToNextTool = () => {
    setCurrentToolIndex((prev) => (prev === tools.length - 1 ? 0 : prev + 1))
  }

  const goToTool = (index: number) => {
    setCurrentToolIndex(index)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Herramientas</h1>
        <p className="text-gray-400">Contadores y calculadoras personalizadas</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button onClick={goToPrevTool} variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Anterior
        </Button>

        <div className="flex gap-2">
          {tools.map((tool, index) => (
            <Button
              key={tool.id}
              onClick={() => goToTool(index)}
              variant={currentToolIndex === index ? "default" : "outline"}
              className={
                currentToolIndex === index
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "border-gray-700 text-white hover:bg-gray-700"
              }
            >
              {tool.name}
            </Button>
          ))}
        </div>

        <Button onClick={goToNextTool} variant="outline" className="border-gray-700 text-white hover:bg-gray-700">
          Siguiente
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700 p-6">
        <CurrentTool />
      </Card>
    </div>
  )
}
