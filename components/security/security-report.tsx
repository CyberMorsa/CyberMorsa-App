"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { AlertTriangle, CheckCircle, Download, RefreshCw, Shield, Lock, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SecurityReport() {
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulación de carga del informe
    const timer = setTimeout(() => {
      try {
        setReport({
          score: 72,
          lastScan: "2023-05-15 14:30",
          summary: {
            critical: 3,
            high: 5,
            medium: 8,
            low: 12,
            info: 7,
          },
          categories: [
            { name: "Contraseñas", score: 65, issues: 4 },
            { name: "Configuración", score: 80, issues: 2 },
            { name: "Actualizaciones", score: 60, issues: 5 },
            { name: "Firewall", score: 85, issues: 1 },
            { name: "Cifrado", score: 90, issues: 0 },
            { name: "Autenticación", score: 70, issues: 3 },
          ],
          issues: [
            {
              id: 1,
              title: "Contraseña débil detectada",
              description: "La contraseña del usuario admin es demasiado débil y fácil de adivinar.",
              severity: "critical",
              category: "Contraseñas",
              recommendation: "Cambiar la contraseña por una que incluya mayúsculas, minúsculas, números y símbolos.",
            },
            {
              id: 2,
              title: "Servicio SSH expuesto",
              description: "El servicio SSH está expuesto a Internet en el puerto 22.",
              severity: "high",
              category: "Configuración",
              recommendation: "Limitar el acceso SSH a direcciones IP específicas o usar VPN.",
            },
            {
              id: 3,
              title: "Software desactualizado",
              description: "Se encontró software desactualizado con vulnerabilidades conocidas.",
              severity: "high",
              category: "Actualizaciones",
              recommendation: "Actualizar el software a la última versión disponible.",
            },
            {
              id: 4,
              title: "Certificado SSL próximo a expirar",
              description: "El certificado SSL expirará en 15 días.",
              severity: "medium",
              category: "Cifrado",
              recommendation: "Renovar el certificado SSL antes de que expire.",
            },
            {
              id: 5,
              title: "Falta autenticación de dos factores",
              description: "No se ha configurado la autenticación de dos factores para cuentas privilegiadas.",
              severity: "high",
              category: "Autenticación",
              recommendation: "Habilitar la autenticación de dos factores para todas las cuentas privilegiadas.",
            },
          ],
        })
        setLoading(false)
      } catch (err) {
        setError("Error al generar el informe")
        setLoading(false)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const refreshReport = () => {
    setLoading(true)
    setReport(null)
    setError(null)

    // Simulación de actualización del informe
    setTimeout(() => {
      try {
        setReport({
          score: 75, // Ligera mejora
          lastScan: new Date().toLocaleString(),
          summary: {
            critical: 2, // Mejora
            high: 5,
            medium: 7, // Mejora
            low: 12,
            info: 7,
          },
          categories: [
            { name: "Contraseñas", score: 70, issues: 3 }, // Mejora
            { name: "Configuración", score: 80, issues: 2 },
            { name: "Actualizaciones", score: 65, issues: 4 }, // Mejora
            { name: "Firewall", score: 85, issues: 1 },
            { name: "Cifrado", score: 90, issues: 0 },
            { name: "Autenticación", score: 70, issues: 3 },
          ],
          issues: [
            // Problema crítico resuelto
            {
              id: 2,
              title: "Servicio SSH expuesto",
              description: "El servicio SSH está expuesto a Internet en el puerto 22.",
              severity: "high",
              category: "Configuración",
              recommendation: "Limitar el acceso SSH a direcciones IP específicas o usar VPN.",
            },
            {
              id: 3,
              title: "Software desactualizado",
              description: "Se encontró software desactualizado con vulnerabilidades conocidas.",
              severity: "high",
              category: "Actualizaciones",
              recommendation: "Actualizar el software a la última versión disponible.",
            },
            {
              id: 4,
              title: "Certificado SSL próximo a expirar",
              description: "El certificado SSL expirará en 15 días.",
              severity: "medium",
              category: "Cifrado",
              recommendation: "Renovar el certificado SSL antes de que expire.",
            },
            {
              id: 5,
              title: "Falta autenticación de dos factores",
              description: "No se ha configurado la autenticación de dos factores para cuentas privilegiadas.",
              severity: "high",
              category: "Autenticación",
              recommendation: "Habilitar la autenticación de dos factores para todas las cuentas privilegiadas.",
            },
          ],
        })
        setLoading(false)
      } catch (err) {
        setError("Error al actualizar el informe")
        setLoading(false)
      }
    }, 2000)
  }

  const downloadReport = () => {
    if (!report) return

    const jsonString = JSON.stringify(report, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `security_report_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "info":
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "low":
      case "info":
      default:
        return <CheckCircle className="h-5 w-5 text-blue-400" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Contraseñas":
        return <Lock className="h-5 w-5 text-blue-400" />
      case "Configuración":
        return <Shield className="h-5 w-5 text-green-400" />
      case "Actualizaciones":
        return <RefreshCw className="h-5 w-5 text-purple-400" />
      case "Firewall":
        return <Shield className="h-5 w-5 text-red-400" />
      case "Cifrado":
        return <Lock className="h-5 w-5 text-yellow-400" />
      case "Autenticación":
        return <Lock className="h-5 w-5 text-orange-400" />
      default:
        return <Shield className="h-5 w-5 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Generando informe de seguridad...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
          <p className="text-gray-400">{error}</p>
          <Button onClick={refreshReport} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!report) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
          <p className="text-gray-400">No se pudo generar el informe de seguridad.</p>
          <Button onClick={refreshReport} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Intentar de nuevo
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Datos para el gráfico de severidad
  const severityData = [
    { name: "Crítico", value: report.summary.critical, color: "#ef4444" },
    { name: "Alto", value: report.summary.high, color: "#f97316" },
    { name: "Medio", value: report.summary.medium, color: "#eab308" },
    { name: "Bajo", value: report.summary.low, color: "#3b82f6" },
    { name: "Info", value: report.summary.info, color: "#6b7280" },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold text-white">Informe de Seguridad</CardTitle>
              <p className="text-sm text-gray-400">Último escaneo: {report.lastScan}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshReport}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualizar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadReport}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex flex-col items-center">
            <h4 className="text-white font-medium mb-2">Puntuación de Seguridad</h4>
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-800 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                <circle
                  className={`${
                    report.score >= 80 ? "text-green-500" : report.score >= 60 ? "text-yellow-500" : "text-red-500"
                  } stroke-current`}
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * report.score) / 100}
                  transform="rotate(-90 50 50)"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{report.score}</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <Badge
                className={
                  report.score >= 80
                    ? "bg-green-500/20 text-green-400"
                    : report.score >= 60
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }
              >
                {report.score >= 80 ? "Bueno" : report.score >= 60 ? "Moderado" : "Crítico"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Problemas por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {report.categories.map((category: any, index: number) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category.name)}
                      <span className="text-sm text-white">{category.name}</span>
                    </div>
                    <Badge
                      className={
                        category.score >= 80
                          ? "bg-green-500/20 text-green-400"
                          : category.score >= 60
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }
                    >
                      {category.score}%
                    </Badge>
                  </div>
                  <Progress
                    value={category.score}
                    className="h-2"
                    indicatorClassName={
                      category.score >= 80 ? "bg-green-500" : category.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                    }
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-400">{category.issues} problemas</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Distribución de Problemas</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[250px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Resumen de Problemas</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-white">Críticos</span>
                </div>
                <Badge className="bg-red-500/20 text-red-400">{report.summary.critical}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-white">Altos</span>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400">{report.summary.high}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-white">Medios</span>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400">{report.summary.medium}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-white">Bajos</span>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400">{report.summary.low}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-700 rounded">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white">Informativos</span>
                </div>
                <Badge className="bg-gray-500/20 text-gray-400">{report.summary.info}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-gray-700 mb-4">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-600">
                Todos
              </TabsTrigger>
              <TabsTrigger value="critical" className="data-[state=active]:bg-gray-600">
                Críticos
              </TabsTrigger>
              <TabsTrigger value="high" className="data-[state=active]:bg-gray-600">
                Altos
              </TabsTrigger>
              <TabsTrigger value="medium" className="data-[state=active]:bg-gray-600">
                Medios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
              {report.issues.map((issue: any) => (
                <div key={issue.id} className={`border p-4 rounded-lg ${getSeverityColor(issue.severity)}`}>
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">{issue.title}</h4>
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{issue.description}</p>
                      <div className="mt-3 bg-gray-800/50 p-2 rounded">
                        <p className="text-sm text-white">
                          <span className="font-medium">Recomendación:</span> {issue.recommendation}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {issue.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="critical" className="mt-4 space-y-4">
              {report.issues
                .filter((issue: any) => issue.severity === "critical")
                .map((issue: any) => (
                  <div key={issue.id} className={`border p-4 rounded-lg ${getSeverityColor(issue.severity)}`}>
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{issue.title}</h4>
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{issue.description}</p>
                        <div className="mt-3 bg-gray-800/50 p-2 rounded">
                          <p className="text-sm text-white">
                            <span className="font-medium">Recomendación:</span> {issue.recommendation}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {issue.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="high" className="mt-4 space-y-4">
              {report.issues
                .filter((issue: any) => issue.severity === "high")
                .map((issue: any) => (
                  <div key={issue.id} className={`border p-4 rounded-lg ${getSeverityColor(issue.severity)}`}>
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{issue.title}</h4>
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{issue.description}</p>
                        <div className="mt-3 bg-gray-800/50 p-2 rounded">
                          <p className="text-sm text-white">
                            <span className="font-medium">Recomendación:</span> {issue.recommendation}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {issue.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="medium" className="mt-4 space-y-4">
              {report.issues
                .filter((issue: any) => issue.severity === "medium")
                .map((issue: any) => (
                  <div key={issue.id} className={`border p-4 rounded-lg ${getSeverityColor(issue.severity)}`}>
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{issue.title}</h4>
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{issue.description}</p>
                        <div className="mt-3 bg-gray-800/50 p-2 rounded">
                          <p className="text-sm text-white">
                            <span className="font-medium">Recomendación:</span> {issue.recommendation}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {issue.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
