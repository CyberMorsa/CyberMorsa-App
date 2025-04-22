"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Trash, Bell, BellOff, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function WatchlistMonitor() {
  const [newItem, setNewItem] = useState("")
  const [itemType, setItemType] = useState<"email" | "username" | "ip" | "domain">("email")
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState(false)
  const [notifyTelegram, setNotifyTelegram] = useState(false)
  const { toast } = useToast()

  // Cargar watchlist al montar el componente
  useEffect(() => {
    loadWatchlist()
  }, [])

  // Función para cargar la watchlist
  const loadWatchlist = async () => {
    try {
      setLoading(true)

      // Simulación de carga de datos
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Datos simulados
      const mockWatchlist = [
        {
          id: 1,
          type: "email",
          value: "john.doe@example.com",
          status: "risk",
          lastChecked: "2023-04-15",
          alerts: 3,
          notifyEmail: true,
          notifyTelegram: false,
          details: {
            breaches: 2,
            lastBreach: "2023-03-10",
            threatScore: 75,
          },
        },
        {
          id: 2,
          type: "ip",
          value: "192.168.1.1",
          status: "ok",
          lastChecked: "2023-04-15",
          alerts: 0,
          notifyEmail: true,
          notifyTelegram: true,
          details: {
            threatScore: 15,
            reports: 0,
          },
        },
        {
          id: 3,
          type: "domain",
          value: "example.com",
          status: "ok",
          lastChecked: "2023-04-15",
          alerts: 0,
          notifyEmail: false,
          notifyTelegram: false,
          details: {
            subdomains: 5,
            technologies: ["Nginx", "PHP", "MySQL"],
          },
        },
        {
          id: 4,
          type: "username",
          value: "johndoe",
          status: "warning",
          lastChecked: "2023-04-15",
          alerts: 1,
          notifyEmail: true,
          notifyTelegram: false,
          details: {
            platforms: 8,
            newMentions: 1,
          },
        },
      ]

      setWatchlist(mockWatchlist)
    } catch (error) {
      console.error("Error al cargar watchlist:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar la watchlist.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Función para añadir un nuevo elemento a la watchlist
  const addToWatchlist = async () => {
    if (!newItem.trim()) return

    try {
      setLoading(true)

      // Simulación de guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Añadir elemento simulado
      const newWatchlistItem = {
        id: watchlist.length + 1,
        type: itemType,
        value: newItem,
        status: "ok",
        lastChecked: new Date().toISOString().split("T")[0],
        alerts: 0,
        notifyEmail,
        notifyTelegram,
        details: {},
      }

      setWatchlist([...watchlist, newWatchlistItem])
      setNewItem("")
      setShowAddDialog(false)

      toast({
        title: "Elemento añadido",
        description: `${newItem} ha sido añadido a la watchlist.`,
      })
    } catch (error) {
      console.error("Error al añadir elemento:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo añadir el elemento a la watchlist.",
      })
    } finally {
      setLoading(false)
    }
  }

  // Función para eliminar un elemento de la watchlist
  const removeFromWatchlist = async (id: number) => {
    try {
      // Simulación de eliminación
      await new Promise((resolve) => setTimeout(resolve, 500))

      setWatchlist(watchlist.filter((item) => item.id !== id))

      toast({
        title: "Elemento eliminado",
        description: "El elemento ha sido eliminado de la watchlist.",
      })
    } catch (error) {
      console.error("Error al eliminar elemento:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el elemento de la watchlist.",
      })
    }
  }

  // Función para actualizar las notificaciones
  const toggleNotification = async (id: number, type: "email" | "telegram") => {
    try {
      // Simulación de actualización
      await new Promise((resolve) => setTimeout(resolve, 300))

      setWatchlist(
        watchlist.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              notifyEmail: type === "email" ? !item.notifyEmail : item.notifyEmail,
              notifyTelegram: type === "telegram" ? !item.notifyTelegram : item.notifyTelegram,
            }
          }
          return item
        }),
      )
    } catch (error) {
      console.error("Error al actualizar notificaciones:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron actualizar las notificaciones.",
      })
    }
  }

  // Función para refrescar la watchlist
  const refreshWatchlist = async () => {
    try {
      setRefreshing(true)

      // Simulación de actualización
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Actualizar aleatoriamente algunos elementos
      const updatedWatchlist = watchlist.map((item) => {
        if (Math.random() > 0.7) {
          const newAlerts = Math.floor(Math.random() * 3)
          return {
            ...item,
            status: newAlerts > 0 ? (newAlerts > 1 ? "risk" : "warning") : "ok",
            alerts: item.alerts + newAlerts,
            lastChecked: new Date().toISOString().split("T")[0],
          }
        }
        return {
          ...item,
          lastChecked: new Date().toISOString().split("T")[0],
        }
      })

      setWatchlist(updatedWatchlist)

      toast({
        title: "Watchlist actualizada",
        description: "Se ha actualizado el estado de todos los elementos.",
      })
    } catch (error) {
      console.error("Error al refrescar watchlist:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar la watchlist.",
      })
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Watchlist / Alerta de Monitoreo</CardTitle>
          <CardDescription className="text-gray-300">
            Monitorea emails, usernames, IPs y dominios para detectar cambios o amenazas
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refreshWatchlist} disabled={refreshing}>
            {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Añadir
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : watchlist.length > 0 ? (
          <div className="space-y-4">
            {watchlist.map((item) => (
              <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.status === "risk"
                          ? "bg-red-500/20"
                          : item.status === "warning"
                            ? "bg-yellow-500/20"
                            : "bg-green-500/20"
                      }`}
                    >
                      {item.status === "risk" ? (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      ) : item.status === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{item.value}</p>
                        <Badge
                          className={
                            item.type === "email"
                              ? "bg-blue-500/20 text-blue-300"
                              : item.type === "username"
                                ? "bg-purple-500/20 text-purple-300"
                                : item.type === "ip"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-yellow-500/20 text-yellow-300"
                          }
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400">
                        Última verificación: {item.lastChecked} • {item.alerts} alertas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleNotification(item.id, "email")}
                      >
                        {item.notifyEmail ? (
                          <Bell className="h-4 w-4 text-blue-400" />
                        ) : (
                          <BellOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleNotification(item.id, "telegram")}
                      >
                        {item.notifyTelegram ? (
                          <Bell className="h-4 w-4 text-blue-400" />
                        ) : (
                          <BellOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => removeFromWatchlist(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {item.status !== "ok" && (
                  <div
                    className={`mt-3 p-2 rounded-md ${item.status === "risk" ? "bg-red-500/10" : "bg-yellow-500/10"}`}
                  >
                    <p className="text-sm text-gray-300">
                      {item.status === "risk"
                        ? `¡Alerta! Se han detectado ${item.alerts} nuevas amenazas para este objetivo.`
                        : `Se ha detectado ${item.alerts} cambio en este objetivo.`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No hay elementos en la watchlist</p>
            <p className="text-gray-500 mt-2">Añade elementos para monitorearlos</p>
            <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Añadir elemento
            </Button>
          </div>
        )}

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Añadir a Watchlist</DialogTitle>
              <DialogDescription className="text-gray-300">
                Añade un elemento para monitorear cambios y amenazas
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="item-type">Tipo de elemento</Label>
                <Select value={itemType} onValueChange={(value: any) => setItemType(value)}>
                  <SelectTrigger id="item-type" className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="username">Username</SelectItem>
                    <SelectItem value="ip">IP</SelectItem>
                    <SelectItem value="domain">Dominio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-value">Valor</Label>
                <Input
                  id="item-value"
                  type="text"
                  placeholder={`Ingresa un ${itemType}`}
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-email">Notificar por email</Label>
                  <Switch id="notify-email" checked={notifyEmail} onCheckedChange={setNotifyEmail} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-telegram">Notificar por Telegram</Label>
                  <Switch id="notify-telegram" checked={notifyTelegram} onCheckedChange={setNotifyTelegram} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={addToWatchlist} disabled={!newItem.trim() || loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Añadir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
