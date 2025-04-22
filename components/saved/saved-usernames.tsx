"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos de ejemplo
const MOCK_USERNAMES = [
  { id: 1, username: "johndoe", platforms: ["Twitter", "GitHub", "Reddit"], created_at: "2023-11-10" },
  { id: 2, username: "janesmith", platforms: ["Instagram", "LinkedIn", "TikTok"], created_at: "2023-11-08" },
  { id: 3, username: "robertj", platforms: ["Twitter", "GitHub"], created_at: "2023-11-05" },
]

export function SavedUsernames() {
  const [usernames, setUsernames] = useState(MOCK_USERNAMES)
  const [selectedUsername, setSelectedUsername] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = (id: number) => {
    setUsernames(usernames.filter((username) => username.id !== id))

    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado correctamente.",
    })
  }

  const handleView = (username: any) => {
    setSelectedUsername(username)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {usernames.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay usuarios guardados.</p>
      ) : (
        <div className="space-y-2">
          {usernames.map((username) => (
            <div
              key={username.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{username.username}</p>
                <p className="text-sm text-muted-foreground">
                  {username.platforms.length} plataformas • {username.created_at}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleView(username)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(username.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
            <DialogDescription>Información detallada sobre el usuario guardado.</DialogDescription>
          </DialogHeader>
          {selectedUsername && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Nombre de usuario</p>
                  <p className="font-medium">{selectedUsername.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de guardado</p>
                  <p className="font-medium">{selectedUsername.created_at}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plataformas</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedUsername.platforms.map((platform: string) => (
                    <span key={platform} className="bg-muted px-2 py-1 rounded-md text-xs">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
