"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Error al cerrar sesión")
      }

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      })

      // Redirigir a la página de inicio
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al cerrar sesión.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} disabled={loading}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden md:inline">Cerrar sesión</span>
        </>
      )}
    </Button>
  )
}
