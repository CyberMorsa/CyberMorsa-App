"use client"

import { useState, useEffect } from "react"
import { Database, Table, HardDrive, Users } from "lucide-react"

export function DatabaseStats() {
  const [stats, setStats] = useState({
    tables: 0,
    records: 0,
    size: "0 MB",
    lastUpdate: "",
  })

  useEffect(() => {
    // Simulación de carga de estadísticas
    const loadStats = () => {
      setStats({
        tables: 8,
        records: 1243,
        size: "42.8 MB",
        lastUpdate: new Date().toLocaleString(),
      })
    }

    loadStats()
    // En una implementación real, podrías configurar un intervalo para actualizar periódicamente
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
        <Database className="h-8 w-8 text-blue-400" />
        <div>
          <h3 className="font-medium text-white">Neon PostgreSQL</h3>
          <p className="text-sm text-gray-300">Conectado</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Table className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Tablas</span>
          </div>
          <span className="text-sm font-medium text-white">{stats.tables}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Registros</span>
          </div>
          <span className="text-sm font-medium text-white">{stats.records}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Tamaño</span>
          </div>
          <span className="text-sm font-medium text-white">{stats.size}</span>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-4">Última actualización: {stats.lastUpdate}</div>
    </div>
  )
}
