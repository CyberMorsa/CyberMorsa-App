"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, RotateCcw, Trash, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Player {
  id: string
  name: string
  count: number
  color: string
}

interface EnhancedCounterProps {
  id: string
  initialTitle?: string
}

const COLORS = [
  "bg-blue-600 hover:bg-blue-700",
  "bg-green-600 hover:bg-green-700",
  "bg-purple-600 hover:bg-purple-700",
  "bg-yellow-600 hover:bg-yellow-700",
  "bg-pink-600 hover:bg-pink-700",
  "bg-indigo-600 hover:bg-indigo-700",
  "bg-red-600 hover:bg-red-700",
  "bg-orange-600 hover:bg-orange-700",
]

export function EnhancedCounter({ id, initialTitle = "Nuevo Contador" }: EnhancedCounterProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState("")
  const [players, setPlayers] = useState<Player[]>([{ id: "player-1", name: "Jugador 1", count: 0, color: COLORS[0] }])

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
  }, [title, description, players, id])

  const addPlayer = () => {
    const newPlayerId = `player-${Date.now()}`
    const colorIndex = players.length % COLORS.length
    setPlayers([
      ...players,
      {
        id: newPlayerId,
        name: `Jugador ${players.length + 1}`,
        count: 0,
        color: COLORS[colorIndex],
      },
    ])
  }

  const removePlayer = (playerId: string) => {
    if (players.length > 1) {
      setPlayers(players.filter((player) => player.id !== playerId))
    }
  }

  const updatePlayerName = (playerId: string, name: string) => {
    setPlayers(players.map((player) => (player.id === playerId ? { ...player, name } : player)))
  }

  const incrementPlayer = (playerId: string) => {
    setPlayers(players.map((player) => (player.id === playerId ? { ...player, count: player.count + 1 } : player)))
  }

  const decrementPlayer = (playerId: string) => {
    setPlayers(players.map((player) => (player.id === playerId ? { ...player, count: player.count - 1 } : player)))
  }

  const resetPlayer = (playerId: string) => {
    setPlayers(players.map((player) => (player.id === playerId ? { ...player, count: 0 } : player)))
  }

  const resetAllPlayers = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar todos los contadores?")) {
      setPlayers(players.map((player) => ({ ...player, count: 0 })))
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-bold bg-gray-700 border-gray-600 text-white"
              placeholder="Título del contador"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-700 border-gray-600 text-gray-300 resize-none"
              placeholder="Descripción (opcional)"
              rows={2}
            />
          </div>

          <div className="space-y-4">
            {players.map((player) => (
              <div key={player.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Input
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="bg-gray-600 border-gray-500 text-white"
                    placeholder="Nombre del jugador"
                  />
                  {players.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePlayer(player.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-gray-600"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-white">{player.count}</div>
                  <div className="flex gap-2">
                    <Button onClick={() => decrementPlayer(player.id)} className="bg-red-600 hover:bg-red-700">
                      <Minus className="h-5 w-5" />
                    </Button>
                    <Button onClick={() => incrementPlayer(player.id)} className={player.color}>
                      <Plus className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={() => resetPlayer(player.id)}
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-600"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={addPlayer}
              variant="outline"
              className="w-full border-dashed border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Añadir jugador
            </Button>
            <Button
              onClick={resetAllPlayers}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
