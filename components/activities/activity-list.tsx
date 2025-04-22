"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, MinusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo
const MOCK_ACTIVITIES = [
  { id: 1, name: "Cena romántica", points: 5, date: "2023-11-15", person: "Tú" },
  { id: 2, name: "Película en casa", points: 3, date: "2023-11-12", person: "Pareja" },
  { id: 3, name: "Paseo por el parque", points: 2, date: "2023-11-10", person: "Tú" },
  { id: 4, name: "Cocinar juntos", points: 4, date: "2023-11-08", person: "Pareja" },
  { id: 5, name: "Juego de mesa", points: 3, date: "2023-11-05", person: "Amigo" },
]

export function ActivityList() {
  const [activities, setActivities] = useState(MOCK_ACTIVITIES)
  const { toast } = useToast()

  const handleAddPoint = (id: number) => {
    setActivities(
      activities.map((activity) => (activity.id === id ? { ...activity, points: activity.points + 1 } : activity)),
    )

    toast({
      title: "Punto añadido",
      description: "Se ha añadido un punto a la actividad.",
    })
  }

  const handleRemovePoint = (id: number) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, points: Math.max(0, activity.points - 1) } : activity,
      ),
    )

    toast({
      title: "Punto restado",
      description: "Se ha restado un punto de la actividad.",
    })
  }

  const handleChangePerson = (id: number, person: string) => {
    setActivities(activities.map((activity) => (activity.id === id ? { ...activity, person } : activity)))

    toast({
      title: "Persona actualizada",
      description: `Se ha cambiado la persona a "${person}".`,
    })
  }

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay actividades registradas.</p>
      ) : (
        <div className="space-y-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors gap-2"
            >
              <div>
                <p className="font-medium">{activity.name}</p>
                <p className="text-sm text-muted-foreground">{activity.date}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Select
                  defaultValue={activity.person}
                  onValueChange={(value) => handleChangePerson(activity.id, value)}
                >
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Persona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tú">Tú</SelectItem>
                    <SelectItem value="Pareja">Pareja</SelectItem>
                    <SelectItem value="Amigo">Amigo</SelectItem>
                    <SelectItem value="Familiar">Familiar</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" onClick={() => handleRemovePoint(activity.id)}>
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Badge variant="secondary" className="px-3 py-1">
                    {activity.points}
                  </Badge>
                  <Button variant="outline" size="icon" onClick={() => handleAddPoint(activity.id)}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
