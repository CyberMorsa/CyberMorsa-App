"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import { EnhancedCounter } from "./enhanced-counter"

export function CounterManager() {
  const [counters, setCounters] = useState<{ id: string; title: string }[]>([])

  // Cargar contadores guardados al montar el componente
  useEffect(() => {
    const savedCounters = localStorage.getItem("counter-manager")
    if (savedCounters) {
      setCounters(JSON.parse(savedCounters))
    } else {
      // Si no hay contadores guardados, crear uno por defecto
      const defaultCounter = { id: "counter-" + Date.now(), title: "Nuevo Contador" }
      setCounters([defaultCounter])
      localStorage.setItem("counter-manager", JSON.stringify([defaultCounter]))
    }
  }, [])

  // Guardar lista de contadores cuando cambia
  useEffect(() => {
    if (counters.length > 0) {
      localStorage.setItem("counter-manager", JSON.stringify(counters))
    }
  }, [counters])

  const addCounter = () => {
    const newCounter = { id: "counter-" + Date.now(), title: "Nuevo Contador" }
    setCounters([...counters, newCounter])
  }

  const removeCounter = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este contador?")) {
      setCounters(counters.filter((counter) => counter.id !== id))
      localStorage.removeItem(`enhanced-counter-${id}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Mis Contadores</h2>
        <Button onClick={addCounter} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Contador
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {counters.map((counter) => (
          <div key={counter.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeCounter(counter.id)}
              className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-400 hover:bg-gray-700"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <EnhancedCounter id={counter.id} initialTitle={counter.title} />
          </div>
        ))}
      </div>
    </div>
  )
}
