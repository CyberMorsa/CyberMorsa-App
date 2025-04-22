"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo
const ACTIVITY_STATS = [
  { name: "Cena romántica", count: 8, points: 42, percentage: 30 },
  { name: "Película en casa", count: 12, points: 36, percentage: 25 },
  { name: "Paseo por el parque", count: 6, points: 12, percentage: 15 },
  { name: "Cocinar juntos", count: 5, points: 20, percentage: 20 },
  { name: "Juego de mesa", count: 4, points: 12, percentage: 10 },
]

const TOTAL_STATS = {
  activities: 35,
  points: 122,
  averagePoints: 3.5,
  mostActive: "Película en casa",
  mostPoints: "Cena romántica",
}

export function ActivityStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_STATS.activities}</div>
            <p className="text-xs text-muted-foreground">Actividades registradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Puntos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_STATS.points}</div>
            <p className="text-xs text-muted-foreground">Puntos acumulados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Promedio de Puntos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_STATS.averagePoints}</div>
            <p className="text-xs text-muted-foreground">Por actividad</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Actividades por Frecuencia</h3>
        <div className="space-y-4">
          {ACTIVITY_STATS.map((activity) => (
            <div key={activity.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{activity.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.count} veces • {activity.points} puntos
                  </p>
                </div>
                <div className="text-sm font-medium">{activity.percentage}%</div>
              </div>
              <Progress value={activity.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
