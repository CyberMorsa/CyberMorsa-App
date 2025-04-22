"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, PieChart, BarChart, MapPin, Shield, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function OsintAnalytics() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)

      // En un entorno real, esto sería una llamada a la API
      // Simulamos datos para la demostración
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setStats({
        ipIntelligence: {
          total: 24,
          malicious: 8,
          suspicious: 5,
          clean: 11,
          topCountries: [
            { country: "United States", count: 10 },
            { country: "China", count: 5 },
            { country: "Russia", count: 3 },
            { country: "Germany", count: 2 },
            { country: "Brazil", count: 2 },
          ],
          topCategories: [
            { category: "Web Scanning", count: 6 },
            { category: "SSH Brute Force", count: 4 },
            { category: "Port Scan", count: 3 },
            { category: "Web Spam", count: 2 },
            { category: "Email Spam", count: 1 },
          ],
        },
        personIntelligence: {
          total: 15,
          withSocialProfiles: 12,
          withAddresses: 8,
          withRelations: 6,
          highRisk: 3,
          mediumRisk: 5,
          lowRisk: 7,
          topPlatforms: [
            { platform: "LinkedIn", count: 10 },
            { platform: "Twitter", count: 8 },
            { platform: "Facebook", count: 7 },
            { platform: "Instagram", count: 6 },
            { platform: "GitHub", count: 4 },
          ],
        },
        threatIntelligence: {
          total: 18,
          malicious: 12,
          suspicious: 4,
          clean: 2,
          byType: [
            { type: "url", count: 8 },
            { type: "hash", count: 5 },
            { type: "file", count: 3 },
            { type: "ioc", count: 2 },
          ],
          topMalwareFamilies: [
            { family: "Emotet", count: 4 },
            { family: "TrickBot", count: 3 },
            { family: "Ryuk", count: 2 },
            { family: "Dridex", count: 2 },
            { family: "Qakbot", count: 1 },
          ],
        },
      })
    } catch (error) {
      console.error("Error al cargar estadísticas:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las estadísticas",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Análisis OSINT</CardTitle>
        <CardDescription className="text-gray-300">Estadísticas y tendencias de los datos recopilados</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ip">
          <TabsList className="bg-gray-700">
            <TabsTrigger value="ip" className="data-[state=active]:bg-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              IP Intelligence
            </TabsTrigger>
            <TabsTrigger value="person" className="data-[state=active]:bg-gray-600">
              <User className="h-4 w-4 mr-2" />
              Person Intelligence
            </TabsTrigger>
            <TabsTrigger value="threat" className="data-[state=active]:bg-gray-600">
              <Shield className="h-4 w-4 mr-2" />
              Threat Intelligence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ip" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Distribución de Resultados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-4">
                    <PieChart className="h-32 w-32 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-red-400">{stats.ipIntelligence.malicious}</div>
                      <div className="text-xs text-gray-300">Maliciosas</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{stats.ipIntelligence.suspicious}</div>
                      <div className="text-xs text-gray-300">Sospechosas</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{stats.ipIntelligence.clean}</div>
                      <div className="text-xs text-gray-300">Limpias</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Países Principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.ipIntelligence.topCountries.map((country: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{country.country}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${(country.count / stats.ipIntelligence.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{country.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Categorías de Abuso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.ipIntelligence.topCategories.map((category: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{category.category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${(category.count / stats.ipIntelligence.malicious) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{category.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="person" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Distribución de Riesgo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-4">
                    <PieChart className="h-32 w-32 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-red-400">{stats.personIntelligence.highRisk}</div>
                      <div className="text-xs text-gray-300">Alto</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{stats.personIntelligence.mediumRisk}</div>
                      <div className="text-xs text-gray-300">Medio</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{stats.personIntelligence.lowRisk}</div>
                      <div className="text-xs text-gray-300">Bajo</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Cobertura de Datos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">Perfiles Sociales</span>
                        <span className="text-xs text-gray-400">
                          {stats.personIntelligence.withSocialProfiles}/{stats.personIntelligence.total}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${(stats.personIntelligence.withSocialProfiles / stats.personIntelligence.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">Direcciones</span>
                        <span className="text-xs text-gray-400">
                          {stats.personIntelligence.withAddresses}/{stats.personIntelligence.total}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{
                            width: `${(stats.personIntelligence.withAddresses / stats.personIntelligence.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-300">Relaciones</span>
                        <span className="text-xs text-gray-400">
                          {stats.personIntelligence.withRelations}/{stats.personIntelligence.total}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{
                            width: `${(stats.personIntelligence.withRelations / stats.personIntelligence.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Plataformas Sociales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.personIntelligence.topPlatforms.map((platform: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{platform.platform}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500"
                              style={{
                                width: `${(platform.count / stats.personIntelligence.withSocialProfiles) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{platform.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="threat" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Distribución de Veredictos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-4">
                    <PieChart className="h-32 w-32 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-red-400">{stats.threatIntelligence.malicious}</div>
                      <div className="text-xs text-gray-300">Maliciosos</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{stats.threatIntelligence.suspicious}</div>
                      <div className="text-xs text-gray-300">Sospechosos</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{stats.threatIntelligence.clean}</div>
                      <div className="text-xs text-gray-300">Limpios</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Tipos de Indicadores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center py-4">
                    <BarChart className="h-32 w-32 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    {stats.threatIntelligence.byType.map((type: any, index: number) => (
                      <div key={index}>
                        <div className="text-lg font-bold text-blue-400">{type.count}</div>
                        <div className="text-xs text-gray-300">{type.type}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-white">Familias de Malware</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {stats.threatIntelligence.topMalwareFamilies.map((family: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{family.family}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${(family.count / stats.threatIntelligence.malicious) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{family.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
