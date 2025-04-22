import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CounterManager } from "@/components/counter-manager"
import { SumCalculator } from "@/components/sum-calculator"
import { SubtractionCalculator } from "@/components/subtraction-calculator"

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Herramientas</h1>
        <p className="text-gray-400">Contadores y calculadoras personalizadas</p>
      </div>

      <Tabs defaultValue="counters" className="space-y-4">
        <TabsList className="bg-gray-800 p-1 w-full">
          <TabsTrigger value="counters" className="data-[state=active]:bg-gray-700 flex-1">
            Contadores
          </TabsTrigger>
          <TabsTrigger value="sum-calculator" className="data-[state=active]:bg-gray-700 flex-1">
            Calculadora de Suma
          </TabsTrigger>
          <TabsTrigger value="subtraction-calculator" className="data-[state=active]:bg-gray-700 flex-1">
            Calculadora de Resta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="counters" className="mt-6">
          <CounterManager />
        </TabsContent>

        <TabsContent value="sum-calculator" className="mt-6">
          <SumCalculator />
        </TabsContent>

        <TabsContent value="subtraction-calculator" className="mt-6">
          <SubtractionCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
