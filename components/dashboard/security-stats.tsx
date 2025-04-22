"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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
    <div className="h-[250px] w-full">
      <ChartContainer
        config={{
          alertas: {
            label: "Alertas",
            color: "hsl(var(--chart-1))",
          },
          vulnerabilidades: {
            label: "Vulnerabilidades",
            color: "hsl(var(--chart-2))",
          },
          intentos: {
            label: "Intentos de acceso",
            color: "hsl(var(--chart-3))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="alertas" fill="var(--color-alertas)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="vulnerabilidades" fill="var(--color-vulnerabilidades)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="intentos" fill="var(--color-intentos)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
