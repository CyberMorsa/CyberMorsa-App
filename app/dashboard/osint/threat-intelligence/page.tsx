"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Globe, Shield, Search, FileText, Database, Server } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ThreatIntelligencePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [threatData, setThreatData] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setThreatData(null)

    // Simulación de búsqueda
    setTimeout(() => {
      setThreatData({
        indicator: searchQuery,
        type: searchQuery.includes(".") ? "domain" : searchQuery.match(/^[0-9.]+$/) ? "ip" : "hash",
        riskScore: 78,
        firstSeen: "2022-08-15",
        lastSeen: "2023-04-22",
        malwareAssociations: [
          { name: "Emotet", confidence: 85, type: "Trojan", firstSeen: "2022-09-10" },
          { name: "TrickBot", confidence: 65, type: "Banking Trojan", firstSeen: "2022-11-05" },
        ],
        categories: ["Malware", "Phishing", "Command & Control"],
        reports: [
          {
            title: "Análisis de campaña de malware",
            date: "2023-01-15",
            source: "AlienVault",
            severity: "high",
            summary:
              "Este indicador está relacionado con una campaña de distribución de malware que afecta principalmente al sector financiero.",
          },
          {
            title: "Actividad de botnet detectada",
            date: "2022-12-03",
            source: "VirusTotal",
            severity: "medium",
            summary:
              "Se ha detectado actividad de botnet asociada a este indicador, con comunicaciones a servidores C2 conocidos.",
          },
        ],
        relatedIndicators: [
          { value: "185.159.82.15", type: "ip", riskScore: 82 },
          { value: "malicious-payload.bin", type: "file", riskScore: 90 },
          { value: "d8e8fca2dc0f896fd7cb4cb0031ba249", type: "hash", riskScore: 75 },
        ],
      })
      setIsLoading(false)
    }, 1500)
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ip":
        return <Globe className="h-5 w-5 text-blue-400" />
      case "domain":
        return <Globe className="h-5 w-5 text-green-400" />
      case "file":
        return <FileText className="h-5 w-5 text-yellow-400" />
      case "hash":
        return <Database className="h-5 w-5 text-purple-400" />
      default:
        return <Server className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Threat Intelligence</h1>
        <p className="text-gray-400">Analiza indicadores de amenazas como IPs, dominios o hashes</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Buscador de Amenazas</CardTitle>
          <CardDescription className="text-gray-400">
            Introduce una IP, dominio o hash para analizar su nivel de amenaza
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="IP, dominio o hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Analizando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analizar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Analizando indicador de amenaza...</p>
        </div>
      )}

      {threatData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Resumen de Amenaza</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <div
                    className={`h-24 w-24 rounded-full flex items-center justify-center mb-4 ${
                      threatData.riskScore > 70
                        ? "bg-red-500/20 text-red-400"
                        : threatData.riskScore > 40
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    <span className="text-3xl font-bold">{threatData.riskScore}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{threatData.indicator}</h3>
                  <Badge
                    className={`mt-1 ${
                      threatData.riskScore > 70
                        ? "bg-red-500/20 text-red-400"
                        : threatData.riskScore > 40
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {threatData.riskScore > 70
                      ? "Alto Riesgo"
                      : threatData.riskScore > 40
                        ? "Riesgo Medio"
                        : "Bajo Riesgo"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Tipo de Indicador</p>
                      <p className="text-white capitalize">{threatData.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Categorías</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {threatData.categories.map((category: string, index: number) => (
                          <Badge key={index} className="bg-blue-500/20 text-blue-400">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Primera Detección</p>
                      <p className="text-white">{threatData.firstSeen}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Última Detección</p>
                      <p className="text-white">{threatData.lastSeen}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Información Detallada</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="malware" className="w-full">
                <TabsList className="bg-gray-700 mb-4">
                  <TabsTrigger value="malware" className="data-[state=active]:bg-gray-600">
                    Malware Asociado
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="data-[state=active]:bg-gray-600">
                    Informes
                  </TabsTrigger>
                  <TabsTrigger value="related" className="data-[state=active]:bg-gray-600">
                    Indicadores Relacionados
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="malware" className="space-y-4">
                  {threatData.malwareAssociations.length > 0 ? (
                    threatData.malwareAssociations.map((malware: any, index: number) => (
                      <Card key={index} className="bg-gray-700 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-400" />
                              <div>
                                <h4 className="font-medium text-white">{malware.name}</h4>
                                <p className="text-sm text-gray-400">{malware.type}</p>
                              </div>
                            </div>
                            <div>
                              <Badge
                                className={
                                  malware.confidence > 70
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                                }
                              >
                                Confianza: {malware.confidence}%
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm text-gray-400">Nivel de confianza</p>
                            <Progress
                              value={malware.confidence}
                              className="h-2 mt-1"
                              indicatorClassName={malware.confidence > 70 ? "bg-red-500" : "bg-yellow-500"}
                            />
                          </div>
                          <div className="mt-2 text-right">
                            <span className="text-xs text-gray-400">Primera detección: {malware.firstSeen}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                      <p className="text-white text-lg font-medium">No se encontró malware asociado</p>
                      <p className="text-gray-400">Este indicador no está asociado con malware conocido</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  {threatData.reports.map((report: any, index: number) => (
                    <Card key={index} className={`border p-4 rounded-lg ${getSeverityColor(report.severity)}`}>
                      <CardContent className="p-0">
                        <div className="flex items-start gap-3">
                          {report.severity === "high" ? (
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          ) : report.severity === "medium" ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-blue-400" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-white">{report.title}</h4>
                              <Badge className={getSeverityColor(report.severity)}>
                                {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">{report.summary}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-gray-400">Fuente: {report.source}</span>
                              <span className="text-xs text-gray-400">Fecha: {report.date}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="related" className="space-y-4">
                  {threatData.relatedIndicators.map((indicator: any, index: number) => (
                    <Card key={index} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(indicator.type)}
                            <div>
                              <h4 className="font-medium text-white">{indicator.value}</h4>
                              <p className="text-sm text-gray-400 capitalize">{indicator.type}</p>
                            </div>
                          </div>
                          <div>
                            <Badge
                              className={
                                indicator.riskScore > 70
                                  ? "bg-red-500/20 text-red-400"
                                  : indicator.riskScore > 40
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-green-500/20 text-green-400"
                              }
                            >
                              Riesgo: {indicator.riskScore}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-400">Nivel de riesgo</p>
                          <Progress
                            value={indicator.riskScore}
                            className="h-2 mt-1"
                            indicatorClassName={
                              indicator.riskScore > 70
                                ? "bg-red-500"
                                : indicator.riskScore > 40
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }
                          />
                        </div>
                        <div className="mt-2 text-right">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => setSearchQuery(indicator.value)}
                          >
                            Analizar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
