"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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

interface EditReminderDialogProps {
  reminder: ReminderType
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (reminder: ReminderType) => void
}

export function EditReminderDialog({ reminder, open, onOpenChange, onSave }: EditReminderDialogProps) {
  const [title, setTitle] = useState(reminder.title)
  const [description, setDescription] = useState(reminder.description || "")
  const [priority, setPriority] = useState(reminder.priority)
  const [category, setCategory] = useState(reminder.category)
  const [date, setDate] = useState<Date | undefined>(reminder.dueDate)
  const [completed, setCompleted] = useState(reminder.completed)

  // Actualizar el estado cuando cambia el recordatorio
  useEffect(() => {
    setTitle(reminder.title)
    setDescription(reminder.description || "")
    setPriority(reminder.priority)
    setCategory(reminder.category)
    setDate(reminder.dueDate)
    setCompleted(reminder.completed)
  }, [reminder])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      ...reminder,
      title,
      description: description || undefined,
      priority: priority as Priority,
      category,
      dueDate: date,
      completed,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Recordatorio</DialogTitle>
            <DialogDescription>Modifica los detalles del recordatorio.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Título</Label>
              <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descripción (opcional)</Label>
              <Textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-priority">Prioridad</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="edit-priority">
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Muy Importante</SelectItem>
                    <SelectItem value="medium">Importante</SelectItem>
                    <SelectItem value="low">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categoría</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ciberseguridad">Ciberseguridad</SelectItem>
                    <SelectItem value="Redes">Redes</SelectItem>
                    <SelectItem value="Programación">Programación</SelectItem>
                    <SelectItem value="Herramientas">Herramientas</SelectItem>
                    <SelectItem value="Teoría">Teoría</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-dueDate">Fecha límite (opcional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-completed"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label
                htmlFor="edit-completed"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Marcar como completado
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
