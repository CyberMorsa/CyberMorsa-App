"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export function SecurityStats() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Simulación de datos de seguridad
    const mockData = [
      { name: "Lun", alertas: 4, vulnerabilidades: 2, intentos: 12 },
      { name: "Mar", alertas: 3, vulnerabilidades: 1, intentos: 8 },
      { name: "Mié", alertas: 2, vulnerabilidades: 3, intentos: 10 },
      { name: "Jue", alertas: 5, vulnerabilidades: 2, intentos: 15 },
      { name: "Vie", alertas: 7, vulnerabilidades: 4, intentos: 20 },
      { name: "Sáb", alertas: 2, vulnerabilidades: 1, intentos: 5 },
      { name: "Dom", alertas: 1, vulnerabilidades: 0, intentos: 3 },
    ]

    setData(mockData)
  }, [])

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-bold text-white">Estadísticas de Seguridad</CardTitle>
        <p className="text-sm text-gray-400">Resumen de eventos de seguridad</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px] w-full">
          <ChartContainer
            config={{
              alertas: {
                label: "Alertas",
                color: "hsl(0, 100%, 65%)",
              },
              vulnerabilidades: {
                label: "Vulnerabilidades",
                color: "hsl(40, 100%, 65%)",
              },
              intentos: {
                label: "Intentos de acceso",
                color: "hsl(200, 100%, 65%)",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} maxBarSize={30}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  domain={[0, "auto"]}
                />
                <Tooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                <Legend
                  wrapperStyle={{ paddingTop: 10 }}
                  formatter={(value) => <span style={{ color: "white" }}>{value}</span>}
                />
                <Bar dataKey="alertas" fill="hsl(0, 100%, 65%)" radius={[4, 4, 0, 0]} name="Alertas" />
                <Bar
                  dataKey="vulnerabilidades"
                  fill="hsl(40, 100%, 65%)"
                  radius={[4, 4, 0, 0]}
                  name="Vulnerabilidades"
                />
                <Bar dataKey="intentos" fill="hsl(200, 100%, 65%)" radius={[4, 4, 0, 0]} name="Intentos de acceso" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
