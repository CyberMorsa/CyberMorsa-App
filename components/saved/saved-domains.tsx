"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos de ejemplo
const MOCK_DOMAINS = [
  {
    id: 1,
    domain: "example.com",
    subdomain_count: 5,
    first_seen: "2020-05-15",
    technologies: ["Nginx", "React"],
    created_at: "2023-11-10",
  },
  {
    id: 2,
    domain: "company.org",
    subdomain_count: 12,
    first_seen: "2018-03-22",
    technologies: ["Apache", "PHP", "MySQL"],
    created_at: "2023-11-08",
  },
  {
    id: 3,
    domain: "blog.dev",
    subdomain_count: 3,
    first_seen: "2021-09-10",
    technologies: ["Cloudflare", "WordPress"],
    created_at: "2023-11-05",
  },
]

export function SavedDomains() {
  const [domains, setDomains] = useState(MOCK_DOMAINS)
  const [selectedDomain, setSelectedDomain] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = (id: number) => {
    setDomains(domains.filter((domain) => domain.id !== id))

    toast({
      title: "Dominio eliminado",
      description: "El dominio ha sido eliminado correctamente.",
    })
  }

  const handleView = (domain: any) => {
    setSelectedDomain(domain)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {domains.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay dominios guardados.</p>
      ) : (
        <div className="space-y-2">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{domain.domain}</p>
                <p className="text-sm text-muted-foreground">
                  {domain.subdomain_count} subdominios • {domain.created_at}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleView(domain)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(domain.id)}>
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
            <DialogTitle>Detalles del Dominio</DialogTitle>
            <DialogDescription>Información detallada sobre el dominio guardado.</DialogDescription>
          </DialogHeader>
          {selectedDomain && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Dominio</p>
                  <p className="font-medium">{selectedDomain.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subdominios</p>
                  <p className="font-medium">{selectedDomain.subdomain_count}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Primera vez visto</p>
                  <p className="font-medium">{selectedDomain.first_seen}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de guardado</p>
                  <p className="font-medium">{selectedDomain.created_at}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tecnologías</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedDomain.technologies.map((tech: string) => (
                    <span key={tech} className="bg-muted px-2 py-1 rounded-md text-xs">
                      {tech}
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
