"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos de ejemplo
const MOCK_IPS = [
  {
    id: 1,
    ip_address: "192.168.1.1",
    asn: "AS13335",
    isp: "Cloudflare, Inc.",
    country: "Estados Unidos",
    city: "San Francisco",
    is_abusive: false,
    created_at: "2023-11-10",
  },
  {
    id: 2,
    ip_address: "8.8.8.8",
    asn: "AS15169",
    isp: "Google LLC",
    country: "Estados Unidos",
    city: "Mountain View",
    is_abusive: false,
    created_at: "2023-11-08",
  },
  {
    id: 3,
    ip_address: "1.1.1.1",
    asn: "AS13335",
    isp: "Cloudflare, Inc.",
    country: "Australia",
    city: "Sydney",
    is_abusive: false,
    created_at: "2023-11-05",
  },
]

export function SavedIps() {
  const [ips, setIps] = useState(MOCK_IPS)
  const [selectedIp, setSelectedIp] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = (id: number) => {
    setIps(ips.filter((ip) => ip.id !== id))

    toast({
      title: "IP eliminada",
      description: "La IP ha sido eliminada correctamente.",
    })
  }

  const handleView = (ip: any) => {
    setSelectedIp(ip)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {ips.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No hay IPs guardadas.</p>
      ) : (
        <div className="space-y-2">
          {ips.map((ip) => (
            <div
              key={ip.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{ip.ip_address}</p>
                <p className="text-sm text-muted-foreground">
                  {ip.country} • {ip.created_at}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleView(ip)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(ip.id)}>
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
            <DialogTitle>Detalles de la IP</DialogTitle>
            <DialogDescription>Información detallada sobre la IP guardada.</DialogDescription>
          </DialogHeader>
          {selectedIp && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Dirección IP</p>
                  <p className="font-medium">{selectedIp.ip_address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ASN</p>
                  <p className="font-medium">{selectedIp.asn}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ISP</p>
                  <p className="font-medium">{selectedIp.isp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">País</p>
                  <p className="font-medium">{selectedIp.country}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ciudad</p>
                  <p className="font-medium">{selectedIp.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Es abusivo</p>
                  <p className="font-medium">{selectedIp.is_abusive ? "Sí" : "No"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de guardado</p>
                  <p className="font-medium">{selectedIp.created_at}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
