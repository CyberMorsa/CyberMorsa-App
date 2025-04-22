"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { EditReminderDialog } from "@/components/reminders/edit-reminder-dialog"
import { format } from "date-fns"

// Tipos
type Priority = "high" | "medium" | "low"
type ReminderType = {
  id: number
  title: string
  description?: string
  priority: Priority
  dueDate?: Date
  completed: boolean
  category: string
}

// Datos de ejemplo
const MOCK_REMINDERS: ReminderType[] = [
  {
    id: 1,
    title: "Estudiar vulnerabilidades XSS",
    description: "Repasar tipos de XSS y métodos de prevención",
    priority: "high",
    dueDate: new Date(2023, 11, 20),
    completed: false,
    category: "Ciberseguridad",
  },
  {
    id: 2,
    title: "Configurar laboratorio de pruebas",
    description: "Instalar Kali Linux y configurar máquinas virtuales vulnerables",
    priority: "high",
    dueDate: new Date(2023, 11, 25),
    completed: false,
    category: "Ciberseguridad",
  },
  {
    id: 3,
    title: "Repasar conceptos de redes",
    description: "Protocolos TCP/IP, subredes y enrutamiento",
    priority: "medium",
    dueDate: new Date(2023, 12, 5),
    completed: false,
    category: "Redes",
  },
  {
    id: 4,
    title: "Practicar con Wireshark",
    description: "Análisis de tráfico y captura de paquetes",
    priority: "medium",
    dueDate: new Date(2023, 12, 10),
    completed: true,
    category: "Herramientas",
  },
  {
    id: 5,
    title: "Leer sobre criptografía básica",
    priority: "low",
    dueDate: new Date(2023, 12, 15),
    completed: false,
    category: "Teoría",
  },
]

// Función para obtener el color de la prioridad
const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "default"
    case "low":
      return "secondary"
    default:
      return "secondary"
  }
}

// Función para obtener el texto de la prioridad
const getPriorityText = (priority: Priority) => {
  switch (priority) {
    case "high":
      return "Muy Importante"
    case "medium":
      return "Importante"
    case "low":
      return "Normal"
    default:
      return "Normal"
  }
}

export function ReminderList({ filter = "all" }: { filter: "all" | Priority }) {
  const [reminders, setReminders] = useState<ReminderType[]>(MOCK_REMINDERS)
  const [editingReminder, setEditingReminder] = useState<ReminderType | null>(null)
  const { toast } = useToast()

  // Filtrar recordatorios según el filtro seleccionado
  const filteredReminders = reminders
    .filter((reminder) => filter === "all" || reminder.priority === filter)
    .sort((a, b) => {
      // Primero ordenar por completado
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }

      // Luego por prioridad
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })

  const handleToggleComplete = (id: number) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder)),
    )

    const reminder = reminders.find((r) => r.id === id)
    toast({
      title: reminder?.completed ? "Recordatorio pendiente" : "Recordatorio completado",
      description: `"${reminder?.title}" ha sido marcado como ${reminder?.completed ? "pendiente" : "completado"}.`,
    })
  }

  const handleDelete = (id: number) => {
    const reminder = reminders.find((r) => r.id === id)
    setReminders(reminders.filter((reminder) => reminder.id !== id))

    toast({
      title: "Recordatorio eliminado",
      description: `"${reminder?.title}" ha sido eliminado.`,
      variant: "destructive",
    })
  }

  const handleEdit = (reminder: ReminderType) => {
    setEditingReminder(reminder)
  }

  const handleSaveEdit = (updatedReminder: ReminderType) => {
    setReminders(reminders.map((reminder) => (reminder.id === updatedReminder.id ? updatedReminder : reminder)))

    setEditingReminder(null)

    toast({
      title: "Recordatorio actualizado",
      description: `"${updatedReminder.title}" ha sido actualizado.`,
    })
  }

  return (
    <div className="space-y-4">
      {filteredReminders.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay recordatorios para mostrar.</p>
      ) : (
        <div className="space-y-2">
          {filteredReminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`flex items-start justify-between p-3 border rounded-lg transition-colors ${
                reminder.completed ? "bg-muted/50" : "hover:bg-muted/20"
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <Checkbox
                  checked={reminder.completed}
                  onCheckedChange={() => handleToggleComplete(reminder.id)}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-medium ${reminder.completed ? "line-through text-muted-foreground" : ""}`}>
                      {reminder.title}
                    </p>
                    <Badge variant={getPriorityColor(reminder.priority) as any}>
                      {getPriorityText(reminder.priority)}
                    </Badge>
                    <Badge variant="outline">{reminder.category}</Badge>
                  </div>
                  {reminder.description && (
                    <p
                      className={`text-sm ${reminder.completed ? "text-muted-foreground/70 line-through" : "text-muted-foreground"}`}
                    >
                      {reminder.description}
                    </p>
                  )}
                  {reminder.dueDate && (
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(reminder.dueDate, "dd/MM/yyyy")}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(reminder)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(reminder.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingReminder && (
        <EditReminderDialog
          reminder={editingReminder}
          open={!!editingReminder}
          onOpenChange={(open) => !open && setEditingReminder(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  )
}
