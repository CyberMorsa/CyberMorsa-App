import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityCounter } from "@/components/activity-counter"

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Actividades</h1>
        <p className="text-gray-400">Lleva un registro de actividades y puntuaciones con tu pareja.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Contador de Actividades</CardTitle>
            <CardDescription>Lleva el conteo de actividades compartidas</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityCounter title="Citas" description="Registro de salidas juntos" initialCount={0} id="dates" />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Sistema de Puntos</CardTitle>
            <CardDescription>Lleva un registro de puntos ganados</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityCounter
              title="Puntos"
              description="Registro de puntos acumulados"
              initialCount={0}
              id="points"
              allowNegative
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
