"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, Download, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RelationshipGraph() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [graphData, setGraphData] = useState<any>(null)
  const [queryType, setQueryType] = useState<"email" | "username" | "ip" | "domain">("email")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const { toast } = useToast()

  // Simulación de datos para el grafo
  const generateMockGraphData = (query: string, type: string) => {
    const nodes = [{ id: 1, label: query, type: type, color: "#3B82F6" }]

    const edges = []
    const nodeTypes = ["email", "username", "ip", "domain", "leak"]

    // Generar nodos aleatorios conectados al nodo principal
    for (let i = 2; i <= 10; i++) {
      const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)]
      let nodeLabel = ""

      switch (nodeType) {
        case "email":
          nodeLabel = `user${i}@example.com`
          break
        case "username":
          nodeLabel = `user${i}`
          break
        case "ip":
          nodeLabel = `192.168.1.${i}`
          break
        case "domain":
          nodeLabel = `example${i}.com`
          break
        case "leak":
          nodeLabel = `Breach ${i}`
          break
      }

      nodes.push({
        id: i,
        label: nodeLabel,
        type: nodeType,
        color:
          nodeType === "email"
            ? "#3B82F6"
            : nodeType === "username"
              ? "#8B5CF6"
              : nodeType === "ip"
                ? "#10B981"
                : nodeType === "domain"
                  ? "#F59E0B"
                  : "#EF4444",
      })

      // Conectar al nodo principal o a otro nodo aleatorio
      const targetId = Math.random() > 0.7 ? Math.floor(Math.random() * (i - 1)) + 1 : 1

      edges.push({
        from: targetId,
        to: i,
        label: ["encontrado en", "relacionado con", "conectado a", "usado por", "filtrado en"][
          Math.floor(Math.random() * 5)
        ],
      })
    }

    return { nodes, edges }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)

    try {
      // Simulación de búsqueda
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generar datos simulados para el grafo
      const mockData = generateMockGraphData(query, queryType)
      setGraphData(mockData)

      // Renderizar el grafo después de que los datos estén disponibles
      setTimeout(() => {
        renderGraph(mockData)
      }, 100)
    } catch (error) {
      console.error("Error al buscar relaciones:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo completar la búsqueda de relaciones.",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderGraph = (data: any) => {
    const canvas = canvasRef.current
    if (!canvas || !data) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Configurar el zoom
    ctx.save()
    ctx.scale(zoom, zoom)

    // Calcular el centro del canvas
    const centerX = canvas.width / 2 / zoom
    const centerY = canvas.height / 2 / zoom

    // Dibujar las conexiones (edges)
    data.edges.forEach((edge: any) => {
      const fromNode = data.nodes.find((n: any) => n.id === edge.from)
      const toNode = data.nodes.find((n: any) => n.id === edge.to)

      if (fromNode && toNode) {
        // Calcular posiciones
        const angle1 = (fromNode.id * Math.PI * 0.2) % (2 * Math.PI)
        const angle2 = (toNode.id * Math.PI * 0.2) % (2 * Math.PI)

        const radius = 150
        const x1 = centerX + radius * Math.cos(angle1)
        const y1 = centerY + radius * Math.sin(angle1)
        const x2 = centerX + radius * Math.cos(angle2)
        const y2 = centerY + radius * Math.sin(angle2)

        // Dibujar línea
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = "#4B5563"
        ctx.lineWidth = 1
        ctx.stroke()

        // Dibujar etiqueta de la conexión
        const midX = (x1 + x2) / 2
        const midY = (y1 + y2) / 2

        ctx.fillStyle = "#9CA3AF"
        ctx.font = "10px Arial"
        ctx.fillText(edge.label, midX, midY)
      }
    })

    // Dibujar los nodos
    data.nodes.forEach((node: any) => {
      const angle = (node.id * Math.PI * 0.2) % (2 * Math.PI)
      const radius = 150
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      // Dibujar círculo
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, 2 * Math.PI)
      ctx.fillStyle = node.color
      ctx.fill()

      // Dibujar etiqueta
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(node.label, x, y + 30)

      // Dibujar tipo
      ctx.fillStyle = "#D1D5DB"
      ctx.font = "8px Arial"
      ctx.fillText(node.type, x, y + 40)
    })

    ctx.restore()
  }

  // Re-renderizar el grafo cuando cambia el zoom
  useEffect(() => {
    if (graphData) {
      renderGraph(graphData)
    }
  }, [zoom, graphData])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleResetZoom = () => {
    setZoom(1)
  }

  const downloadGraph = () => {
    if (!canvasRef.current) return

    const link = document.createElement("a")
    link.download = `relationship-graph-${query}.png`
    link.href = canvasRef.current.toDataURL("image/png")
    link.click()
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Grafo Visual de Relaciones</CardTitle>
        <CardDescription className="text-gray-300">
          Visualiza las conexiones entre entidades (email, username, IP, dominio)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={queryType} onValueChange={(value: any) => setQueryType(value)}>
              <SelectTrigger className="w-full md:w-[180px] bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Tipo de dato" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600 text-white">
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="username">Username</SelectItem>
                <SelectItem value="ip">IP</SelectItem>
                <SelectItem value="domain">Dominio</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 flex gap-2">
              <Input
                type="text"
                placeholder={`Ingresa un ${queryType}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !query.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-6 relative">
          {graphData ? (
            <>
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleResetZoom}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={downloadGraph}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} width={800} height={600} className="w-full h-[500px]"></canvas>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-300">Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-300">Username</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-300">IP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-300">Dominio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-300">Filtración</span>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-900 rounded-lg flex items-center justify-center h-[500px]">
              <div className="text-center">
                <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Ingresa un dato para visualizar sus relaciones</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
