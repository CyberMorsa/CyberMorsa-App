"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Loader2, Lock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function PasswordAudit() {
  const [password, setPassword] = useState("")
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<null | {
    score: number
    breached: boolean
    timeToBreak: string
    suggestions: string[]
  }>(null)

  function checkPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!password) return

    setChecking(true)
    setResult(null)

    // Simulación de verificación
    setTimeout(() => {
      // Cálculo simple de puntuación
      let score = 0
      if (password.length >= 8) score += 20
      if (password.length >= 12) score += 20
      if (/[A-Z]/.test(password)) score += 20
      if (/[0-9]/.test(password)) score += 20
      if (/[^A-Za-z0-9]/.test(password)) score += 20

      // Simulación de tiempo para romper
      let timeToBreak = "menos de un día"
      if (score >= 40) timeToBreak = "unos días"
      if (score >= 60) timeToBreak = "unos meses"
      if (score >= 80) timeToBreak = "varios años"
      if (score === 100) timeToBreak = "siglos"

      // Sugerencias
      const suggestions = []
      if (password.length < 12) suggestions.push("Usa al menos 12 caracteres")
      if (!/[A-Z]/.test(password)) suggestions.push("Incluye letras mayúsculas")
      if (!/[0-9]/.test(password)) suggestions.push("Incluye números")
      if (!/[^A-Za-z0-9]/.test(password)) suggestions.push("Incluye caracteres especiales")
      if (password.toLowerCase().includes("password") || password.toLowerCase().includes("contraseña"))
        suggestions.push("Evita palabras comunes como 'password' o 'contraseña'")

      setResult({
        score,
        breached: Math.random() > 0.7, // Simulación de filtración
        timeToBreak,
        suggestions,
      })

      setChecking(false)
    }, 1500)
  }

  function getScoreColor(score: number) {
    if (score < 40) return "text-red-500"
    if (score < 70) return "text-yellow-500"
    return "text-green-500"
  }

  function getProgressColor(score: number) {
    if (score < 40) return "bg-red-500"
    if (score < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-4">
      <form onSubmit={checkPassword} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password-input" className="text-sm text-gray-300">
            Contraseña a verificar
          </label>
          <div className="flex gap-2">
            <Input
              id="password-input"
              type="password"
              placeholder="Ingresa una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              disabled={checking}
            />
            <Button type="submit" disabled={checking || !password}>
              {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verificar"}
            </Button>
          </div>
          <p className="text-xs text-gray-400">La contraseña no se almacena ni se envía a ningún servidor.</p>
        </div>
      </form>

      {result && (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-gray-700 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Resultado</h3>
              <div className="flex items-center gap-2">
                <Lock className={`h-4 w-4 ${getScoreColor(result.score)}`} />
                <span className={`font-medium ${getScoreColor(result.score)}`}>{result.score}/100</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Fortaleza:</span>
                <span className={getScoreColor(result.score)}>
                  {result.score < 40 ? "Débil" : result.score < 70 ? "Moderada" : "Fuerte"}
                </span>
              </div>
              <Progress value={result.score} className={`h-2 ${getProgressColor(result.score)}`} />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Tiempo estimado para romper:</span>
              <span className="text-white">{result.timeToBreak}</span>
            </div>

            {result.breached && (
              <div className="flex items-start gap-2 p-3 bg-red-500/20 rounded-md">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">¡Contraseña comprometida!</p>
                  <p className="text-xs text-gray-300">
                    Esta contraseña ha aparecido en filtraciones de datos. No deberías usarla.
                  </p>
                </div>
              </div>
            )}
          </div>

          {result.suggestions.length > 0 && (
            <div>
              <h4 className="font-medium text-white mb-2">Sugerencias para mejorar:</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                {result.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
