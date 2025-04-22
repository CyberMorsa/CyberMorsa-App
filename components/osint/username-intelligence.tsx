"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, User, Check, X, Download, Database, ExternalLink } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UsernameIntelligence() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [selectedApis, setSelectedApis] = useState({
    sherlock: true,
    namechk: true,
    socialsearcher: true,
    whatsmyname: true,
  })

  const platforms = [
    "Twitter",
    "Instagram",
    "GitHub",
    "Reddit",
    "LinkedIn",
    "Facebook",
    "TikTok",
    "YouTube",
    "Pinterest",
    "Snapchat",
    "Twitch",
    "Medium",
    "Tumblr",
    "Flickr",
    "Vimeo",
    "SoundCloud",
    "Spotify",
    "Steam",
    "Xbox",
    "PlayStation",
  ]

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !Object.values(selectedApis).some(Boolean)) return

    setLoading(true)
    setProgress(0)
    setResults(null)

    // Simulación de progreso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    try {
      // Simulación de búsqueda en múltiples APIs
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Generar resultados aleatorios para cada plataforma
      const platformResults = platforms.map((platform) => ({
        platform,
        exists: Math.random() > 0.6,
        url: `https://${platform.toLowerCase()}.com/${username}`,
        username: username,
        verified: Math.random() > 0.8,
        followers: Math.floor(Math.random() * 10000),
        posts: Math.floor(Math.random() * 500),
      }))

      // Resultados simulados
      setResults({
        username,
        sherlock: selectedApis.sherlock
          ? {
              found: Math.floor(Math.random() * 10) + 5,
              total: 20,
              platforms: platformResults.filter((p) => p.exists).slice(0, Math.floor(Math.random() * 10) + 5),
            }
          : null,
        namechk: selectedApis.namechk
          ? {
              available: platforms.filter(() => Math.random() > 0.7).slice(0, Math.floor(Math.random() * 5) + 2),
              taken: platforms.filter(() => Math.random() > 0.3).slice(0, Math.floor(Math.random() * 10) + 5),
            }
          : null,
        socialsearcher: selectedApis.socialsearcher
          ? {
              found: Math.random() > 0.3,
              posts: Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, i) => ({
                platform: platforms[Math.floor(Math.random() * platforms.length)],
                text: `Post de ejemplo #${i + 1} por ${username}. Este es un contenido simulado para demostración.`,
                date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0],
                likes: Math.floor(Math.random() * 100),
                comments: Math.floor(Math.random() * 20),
              })),
            }
          : null,
        whatsmyname: selectedApis.whatsmyname
          ? {
              found: Math.floor(Math.random() * 15) + 10,
              total: 300,
              sites: Array.from({ length: Math.floor(Math.random() * 15) + 10 }).map((_, i) => ({
                name: platforms[Math.floor(Math.random() * platforms.length)],
                category: ["Social", "Professional", "Dating", "Forum", "Gaming"][Math.floor(Math.random() * 5)],
                url: `https://example${i}.com/${username}`,
              })),
            }
          : null,
      })
    } catch (error) {
      console.error("Error al buscar información del username:", error)
    } finally {
      clearInterval(interval)
      setProgress(100)
      setLoading(false)
    }
  }

  function saveToDatabase() {
    if (!results) return
    // Simulación de guardado en base de datos
    alert(`Username ${results.username} y todos sus resultados guardados en la base de datos`)
  }

  function downloadResults() {
    if (!results) return
    // Crear y descargar archivo JSON
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `username_intel_${results.username}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Inteligencia de Username</CardTitle>
          <CardDescription className="text-gray-300">
            Busca información sobre nombres de usuario en múltiples plataformas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Ingresa un nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading || !username || !Object.values(selectedApis).some(Boolean)}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  "Buscar"
                )}
              </Button>
            </div>

            <div className="bg-gray-700 p-3 rounded-md">
              <div className="text-sm font-medium text-white mb-2">Selecciona las APIs a consultar:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sherlock"
                    checked={selectedApis.sherlock}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, sherlock: checked as boolean })}
                  />
                  <Label htmlFor="sherlock" className="text-gray-300">
                    Sherlock
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="namechk"
                    checked={selectedApis.namechk}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, namechk: checked as boolean })}
                  />
                  <Label htmlFor="namechk" className="text-gray-300">
                    Namechk
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="socialsearcher"
                    checked={selectedApis.socialsearcher}
                    onCheckedChange={(checked) =>
                      setSelectedApis({ ...selectedApis, socialsearcher: checked as boolean })
                    }
                  />
                  <Label htmlFor="socialsearcher" className="text-gray-300">
                    Social-Searcher
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whatsmyname"
                    checked={selectedApis.whatsmyname}
                    onCheckedChange={(checked) => setSelectedApis({ ...selectedApis, whatsmyname: checked as boolean })}
                  />
                  <Label htmlFor="whatsmyname" className="text-gray-300">
                    WhatsMyName
                  </Label>
                </div>
              </div>
            </div>
          </form>

          {loading && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Consultando APIs...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">@{results.username}</h2>
              <p className="text-gray-300">Resultados de la búsqueda en múltiples plataformas</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadResults}>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button onClick={saveToDatabase}>
                <Database className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList className="bg-gray-700">
              <TabsTrigger value="summary" className="data-[state=active]:bg-gray-600">
                Resumen
              </TabsTrigger>
              {results.sherlock && (
                <TabsTrigger value="sherlock" className="data-[state=active]:bg-gray-600">
                  Sherlock
                </TabsTrigger>
              )}
              {results.namechk && (
                <TabsTrigger value="namechk" className="data-[state=active]:bg-gray-600">
                  Namechk
                </TabsTrigger>
              )}
              {results.socialsearcher && (
                <TabsTrigger value="socialsearcher" className="data-[state=active]:bg-gray-600">
                  Social-Searcher
                </TabsTrigger>
              )}
              {results.whatsmyname && (
                <TabsTrigger value="whatsmyname" className="data-[state=active]:bg-gray-600">
                  WhatsMyName
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Resumen de Hallazgos</CardTitle>
                  <CardDescription className="text-gray-300">
                    Información consolidada de todas las fuentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-5 w-5 text-blue-400" />
                          <h3 className="font-medium text-white">Presencia en Plataformas</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          {results.sherlock && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Sherlock:</span>
                              <span className="text-white">
                                {results.sherlock.found} de {results.sherlock.total} plataformas
                              </span>
                            </div>
                          )}
                          {results.namechk && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Namechk:</span>
                              <span className="text-white">{results.namechk.taken.length} plataformas ocupadas</span>
                            </div>
                          )}
                          {results.whatsmyname && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">WhatsMyName:</span>
                              <span className="text-white">
                                {results.whatsmyname.found} de {results.whatsmyname.total} sitios
                              </span>
                            </div>
                          )}
                          {results.socialsearcher && (
                            <div className="flex justify-between">
                              <span className="text-gray-300">Posts encontrados:</span>
                              <span className="text-white">{results.socialsearcher.posts.length} publicaciones</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="h-5 w-5 text-green-400" />
                          <h3 className="font-medium text-white">Plataformas Principales</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {results.sherlock &&
                            results.sherlock.platforms.slice(0, 10).map((platform: any, i: number) => (
                              <Badge key={i} className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">
                                {platform.platform}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Sección de alertas */}
                    <div className="space-y-3">
                      {results.sherlock && results.sherlock.found > 10 && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex items-start gap-3">
                          <User className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Alta presencia en línea</p>
                            <p className="text-gray-300 text-sm">
                              Este username tiene presencia en {results.sherlock.found} plataformas diferentes, lo que
                              indica un uso extensivo en internet.
                            </p>
                          </div>
                        </div>
                      )}

                      {results.socialsearcher && results.socialsearcher.posts.length > 0 && (
                        <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg flex items-start gap-3">
                          <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Publicaciones encontradas</p>
                            <p className="text-gray-300 text-sm">
                              Se encontraron {results.socialsearcher.posts.length} publicaciones públicas asociadas a
                              este username.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {results.sherlock && (
              <TabsContent value="sherlock" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Sherlock</CardTitle>
                    <CardDescription className="text-gray-300">
                      Búsqueda de username en múltiples plataformas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Resultado</span>
                        <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                          {results.sherlock.found} de {results.sherlock.total} plataformas
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {results.sherlock.platforms.map((platform: any, i: number) => (
                          <div key={i} className="bg-gray-700 p-3 rounded-lg flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-white">{platform.platform}</span>
                              {platform.verified && (
                                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                  Verificado
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-300 mb-2">@{platform.username}</div>
                            <div className="text-xs text-gray-400 flex justify-between mb-3">
                              <span>{platform.followers} seguidores</span>
                              <span>{platform.posts} posts</span>
                            </div>
                            <a
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-auto"
                            >
                              Ver perfil <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.namechk && (
              <TabsContent value="namechk" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Namechk</CardTitle>
                    <CardDescription className="text-gray-300">
                      Disponibilidad del username en diferentes plataformas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-3">Username Ocupado</h3>
                          <div className="space-y-2">
                            {results.namechk.taken.length > 0 ? (
                              <div className="grid grid-cols-2 gap-2">
                                {results.namechk.taken.map((platform: string, i: number) => (
                                  <div key={i} className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                                    <X className="h-4 w-4 text-red-400" />
                                    <span className="text-sm text-white">{platform}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-300 text-sm">No se encontraron plataformas ocupadas</p>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-700 p-3 rounded-lg">
                          <h3 className="font-medium text-white mb-3">Username Disponible</h3>
                          <div className="space-y-2">
                            {results.namechk.available.length > 0 ? (
                              <div className="grid grid-cols-2 gap-2">
                                {results.namechk.available.map((platform: string, i: number) => (
                                  <div key={i} className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                                    <Check className="h-4 w-4 text-green-400" />
                                    <span className="text-sm text-white">{platform}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-300 text-sm">No se encontraron plataformas disponibles</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.socialsearcher && (
              <TabsContent value="socialsearcher" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Social-Searcher</CardTitle>
                    <CardDescription className="text-gray-300">
                      Publicaciones públicas asociadas al username
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Resultado</span>
                        <Badge
                          className={
                            results.socialsearcher.posts.length > 0
                              ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                          }
                        >
                          {results.socialsearcher.posts.length > 0
                            ? `${results.socialsearcher.posts.length} publicaciones encontradas`
                            : "No se encontraron publicaciones"}
                        </Badge>
                      </div>

                      {results.socialsearcher.posts.length > 0 && (
                        <div className="space-y-3">
                          {results.socialsearcher.posts.map((post: any, i: number) => (
                            <div key={i} className="bg-gray-700 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">
                                    {post.platform}
                                  </Badge>
                                  <span className="text-xs text-gray-400">{post.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                  <span>{post.likes} likes</span>
                                  <span>{post.comments} comentarios</span>
                                </div>
                              </div>
                              <p className="text-sm text-white">{post.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {results.whatsmyname && (
              <TabsContent value="whatsmyname" className="space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">WhatsMyName</CardTitle>
                    <CardDescription className="text-gray-300">
                      Búsqueda de username en más de 300 sitios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="text-white">Resultado</span>
                        <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                          {results.whatsmyname.found} de {results.whatsmyname.total} sitios
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {results.whatsmyname.sites.map((site: any, i: number) => (
                            <div key={i} className="bg-gray-700 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-white">{site.name}</span>
                                <Badge className="bg-gray-600 text-gray-300 hover:bg-gray-500">{site.category}</Badge>
                              </div>
                              <a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                              >
                                Ver perfil <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </div>
  )
}
