"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Save } from "lucide-react"

interface ActivityCounterProps {
  title?: string
  description?: string
  initialValue?: number
  onSave?: (value: number, title: string, description: string) => void
  id?: string
}

export function ActivityCounter({
  title = "Contador de Actividad",
  description = "Haz clic para añadir una descripción",
  initialValue = 0,
  onSave,
  id,
}: ActivityCounterProps) {
  const [count, setCount] = useState(initialValue)
  const [editableTitle, setEditableTitle] = useState(title)
  const [editableDescription, setEditableDescription] = useState(description)
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setCount(initialValue)
  }, [initialValue])

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  const decrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true)
      try {
        await onSave(count, editableTitle, editableDescription)
      } catch (error) {
        console.error("Error al guardar:", error)
      } finally {
        setIsSaving(false)
      }
    }
  }

  const handleTitleClick = () => {
    if (title === "Haz clic para añadir un título" || !title) {
      setIsTitleEditing(true)
    }
  }

  const handleDescriptionClick = () => {
    if (description === "Haz clic para añadir una descripción" || !description) {
      setIsDescriptionEditing(true)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 h-full">
      <CardHeader className="pb-2">
        {isTitleEditing ? (
          <Input
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            onBlur={() => setIsTitleEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsTitleEditing(false)}
            autoFocus
            className="bg-gray-700 border-gray-600 text-white"
          />
        ) : (
          <CardTitle
            className="text-white cursor-pointer hover:text-blue-400 transition-colors"
            onClick={handleTitleClick}
          >
            {editableTitle || "Haz clic para añadir un título"}
          </CardTitle>
        )}
        {isDescriptionEditing ? (
          <Input
            value={editableDescription}
            onChange={(e) => setEditableDescription(e.target.value)}
            onBlur={() => setIsDescriptionEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsDescriptionEditing(false)}
            autoFocus
            className="bg-gray-700 border-gray-600 text-white text-sm"
          />
        ) : (
          <p
            className="text-gray-400 cursor-pointer hover:text-blue-400 transition-colors text-sm"
            onClick={handleDescriptionClick}
          >
            {editableDescription || "Haz clic para añadir una descripción"}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold text-white mb-6">{count}</div>
          <div className="flex gap-2 mb-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={decrement}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Minus className="h-4 w-4 mr-1" />
              Restar
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={increment}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Sumar
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="border-gray-600 text-white hover:bg-gray-700 w-full"
          >
            {isSaving ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1" />
                Guardar
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
