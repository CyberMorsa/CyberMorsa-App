"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calculator, Activity } from "lucide-react"
import { EnhancedCounter } from "@/components/enhanced-counter"
import { SumCalculator } from "@/components/sum-calculator"
import { SubtractionCalculator } from "@/components/subtraction-calculator"

const tools = [
  {
    id: "counters",
    name: "Contadores",
    icon: Activity,
    component: EnhancedCounter,
    description: "Contadores personalizados para seguimiento de actividades",
  },
  {
    id: "sum-calculator",
    name: "Calculadora de Suma",
    icon: Calculator,
    component: SumCalculator,
    description: "Suma múltiples valores con facilidad",
  },
  {
    id: "subtraction-calculator",
    name: "Calculadora de Resta",
    icon: Calculator,
    component: SubtractionCalculator,
    description: "Resta valores con seguimiento de pasos",
  },
]

export default function ToolsPage() {
  const [currentToolIndex, setCurrentToolIndex] = useState(0)

  const CurrentTool = tools[currentToolIndex].component
  const currentTool = tools[currentToolIndex]

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

      {/* Carrusel de aplicaciones */}
      <Card className="bg-gray-800 border-gray-700 p-4">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Button onClick={goToPrevTool} size="lg" className="bg-gray-700 hover:bg-gray-600 text-white">
              <ChevronLeft className="h-6 w-6 mr-2" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>

            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-white">{currentTool.name}</CardTitle>
              <CardDescription className="text-gray-400">{currentTool.description}</CardDescription>
            </div>

            <Button onClick={goToNextTool} size="lg" className="bg-gray-700 hover:bg-gray-600 text-white">
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </CardHeader>

        {/* Indicadores de página */}
        <CardContent className="pt-4 pb-0">
          <div className="flex justify-center gap-2 mb-6">
            {tools.map((tool, index) => (
              <Button
                key={tool.id}
                onClick={() => goToTool(index)}
                variant={currentToolIndex === index ? "default" : "outline"}
                className={
                  currentToolIndex === index
                    ? "bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0"
                    : "border-gray-700 text-white hover:bg-gray-700 h-10 w-10 p-0"
                }
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contenedor de la herramienta actual */}
      <Card className="bg-gray-800 border-gray-700 p-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <currentTool.icon className="h-6 w-6 mr-2" />
            {currentTool.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CurrentTool id={`tool-${currentTool.id}`} />
        </CardContent>
      </Card>
    </div>
  )
}
