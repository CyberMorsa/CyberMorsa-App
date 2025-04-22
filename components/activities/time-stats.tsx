"use client"

import { Card, CardContent } from "@/components/ui/card"

// Datos de ejemplo
const MONTHLY_STATS = [
  { month: "Enero", activities: 8, points: 24 },
  { month: "Febrero", activities: 6, points: 18 },
  { month: "Marzo", activities: 10, points: 35 },
  { month: "Abril", activities: 5, points: 15 },
  { month: "Mayo", activities: 7, points: 30 },
]

const WEEKLY_STATS = [
  { day: "Lunes", count: 5 },
  { day: "Martes", count: 3 },
  { day: "Miércoles", count: 7 },
  { day: "Jueves", count: 4 },
  { day: "Viernes", count: 8 },
  { day: "Sábado", count: 12 },
  { day: "Domingo", count: 6 },
]

export function TimeStats() {
  // Encontrar el valor máximo para calcular las alturas relativas
  const maxMonthlyActivities = Math.max(...MONTHLY_STATS.map((stat) => stat.activities))
  const maxWeeklyCount = Math.max(...WEEKLY_STATS.map((stat) => stat.count))

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Actividades por Mes</h3>
        <div className="grid grid-cols-5 gap-2 h-40">
          {MONTHLY_STATS.map((stat) => (
            <div key={stat.month} className="flex flex-col items-center justify-end">
              <div
                className="bg-primary/80 w-full rounded-t-md"
                style={{
                  height: `${(stat.activities / maxMonthlyActivities) * 100}%`,
                  minHeight: "10%",
                }}
              ></div>
              <div className="mt-2 text-xs text-center">
                <div>{stat.month}</div>
                <div className="text-muted-foreground">{stat.activities}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Actividades por Día de la Semana</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-end justify-between h-32">
              {WEEKLY_STATS.map((stat) => (
                <div key={stat.day} className="flex flex-col items-center">
                  <div
                    className="bg-primary/60 w-8 rounded-t-md"
                    style={{
                      height: `${(stat.count / maxWeeklyCount) * 100}%`,
                      minHeight: "10%",
                    }}
                  ></div>
                  <div className="mt-2 text-xs text-center">
                    <div>{stat.day.substring(0, 3)}</div>
                    <div className="text-muted-foreground">{stat.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tendencia de Puntos</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Promedio Mensual</p>
                <p className="text-2xl font-bold">
                  {(MONTHLY_STATS.reduce((acc, stat) => acc + stat.points, 0) / MONTHLY_STATS.length).toFixed(1)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Mejor Mes</p>
                <p className="text-2xl font-bold">
                  {MONTHLY_STATS.reduce((max, stat) => (max.points > stat.points ? max : stat), MONTHLY_STATS[0]).month}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Mejor Día</p>
                <p className="text-2xl font-bold">
                  {WEEKLY_STATS.reduce(
                    (max, stat) => (max.count > stat.count ? max : stat),
                    WEEKLY_STATS[0],
                  ).day.substring(0, 3)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
