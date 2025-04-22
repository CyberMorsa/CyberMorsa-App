"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface SecurityEvent {
  month: string
  alerts: number
  vulnerabilities: number
  accessAttempts: number
}

export function SecurityStats() {
  const [securityData, setSecurityData] = useState<SecurityEvent[]>([])
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

        const data = await response.json()
        setSecurityData(data)
      } catch (err) {
        console.error("Error al cargar estadísticas:", err)
        setError("No se pudieron cargar las estadísticas de seguridad")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSecurityStats()
  }, [])

  // Si no hay datos, mostrar datos de ejemplo
  useEffect(() => {
    if (!isLoading && securityData.length === 0 && !error) {
      // Datos de ejemplo para mostrar cuando no hay datos reales
      const exampleData: SecurityEvent[] = [
        { month: "Ene", alerts: 12, vulnerabilities: 5, accessAttempts: 8 },
        { month: "Feb", alerts: 8, vulnerabilities: 3, accessAttempts: 10 },
        { month: "Mar", alerts: 15, vulnerabilities: 7, accessAttempts: 12 },
        { month: "Abr", alerts: 10, vulnerabilities: 4, accessAttempts: 7 },
        { month: "May", alerts: 5, vulnerabilities: 2, accessAttempts: 5 },
        { month: "Jun", alerts: 7, vulnerabilities: 3, accessAttempts: 9 },
      ]
      setSecurityData(exampleData)
    }
  }, [isLoading, securityData, error])

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Estadísticas de Seguridad</CardTitle>
        <CardDescription className="text-gray-400">Resumen de eventos de seguridad</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-red-400">
            <p>{error}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={securityData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fill: "#9CA3AF" }} axisLine={{ stroke: "#4B5563" }} />
              <YAxis tick={{ fill: "#9CA3AF" }} axisLine={{ stroke: "#4B5563" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
                labelStyle={{ color: "#F9FAFB" }}
                itemStyle={{ color: "#F9FAFB" }}
              />
              <Legend wrapperStyle={{ color: "#9CA3AF" }} />
              <Bar dataKey="alerts" name="Alertas" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="vulnerabilities" name="Vulnerabilidades" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="accessAttempts" name="Intentos de Acceso" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
