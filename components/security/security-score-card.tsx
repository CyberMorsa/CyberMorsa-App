"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info } from "lucide-react"

export function SecurityScoreCard() {
  const [score, setScore] = useState(0)
  const [issues, setIssues] = useState({ critical: 0, warning: 0, info: 0 })

  useEffect(() => {
    // Simulación de puntuación de seguridad
    const mockScore = 72
    const mockIssues = { critical: 3, warning: 5, info: 8 }

    // Animación de la puntuación
    let currentScore = 0
    const interval = setInterval(() => {
      currentScore += 1
      setScore(currentScore)
      if (currentScore >= mockScore) {
        clearInterval(interval)
      }
    }, 20)

    setIssues(mockIssues)

    return () => clearInterval(interval)
  }, [])

  const getScoreColor = () => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreLabel = () => {
    if (score >= 80) return "Bueno"
    if (score >= 60) return "Moderado"
    return "Crítico"
  }

  const getScoreDescription = () => {
    if (score >= 80) return "Tu sistema tiene un buen nivel de seguridad"
    if (score >= 60) return "Tu sistema necesita algunas mejoras"
    return "Tu sistema tiene vulnerabilidades críticas"
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Puntuación de Seguridad</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-700 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className={`${
                  score >= 80 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-red-500"
                } stroke-current`}
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor()}`}>{score}</span>
              <span className="text-xs text-gray-400">de 100</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Badge
              className={`${
                score >= 80
                  ? "bg-green-500/20 text-green-400"
                  : score >= 60
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >
              {getScoreLabel()}
            </Badge>
            <p className="mt-2 text-sm text-gray-300">{getScoreDescription()}</p>
          </div>

          <div className="w-full mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-gray-300">Problemas críticos:</span>
              <span className="text-sm font-medium text-white">{issues.critical}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Advertencias:</span>
              <span className="text-sm font-medium text-white">{issues.warning}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">Información:</span>
              <span className="text-sm font-medium text-white">{issues.info}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
