"use client"

import { useState, useEffect, useRef } from "react"

interface ThreatLocation {
  lat: number
  lng: number
  intensity: number
}

export function ThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [threats, setThreats] = useState<ThreatLocation[]>([])

  useEffect(() => {
    // Simulación de amenazas
    const mockThreats: ThreatLocation[] = [
      { lat: 40.7128, lng: -74.006, intensity: 0.8 }, // New York
      { lat: 51.5074, lng: -0.1278, intensity: 0.6 }, // London
      { lat: 39.9042, lng: 116.4074, intensity: 0.9 }, // Beijing
      { lat: 55.7558, lng: 37.6173, intensity: 0.7 }, // Moscow
      { lat: -33.8688, lng: 151.2093, intensity: 0.5 }, // Sydney
      { lat: 35.6762, lng: 139.6503, intensity: 0.6 }, // Tokyo
      { lat: 19.4326, lng: -99.1332, intensity: 0.4 }, // Mexico City
      { lat: -22.9068, lng: -43.1729, intensity: 0.3 }, // Rio de Janeiro
      { lat: 28.6139, lng: 77.209, intensity: 0.7 }, // New Delhi
      { lat: 37.7749, lng: -122.4194, intensity: 0.8 }, // San Francisco
    ]

    setThreats(mockThreats)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || threats.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Establecer dimensiones del canvas
    const width = canvas.width
    const height = canvas.height

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height)

    // Dibujar mapa del mundo simplificado
    ctx.fillStyle = "#1f2937" // Fondo oscuro
    ctx.fillRect(0, 0, width, height)

    // Dibujar contornos continentales simplificados
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1
    ctx.beginPath()

    // Contornos simplificados (esto es solo una aproximación)
    // América del Norte
    ctx.moveTo(width * 0.1, height * 0.2)
    ctx.lineTo(width * 0.3, height * 0.2)
    ctx.lineTo(width * 0.3, height * 0.5)
    ctx.lineTo(width * 0.1, height * 0.5)
    ctx.lineTo(width * 0.1, height * 0.2)

    // América del Sur
    ctx.moveTo(width * 0.2, height * 0.5)
    ctx.lineTo(width * 0.3, height * 0.5)
    ctx.lineTo(width * 0.25, height * 0.8)
    ctx.lineTo(width * 0.15, height * 0.8)
    ctx.lineTo(width * 0.2, height * 0.5)

    // Europa y África
    ctx.moveTo(width * 0.4, height * 0.2)
    ctx.lineTo(width * 0.5, height * 0.2)
    ctx.lineTo(width * 0.55, height * 0.8)
    ctx.lineTo(width * 0.4, height * 0.8)
    ctx.lineTo(width * 0.4, height * 0.2)

    // Asia y Oceanía
    ctx.moveTo(width * 0.6, height * 0.2)
    ctx.lineTo(width * 0.9, height * 0.2)
    ctx.lineTo(width * 0.9, height * 0.6)
    ctx.lineTo(width * 0.6, height * 0.6)
    ctx.lineTo(width * 0.6, height * 0.2)

    // Australia
    ctx.moveTo(width * 0.75, height * 0.65)
    ctx.lineTo(width * 0.85, height * 0.65)
    ctx.lineTo(width * 0.85, height * 0.75)
    ctx.lineTo(width * 0.75, height * 0.75)
    ctx.lineTo(width * 0.75, height * 0.65)

    ctx.stroke()

    // Dibujar amenazas
    threats.forEach((threat) => {
      // Convertir coordenadas geográficas a coordenadas del canvas
      const x = ((threat.lng + 180) / 360) * width
      const y = ((90 - threat.lat) / 180) * height

      // Dibujar punto de amenaza con gradiente
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20 * threat.intensity)
      gradient.addColorStop(0, `rgba(239, 68, 68, ${threat.intensity})`) // Rojo con opacidad basada en intensidad
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)")

      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(x, y, 20 * threat.intensity, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [threats])

  return (
    <div className="relative h-[250px] w-full bg-gray-800 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="absolute bottom-2 right-2 bg-gray-900/80 text-xs text-gray-300 px-2 py-1 rounded">
        Amenazas activas: {threats.length}
      </div>
    </div>
  )
}
