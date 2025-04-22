"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

interface SecurityEvent {
  name: string
  alertas: number
  vulnerabilidades: number
  intentos: number
}

export function SecurityStats() {
  const [data, setData] = useState<SecurityEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSecurityStats = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/security/stats")

        if (!response.ok) {
          throw new Error("Error al cargar estadísticas de seguridad")
        }

        const statsData = await response.json()
        setData(statsData)
      } catch (err) {
        console.error("Error fetching security stats:", err)
        setError("No se pudieron cargar las estadísticas")
        // Fallback a datos vacíos para evitar errores de renderizado
        setData([
          { name: "Lun", alertas: 0, vulnerabilidades: 0, intentos: 0 },
          { name: "Mar", alertas: 0, vulnerabilidades: 0, intentos: 0 },
          { name: "Mié", alertas: 0, vulnerabilidades: 0, intentos: 0 },
          { name: "Jue", alertas: 0, vulnerabilidades: 0, intentos: 0 },
          { name: "Vie", alertas: 0, vulnerabilidades: 0, intentos: 0 },
          { name: "Sáb", alertas: 0, vulnerabilidades: 0, intentos: 0 },
          { name: "Dom", alertas: 0, vulnerabilidades: 0, intentos: 0 },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSecurityStats()
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold text-white">Estadísticas de Seguridad</CardTitle>
          <p className="text-sm text-gray-400">Cargando datos...</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[250px] w-full flex items-center justify-center">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold text-white">Estadísticas de Seguridad</CardTitle>
          <p className="text-sm text-gray-400">Error al cargar datos</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[250px] w-full flex items-center justify-center">
            <p className="text-red-400">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

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
                <Bar dataKey="alertas" fill="var(--color-alertas)" radius={[4, 4, 0, 0]} name="Alertas" />
                <Bar
                  dataKey="vulnerabilidades"
                  fill="var(--color-vulnerabilidades)"
                  radius={[4, 4, 0, 0]}
                  name="Vulnerabilidades"
                />
                <Bar dataKey="intentos" fill="var(--color-intentos)" radius={[4, 4, 0, 0]} name="Intentos de acceso" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
