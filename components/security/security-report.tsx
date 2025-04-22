"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Lock, FileText, Download, RefreshCw, Server, User } from "lucide-react"

export function SecurityReport() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const generateReport = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Simulamos la generación del informe
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Datos de ejemplo para el informe
      const mockReport = {
        overallScore: 78,
        lastScan: new Date().toISOString(),
        vulnerabilities: [
          {
            id: "V001",
            name: "Contraseñas débiles",
            severity: "high",
            description: "Se han detectado contraseñas débiles en varias cuentas",
            affectedSystems: ["Sistema de autenticación", "Panel de administración"],
            recommendation: "Implementar políticas de contraseñas fuertes y autenticación de dos factores",
          },
          {
            id: "V002",
            name: "Software desactualizado",
            severity: "medium",
            description: "Algunos sistemas tienen versiones de software desactualizadas",
            affectedSystems: ["Servidor web", "Base de datos"],
            recommendation: "Actualizar a las últimas versiones y establecer un proceso de actualización regular",
          },
          {
            id: "V003",
            name: "Puertos innecesarios abiertos",
            severity: "medium",
            description: "Se han detectado puertos abiertos que no son necesarios para la operación",
            affectedSystems: ["Firewall", "Router"],
            recommendation: "Cerrar los puertos innecesarios y configurar reglas de firewall adecuadas",
          },
        ],
        securityMeasures: [
          {
            id: "S001",
            name: "Firewall configurado correctamente",
            status: "good",
            description: "El firewall está configurado con reglas adecuadas",
          },
          {
            id: "S002",
            name: "Cifrado de datos en tránsito",
            status: "good",
            description: "Se utiliza HTTPS en todas las comunicaciones web",
          },
          {
            id: "S003",
            name: "Autenticación de dos factores",
            status: "warning",
            description: "La autenticación de dos factores no está habilitada en todos los sistemas",
          },
          {
            id: "S004",
            name: "Copias de seguridad",
            status: "good",
            description: "Se realizan copias de seguridad regulares y se almacenan de forma segura",
          },
        ],
        recommendations: [
          "Implementar autenticación de dos factores en todos los sistemas",
          "Actualizar el software a las últimas versiones",
          "Realizar auditorías de seguridad periódicas",
          "Establecer un plan de respuesta a incidentes",
          "Formar al personal en buenas prácticas de seguridad",
        ],
      }

      setReport(mockReport)
    } catch (err) {
      console.error("Error al generar el informe:", err)
      setError("Error al generar el informe. Inténtalo de nuevo.")
    } finally {
      setIsGenerating(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "bad":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "bad":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      default:
        return <Shield className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {!report && !isGenerating && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Informe de Seguridad</CardTitle>
            <CardDescription className="text-gray-400">
              Genera un informe completo sobre el estado de seguridad de tus sistemas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <Shield className="h-16 w-16 text-blue-400 mb-4" />
              <p className="text-white text-lg font-medium mb-2">No hay informes recientes</p>
              <p className="text-gray-400 text-center mb-6">
                Genera un nuevo informe para evaluar el estado de seguridad actual
              </p>
              <Button
                onClick={generateReport}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                Generar Informe
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isGenerating && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Generando Informe</CardTitle>
            <CardDescription className="text-gray-400">
              Analizando sistemas y recopilando información de seguridad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative h-24 w-24 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                <Shield className="absolute inset-0 h-full w-full p-5 text-blue-400" />
              </div>
              <p className="text-white text-lg font-medium mb-2">Analizando sistemas</p>
              <p className="text-gray-400 text-center mb-6">Esto puede tardar unos minutos. Por favor, espera...</p>
              <div className="w-full max-w-md">
                <Progress value={45} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Firewall</p>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-white text-sm">Completado</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Puertos</p>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-white text-sm">Completado</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Vulnerabilidades</p>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-1"></div>
                      <span className="text-white text-sm">En progreso</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Usuarios</p>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border-2 border-gray-500 mr-1"></div>
                      <span className="text-white text-sm">Pendiente</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Error</CardTitle>
            <CardDescription className="text-gray-400">Se ha producido un error al generar el informe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <AlertTriangle className="h-16 w-16 text-red-400 mb-4" />
              <p className="text-white text-lg font-medium mb-2">No se pudo generar el informe</p>
              <p className="text-red-400 text-center mb-6">{error}</p>
              <Button
                onClick={generateReport}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Intentar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {report && !isGenerating && (
        <>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Informe de Seguridad</CardTitle>
                  <CardDescription className="text-gray-400">
                    Última actualización: {new Date(report.lastScan).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                  <Button
                    onClick={generateReport}
                    disabled={isGenerating}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Actualizar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div
                  className={`h-32 w-32 rounded-full flex items-center justify-center text-3xl font-bold
                  ${report.overallScore >= 80 ? "bg-green-600/20 text-green-400" : ""}
                  ${report.overallScore >= 60 && report.overallScore < 80 ? "bg-yellow-600/20 text-yellow-400" : ""}
                  ${report.overallScore < 60 ? "bg-red-600/20 text-red-400" : ""}
                `}
                >
                  {report.overallScore}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-300">Puntuación de seguridad</p>
                  <Badge
                    className={`
                    mt-1
                    ${report.overallScore >= 80 ? "bg-green-600/20 text-green-400" : ""}
                    ${report.overallScore >= 60 && report.overallScore < 80 ? "bg-yellow-600/20 text-yellow-400" : ""}
                    ${report.overallScore < 60 ? "bg-red-600/20 text-red-400" : ""}
                  `}
                  >
                    {report.overallScore >= 80 && "BUENA"}
                    {report.overallScore >= 60 && report.overallScore < 80 && "ACEPTABLE"}
                    {report.overallScore < 60 && "DEFICIENTE"}
                  </Badge>
                </div>
              </div>

              <Tabs defaultValue="vulnerabilities" className="w-full">
                <TabsList className="bg-gray-700 mb-4">
                  <TabsTrigger value="vulnerabilities" className="data-[state=active]:bg-gray-600">
                    Vulnerabilidades
                  </TabsTrigger>
                  <TabsTrigger value="measures" className="data-[state=active]:bg-gray-600">
                    Medidas de Seguridad
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="data-[state=active]:bg-gray-600">
                    Recomendaciones
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="vulnerabilities" className="space-y-4">
                  {report.vulnerabilities.map((vuln: any, index: number) => (
                    <Card key={index} className={`border p-4 rounded-lg ${getSeverityColor(vuln.severity)}`}>
                      <CardContent className="p-0">
                        <div className="flex items-start gap-3">
                          {vuln.severity === "high" ? (
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          ) : vuln.severity === "medium" ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-blue-400" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-white">{vuln.name}</h4>
                              <Badge className={getSeverityColor(vuln.severity)}>
                                {vuln.severity === "high" && "ALTA"}
                                {vuln.severity === "medium" && "MEDIA"}
                                {vuln.severity === "low" && "BAJA"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">{vuln.description}</p>
                            <div className="mt-2">
                              <p className="text-xs text-gray-400 mb-1">Sistemas afectados:</p>
                              <div className="flex flex-wrap gap-1">
                                {vuln.affectedSystems.map((system: string, i: number) => (
                                  <Badge key={i} variant="outline" className="border-gray-600 text-gray-300">
                                    {system}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs text-gray-400 mb-1">Recomendación:</p>
                              <p className="text-sm text-gray-300">{vuln.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="measures" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {report.securityMeasures.map((measure: any, index: number) => (
                      <Card key={index} className={`border p-4 rounded-lg ${getStatusColor(measure.status)}`}>
                        <CardContent className="p-0">
                          <div className="flex items-start gap-3">
                            {getStatusIcon(measure.status)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-white">{measure.name}</h4>
                                <Badge className={getStatusColor(measure.status)}>
                                  {measure.status === "good" && "BUENO"}
                                  {measure.status === "warning" && "ADVERTENCIA"}
                                  {measure.status === "bad" && "MALO"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-300 mt-1">{measure.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-base">Recomendaciones de Seguridad</CardTitle>
                      <CardDescription className="text-gray-400">
                        Acciones recomendadas para mejorar la seguridad
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {report.recommendations.map((recommendation: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-gray-300">{recommendation}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Lock className="h-10 w-10 text-blue-400 mb-2" />
                          <h4 className="font-medium text-white mb-1">Autenticación</h4>
                          <p className="text-sm text-gray-300">
                            Mejora tus sistemas de autenticación y gestión de accesos
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Server className="h-10 w-10 text-blue-400 mb-2" />
                          <h4 className="font-medium text-white mb-1">Infraestructura</h4>
                          <p className="text-sm text-gray-300">
                            Actualiza y protege tu infraestructura de servidores y redes
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <User className="h-10 w-10 text-blue-400 mb-2" />
                          <h4 className="font-medium text-white mb-1">Formación</h4>
                          <p className="text-sm text-gray-300">Forma a tu equipo en buenas prácticas de seguridad</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
