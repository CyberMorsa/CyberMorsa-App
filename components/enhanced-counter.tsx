"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus, RotateCcw, Trash } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Player {
  id: string
  name: string
  score: number
  color: string
}

interface EnhancedCounterProps {
  id?: string
  initialTitle?: string
  initialDescription?: string
}

export function EnhancedCounter({
  id = "counter-" + Date.now(),
  initialTitle = "",
  initialDescription = "",
}: EnhancedCounterProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [players, setPlayers] = useState<Player[]>([{ id: "player-1", name: "", score: 0, color: "blue" }])

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedData = localStorage.getItem(`enhanced-counter-${id}`)
    if (savedData) {
      const data = JSON.parse(savedData)
      setTitle(data.title)
      setDescription(data.description)
      setPlayers(data.players)
    }
  }, [id])

  // Guardar datos cuando cambian
  useEffect(() => {
    localStorage.setItem(
      `enhanced-counter-${id}`,
      JSON.stringify({
        title,
        description,
        players,
      }),
    )
  }, [id, title, description, players])

  const addPlayer = () => {
    const colors = ["blue", "red", "green", "purple", "orange", "pink", "teal", "indigo"]
    const newColor = colors[players.length % colors.length]
    setPlayers([...players, { id: `player-${Date.now()}`, name: "", score: 0, color: newColor }])
  }

  const removePlayer = (playerId: string) => {
    if (players.length > 1) {
      setPlayers(players.filter((player) => player.id !== playerId))
    }
  }

  const updatePlayerName = (playerId: string, name: string) => {
    setPlayers(players.map((player) => (player.id === playerId ? { ...player, name } : player)))
  }

  const incrementScore = (playerId: string) => {
    setPlayers(players.map((player) => (player.id === playerId ? { ...player, score: player.score + 1 } : player)))
  }

  const decrementScore = (playerId: string) => {
    setPlayers(players.map((player) => (player.id === playerId ? { ...player, score: player.score - 1 } : player)))
  }

  const resetScore = (playerId: string) => {
    if (confirm("¿Estás seguro de que quieres reiniciar la puntuación a cero?")) {
      setPlayers(players.map((player) => (player.id === playerId ? { ...player, score: 0 } : player)))
    }
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500"
      case "green":
        return "bg-green-500"
      case "blue":
        return "bg-blue-500"
      case "purple":
        return "bg-purple-500"
      case "orange":
        return "bg-orange-500"
      case "pink":
        return "bg-pink-500"
      case "teal":
        return "bg-teal-500"
      case "indigo":
        return "bg-indigo-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <Card className="w-full bg-gray-800 border-gray-700">
      <CardHeader>
        <Input
          type="text"
          placeholder="Título del contador (ej: Partidas de Ajedrez)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-bold bg-gray-700 border-gray-600 text-white mb-2"
        />
        <Textarea
          placeholder="Descripción (ej: Registro de victorias en el torneo)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white resize-none h-20"
        />
      </CardHeader>
      <CardContent className="space-y-6">
        {players.map((player) => (
          <div key={player.id} className="bg-gray-700 rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getColorClass(player.color)}`}></div>
              <Input
                type="text"
                placeholder="Nombre del jugador"
                value={player.name}
                onChange={(e) => updatePlayerName(player.id, e.target.value)}
                className="bg-gray-600 border-gray-500 text-white"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePlayer(player.id)}
                className="text-gray-400 hover:text-red-400 hover:bg-gray-700"
                disabled={players.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-center">
              <div
                className={`text-5xl font-bold tabular-nums px-6 py-3 rounded-lg ${getColorClass(player.color)} bg-opacity-20 text-white`}
              >
                {player.score}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decrementScore(player.id)}
                className="border-gray-600 text-white hover:bg-gray-600"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => incrementScore(player.id)}
                className="border-gray-600 text-white hover:bg-gray-600"
              >
                <Plus className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => resetScore(player.id)}
                className="border-gray-600 text-white hover:bg-gray-600"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          onClick={addPlayer}
          variant="outline"
          className="w-full border-dashed border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          + Añadir jugador
        </Button>
      </CardContent>
    </Card>
  )
}
