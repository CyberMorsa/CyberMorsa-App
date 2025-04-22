"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos de ejemplo
const MOCK_EMAILS = [
  {
    id: 1,
    email: "john.doe@example.com",
    domain: "example.com",
    reputation_score: 85,
    in_breach: false,
    created_at: "2023-11-10",
  },
  {
    id: 2,
    email: "jane.smith@gmail.com",
    domain: "gmail.com",
    reputation_score: 92,
    in_breach: true,
    created_at: "2023-11-08",
  },
  {
    id: 3,
    email: "robert.johnson@company.org",
    domain: "company.org",
    reputation_score: 78,
    in_breach: false,
    created_at: "2023-11-05",
  },
]

export function SavedEmails() {
  const [emails, setEmails] = useState(MOCK_EMAILS)
  const [selectedEmail, setSelectedEmail] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = (id: number) => {
    setEmails(emails.filter((email) => email.id !== id))

    toast({
      title: "Email eliminado",
      description: "El email ha sido eliminado correctamente.",
    })
  }

  const handleView = (email: any) => {
    setSelectedEmail(email)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {emails.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay emails guardados.</p>
      ) : (
        <div className="space-y-2">
          {emails.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{email.email}</p>
                <p className="text-sm text-muted-foreground">
                  {email.domain} • {email.created_at}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleView(email)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(email.id)}>
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
            <DialogTitle>Detalles del Email</DialogTitle>
            <DialogDescription>Información detallada sobre el email guardado.</DialogDescription>
          </DialogHeader>
          {selectedEmail && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedEmail.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dominio</p>
                  <p className="font-medium">{selectedEmail.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Puntuación de reputación</p>
                  <p className="font-medium">{selectedEmail.reputation_score}/100</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En filtraciones</p>
                  <p className="font-medium">{selectedEmail.in_breach ? "Sí" : "No"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de guardado</p>
                  <p className="font-medium">{selectedEmail.created_at}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
