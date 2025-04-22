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
  { name: "Azul", bg: "bg-blue-600", hover: "hover:bg-blue-700", text: "text-white" },
  { name: "Verde", bg: "bg-green-600", hover: "hover:bg-green-700", text: "text-white" },
  { name: "Morado", bg: "bg-purple-600", hover: "hover:bg-purple-700", text: "text-white" },
  { name: "Amarillo", bg: "bg-yellow-600", hover: "hover:bg-yellow-700", text: "text-white" },
  { name: "Rosa", bg: "bg-pink-600", hover: "hover:bg-pink-700", text: "text-white" },
  { name: "Índigo", bg: "bg-indigo-600", hover: "hover:bg-indigo-700", text: "text-white" },
  { name: "Rojo", bg: "bg-red-600", hover: "hover:bg-red-700", text: "text-white" },
  { name: "Naranja", bg: "bg-orange-600", hover: "hover:bg-orange-700", text: "text-white" },
]

export function EnhancedCounter({ id, initialTitle = "Nuevo Contador" }: EnhancedCounterProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState("")
  const [players, setPlayers] = useState<Player[]>([
    { id: "player-1", name: "Jugador 1", count: 0, color: COLORS[0].bg },
  ])

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
        color: COLORS[colorIndex].bg,
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
    setPlayers(
      players.map((player) => (player.id === playerId ? { ...player, count: Math.max(0, player.count - 1) } : player)),
    )
  }

  const resetPlayer = (playerId: string) => {
    if (confirm("¿Estás seguro de que quieres reiniciar este contador?")) {
      setPlayers(players.map((player) => (player.id === playerId ? { ...player, count: 0 } : player)))
    }
  }

  const resetAllPlayers = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar todos los contadores?")) {
      setPlayers(players.map((player) => ({ ...player, count: 0 })))
    }
  }

  const getColorClasses = (colorClass: string) => {
    const color = COLORS.find((c) => c.bg === colorClass)
    return color ? `${color.bg} ${color.hover} ${color.text}` : ""
  }

  return (
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
          <Card key={player.id} className="bg-gray-700 border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-4 h-4 rounded-full ${player.color}`}></div>
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
                  <Button
                    onClick={() => decrementPlayer(player.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    size="lg"
                  >
                    <Minus className="mr-1 h-5 w-5" />
                    <span>Restar</span>
                  </Button>
                  <Button
                    onClick={() => incrementPlayer(player.id)}
                    className={getColorClasses(player.color)}
                    size="lg"
                  >
                    <Plus className="mr-1 h-5 w-5" />
                    <span>Sumar</span>
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
            </CardContent>
          </Card>
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
        <Button onClick={resetAllPlayers} variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
