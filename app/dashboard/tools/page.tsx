import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SumCalculator } from "@/components/sum-calculator"
import { SubtractionCalculator } from "@/components/subtraction-calculator"

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Herramientas</h1>
        <p className="text-gray-400">Utilidades y herramientas para análisis de seguridad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Calculadora de Suma</CardTitle>
            <CardDescription className="text-gray-400">Herramienta para sumar valores numéricos</CardDescription>
          </CardHeader>
          <CardContent>
            <SumCalculator />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Calculadora de Resta</CardTitle>
            <CardDescription className="text-gray-400">Herramienta para restar valores numéricos</CardDescription>
          </CardHeader>
          <CardContent>
            <SubtractionCalculator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
