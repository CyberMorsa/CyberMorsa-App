"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo
const PERSON_STATS = [
  { name: "Tú", activities: 15, points: 52, percentage: 42 },
  { name: "Pareja", activities: 12, points: 48, percentage: 40 },
  { name: "Amigo", activities: 5, points: 15, percentage: 12 },
  { name: "Familiar", activities: 3, points: 7, percentage: 6 },
]

export function PersonStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PERSON_STATS.map((person) => (
          <Card key={person.name}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xl font-bold">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.activities} actividades</p>
                </div>
                <div className="text-2xl font-bold">{person.points}</div>
              </div>
              <Progress value={person.percentage} className="h-2 mb-1" />
              <p className="text-xs text-right text-muted-foreground">{person.percentage}% del total de puntos</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Comparativa de Actividades</h3>
        <div className="border rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Persona</span>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-24 text-center">Actividades</span>
                <span className="text-sm font-medium w-24 text-center">Puntos</span>
                <span className="text-sm font-medium w-24 text-center">Promedio</span>
              </div>
            </div>
            <hr />
            {PERSON_STATS.map((person) => (
              <div key={person.name} className="flex items-center justify-between">
                <span className="text-sm">{person.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm w-24 text-center">{person.activities}</span>
                  <span className="text-sm w-24 text-center">{person.points}</span>
                  <span className="text-sm w-24 text-center">{(person.points / person.activities).toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
